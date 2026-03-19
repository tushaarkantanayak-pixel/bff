"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazy load ChatBot to reduce initial bundle size
const ChatBot = dynamic(() => import("@/components/SocialFloat/Chatbot"), {
    ssr: false,
});

export default function ChatbotWrapper() {
    const pathname = usePathname();
    const isGamePage = pathname?.startsWith("/games/");

    if (isGamePage) return null;

    return <ChatBot />;
}
