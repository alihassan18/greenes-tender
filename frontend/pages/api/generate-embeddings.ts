import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Pool } from "pg";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const pool = new Pool({
    connectionString: process.env.PRODUCTS_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

type Data = {
    message: string;
};

async function generateProductEmbeddings() {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM products");
        const products = res.rows;

        for (const product of products) {
            const text = `${product.product_name} ${product.strain_type} ${product.brand_name} ${product.options}`;
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: text,
            });
            const embedding = embeddingResponse.data[0].embedding;

            await client.query(
                "UPDATE products SET embedding = $1 WHERE product_name = $2",
                [embedding, product.product_name]
            );
        }
    } finally {
        client.release();
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    try {
        await generateProductEmbeddings();
        res.status(200).json({
            message: "Embeddings generated and stored successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
