"use client";
import { useActions, useUIState } from "ai/rsc";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Image from "next/image";
import { useCallback } from "react";

interface ProductInfo {
    product_name: string;
    dispensary: string;
    mg_content: string;
    price: string;
    explanation: string;
    image: string;
}

export function RecommendedProductsList({
    products,
}: {
    products: ProductInfo[];
}) {
    const { submitUserMessage } = useActions();
    const [messages, setMessages] = useUIState();

    const handleProductClick = useCallback(
        async (product: ProductInfo) => {
            const response = await submitUserMessage(
                `The user has selected a product they want to learn more about. Please provide detailed information using the "product_details" function call. Assume all products relate to CBD. Here is the Product: ${JSON.stringify(
                    product
                )}`
            );
            setMessages((currentMessages: any[]) => [
                ...currentMessages,
                response,
            ]);
        },
        [submitUserMessage, setMessages]
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product) => (
                <div
                    key={product.product_name}
                    className="bg-white shadow-sm hover:bg-gray-200 hover:bg-opacity-30 rounded-xl border p-4 hover:cursor-pointer"
                    onClick={() => handleProductClick(product)}
                >
                    <div className="flex flex-col items-center gap-4">
                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={`${product.image}`}
                            className="w-24 h-24 object-contain rounded-xl"
                        />
                        {/* Product Title with Icon */}
                        <div className="flex flex-row items-center justify-center mt-2">
                            <h2 className="font-bold mr-1 text-center">
                                {product.product_name.length > 17
                                    ? `${product.product_name.substring(
                                          0,
                                          17
                                      )}...`
                                    : product.product_name}
                            </h2>
                            <InfoOutlinedIcon style={{ color: "gray" }} />
                        </div>

                        {/* Product Metadata */}
                        <div className="text-center">
                            <p className="mb-1 text-gray-600">
                                {product.dispensary}
                            </p>
                            <p className="text-lg font-bold text-green-800">
                                {product.price}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {product.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
