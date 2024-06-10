"use client";
import { useActions, useUIState } from "ai/rsc";

export default function StartCard(parameters: any) {
    const effects = [
        "Relaxation",
        "Pain relief",
        "Sleep",
        "Euphoria",
        "Anxiety",
    ];
    const { submitUserMessage } = useActions();
    const [messages, setMessages] = useUIState();

    return (
        <>
            <p>
                Here is a list of potential effects. Choose one to proceed to
                finding the right product.
            </p>
            <div className="mt-2 flex flex-wrap">
                {effects.map((effect, index) => (
                    <div
                        key={index}
                        className="p-2 m-2 bg-custom-gray rounded-xl hover:cursor-pointer inline-flex"
                        onClick={async () => {
                            try {
                                const response = await submitUserMessage(
                                    `The user has selected that they want to see products from this effect ${effect}`
                                );
                                console.log("Response:", response);

                                // Check if response is iterable
                                if (Array.isArray(response)) {
                                    setMessages((currentMessages: any[]) => [
                                        ...currentMessages,
                                        ...response,
                                    ]);
                                } else {
                                    setMessages((currentMessages: any[]) => [
                                        ...currentMessages,
                                        response,
                                    ]);
                                }
                            } catch (error) {
                                console.error(
                                    "Error submitting user message:",
                                    error
                                );
                            }
                        }}
                    >
                        <button className="text-sm text-gray-900">
                            {effect}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
