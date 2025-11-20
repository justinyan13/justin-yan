"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface InputAreaProps {
    onSendMessage: (text: string) => void;
}

export function InputArea({ onSendMessage }: InputAreaProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
            <div className="flex items-end space-x-3 max-w-3xl mx-auto">
                <button className="p-2 rounded-full bg-[#2C2C2E] text-[#8E8E93] mb-1">
                    <Plus size={24} />
                </button>

                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        className="w-full bg-[#1C1C1E] text-white rounded-[20px] px-4 py-2.5 pr-14 focus:outline-none resize-none h-[36px] leading-5 overflow-y-hidden overflow-x-auto whitespace-nowrap"
                    />
                    {input.trim().length > 0 && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#007AFF] text-white"
                        >
                            <ArrowUp size={16} strokeWidth={3} />
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}
