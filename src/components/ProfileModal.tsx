"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PERSONAL_DATA } from "@/lib/personal-data";
import Image from "next/image";

const GmailLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
    </svg>
);

const LinkedInLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5" />
    </svg>
);


interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#1C1C1E] rounded-[32px] p-6 w-full max-w-sm shadow-2xl pointer-events-auto relative overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Contact</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-[#2C2C2E] text-[#8E8E93] hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col items-center text-center mb-8">
                                {/* Profile Photo */}
                                <div className="relative w-24 h-24 mb-4">
                                    <Image
                                        src="/Justin-Yan-Round.png"
                                        alt={PERSONAL_DATA.name}
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>

                                {/* Name & Caption */}
                                <h3 className="text-2xl font-bold text-white mb-1">{PERSONAL_DATA.name}</h3>
                                <p className="text-[#8E8E93] text-lg">Student</p>
                            </div>

                            {/* Contact Links List */}
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${PERSONAL_DATA.contact.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-2xl bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
                                        <GmailLogo />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-white font-semibold">Gmail</span>
                                        <span className="text-[#8E8E93] text-sm">Email Me!</span>
                                    </div>
                                </a>

                                <a
                                    href={PERSONAL_DATA.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-2xl bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
                                        <LinkedInLogo />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-white font-semibold">LinkedIn</span>
                                        <span className="text-[#8E8E93] text-sm">Connect with me!</span>
                                    </div>
                                </a>

                                <a
                                    href={PERSONAL_DATA.contact.calendly}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 rounded-2xl bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden">
                                        <img
                                            src="/calendly.svg"
                                            alt="Calendly"
                                            className="w-6 h-6"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-white font-semibold">Calendly</span>
                                        <span className="text-[#8E8E93] text-sm">Book a coffee chat!</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
