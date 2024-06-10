"use client";

import { useState } from "react";
import PowerIcon from "@mui/icons-material/Power";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Link from "next/link";

export default function Settings() {
    const [plugMode, setPlugMode] = useState(false);
    const [anyCBD, setAnyCBD] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<
        {
            price: string;
            cbdContent: string;
            strain: string;
            productType: string;
        }[]
    >([]);
    const [newProduct, setNewProduct] = useState({
        price: "",
        cbdContent: "",
        strain: "Sativa",
        productType: "Gummies",
    });

    const handleCBDToggle = () => {
        setAnyCBD(!anyCBD);
        setNewProduct({ ...newProduct, cbdContent: anyCBD ? "" : "Any" });
    };

    const handleAddProduct = () => {
        // Check if all fields in newProduct are filled
        const allFieldsFilled = Object.values(newProduct).every(
            (field) => field !== ""
        );

        if (allFieldsFilled) {
            setSelectedProducts([...selectedProducts, newProduct]);
            setNewProduct({
                price: "",
                cbdContent: "",
                strain: "Any",
                productType: "Gummies",
            });
        } else {
            alert("Please fill out all fields before adding a product.");
        }
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts.splice(index, 1);
        setSelectedProducts(updatedProducts);
    };

    return (
        <>
            <div className="flex justify-end space-x-3 p-4  items-center max-w-[50rem] mx-auto rounded-md">
                <Link href="/">
                    <div className="flex flex-row items-center py-2 px-2 w-[100px] justify-center rounded-full border border-gray-400 ">
                        <p className="relative left-0 right-0 text-gray-800 text-sm flex items-center justify-center">
                            Chat
                        </p>
                    </div>
                </Link>

                <Link href="/settings">
                    <div className="flex flex-row items-center py-2 px-2 w-[100px] justify-center rounded-full border bg-custom-gray op border-black ">
                        <AcUnitIcon
                            style={{ fontSize: "20px", color: "green" }}
                        />

                        <p className="text-gray-800 text-sm">Customize</p>
                    </div>
                </Link>
                <Link href="/products">
                    <div className="flex flex-row items-center py-2 px-2 w-[100px] justify-center rounded-full border border-gray-400 ">
                        <p className="text-gray-800 text-sm">Browse</p>
                    </div>
                </Link>
            </div>
            <div className="max-w-4xl mx-auto px-8">
                <div className="bg-white rounded-lg p-6">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="bg-custom-gray appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="bg-custom-gray appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phone"
                        >
                            Phone (Optional)
                        </label>
                        <input
                            className="bg-custom-gray appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="tel"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block  text-sm  mb-2" htmlFor="phone">
                            <p className="font-bold text-gray-700"> Context</p>
                            <p className="text-sm text-gray-400">
                                {" "}
                                Let us know anything that might help us better
                                select your ideal product
                            </p>
                        </label>
                        <textarea
                            className="bg-custom-gray appearance-none border rounded-xl h-20 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="context"
                            placeholder="What are you looking for?"
                        />{" "}
                    </div>
                    <div className="mb-6">
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={plugMode}
                                onChange={() => setPlugMode(!plugMode)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                            <span className="ml-3 text-md font-medium text-gray-900 dark:text-gray-300">
                                Plug Mode
                            </span>
                            <PowerIcon />
                        </label>
                        <p className="opacity-60  w-full">
                            {" "}
                            Never miss out on your favorite products again! With
                            Plug Mode, simply toggle it on and enter the
                            specific product you&apos;re looking for. Our AI
                            Budtender will keep an eye out and notify you as
                            soon as the product becomes available. Stay in the
                            loop and get exactly what you need, when you need
                            it.
                        </p>
                    </div>
                    {plugMode && (
                        <div className="p-6 bg-white border rounded-xl mb-6">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                                Products
                            </h2>
                            {selectedProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="mb-4 p-4 flex flex-row justify-between border-b border-gray-200"
                                >
                                    <div className="flex flex-row space-x-5">
                                        <p className="text-gray-700">
                                            <div className="flex flex-col">
                                                <span className="font-medium ">
                                                    {" "}
                                                    Product Type:
                                                </span>{" "}
                                                {product.productType}
                                            </div>
                                        </p>
                                        <p className="text-gray-700">
                                            <div className="flex flex-col">
                                                <span className="font-medium ">
                                                    {" "}
                                                    Price:
                                                </span>{" "}
                                                ${product.price}
                                            </div>
                                        </p>
                                        <p className="text-gray-700">
                                            <div className="flex flex-col">
                                                <span className="font-medium ">
                                                    {" "}
                                                    CBD:
                                                </span>{" "}
                                                {product.cbdContent}
                                            </div>
                                        </p>
                                        <p className="text-gray-700">
                                            <div className="flex flex-col">
                                                <span className="font-medium ">
                                                    {" "}
                                                    Strain:
                                                </span>{" "}
                                                {product.strain}
                                            </div>
                                        </p>
                                    </div>
                                    <button
                                        className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                                        onClick={() =>
                                            handleRemoveProduct(index)
                                        }
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </button>
                                </div>
                            ))}

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="productType"
                                >
                                    Product Type
                                </label>
                                <select
                                    className="border rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    id="productType"
                                    value={newProduct.productType}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            productType: e.target.value,
                                        })
                                    }
                                >
                                    <option>Gummies</option>
                                    <option>Oils</option>
                                    <option>Vape</option>
                                    <option>Flower</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    className=" appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    id="price"
                                    type="number"
                                    placeholder="Max Price"
                                    min="0"
                                    value={newProduct.price}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            price: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="cbdContent"
                                >
                                    CBD Content (%)
                                </label>
                                <input
                                    className=" appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    id="cbdContent"
                                    type="number"
                                    placeholder="Min CBD"
                                    min="0"
                                    value={newProduct.cbdContent}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            cbdContent: e.target.value,
                                        })
                                    }
                                    disabled={anyCBD}
                                />
                                <label className="inline-flex relative items-center mt-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={anyCBD}
                                        onChange={handleCBDToggle}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer  dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                                    <span className="ml-3 text-md font-medium text-gray-900 dark:text-gray-300">
                                        Any CBD Content
                                    </span>
                                </label>
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="strain"
                                >
                                    Strain
                                </label>
                                <select
                                    className=" border rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    id="strain"
                                    value={newProduct.strain}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            strain: e.target.value,
                                        })
                                    }
                                >
                                    <option>Any</option>
                                    <option>Sativa</option>
                                    <option>Indica</option>
                                    <option>Hybrid</option>
                                </select>
                            </div>
                            <button
                                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                onClick={handleAddProduct}
                            >
                                <AddIcon fontSize="small" className="mr-1" />
                                Add Product
                            </button>
                        </div>
                    )}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
                            type="button"
                        >
                            Save
                        </button>
                        <button
                            className="bg-transparent hover:bg-red-500 rounded-xl text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
