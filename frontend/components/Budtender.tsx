"use client";
import { useState } from "react";
import { useUIState, useActions } from "ai/rsc";
import { AI } from "@/app/action";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Image from "next/image";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Link from "next/link";

export default function Budtender() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useUIState<typeof AI>();
    const { submitUserMessage } = useActions<typeof AI>();
    const [isLoading, setIsLoading] = useState(false);

    const handlePromptClick = async (promptText: string) => {
        setIsLoading(true);
        setMessages((currentMessages) => [
            ...currentMessages,
            {
                id: Date.now(),
                display: <div>{promptText}</div>,
                role: "user",
            },
        ]);

        const responseMessage = await submitUserMessage(promptText);
        setMessages((currentMessages) => [
            ...currentMessages,
            { ...responseMessage, role: "assistant" },
        ]);
        setIsLoading(false);
    };

    return (
        <div className="relative h-screen max-w-[50rem] mx-auto pb-10">
            <div className="flex justify-end space-x-3 p-4 items-center sticky top-0 bg-white z-10 rounded-md">
                <Link href="/">
                    <div className="flex flex-row items-center py-2 px-2 w-[100px] justify-center rounded-full border bg-custom-gray op border-black ">
                        <AcUnitIcon
                            style={{ fontSize: "20px", color: "green" }}
                        />
                        <p className="relative left-0 right-0 text-gray-800 text-sm flex items-center justify-center">
                            Chat
                        </p>
                    </div>
                </Link>

                <Link href="/settings">
                    <div className="flex flex-row items-center py-2 px-2 w-[100px] justify-center rounded-full border border-gray-400 ">
                        <p className="text-gray-800 text-sm">Customize</p>
                    </div>
                </Link>
                <Link href="/products">
                    <div className="flex flex-row items-center py-2 px-2 w-[100px] justify-center  rounded-full border border-gray-400 ">
                        <p className="text-gray-800 text-sm">Browse</p>
                    </div>
                </Link>
            </div>
            {messages.length === 0 ? (
                <div className="flex flex-col ">
                    <h2 className="text-xl text-center opacity-50 mt-2 mb-5 sm:w-full px-2 ">
                        {" "}
                        Your expert guide in the world of CBD, helping you
                        discover the perfect products tailored to your unique
                        preferences and needs.
                    </h2>
                    <div className="flex flex-wrap justify-center ">
                        <div
                            className="flex flex-col justify-center items-center space-y-2  p-2 m-2 border rounded-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            onClick={() =>
                                window.open(
                                    "https://thegreenest.com/reviews/green-roads-sweet-sleep-cbd-oil/",
                                    "_blank"
                                )
                            }
                        >
                            <div className="max-w-full h-50 ">
                                <Image
                                    src="/product1.jpeg"
                                    width={200}
                                    height={30}
                                    alt="Logo"
                                />
                            </div>
                            <p className="font-bold text-gray-700">$69.99</p>
                            <div className="bg-green-800 bg-opacity-80 p-1 inline-block rounded-xl">
                                <p className="text-white text-xs px-2">
                                    Staff Pick
                                </p>
                            </div>
                            <h1 className="font-bold">Sweet Sleep</h1>
                            <p className="text-gray-700 text-sm">Green Roads</p>
                            <div className="flex flex-row space-x-2">
                                <p className="text-gray-900 text-xs">
                                    CBD: 200MG
                                </p>
                            </div>
                        </div>

                        <div
                            className="flex flex-col justify-center items-center space-y-2 p-2 m-2 border rounded-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            onClick={() =>
                                window.open(
                                    "https://thegreenest.com/reviews/green-roads-cbd-relax-bears/",
                                    "_blank"
                                )
                            }
                        >
                            <div className="max-w-full h-50">
                                <Image
                                    src="/product2.webp"
                                    width={200}
                                    height={30}
                                    alt="Logo"
                                />
                            </div>
                            <p className="font-bold text-gray-700">$37.99</p>
                            <div className="bg-green-800 bg-opacity-80 p-1 inline-block rounded-xl">
                                <p className="text-white text-xs px-2">
                                    Staff Pick
                                </p>
                            </div>
                            <h1 className="font-bold">Relax Bears</h1>
                            <p className="text-gray-600 text-sm">Green Roads</p>
                            <div className="flex flex-row space-x-2">
                                <p className="text-gray-900 text-xs">
                                    CBD: 300MG
                                </p>
                            </div>
                        </div>

                        <div
                            className="flex flex-col justify-center items-center space-y-2 p-2 m-2 border rounded-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            onClick={() =>
                                window.open(
                                    "https://thegreenest.com/reviews/lord-jones-hemp-derived-cbd-tincture-full-spectrum-formula/",
                                    "_blank"
                                )
                            }
                        >
                            <div className="max-w-full h-50">
                                <Image
                                    src="/product3.jpeg"
                                    width={200}
                                    height={30}
                                    alt="Logo"
                                />
                            </div>
                            <p className="font-bold text-gray-700">$12.00</p>
                            <div className="bg-green-800 bg-opacity-80 p-1 inline-block rounded-xl">
                                <p className="text-white text-xs px-2">
                                    Staff Pick
                                </p>
                            </div>
                            <h1 className="font-bold">Hemp Tincture</h1>
                            <p className="text-gray-700 text-sm">Lord Jones</p>
                            <div className="flex flex-row space-x-2">
                                <p className="text-gray-900 text-xs">Hybrid</p>
                                <p className="text-gray-900 text-xs">
                                    CBD: 200MG
                                </p>
                            </div>
                        </div>

                        <div
                            className="flex flex-col justify-center items-center space-y-2 p-2 m-2 border rounded-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            onClick={() =>
                                window.open(
                                    "https://thegreenest.com/reviews/charlottes-web-cbd-gummies-sleep/",
                                    "_blank"
                                )
                            }
                        >
                            <div className="max-w-full h-50">
                                <Image
                                    src="/product4.jpeg"
                                    width={200}
                                    height={30}
                                    alt="Logo"
                                />
                            </div>
                            <p className="font-bold text-gray-700">$30.00</p>
                            <div className="bg-green-800 bg-opacity-80 p-1 inline-block rounded-xl">
                                <p className="text-white text-xs px-2">
                                    Staff Pick
                                </p>
                            </div>
                            <h1 className="font-bold">Raspberry Gummies</h1>
                            <p className="text-gray-700 text-sm">
                                Charlottes Web
                            </p>
                            <div className="flex flex-row space-x-2">
                                <p className="text-gray-900 text-xs">Hybrid</p>
                                <p className="text-gray-900 text-xs">
                                    CBD: 10MG
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full overflow-y-scroll space-y-5 pb-20 scrollbar-none">
                    {messages.map((message) => (
                        <div key={message.id} className="flex items-start px-5">
                            <div className="rounded-xl p-1 border flex items-center justify-center mr-3  ">
                                {message.role === "user" ? (
                                    <div className="">
                                        <PersonOutlineOutlinedIcon />
                                    </div>
                                ) : (
                                    <div className=" text-green-800">
                                        <GoogleIcon />
                                    </div>
                                )}
                            </div>
                            <div className="pt-1">
                                {isLoading && message.role === "assistant" && (
                                    <div className="animate-spin">
                                        <AcUnitIcon style={{ color: "gray" }} />
                                    </div>
                                )}
                                <div>{message.display}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-10 w-full bg-white  bg-opacity-60  px-3">
                <div className="grid grid-cols-2">
                    {messages.length === 0 && (
                        <>
                            <button
                                className="border py-3 mb-2 px-3 bg-custom-gray rounded-xl items-center  inline-flex hover:bg-gray-200 to-white hover:cursor-pointer shadow-sm"
                                onClick={() =>
                                    handlePromptClick(
                                        "What is the best product for me?"
                                    )
                                }
                            >
                                <AutoFixHighIcon />
                                <h1 className="ml-2 max-sm:text-xs">
                                    What is the best product for me?
                                </h1>
                            </button>
                            <button
                                className="border py-3 mb-2 ml-2 px-3 bg-custom-gray rounded-xl items-center inline-flex hover:bg-gray-200 to-white hover:cursor-pointer shadow-sm"
                                onClick={() =>
                                    handlePromptClick(
                                        "Show me the cheapest gummies"
                                    )
                                }
                            >
                                <AutoFixHighIcon />
                                <h1 className="ml-2 max-sm:text-xs">
                                    Show me the cheapest gummies
                                </h1>
                            </button>
                        </>
                    )}
                </div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setMessages((currentMessages) => [
                            ...currentMessages,
                            {
                                id: Date.now(),
                                display: <div>{inputValue}</div>,
                                role: "user",
                            },
                        ]);

                        const responseMessage = await submitUserMessage(
                            inputValue
                        );
                        setMessages((currentMessages) => [
                            ...currentMessages,
                            { ...responseMessage, role: "assistant" },
                        ]);
                        setInputValue("");
                    }}
                >
                    <input
                        className="bg-custom-gray w-full rounded-2xl py-5 px-5 outline-none"
                        placeholder="Send a message..."
                        value={inputValue}
                        onChange={(event) => {
                            setInputValue(event.target.value);
                        }}
                    />
                </form>
            </div>
        </div>
    );
}
