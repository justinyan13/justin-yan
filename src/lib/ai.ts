import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;

if (!apiKey) {
    throw new Error("Google AI API key is not configured");
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface ChatMessage {
    role: "user" | "model";
    parts: string;
}

export async function generateAIResponse(
    userMessage: string,
    conversationHistory: ChatMessage[] = []
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Build conversation history
        const history = conversationHistory.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.parts }],
        }));

        const chat = model.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.9,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw new Error("Failed to generate AI response. Please try again.");
    }
}
