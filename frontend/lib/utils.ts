import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}
export const runAsyncFnWithoutBlocking = (
    fn: (...args: any) => Promise<any>
) => {
    fn();
};

export const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    7
); // 7-character random string

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init);

    if (!res.ok) {
        const json = await res.json();
        if (json.error) {
            const error = new Error(json.error) as Error & {
                status: number;
            };
            error.status = res.status;
            throw error;
        } else {
            throw new Error("An unexpected error occurred");
        }
    }

    return res.json();
}
