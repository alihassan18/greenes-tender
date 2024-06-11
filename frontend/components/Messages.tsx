"use client";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import { cn } from "@/lib/utils";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { spinner } from "./Spinner";

export const BotMessage = ({
    content,
    className,
}: {
    content: string | StreamableValue<string>;
    className?: string;
}) => {
    const text = useStreamableText(content);

    return (
        <div className={cn("group relative flex items-start", className)}>
            <div className="rounded-xl p-1 border flex items-center justify-center mr-3  ">
                <div className=" text-green-800 ">
                    <GoogleIcon />
                </div>
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        strong: ({ node, ...props }) => (
                            <strong className="font-bold" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc ml-4 mt-4" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal ml-4 mt-4" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                            <li className="mb-2" {...props} />
                        ),
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export function BotCard({
    children,
    showAvatar = true,
}: {
    children: React.ReactNode;
    showAvatar?: boolean;
}) {
    return (
        <div className="group relative flex items-start">
            <div className="rounded-xl p-1 border flex items-center justify-center mr-3  ">
                <div className=" text-green-800 ">
                    <GoogleIcon />
                </div>
            </div>
            <div className="ml-4 flex-1 pl-2">{children}</div>
        </div>
    );
}

export function UserMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="group relative flex items-start">
            <div className="rounded-xl p-1 border flex items-center justify-center mr-3">
                <PersonOutlineOutlinedIcon />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
                {children}
            </div>
        </div>
    );
}

export function SpinnerMessage() {
    return (
        <div className="group relative flex items-start ">
            <div className="rounded-xl p-1 border flex items-center justify-center mr-3  ">
                <div className=" text-green-800 ">
                    <GoogleIcon />
                </div>
            </div>
            <div className="ml-4 mt-1 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
                {spinner}
            </div>
        </div>
    );
}
