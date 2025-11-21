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
        <div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-xl pt-24"
            style={{
                maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)"
            }}
        >
            <div className="flex items-end space-x-3 max-w-3xl mx-auto">
                <button className="p-2 rounded-full bg-white/10 text-white/70 mb-1 hover:bg-white/20 transition-colors backdrop-blur-md">
                    <Plus size={24} />
                </button>

                <div className="flex-1 flex items-center bg-white/10 border border-white/10 backdrop-blur-md rounded-[20px] pl-4 pr-1 py-1">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        className="flex-1 bg-transparent text-white px-0 py-1.5 focus:outline-none resize-none h-[36px] leading-5 overflow-y-hidden overflow-x-auto whitespace-nowrap scrollbar-hide placeholder:text-white/30"
                    />
                    {input.trim().length > 0 && (
                        <motion.button
                            initial={{ scale: 0, width: 0 }}
                            animate={{ scale: 1, width: "auto" }}
                            onClick={handleSend}
                            className="p-1.5 rounded-full bg-[#007AFF] text-white ml-2 mr-1 flex-shrink-0"
                        >
                            <ArrowUp size={16} strokeWidth={3} />
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}
