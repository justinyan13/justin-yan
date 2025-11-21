"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Header() {
    return (
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center pt-12 pb-4 pointer-events-none">
            {/* Gradient Blur Background */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent backdrop-blur-xl -z-10"
                style={{
                    maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)"
                }}
            />

            <div className="absolute left-4 top-12 p-2 rounded-full bg-[#2C2C2E] text-[#007AFF] pointer-events-auto">
                <ChevronLeft size={24} />
            </div>

            <div className="flex flex-col items-center pointer-events-auto">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-800 shadow-lg z-20">
                    {/* Using the copied avatar image */}
                    <Image
                        src="/Justin-Yan-Round.png"
                        alt="Justin"
                        fill
                        className="object-cover"
                    />
                </div>
                <button className="relative z-10 -mt-1 ml-1 flex flex-col items-center justify-center px-3 pt-1 pb-1 rounded-[18px] text-white transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/15">
                    <div className="flex items-center space-x-1">
                        <span className="font-bold text-[17px] pl-2">Justin</span>
                        <ChevronRight size={14} className="text-white/50" strokeWidth={3} />
                    </div>
                    <span className="text-[12px] text-white/60 font-medium -mt-0.5">Vancouver BC</span>
                </button>
            </div>
        </div>
    );
}
