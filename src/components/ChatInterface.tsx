"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { MessageBubble } from "./MessageBubble";
import { InputArea } from "./InputArea";
import { TypingIndicator } from "./TypingIndicator";
import { Message } from "@/lib/types";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning! ☀️";
    if (hour < 18) return "Good Afternoon! 🍱";
    return "Good Evening! 🌚";
};

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set initial greeting and time on mount to avoid hydration mismatch
        const greeting = getGreeting();
        setMessages([
            {
                id: "1",
                text: greeting,
                sender: "ai",
                timestamp: new Date(),
            },
        ]);
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // Convert message history to AI format, excluding the initial AI greeting
            // Google AI requires history to start with a user message
            const conversationHistory = messages
                .filter((msg) => msg.id !== "1") // Exclude initial greeting
                .map((msg) => ({
                    role: msg.sender === "user" ? "user" : "model",
                    parts: msg.text,
                }));

            // Call API route instead of importing AI module directly
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                    history: conversationHistory,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: Failed to get AI response`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: "ai",
                timestamp: new Date(),
            };
            setIsTyping(false);
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            console.error("Error getting AI response:", error);
            const errorText = error?.message || "Sorry, I'm having trouble connecting right now. Please try again.";
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: errorText,
                sender: "ai",
                timestamp: new Date(),
            };
            setIsTyping(false);
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <div className="flex flex-col h-full bg-black text-white font-sans relative overflow-hidden safe-area-inset">
            <Header />

            <div
                className="flex-1 overflow-y-auto pt-[168px] pb-24 md:pt-42 px-3 md:px-4 space-y-4 scrollbar-hide"
                style={{
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, black 160px, black 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, black 160px, black 100%)",
                    paddingBottom: "calc(env(safe-area-inset-bottom) + 6rem)"
                }}
            >
                <div className="text-center text-[#8E8E93] text-[15px] font-medium mb-2">
                    Today {currentTime}
                </div>

                {messages.map((msg, index) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isLast={index === messages.length - 1}
                    />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            <InputArea onSendMessage={handleSendMessage} />
        </div>
    );
}
