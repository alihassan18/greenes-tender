import "server-only";

import {
    createAI,
    createStreamableUI,
    createStreamableValue,
    getMutableAIState,
    render,
    streamUI,
} from "ai/rsc";

// import { OpenAI } from "openai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import StartCard from "@/components/StartCard";
import { RecommendedProductsList } from "@/components/RecommendList";
import ProductCard from "@/components/ProductCard";
import CheckoutCard from "@/components/Checkout";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Chat, Message } from "@/lib/types";
import { BotMessage } from "@/components/BotMessage";
import { nanoid } from "@/lib/utils";
// import { CodeBlock } from '../ui/codeblock'
// import { MemoizedReactMarkdown } from '../markdown'
// import remarkMath from 'remark-math'

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// type Message = {
//     id: number;
//     display: React.ReactNode;
//     role: "user" | "assistant";
// };

function RecommendSpinner() {
    return (
        <>
            <div className=" flex flex-row mb-4 items-center ">
                <div className="animate-spin">
                    {" "}
                    <AcUnitIcon style={{ color: "gray" }} />{" "}
                </div>
                <h1 className="text-gray-600 italic ml-2">
                    Searching STL Stores.....
                </h1>
            </div>
            <div className="grid grid-cols-3 space-x-10">
                <div className="flex flex-col p-x-4">
                    <div className="w-40 h-10 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-20 h-5 mt-1 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-10 h-5 mt-2 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-10 h-5 mt-4 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full mt-2 h-5 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                </div>
                <div className="flex flex-col p-x-4 ">
                    <div className="w-40 h-10 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-20 h-5 mt-1 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-10 h-5 mt-2 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-10 h-5 mt-4 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full mt-2 h-5 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                </div>
                <div className="flex flex-col p-x-4 ">
                    <div className="w-40 h-10 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-20 h-5 mt-1 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-10 h-5 mt-2 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-10 h-5 mt-4 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full mt-2 h-5 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </>
    );
}

function CheckoutSpinner() {
    return (
        <div className="flex flex-col">
            <div className=" h-40 w-80 mb-5 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
            <div className="flex flex-row space-x-5">
                <div className="w-20 h-5 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-20 h-5 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
            </div>
        </div>
    );
}

function StartSpinner() {
    return (
        <div className="flex flex-col">
            <div className=" h-5 mb-5 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-5">
                <div className="w-10 h-10 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
            </div>
        </div>
    );
}

function DetailsSpinner() {
    return (
        <div className="flex flex-row w-full bd">
            <div className="flex flex-col w-3/5">
                <div className="w-full h-6 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full mt-4 h-4 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full mt-4 h-4 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full mt-4 h-4 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full mt-4 h-4 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full mt-4 h-4 bg-gray-300 ml-3 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div className="w-full h-3 bg-gray-300 mb-1 bg-opacity-50 rounded-xl animate-pulse"></div>
            </div>
        </div>
    );
}

type ProductInfo = {
    product_name: string;
    strain_type: string;
    brand_name: string;
    mg_content: string;
    price: string;
    dispensary: string;
    description: string;
    explanation: string;
    image: string;
};

async function checkout(product: ProductInfo) {
    return [product];
}

