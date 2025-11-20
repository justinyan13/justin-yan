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
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        // Auto-resize
        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
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
                        placeholder="iMessage"
                        rows={1}
                        className="w-full bg-[#1C1C1E] text-white rounded-[20px] px-4 py-2 pr-10 focus:outline-none resize-none min-h-[36px] max-h-[120px] leading-6 border border-white/10"
                    />
                    {input.trim().length > 0 && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={handleSend}
                            className="absolute right-1 bottom-1 p-1.5 rounded-full bg-[#007AFF] text-white"
                        >
                            <ArrowUp size={16} strokeWidth={3} />
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}
