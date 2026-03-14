"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiCreditCard, FiGrid, FiTarget, FiShoppingBag, FiGift, FiHeadphones } from "react-icons/fi";

const BottomNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Hide BottomNav on certain pages if needed
    const hideOnRoutes = ["/admin", "/owner"];
    if (hideOnRoutes.some(route => pathname?.startsWith(route))) return null;

    const navItems = [
        { id: "home", label: "Home", icon: FiHome, path: "/", isHome: true, action: () => router.push("/") },
        { id: "games", label: "Games", icon: FiGrid, path: "/games", action: () => router.push("/games") },
        { id: "region", label: "Region", icon: FiTarget, path: "/region", action: () => router.push("/region") },
        { id: "orders", label: "Orders", icon: FiShoppingBag, path: "/dashboard/orders", action: () => router.push("/dashboard/orders") },
        { id: "wallet", label: "Wallet", icon: FiCreditCard, path: "/dashboard/wallet", action: () => router.push("/dashboard/wallet") },
        { id: "redeem", label: "Redeem", icon: FiGift, path: "/dashboard/redeem", action: () => router.push("/dashboard/redeem") },
        { id: "support", label: "Support", icon: FiHeadphones, path: "/dashboard/support", action: () => router.push("/dashboard/support") },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-1 pb-1 pointer-events-none">
            <div className="pointer-events-auto bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--border)] rounded-[1.2rem] shadow-[0_8px_30px_rgba(0,0,0,0.6)] py-1 flex justify-between items-center w-full">
                {navItems.map((item) => {
                    const isActive = item.isHome
                        ? (pathname === "/" || pathname === "/home" || pathname === "")
                        : (item.path && (pathname === item.path || pathname.startsWith(item.path + "/")));

                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={item.action}
                            className="relative flex flex-col items-center justify-center flex-1 h-9 px-0.5 group focus:outline-none"
                        >
                            <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 w-full">
                                <Icon
                                    size={14}
                                    className={`transition-all duration-300 ${isActive
                                            ? "text-[var(--accent)] drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]"
                                            : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                                        }`}
                                />

                                <span className={`text-[6px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 scale-90 ${isActive
                                        ? "text-[var(--foreground)] opacity-100"
                                        : "text-[var(--muted)] opacity-50 group-hover:opacity-90"
                                    }`}>
                                    {item.label}
                                </span>
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicatorSimple"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="absolute inset-0 mx-0.5 bg-[var(--accent)]/10 rounded-lg"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