async function recommendProducts(userInput: string) {
    try {
        console.time("recommend");
        const productsResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/recommed-products`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userInput }),
            }
        );
        console.timeEnd("recommend");
        if (!productsResponse.ok) {
            throw new Error(
                `Failed to fetch products: ${productsResponse.statusText}`
            );
        }
        const products = await productsResponse.json();
        // console.log(products, "products");

        return products;

        //         // Construct the prompt using the fetched products data
        //         const prompt = `Given the user input: "${userInput}", recommend three cbd products from the following list that match the user's preferences:

        // ${JSON.stringify(products)}

        // The JSON output should have the following structure:
        // [
        //     {
        //         "product_name": "Product 1",
        //         "strain_type": "Strain Type 1",
        //         "brand_name": "Brand 1",
        //         "mg_content": "MG Content 1",
        //         "price": "Price 1",
        //         "dispensary": "Dispensary 1",
        //         "explanation": "A explanation on why this product was recommended",
        //         "description": "Elevate your experience with our premium Strain Type 1, a flagship product from Brand 1. Each unit contains MG Content 1 mg of pure, lab-tested THC, ensuring a consistent and reliable session. Available exclusively at Dispensary 1 for Price 1, it’s your go-to choice for unmatched quality.",
        //         "image": "https://imageurl"
        //     },
        //     {
        //         "product_name": "Product 2",
        //         "strain_type": "Strain Type 2",
        //         "brand_name": "Brand 2",
        //         "mg_content": "MG Content 2",
        //         "price": "Price 2",
        //         "dispensary": "Dispensary 2",
        //         "explanation": "A explanation on why this product was recommended",
        //         "description": "Discover the powerful effects of Strain Type 2 from Brand 2, offering MG Content 2 mg of premium THC per package. Perfect for both new and experienced users, this product promises potent relief and is priced at Price 2 at Dispensary 2. Don’t miss out on this exclusive offering.",
        //         "image": "https://imageurl"
        //     },
        //     {
        //         "product_name": "Product 3",
        //         "strain_type": "Strain Type 3",
        //         "brand_name": "Brand 3",
        //         "mg_content": "MG Content 3",
        //         "price": "Price 3",
        //         "dispensary": "Dispensary 3",
        //         "explanation": "A explanation on why this product was recommended",
        //         "description": "Step into a new level of potency with Strain Type 3 from Brand 3, containing MG Content 3 mg of the finest THC. Available for Price 3 only at Dispensary 3, this product is crafted for those seeking the highest quality and exceptional effects.",
        //         "image": "https://imageurl"
        //     }
        // ]`;

        //         console.log(prompt, "prompt");

        //         console.time("openai");
        //         const openaiResponse = await openai.chat.completions.create({
        //             // model: "gpt-4-turbo",
        //             // model: "gpt-4o",
        //             model: "gpt-3.5-turbo",
        //             messages: [
        //                 {
        //                     role: "user",
        //                     content: prompt,
        //                 },
        //             ],
        //             // response_format: {
        //             //     type: "json_object",
        //             // },
        //         });
        //         console.timeEnd("openai");
        //         const jsonOutput = openaiResponse.choices[0]?.message?.content;
        //         if (!jsonOutput) {
        //             throw new Error("Unexpected response from OpenAI API");
        //         }

        // console.log("Raw JSON output:", jsonOutput);

        // Validate if the response is a valid JSON string
        // try {
        //     const recommendedProducts = JSON.parse(jsonOutput);
        //     return recommendedProducts;
        // } catch (error) {
        //     console.error("Error parsing JSON:", jsonOutput);
        //     throw new Error("Failed to parse JSON response from OpenAI API");
        // }
    } catch (error) {
        console.error("Error in recommendProducts:", error);
        throw error;
    }
}

