"use client";

import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Link from "next/link";

interface ApiData {
    id: number;
    product_name: string;
    strain_type: string;
    brand_name: string;
    cbd: string;
    price: string;
    dispensary: string;
    description: string;
    explanation: string;
    image: string;
    sales: string;
}

function Skeleton() {
    return (
        <>
            {[...Array(9)].map((_, index) => (
                <div
                    key={index}
                    className="flex flex-row border-b pt-2 pb-5 mt-5 space-x-5 px-5 items-center"
                >
                    <div className="w-20 h-20 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                    <div className="flex w-full space-y-1 flex-col">
                        <div className="w-20 h-4 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                        <div className="w-[350px] h-5 bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                        <div className="flex  pt-2 row items-center space-x-5">
                            <div className="w-[70px] h-6 bg-gray-300 bg-opacity-50 rounded-full animate-pulse"></div>
                            <div className="w-[70px] h-6 bg-gray-300 bg-opacity-50 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="w-[70px] h-[60px] bg-gray-300 bg-opacity-50 rounded-xl animate-pulse"></div>
                </div>
            ))}
        </>
    );
}

export default function FullList() {
    const [data, setData] = useState<ApiData[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedDispensaries, setSelectedDispensaries] = useState<string[]>(
        []
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAllTypes, setShowAllTypes] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showAllDispensaries, setShowAllDispensaries] = useState(false);

    const handleSort = (sortType: string) => {
        let sortedData: ApiData[];
        if (sortType === "lowToHigh") {
            sortedData = [...filteredData].sort((a, b) => {
                const priceA =
                    a.sales && a.sales !== "null"
                        ? parseFloat(a.sales)
                        : parseFloat(a.price);
                const priceB =
                    b.sales && b.sales !== "null"
                        ? parseFloat(b.sales)
                        : parseFloat(b.price);
                return priceA - priceB;
            });
        } else if (sortType === "highToLow") {
            sortedData = [...filteredData].sort((a, b) => {
                const priceA =
                    a.sales && a.sales !== "null"
                        ? parseFloat(a.sales)
                        : parseFloat(a.price);
                const priceB =
                    b.sales && b.sales !== "null"
                        ? parseFloat(b.sales)
                        : parseFloat(b.price);
                return priceB - priceA;
            });
        } else {
            sortedData = filteredData;
        }
        setData(sortedData);
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
                );
                const jsonData = await response.json();
                console.log("API Response:", jsonData);
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleTypeChange = (type: string) => {
        const updatedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter((t) => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(updatedTypes);
    };

    const handleBrandChange = (brand: string) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((b) => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(updatedBrands);
    };

    const handleDispensaryChange = (dispensary: string) => {
        const updatedDispensaries = selectedDispensaries.includes(dispensary)
            ? selectedDispensaries.filter((d) => d !== dispensary)
            : [...selectedDispensaries, dispensary];
        setSelectedDispensaries(updatedDispensaries);
    };

    const filteredData = data.filter((product) => {
        const typeMatch =
            selectedTypes.length === 0 ||
            selectedTypes.includes(product.strain_type);
        const brandMatch =
            selectedBrands.length === 0 ||
            selectedBrands.includes(product.brand_name);
        const dispensaryMatch =
            selectedDispensaries.length === 0 ||
            selectedDispensaries.includes(product.dispensary);
        return typeMatch && brandMatch && dispensaryMatch;
    });

    const types = [...new Set(data.map((product) => product.strain_type))];
    const brands = [...new Set(data.map((product) => product.brand_name))];
    const dispensaries = [
        ...new Set(data.map((product) => product.dispensary)),
    ];

    return (
        <div className="flex flex-row max-w-[50rem] mx-auto border-red-500">
            <div className="w-60 border-r space-y-10 pt-10 px-3 lg:flex flex-col sticky top-0 h-screen overflow-y-auto max-sm:hidden ">
                <div className="flex flex-col border-b pb-5 space-y-2">
                    <p className="text-sm font-bold">Types</p>
                    {types
                        .slice(0, showAllTypes ? types.length : 5)
                        .filter((type) => type !== "N/A")
                        .map((type) => (
                            <div
                                key={type}
                                className="flex items-center cursor-pointer justify-between"
                                onClick={() => handleTypeChange(type)}
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`h-3 w-3 rounded border border-gray-400 ${
                                            selectedTypes.includes(type)
                                                ? "bg-green-700"
                                                : "white"
                                        }`}
                                    ></div>
                                    <p className="text-xs">{type}</p>
                                </div>
                                <div className="bg-gray-200 h-6 w-6 flex items-center justify-center opacity-50 p-1 rounded">
                                    <p className="text-xs">
                                        {
                                            data.filter(
                                                (product) =>
                                                    product.strain_type === type
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    {types.length > 5 && (
                        <button
                            onClick={() => setShowAllTypes(!showAllTypes)}
                            className="text-xs text-green-700"
                        >
                            {showAllTypes ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>

                <div className="flex flex-col border-b pb-5 space-y-2">
                    <p className="text-sm font-bold">Brands</p>
                    {brands
                        .slice(0, showAllBrands ? brands.length : 5)
                        .filter((brand) => brand !== "N/A")
                        .map((brand) => (
                            <div
                                key={brand}
                                className="flex items-center cursor-pointer justify-between"
                                onClick={() => handleBrandChange(brand)}
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`h-3 w-3 rounded border border-gray-400 ${
                                            selectedBrands.includes(brand)
                                                ? "bg-green-700"
                                                : "white"
                                        }`}
                                    ></div>
                                    <p className="text-xs">{brand}</p>
                                </div>
                                <div className="bg-gray-200 h-6 w-6 flex items-center justify-center opacity-50 p-1 rounded">
                                    <p className="text-xs">
                                        {
                                            data.filter(
                                                (product) =>
                                                    product.brand_name === brand
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    {brands.length > 5 && (
                        <button
                            onClick={() => setShowAllBrands(!showAllBrands)}
                            className="text-xs text-green-700"
                        >
                            {showAllBrands ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>

                <div className="flex flex-col border-b pb-5 space-y-2">
                    <p className="text-sm font-bold">Dispensaries</p>
                    {dispensaries
                        .slice(0, showAllDispensaries ? dispensaries.length : 5)
                        .filter((dispensary) => dispensary !== "N/A")
                        .map((dispensary) => (
                            <div
                                key={dispensary}
                                className="flex items-center cursor-pointer  justify-between"
                                onClick={() =>
                                    handleDispensaryChange(dispensary)
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <div
                                        className={`h-3 w-3 rounded border border-gray-400 ${
                                            selectedDispensaries.includes(
                                                dispensary
                                            )
                                                ? "bg-green-700"
                                                : "white"
                                        }`}
                                    ></div>
                                    <p className="text-xs">
                                        {dispensary.length > 15
                                            ? `${dispensary.substring(
                                                  0,
                                                  15
                                              )}...`
                                            : dispensary}
                                    </p>
                                </div>
                                <div className="bg-gray-200 h-6 w-6 flex items-center justify-center opacity-50 p-1 rounded">
                                    <p className="text-xs">
                                        {
                                            data.filter(
                                                (product) =>
                                                    product.dispensary ===
                                                    dispensary
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    {dispensaries.length > 5 && (
                        <button
                            onClick={() =>
                                setShowAllDispensaries(!showAllDispensaries)
                            }
                            className="text-xs text-green-700"
                        >
                            {showAllDispensaries ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col w-full">
            <div className="flex sm:justify-end justify-center sm:space-x-3 space-x-1 p-4 items-center sticky top-0 bg-white z-10 rounded-md">
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
                <div className="flex pt-8 items-center pb-3 row border-b w-full  px-4">
                    <h2 className="font-bold text-lg w-full ml-3">All CBD</h2>
                    <div className="flex flex-row space-x-2 ">
                        <div className="flex flex-row space-x-2">
                            <div
                                className="border flex items-center flex-nowrap  flex-row rounded-xl cursor-pointer px-2 py-1 relative"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <h1 className="text-sm whitespace-nowrap">
                                    Sort By
                                </h1>
                                {showDropdown ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                                {showDropdown && (
                                    <div className="absolute top-full mt-2 right-0 bg-white z-10 w-[175px] py-2 rounded-xl  shadow-md">
                                        <p className="font-bold text-gray-600 text-xs ml-3 opacity-50">
                                            Sort
                                        </p>
                                        <div
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() =>
                                                handleSort("lowToHigh")
                                            }
                                        >
                                            <p className="text-xs">
                                                Price: Low to High
                                            </p>
                                        </div>
                                        <div
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() =>
                                                handleSort("highToLow")
                                            }
                                        >
                                            <p className="text-xs">
                                                Price: High to Low
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Skeleton />
                ) : (
                    <ul className="space-y-2  ">
                        {filteredData.map((productInfo) => (
                            <li key={productInfo.id} className="border-b p-4 ">
                                <div className="flex flex-row space-x-5 items-center">
                                    <img
                                        src={productInfo.image}
                                        alt={`${productInfo.product_name}`}
                                        className="w-20  h-20 object-contain rounded-xl "
                                    />
                                    <div className="flex w-full space-y-1  flex-col">
                                        <div className="flex flex-row space-x-2 items-center">
                                            <p className="md:text-sm text-[10px] text-gray-600 ">
                                                {productInfo.brand_name}
                                            </p>
                                            <p> - </p>
                                            <p className="md:text-xs text-[9px] text-gray-400">
                                                {productInfo.dispensary}
                                            </p>
                                        </div>
                                        <h2 className="md:text-sm text-[10px] font-semibold">
                                            {productInfo.product_name}
                                        </h2>
                                        <div className="flex row items-center space-x-5">
                                            {productInfo.strain_type !==
                                                "N/A" && (
                                                <div className="bg-custom-gray p-2 rounded-full">
                                                    <p className="md:text-xs text-[8px] opacity-80">
                                                        {
                                                            productInfo.strain_type
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                            {productInfo.cbd &&
                                                productInfo.cbd !== "0" && (
                                                    <p className="md:text-xs text-[9px] opacity-50">
                                                        CBD: {productInfo.cbd}mg
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                    <div className="bg-custom-gray shadow-sm w-40 h-20 rounded-xl text-center flex items-center justify-center">
                                        {productInfo.sales &&
                                        productInfo.sales !== "null" ? (
                                            <div className="flex flex-col ">
                                                <p className="mx-10  opacity-20 line-through">
                                                    ${productInfo.price}
                                                </p>
                                                <p className="mx-10 mb-2 text-sm font-bold">
                                                    ${productInfo.sales}
                                                </p>
                                                <div className="bg-green-200">
                                                    <p className="text-xs">
                                                        {(
                                                            (1 -
                                                                parseFloat(
                                                                    productInfo.sales
                                                                ) /
                                                                    parseFloat(
                                                                        productInfo.price
                                                                    )) *
                                                            100
                                                        ).toFixed(0)}
                                                        % off
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="font-bold text-sm">
                                                ${productInfo.price}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
