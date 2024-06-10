"use client";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Image from "next/image";
import AcUnitIcon from "@mui/icons-material/AcUnit";

interface ProductInfo {
    product_name: string;
    dispensary: string;
    mg_content?: string;
    price: string;
    strain_type: string;
    brand_name: string;
    description: string;
    image: string;
}

function CheckoutForm({
    productInfo,
    quantity,
    totalPrice,
}: {
    productInfo: ProductInfo;
    quantity: number;
    totalPrice: string;
}) {
    const [promoCode, setPromoCode] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
    const [discountAmount, setDiscountAmount] = useState("0.00");
    const [orderStatus, setOrderStatus] = useState<
        "pending" | "success" | null
    >(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handlePromoCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPromoCode(event.target.value);
    };

    const applyDiscount = () => {
        if (promoCode.toUpperCase() === "GREEN") {
            const originalPrice = parseFloat(totalPrice);
            const discount = originalPrice * 0.5;
            const discounted = (originalPrice - discount).toFixed(2);
            setDiscountAmount(discount.toFixed(2));
            setDiscountedPrice(discounted);
        } else {
            setDiscountAmount("0.00");
            setDiscountedPrice(totalPrice);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName || !mobilePhone || !birthdate) {
            alert("Please fill in all the required fields.");
            return;
        }
        setOrderStatus("pending");
        // Simulate an async order placement
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setOrderStatus("success");
    };

    return (
        <div className="grid grid-cols-2 space-x-5 border rounded-xl p-5">
            <div>
                <h2 className="text-xl font-bold ">Checkout</h2>
                <h1 className=" text-gray-700 mb-2">
                    {productInfo.dispensary}
                </h1>
                {orderStatus === null && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="block mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="border border-gray-300 rounded-xl px-2 py-1 w-full outline-none"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="block mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="border border-gray-300 rounded-xl px-2 py-1 w-full outline-none"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobilePhone" className="block mb-1">
                                Mobile Phone
                            </label>
                            <input
                                type="tel"
                                id="mobilePhone"
                                className="border border-gray-300 rounded-xl px-2 py-1 w-full outline-none"
                                value={mobilePhone}
                                onChange={(e) => setMobilePhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="block mb-1">
                                Birthdate
                            </label>
                            <input
                                type="date"
                                id="birthdate"
                                className="border border-gray-300 rounded-xl px-2 py-1 w-full outline-none"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-black mt-3 text-white rounded-xl px-4 py-2"
                        >
                            Place Order
                        </button>
                    </form>
                )}
                {orderStatus === "pending" && (
                    <div className="flex flex-col items-center">
                        <div className="mb-4">
                            <div className="animate-spin">
                                <AcUnitIcon style={{ color: "gray" }} />
                            </div>
                        </div>
                        <p className="text-lg">
                            Please wait while we place your order...
                        </p>
                    </div>
                )}
                {orderStatus === "success" && (
                    <div className="flex items-center">
                        <div>
                            <div className="flex flex-row items-center mb-3">
                                <h2 className="text-2xl font-bold mr-2">
                                    Order Confirmation
                                </h2>
                                <div className="ml-4">
                                    <img
                                        src="/success.webp"
                                        width={35}
                                        height={35}
                                        alt="Order Confirmation"
                                    />
                                </div>
                            </div>
                            <p className="mb-4">Your order was successful!</p>
                            <p className="mb-4">
                                You will receive a text confirmation shortly.
                                You can pick up your product at{" "}
                                <strong>{productInfo.dispensary}</strong>{" "}
                                located at 123 Main St, Anytown, USA. Please
                                bring a valid ID.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-custom-gray p-5 rounded-xl flex-col shadow-sm">
                <div className="flex flex-col items-center space-y-3 border-b pb-3">
                    <img
                        src={productInfo.image}
                        alt={`${productInfo.image}`}
                        className="w-24 h-24 object-contain rounded-xl"
                    />
                </div>
                <div className="mt-3">
                    <div className="flex justify-between">
                        <p className="text-sm opacity-50">x{quantity}</p>
                        <p className="text-xs text-center">
                            {productInfo.product_name.length > 18
                                ? `${productInfo.product_name.substring(
                                      0,
                                      18
                                  )}... `
                                : productInfo.product_name}
                        </p>
                        <p className="text-sm text-center">${totalPrice}</p>
                    </div>
                    {discountAmount !== "0.00" && (
                        <div className="flex flex-row space-x-7 items-center mt-2 justify-end">
                            <p className="text-sm text-center font-bold text-gray-700">
                                Promo Code ({promoCode})
                            </p>
                            <p className="text-sm">-${discountAmount}</p>
                        </div>
                    )}
                    {orderStatus !== "success" && (
                        <div className="mt-14">
                            <div className="flex">
                                <input
                                    type="text"
                                    id="promoCode"
                                    placeholder="Promo Code"
                                    className="border-l border-t border-b border-gray-300 rounded-lg px-2 py-1 w-full outline-none"
                                    value={promoCode}
                                    onChange={handlePromoCodeChange}
                                />
                                <button
                                    className="text-black border-b border-t border-r border-gray-300 bg-white rounded-lg px-2 text-sm py-1"
                                    onClick={applyDiscount}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="border-t mt-5 pt-2 flex flex-row justify-between items-center">
                        <p className="font-bold text-gray-600">ORDER TOTAL:</p>
                        <p className="font-bold text-gray-600">
                            ${discountedPrice}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutCard({
    productInfo,
}: {
    productInfo: ProductInfo;
}) {
    const [quantity, setQuantity] = useState(1);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const { submitUserMessage } = useActions();
    const [messages, setMessages] = useUIState();

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setQuantity(parseInt(event.target.value));
    };

    const totalPrice = (
        parseFloat(productInfo.price.replace(/[^0-9.-]+/g, "")) * quantity
    ).toFixed(2);

    return (
        <>
            {!showCheckoutForm && (
                <>
                    <div className="flex flex row items-center  border mx-auto rounded-xl ">
                        <div className="flex flex-col p-5 space-y-3 w-full">
                            <p className="text-gray-500">
                                {productInfo.brand_name}
                            </p>
                            <p className="font-bold text-xl">
                                {productInfo.product_name}
                            </p>
                            <p className="text-l text-green-800 font-bold">
                                {productInfo.price}
                            </p>
                            <div className="flex flex-row">
                                <label
                                    htmlFor="quantity"
                                    className="text-gray-500"
                                ></label>
                                <select
                                    id="quantity"
                                    className="border border-gray-300 rounded-xl mr-5 outline-none px-2 py-1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                >
                                    {[...Array(10)].map((_, index) => (
                                        <option
                                            key={index + 1}
                                            value={index + 1}
                                        >
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className="bg-black rounded-full p-3"
                                    onClick={() => setShowCheckoutForm(true)}
                                >
                                    <h1 className="text-white text-sm ">
                                        Proceed to Checkout ${totalPrice}
                                    </h1>
                                </button>
                            </div>
                        </div>
                        <img
                            src={productInfo.image}
                            alt={`${productInfo.image}`}
                            className="w-24 h-24 object-contain rounded-xl"
                        />
                    </div>
                    <div className="flex space-x-4 mt-5">
                        <div
                            className="bg-custom-gray py-3 px-3 rounded-xl items-center inline-flex hover:bg-gray-200 hover:cursor-pointer"
                            onClick={async () => {
                                const response = await submitUserMessage(
                                    `The user wants to buy show more details about this product. Call this function "product_details" Here is the Product: ${JSON.stringify(
                                        productInfo
                                    )}`
                                );
                                setMessages((currentMessages: any[]) => [
                                    ...currentMessages,
                                    response,
                                ]);
                            }}
                        >
                            <InfoOutlinedIcon />
                            <p className="text-s ml-2">Show Details</p>
                        </div>
                        <div
                            className="bg-custom-gray py-3 px-3 rounded-xl items-center inline-flex hover:bg-gray-200 hover:cursor-pointer"
                            onClick={async () => {
                                const response = await submitUserMessage(
                                    `The user wants you to recommend them another product`
                                );
                                setMessages((currentMessages: any[]) => [
                                    ...currentMessages,
                                    response,
                                ]);
                            }}
                        >
                            <AutoAwesomeIcon style={{ fontSize: "20px" }} />
                            <p className="text-s ml-2">
                                Recommend another product
                            </p>
                        </div>
                    </div>
                </>
            )}
            {showCheckoutForm && (
                <CheckoutForm
                    productInfo={productInfo}
                    quantity={quantity}
                    totalPrice={totalPrice}
                />
            )}
        </>
    );
}