async function submitUserMessage(userInput: string) {
    "use server";
    const aiState = getMutableAIState<typeof AI>();

    // aiState.update({
    //     ...aiState.get(),
    //     messages: [
    //         ...aiState.get().messages,
    //         {
    //             //   id: nanoid(),
    //             role: "user",
    //             content: `${aiState
    //                 .get()
    //                 .interactions.join("\n\n")}\n\n${userInput}`,
    //         },
    //     ],
    // });
    // aiState.update([...aiState.get(), { role: "user", content: userInput }]);

    aiState.update({
        ...aiState.get(),
        messages: [
            ...aiState.get().messages,
            {
                id: nanoid(),
                role: "user",
                content: userInput,
            },
        ],
    });
    console.log(aiState.get(), "aiState");

    // const textStream = createStreamableValue("");
    // const spinnerStream = createStreamableUI(<StartSpinner />);
    // const messageStream = createStreamableUI(null);
    // const uiStream = createStreamableUI();
    // const weatherUI = createStreamableUI();

    let textStream:
        | undefined
        | ReturnType<typeof createStreamableValue<string>>;
    let textNode: undefined | React.ReactNode;

    const ui = await streamUI({
        model: openai("gpt-4-0125-preview"),
        initial: <StartSpinner />,
        // provider: openai,
        system: "You are a budtender that works for a company called the Greenest you reccommend cbd products based on user preferences. Only answer questions about CBD",
        // messages: [
        //     {
        //         role: "system",
        //         content:
        //             "You are a budtender that works for a company called the Greenest you reccommend cbd products based on user preferences. Only answer questions about CBD",
        //     },
        //     ...aiState.get(),
        // ],
        messages: [
            ...aiState.get().messages.map((message: any) => ({
                role: message.role,
                content: message.content,
                name: message.name,
            })),
        ],
        // text: ({ content, done }) => {
        //     if (done) {
        //         aiState.done([
        //             ...aiState.get(),
        //             { role: "assistant", content },
        //         ]);
        //     }
        //     return (
        //         <ReactMarkdown
        //             remarkPlugins={[remarkGfm]}
        //             components={{
        //                 strong: ({ node, ...props }) => (
        //                     <strong className="font-bold" {...props} />
        //                 ),
        //                 ul: ({ node, ...props }) => (
        //                     <ul className="list-disc ml-4 mt-4" {...props} />
        //                 ),
        //                 ol: ({ node, ...props }) => (
        //                     <ol className="list-decimal ml-4 mt-4" {...props} />
        //                 ),
        //                 li: ({ node, ...props }) => (
        //                     <li className="mb-2" {...props} />
        //                 ),
        //             }}
        //         >
        //             {content}
        //         </ReactMarkdown>
        //     );
        // },
        text: ({ content, done, delta }) => {
            console.log(content, done, delta, "content, done, delta");

            if (!textStream) {
                textStream = createStreamableValue("");
                textNode = <BotMessage content={textStream.value} />;
            }

            if (done) {
                textStream.done();
                aiState.done({
                    ...aiState.get(),
                    messages: [
                        ...aiState.get().messages,
                        {
                            id: nanoid(),
                            role: "assistant",
                            content,
                        },
                    ],
                });
            } else {
                textStream.update(delta);
            }

            return textNode;
        },

        tools: {
            start: {
                description:
                    "When a user is starting an order and doesn't know what to get or starts a conversation",
                parameters: z
                    .object({
                        userInput: z.string(),
                    })
                    .required(),
                generate: async function* (parameters) {
                    yield <StartSpinner />;

                    aiState.done({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: nanoid(),
                                role: "assistant",
                                name: "start_card",
                                content:
                                    "provided the UI for the user to select thier effect",
                            },
                        ],
                    });
                    // aiState.done([
                    //     ...aiState.get(),
                    //     {
                    //         role: "function",
                    //         name: "start_card",
                    //         content:
                    //             "provided the UI for the user to select thier effect",
                    //     },
                    // ]);
                    return <StartCard />;
                },
            },
            recommend_products: {
                description:
                    "Recommend three products based on user input only when they know what they want",
                parameters: z
                    .object({
                        userInput: z.string(),
                    })
                    .required(),
                generate: async function* (parameters) {
                    yield <RecommendSpinner />;
                    const recommendedProducts = await recommendProducts(
                        parameters.userInput
                    );
                    console.log(recommendedProducts, "recommendedProducts");

                    const toolCallId = nanoid();
                    // aiState.done([
                    //     ...aiState.get(),
                    //     {
                    //         role: "function",
                    //         name: "recommend_products",
                    //         content: JSON.stringify(recommendedProducts),
                    //     },
                    // ]);
                    aiState.done({
                        ...aiState.get(),
                        // messages: [
                        //     ...aiState.get().messages,
                        //     {
                        //         type: "tool-call",
                        //         id: nanoid(),
                        //         role: "assistant",
                        //         name: "recommend_products",
                        //         content: JSON.stringify(recommendedProducts),
                        //     },
                        // ],
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: nanoid(),
                                role: "assistant",
                                content: [
                                    {
                                        type: "tool-call",
                                        toolName: "recommend_products",
                                        toolCallId,
                                        args: { recommendedProducts },
                                    },
                                ],
                            },
                            {
                                id: nanoid(),
                                role: "tool",
                                content: [
                                    {
                                        type: "tool-result",
                                        toolName: "recommend_products",
                                        toolCallId,
                                        result: recommendedProducts,
                                    },
                                ],
                            },
                        ],
                    });
                    return (
                        <RecommendedProductsList
                            products={recommendedProducts}
                        />
                    );
                },
            },
            product_details: {
                description:
                    "Get detailed information about a specific product. If a user asks about more information about the product or wants to learn more",
                parameters: z
                    .object({
                        product: z.object({
                            product_name: z.string(),
                            strain_type: z.string(),
                            brand_name: z.string(),
                            mg_content: z.string(),
                            price: z.string(),
                            dispensary: z.string(),
                            description: z.string(),
                            explanation: z.string(),
                            image: z.string(),
                        }),
                    })
                    .required(),
                generate: async function* (parameters) {
                    yield <DetailsSpinner />;

                    const toolCallId = nanoid();
                    // aiState.done([
                    //     ...aiState.get(),
                    //     {
                    //         role: "function",
                    //         name: "product_details",
                    //         content: JSON.stringify(parameters.product),
                    //     },
                    // ]);
                    aiState.done({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: nanoid(),
                                role: "assistant",
                                content: [
                                    {
                                        type: "tool-call",
                                        toolName: "product_details",
                                        toolCallId,
                                        args: { parameters },
                                    },
                                ],
                            },
                            {
                                id: nanoid(),
                                role: "tool",
                                content: [
                                    {
                                        type: "tool-result",
                                        toolName: "product_details",
                                        toolCallId,
                                        result: parameters,
                                    },
                                ],
                            },
                        ],
                    });
                    return <ProductCard productInfo={parameters.product} />;
                },
            },
            check_out: {
                description: "Buy the product mentioned",
                parameters: z
                    .object({
                        product: z.object({
                            product_name: z.string(),
                            strain_type: z.string(),
                            brand_name: z.string(),
                            mg_content: z.string(),
                            price: z.string(),
                            dispensary: z.string(),
                            description: z.string(),
                            explanation: z.string(),
                            image: z.string(),
                        }),
                    })
                    .required(),
                generate: async function* (parameters) {
                    yield <CheckoutSpinner />;
                    const checkoutItem = await checkout(parameters.product);
                    const toolCallId = nanoid();
                    // aiState.done([
                    //     ...aiState.get(),
                    //     {
                    //         role: "function",
                    //         name: "check_out",
                    //         content: JSON.stringify(checkoutItem),
                    //     },
                    // ]);
                    // aiState.done({
                    //     ...aiState.get(),
                    //     messages: [
                    //         ...aiState.get().messages,
                    //         {
                    //             id: nanoid(),
                    //             role: "assistant",
                    //             name: "check_out",
                    //             content: JSON.stringify(checkoutItem),
                    //         },
                    //     ],
                    // });
                    aiState.done({
                        ...aiState.get(),
                        messages: [
                            ...aiState.get().messages,
                            {
                                id: nanoid(),
                                role: "assistant",
                                content: [
                                    {
                                        type: "tool-call",
                                        toolName: "check_out",
                                        toolCallId,
                                        args: { parameters },
                                    },
                                ],
                            },
                            {
                                id: nanoid(),
                                role: "tool",
                                content: [
                                    {
                                        type: "tool-result",
                                        toolName: "check_out",
                                        toolCallId,
                                        result: parameters,
                                    },
                                ],
                            },
                        ],
                    });
                    return (
                        <div>
                            {checkoutItem.map((product: ProductInfo) => (
                                <CheckoutCard
                                    key={product.product_name}
                                    productInfo={product}
                                />
                            ))}
                        </div>
                    );
                },
            },
        },
    });

    return { id: Date.now(), display: ui.value, role: "assistant" };
}

// export type AIState = {
//     role: "user" | "assistant" | "system" | "function";
//     content: string;
//     id?: string;
//     name?: string;
// }[];

// export type UIState = Message[];

export type AIState = {
    chatId: string;
    messages: Message[];
};

export type UIState = {
    id: string;
    display: React.ReactNode;
}[];

// export const AI = createAI({
//     actions: { submitUserMessage },
//     initialUIState,
//     initialAIState,
// });

export const AI = createAI<AIState, UIState>({
    actions: { submitUserMessage },
    initialUIState: [],
    initialAIState: { chatId: nanoid(), messages: [] },
});
