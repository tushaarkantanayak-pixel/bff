"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const emojis = [
  // Hearts
  "💗", "💖", "💞", "💕", "💘", "❤️", "🩷",

  // Flowers
  "🌹", "🌸", "🌺", "💐",

  // Cute
  "🧸", "🎀",

  // Romantic
  "💍", "💌", "💎",

  // Sparkle / Soft glow
  "✨", "💫", "🌟",

  // Love vibe
  "🥰", "😍"
];

export default function ValentineEffect() {
  const pathname = usePathname();

  // Show ONLY on home page "/"
  if (pathname !== "/") return null;

  const items = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const left = Math.random() * 100;
      const duration = 15 + Math.random() * 15;
      const delay = Math.random() * -30;
      const sizeType =
        Math.random() > 0.7
          ? "big"
          : Math.random() > 0.4
          ? "medium"
          : "small";

      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      return (
        <span
          key={i}
          className={`fall-item ${sizeType}`}
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          {emoji}
        </span>
      );
    });
  }, []);

  return <div className="hearts">{items}</div>;
}
