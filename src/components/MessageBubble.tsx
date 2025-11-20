"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";

interface MessageBubbleProps {
    message: Message;
    isLast: boolean;
}

export function MessageBubble({ message, isLast }: MessageBubbleProps) {
    const isUser = message.sender === "user";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "flex w-full mb-2",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[75%] px-5 py-2.5 rounded-[22px] text-[17px] leading-snug relative break-words",
                    isUser
                        ? "bg-[var(--bubble-user)] text-white rounded-br-md"
                        : "bg-[#3A3A3C] text-white rounded-bl-md"
                )}
            >
                {message.text}
                {/* Tail effect could be added here with SVG or pseudo-elements if needed for extreme realism */}
            </div>
        </motion.div >
    );
}
