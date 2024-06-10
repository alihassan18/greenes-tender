import { StreamableValue, useStreamableValue } from "ai/rsc";
import { useStreamableText } from "@/lib/hooks/use-streamable-text";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const BotMessage = ({
    content,
    className,
}: {
    content: string | StreamableValue<string>;
    className?: string;
}) => {
    const text = useStreamableText(content);

    return (
        <div>
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
    );
};
