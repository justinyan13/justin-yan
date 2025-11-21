import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { stripMarkdown } from "@/lib/utils";

// Chat API route - handles Gemini AI integration
// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Build contents for the API
        // If there's history, build an array; otherwise use simple string format
        let contents: any;
        
        if (history && history.length > 0) {
            // Build conversation history array
            const contentsArray: any[] = [];
            
            history.forEach((msg: any) => {
                contentsArray.push({
                    role: msg.role === "user" ? "user" : "model",
                    parts: [{ text: msg.parts }],
                });
            });
            
            // Add the new user message
            contentsArray.push({
                role: "user",
                parts: [{ text: message }],
            });
            
            contents = contentsArray;
        } else {
            // Simple case: just the message as a string
            contents = message;
        }

        // Generate response using the new API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });

        let text = response.text || "";
        
        // Strip markdown formatting for clean iMessage-style display
        text = stripMarkdown(text);

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error("Error generating AI response:", error);
        const errorMessage = error?.message || error?.toString() || "Failed to generate response";
        console.error("Full error details:", {
            message: errorMessage,
            stack: error?.stack,
            status: error?.status,
            statusText: error?.statusText,
        });
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
