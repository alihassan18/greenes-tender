// import { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";
// import { Pool } from "pg";
// var similarity = require("compute-cosine-similarity");

// import NodeCache from "node-cache";

// const cache = new NodeCache({ stdTTL: 300 });

// const pool = new Pool({
//     connectionString: process.env.PRODUCTS_DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
// });

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== "POST") {
//         res.status(405).json({ error: "Method not allowed" });
//         return;
//     }

//     const { userInput } = req.body;

//     console.log(userInput, "userInput");

//     try {
//         const cachedResponse = cache.get(userInput);
//         if (cachedResponse) {
//             res.status(200).json(cachedResponse);
//             return;
//         }

//         const embeddingResponse = await openai.embeddings.create({
//             model: "text-embedding-ada-002",
//             input: userInput,
//         });
//         const userEmbedding = embeddingResponse.data[0].embedding;

//         const client = await pool.connect();
//         try {
//             const result = await client.query(
//                 "SELECT product_name, strain_type, brand_name, cbd, image, price, dispensary, options, thc, sales, embedding FROM products"
//             );
//             const products = result.rows;

//             const similarities = products.map((product) => ({
//                 ...product,
//                 similarity: similarity(userEmbedding, product.embedding),
//             }));

//             similarities.sort((a, b) => b.similarity - a.similarity);

//             const topProducts = similarities
//                 .slice(0, 3)
//                 .map(({ embedding, ...product }) => product);

//             cache.set(userInput, topProducts);
//             res.status(200).json(topProducts);
//         } finally {
//             client.release();
//         }
//     } catch (err: any) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Pool } from "pg";
import NodeCache from "node-cache";
const similarity = require("compute-cosine-similarity");

const cache = new NodeCache({ stdTTL: 300 });

const pool = new Pool({
    connectionString: process.env.PRODUCTS_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { userInput } = req.body;

    console.log(userInput, "userInput");

    try {
        const cachedResponse = cache.get(userInput);
        if (cachedResponse) {
            res.status(200).json(cachedResponse);
            return;
        }

        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: userInput,
        });
        const userEmbedding = embeddingResponse.data[0].embedding;

        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT product_name, strain_type, brand_name, cbd, image, price, dispensary, options, thc, sales, embedding FROM products"
            );
            const products = result.rows;

            const similarities = products.map((product) => {
                if (!product.embedding || !Array.isArray(product.embedding)) {
                    console.error("Invalid product embedding:", product);
                    return {
                        ...product,
                        similarity: null,
                    };
                }
                try {
                    return {
                        ...product,
                        similarity: similarity(
                            userEmbedding,
                            product.embedding
                        ),
                    };
                } catch (error) {
                    console.error("Error computing similarity:", error);
                    return {
                        ...product,
                        similarity: null,
                    };
                }
            });

            similarities.sort(
                (a, b) => (b.similarity ?? 0) - (a.similarity ?? 0)
            );

            const topProducts = similarities
                .filter((product) => product.similarity !== null)
                .slice(0, 3)
                .map(({ embedding, ...product }) => product);

            cache.set(userInput, topProducts);
            res.status(200).json(topProducts);
        } finally {
            client.release();
        }
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
