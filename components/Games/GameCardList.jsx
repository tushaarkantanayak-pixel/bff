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
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.03,
        type: "spring",
        stiffness: 260,
        damping: 25
      }}
    >
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative flex items-center gap-5 p-4 rounded-3xl border transition-all duration-500
        ${disabled
            ? "opacity-50 grayscale cursor-not-allowed border-[var(--border)] bg-[var(--background)]/50"
            : "border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-xl hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 hover:translate-x-2 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)]"
          }`}
      >
        {/* AVATAR SYSTEM */}
        <div className="relative flex-shrink-0">
          <div className={`
            relative w-20 h-20 rounded-2xl overflow-hidden border-2 z-10
            ${disabled ? "border-[var(--muted)]" : "border-[var(--accent)]/20 group-hover:border-[var(--accent)] transition-colors duration-500"}
          `}>
            <Image
              src={game.gameImageId?.image || logo}
              alt={game.gameName}
              fill
              sizes="80px"
              className={`object-cover transition-transform duration-700
                ${disabled ? "" : "group-hover:scale-110 group-hover:rotate-2"}
              `}
            />
          </div>
          {/* Ambient Glow behind Image */}
          {!disabled && (
            <div className="absolute inset-0 bg-[var(--accent)] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          )}
        </div>

        {/* INFO SYSTEM */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 leading-none">
            <h3
              className={`text-sm sm:text-base font-black uppercase tracking-[0.05em] italic transition-colors
              ${disabled ? "text-[var(--muted)]" : "text-[var(--foreground)] group-hover:text-[var(--accent)]"}`}
            >
              {game.gameName}
            </h3>
            {!disabled && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="p-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)]"
              >
                <FiZap size={10} />
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <FiShield size={10} className="text-[var(--muted)]" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">{game.gameFrom}</p>
            </div>

            {!disabled && game.tagId && (
              <span
                className="text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/5 shadow-xl flex items-center gap-1.5"
                style={{
                  background: `${game.tagId.tagBackground}cc`,
                  color: game.tagId.tagColor,
                }}
              >
                {game.tagId.tagName === "Manual" && <FiZap size={10} fill="currentColor" />}
                {game.tagId.tagName}
              </span>
            )}
          </div>
        </div>

        {/* ACTION / STATUS SYSTEM */}
        <div className="flex flex-col items-end gap-2 pr-2">
          {disabled ? (
            <span className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest italic">
              Out of Stock
            </span>
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 transition-all group-hover:bg-[var(--accent)] group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]">
              <FiArrowRight size={18} />
            </div>
          )}
        </div>

        {/* HOVER GLOW BAR */}
        {!disabled && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2/3 bg-[var(--accent)] rounded-full transition-all duration-300 shadow-[0_0_10px_var(--accent)]" />
        )}
      </Link>
    </motion.div>
  );
}
