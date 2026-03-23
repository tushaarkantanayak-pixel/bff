"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { FiArrowRight, FiZap, FiShield } from "react-icons/fi";

export default function GameCardList({ game, isOutOfStock, index = 0 }) {
  const disabled = isOutOfStock(game.gameName);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative flex items-center gap-4 sm:gap-6 p-3 sm:p-5 rounded-3xl transition-all duration-500
        ${disabled
            ? "opacity-50 grayscale cursor-not-allowed border border-[var(--border)] bg-[var(--card)]/30"
            : "bg-[var(--card)]/40 border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--card)] shadow-2xl"
          }`}
      >
        {/* Glow Element */}
        {!disabled && (
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-[var(--accent)]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}

        {/* IMAGE SECTION */}
        <div className="relative flex-shrink-0">
          <div className={`
            relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border transition-all duration-700
            ${disabled ? "border-[var(--border)]" : "border-[var(--border)] group-hover:border-[var(--accent)]/50 group-hover:scale-105"}
          `}>
             <Image
              src={game.gameImageId?.image || logo}
              alt={game.gameName}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover"
            />
          </div>
          
          {/* Badge on Image overlay */}
          {!disabled && (
            <div className="absolute -top-1.5 -right-1.5 bg-[var(--accent)] text-black p-1 rounded-lg shadow-lg z-20">
               <FiZap size={10} fill="currentColor" />
            </div>
          )}
        </div>

        {/* CONTENT SECTION - VERTICALLY CENTERED */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`text-sm sm:text-base font-black uppercase tracking-tight italic transition-all duration-500
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
            >
              {game.gameName}
            </h3>
            
            {/* Tag next to Title */}
            {!disabled && game.tagId && (
              <span
                className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border border-[var(--border)]"
                style={{
                  background: `${game.tagId.tagBackground}15`,
                  color: game.tagId.tagColor,
                }}
              >
                {game.tagId.tagName}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] opacity-60">
              <FiShield size={10} />
              {game.gameFrom}
            </span>
            <div className="w-1 h-1 rounded-full bg-[var(--muted)]/20" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[var(--accent)] opacity-80">
              Instant
            </span>
          </div>
        </div>

        {/* ACTION SECTION */}
        <div className="flex-shrink-0 flex items-center pr-1 sm:pr-2">
          {disabled ? (
            <span className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] font-black uppercase tracking-widest italic">
              Out of Stock
            </span>
          ) : (
            <div className={`
               w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500
               ${disabled 
                 ? "bg-[var(--card)]/50 text-[var(--muted)]/30" 
                 : "bg-[var(--accent)]/5 text-[var(--foreground)] border border-[var(--border)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_var(--accent)]/30"}
            `}>
               <FiArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          )}
        </div>

        {/* BOTTOM ACCENT BAR */}
        {!disabled && (
          <div className="absolute bottom-0 left-6 right-6 h-[2.5px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        )}
      </Link>
    </motion.div>
  );
}
