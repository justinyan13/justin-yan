"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { MessageBubble } from "./MessageBubble";
import { InputArea } from "./InputArea";
import { Message } from "@/lib/types";

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        text: "Good afternoon! 😊",
        sender: "ai",
        timestamp: new Date(),
    },
];

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Mock AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm currently a mock AI. I'll be connected to real logic soon! But that's a great question.",
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-black text-white font-sans relative overflow-hidden">
            <Header />

            <div
                className="flex-1 overflow-y-auto pt-42 pb-24 px-4 space-y-4 scrollbar-hide"
                style={{
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, black 160px, black 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, black 160px, black 100%)"
                }}
            >
                <div className="text-center text-[#8E8E93] text-[15px] font-medium mb-2">
                    Today {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>

                {messages.map((msg, index) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isLast={index === messages.length - 1}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <InputArea onSendMessage={handleSendMessage} />
        </div>
    );
}
