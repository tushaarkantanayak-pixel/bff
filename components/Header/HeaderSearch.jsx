"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiZap, FiTarget, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderSearch({ className = "max-w-md mx-4 hidden lg:block", autoFocus = false, onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchGames = async () => {
        if (allGames.length > 0) return;
        setLoading(true);
        try {
            const res = await fetch("/api/games");
            const data = await res.json();
            if (data.success && data.data) {
                const games = data.data.games || [];
                const otts = data.data.otts?.items?.map(i => ({ ...i, isOtt: true })) || [];
                const memberships = data.data.memberships?.items?.map(i => ({ ...i, isMembership: true })) || [];
                setAllGames([...games, ...otts, ...memberships]);
            }
        } catch (err) {
            console.error("Failed to fetch games for search:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query.trim().length > 0) {
            const q = query.toLowerCase();
            const filtered = allGames.filter(g => {
                const name = (g.gameName || g.name || "").toLowerCase();
                const slug = (g.gameSlug || g.slug || "").toLowerCase();
                return name.includes(q) || slug.includes(q);
            }).slice(0, 8);
            setResults(filtered);
        } else {
            setResults([]);
        }
        setSelectedIndex(-1);
    }, [query, allGames]);

    const handleFocus = () => {
        setIsFocused(true);
        fetchGames();
    };

    const handleSelect = (slug, type) => {
        let path = "/games";
        if (type === "ott") path = "/games/ott";
        else if (type === "membership") path = "/games/membership";

        router.push(`${path}/${slug}`);
        setQuery("");
        setIsFocused(false);
        if (onClose) onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0 && results[selectedIndex]) {
                const item = results[selectedIndex];
                handleSelect(item.gameSlug || item.slug, item.isOtt ? 'ott' : item.isMembership ? 'membership' : 'game');
            } else if (query.trim()) {
                router.push(`/games?q=${encodeURIComponent(query)}`);
                setIsFocused(false);
                if (onClose) onClose();
            }
        } else if (e.key === "Escape") {
            setIsFocused(false);
        }
    };

    return (
        <div className={`relative flex-1 ${className}`} ref={searchRef}>
            <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-[var(--accent)]/30 to-purple-500/30 rounded-2xl blur-lg opacity-0 transition-opacity duration-500 ${isFocused ? 'opacity-100' : ''}`} />

                <div className={`relative w-full flex items-center bg-[var(--foreground)]/[0.03] border border-[var(--border)] rounded-2xl group transition-all duration-500 ${isFocused ? 'bg-[var(--background)] border-[var(--accent)] shadow-[0_0_25px_rgba(var(--accent-rgb),0.15)] ring-1 ring-[var(--accent)]/20' : 'hover:border-[var(--accent)]/30'}`}>
                    <div className="ml-4 flex items-center justify-center">
                        {loading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                <FiZap size={14} className="text-[var(--accent)]" />
                            </motion.div>
                        ) : (
                            <FiSearch className={`text-sm transition-colors duration-300 ${isFocused ? 'text-[var(--accent)]' : 'text-[var(--muted)] group-hover:text-[var(--foreground)]'}`} />
                        )}
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        autoFocus={autoFocus}
                        placeholder="Search items..."
                        className="w-full bg-transparent border-none outline-none px-3 py-2.5 text-[11px] font-black text-[var(--foreground)] placeholder:text-[var(--muted)]/40 tracking-widest uppercase italic"
                    />
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setQuery("")}
                                className="mr-3 p-1 rounded-full hover:bg-red-500/10 text-[var(--muted)] hover:text-red-500 transition-colors"
                            >
                                <FiX size={14} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {isFocused && query.trim() && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(10px)" }}
                        className="absolute top-full mt-3 -left-2 -right-2 sm:-left-6 sm:-right-6 bg-[var(--background)]/95 backdrop-blur-3xl border border-[var(--border)] rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-[1001]"
                    >
                        <div className="p-3 space-y-1">
                            {loading ? (
                                <div className="py-12 flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent)] opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <FiZap size={20} className="text-[var(--accent)] animate-pulse" />
                                        </div>
                                    </div>
                                    <p className="text-[9px] font-black text-[var(--muted)] mt-4 uppercase tracking-[0.3em]">Loading...</p>
                                </div>
                            ) : results.length > 0 ? (
                                <>
                                    <div className="px-4 py-2 flex items-center justify-between">
                                        <span className="text-[9px] font-black text-[var(--accent)] uppercase tracking-[0.2em]">Results</span>
                                        <span className="text-[8px] font-bold text-[var(--muted)] uppercase">{results.length} Results</span>
                                    </div>
                                    <div className="space-y-1 max-h-[400px] overflow-y-auto no-scrollbar">
                                        {results.map((item, idx) => (
                                            <motion.button
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => handleSelect(item.gameSlug || item.slug, item.isOtt ? 'ott' : item.isMembership ? 'membership' : 'game')}
                                                className={`w-full flex items-center gap-4 p-3 rounded-2xl group transition-all duration-300 ${selectedIndex === idx ? 'bg-[var(--accent)] text-black' : 'hover:bg-[var(--foreground)]/[0.03]'}`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl overflow-hidden border transition-transform duration-500 group-hover:scale-110 ${selectedIndex === idx ? 'border-black/20' : 'border-[var(--border)] group-hover:border-[var(--accent)]/50 shadow-lg'}`}>
                                                    <Image src={item.gameImageId?.image || item.image} alt={item.gameName || item.name} width={48} height={48} className="object-cover w-full h-full" />
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1 text-left">
                                                    <span className={`text-xs font-black uppercase tracking-tight truncate ${selectedIndex === idx ? 'text-black' : 'text-[var(--foreground)] group-hover:text-[var(--accent)]'}`}>
                                                        {item.gameName || item.name}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[8px] font-bold uppercase tracking-widest ${selectedIndex === idx ? 'text-black/60' : 'text-[var(--muted)]'}`}>
                                                            {item.isOtt ? 'Subscription' : item.isMembership ? 'Membership' : (item.gameFrom || 'Game')}
                                                        </span>
                                                        {item.tagId && (
                                                            <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 uppercase">
                                                                {item.tagId.tagName}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <FiArrowRight className={`transition-all duration-300 ${selectedIndex === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                            </motion.button>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/games?q=${encodeURIComponent(query)}`}
                                        onClick={() => {
                                            setIsFocused(false);
                                            if (onClose) onClose();
                                        }}
                                        className="flex items-center justify-center p-4 text-[10px] font-black text-[var(--muted)] hover:text-[var(--accent)] transition-all duration-300 border-t border-[var(--border)] mt-2 uppercase tracking-[0.2em] italic gap-3 group/link"
                                    >
                                        View All Results
                                        <div className="w-5 h-5 rounded-lg bg-[var(--foreground)]/5 flex items-center justify-center group-hover/link:bg-[var(--accent)] group-hover/link:text-black transition-colors">
                                            <FiTarget size={10} />
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <div className="py-16 flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-16 h-16 rounded-[2rem] bg-red-500/5 border border-red-500/10 flex items-center justify-center mb-6">
                                        <FiX size={24} className="text-red-500/40" />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-tighter text-[var(--foreground)] mb-2">No Results</h3>
                                    <p className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest leading-relaxed"> No items found for <br /><span className="text-[var(--accent)]">"{query}"</span></p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
