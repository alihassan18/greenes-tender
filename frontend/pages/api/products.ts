import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

let pool: Pool | undefined;

function getPool(): Pool {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.PRODUCTS_DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        });
    }
    return pool;
}

async function getProducts() {
    const cachedProducts = cache.get("products");
    if (cachedProducts) {
        return cachedProducts;
    }

    const client = await getPool().connect();

    try {
        const result = await client.query(
            "SELECT product_name, strain_type, brand_name, cbd, image, price, dispensary, options, thc, sales FROM products"
        );

        const rows = result.rows;
        cache.set("products", rows); // Cache the result

        return rows;
    } finally {
        client.release();
    }
}

// export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: "Failed to fetch products." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
