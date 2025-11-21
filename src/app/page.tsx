import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="h-screen bg-black flex items-center justify-center p-0 md:p-4 lg:p-8 overflow-hidden">
      <div className="w-full h-full md:w-full md:max-w-[400px] md:h-full md:max-h-[850px] bg-black md:border md:border-white/20 md:rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col">
        <ChatInterface />
      </div>
    </main>
  );
}
