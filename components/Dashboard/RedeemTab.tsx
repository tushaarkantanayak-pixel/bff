import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGift, FiLoader, FiCheckCircle, FiXCircle, FiArrowRight } from "react-icons/fi";

interface RedeemTabProps {
    setWalletBalance: (balance: number) => void;
}

export default function RedeemTab({ setWalletBalance }: RedeemTabProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

    const handleRedeem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/user/redeem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ code: code.trim() })
            });
            const data = await res.json();

            if (data.success) {
                setStatus({ type: 'success', message: data.message });
                setCode("");
                setWalletBalance(data.newBalance);
                window.dispatchEvent(new Event("walletUpdated"));
            } else {
                setStatus({ type: 'error', message: data.message });
            }
        } catch (err) {
            setStatus({ type: 'error', message: "Redemption failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12 sm:py-24 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-start">
                {/* LEFT: FORM SIDE */}
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">Redeem <span className="text-blue-500">Code</span></h1>
                        <p className="text-sm text-[var(--muted)] mt-4 font-medium opacity-80">Add money to your wallet instantly using a gift code.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full"
                    >
                        <form onSubmit={handleRedeem} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-500/60 ml-1">Voucher Code</label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value.toUpperCase());
                                        if (status.type) setStatus({ type: null, message: "" });
                                    }}
                                    placeholder="TK-0000-0000"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-xl font-bold tracking-widest text-[var(--foreground)] placeholder:text-[var(--muted)]/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 outline-none transition-all shadow-inner"
                                    autoFocus
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !code.trim()}
                                className="w-full h-16 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-20"
                            >
                                {loading ? (
                                    <FiLoader className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-widest text-xs">Claim Balance</span>
                                        <FiArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <AnimatePresence mode="wait">
                            {status.type && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 shadow-sm ${status.type === 'success'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                        }`}
                                >
                                    {status.type === 'success' ? <FiCheckCircle size={18} /> : <FiXCircle size={18} />}
                                    <span className="text-xs font-bold leading-tight">{status.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* RIGHT: STEPS SIDE */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6 md:mt-4"
                >
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />

                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--muted)] opacity-40">How it works</h3>

                        <div className="space-y-10">
                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-black text-blue-400 shrink-0">1</div>
                                <div>
                                    <p className="text-[13px] font-black uppercase tracking-tight text-[var(--foreground)]">Enter Your Code</p>
                                    <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-relaxed opacity-70 font-medium">Type your voucher code into the input field exactly as it appears.</p>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-black text-blue-400 shrink-0">2</div>
                                <div>
                                    <p className="text-[13px] font-black uppercase tracking-tight text-[var(--foreground)]">Get Balance</p>
                                    <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-relaxed opacity-70 font-medium">Click on claim to validation and add points to your account.</p>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-black text-blue-400 shrink-0">3</div>
                                <div>
                                    <p className="text-[13px] font-black uppercase tracking-tight text-[var(--foreground)]">Use Instantly</p>
                                    <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-relaxed opacity-70 font-medium">Your new balance is added immediately to your tactical wallet.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-5 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4 transition-all hover:bg-blue-500/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <p className="text-[10px] font-black text-blue-400/80 uppercase tracking-[0.2em]">Fast & Secure Processing</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
