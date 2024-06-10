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

    console.time("dbConnectTime");
    const client = await getPool().connect();
    console.timeEnd("dbConnectTime");

    try {
        console.time("queryTime");
        const result = await client.query("SELECT * FROM products LIMIT 10;"); // Added limit
        console.timeEnd("queryTime");

        console.time("jsonSerializationTime");
        const rows = result.rows;
        cache.set("products", rows); // Cache the result
        console.timeEnd("jsonSerializationTime");

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
            console.time("requestTime");
            const products = await getProducts();
            console.time("responseTime");
            res.status(200).json(products);
            console.timeEnd("responseTime");
            console.timeEnd("requestTime");
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ message: "Failed to fetch products." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
