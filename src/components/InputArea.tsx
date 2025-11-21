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
        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    };

    useEffect(() => {
        // Reset textarea height when input is cleared
        if (textareaRef.current && !input) {
            textareaRef.current.style.height = "auto";
        }
    }, [input]);

    return (
        <div
            className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-xl pt-20 md:pt-24"
            style={{
                maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)"
            }}
        >
            <div className="flex items-end space-x-2 md:space-x-3 max-w-3xl mx-auto">
                <button className="p-2 rounded-full bg-white/10 text-white/70 mb-1 active:bg-white/20 transition-colors backdrop-blur-md touch-manipulation flex-shrink-0">
                    <Plus size={20} className="md:w-6 md:h-6" />
                </button>

                <div className="flex-1 flex items-center bg-white/10 border border-white/10 backdrop-blur-md rounded-[20px] pl-3 md:pl-4 pr-1 py-1 min-h-[44px]">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        className="flex-1 bg-transparent text-white px-0 py-1.5 focus:outline-none resize-none min-h-[36px] max-h-[120px] leading-5 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words scrollbar-hide placeholder:text-white/30 text-[17px] touch-manipulation"
                        placeholder="Message"
                    />
                    {input.trim().length > 0 && (
                        <motion.button
                            initial={{ scale: 0, width: 0 }}
                            animate={{ scale: 1, width: "auto" }}
                            onClick={handleSend}
                            className="p-1.5 rounded-full bg-[#007AFF] text-white ml-2 mr-1 flex-shrink-0 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
                        >
                            <ArrowUp size={16} strokeWidth={3} />
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}
