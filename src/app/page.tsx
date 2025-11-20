import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="h-screen bg-black flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="w-full max-w-[400px] h-full max-h-[850px] bg-black border border-white/20 rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col">
        <ChatInterface />
      </div>
    </main>
  );
}
