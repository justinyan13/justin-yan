"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
    return (
        <div className="flex items-start space-x-2 max-w-[85%]">
            <div className="bg-[#2C2C2E] rounded-[18px] px-4 py-3 shadow-sm">
                <div className="flex space-x-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-[#8E8E93] rounded-full"
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
