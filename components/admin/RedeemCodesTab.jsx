"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGift, FiPlus, FiCopy, FiCheck, FiClock, FiUser, FiTrash2 } from "react-icons/fi";

export default function RedeemCodesTab() {
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isSeries, setIsSeries] = useState(false);
    const [customCode, setCustomCode] = useState("");
    const [maxUses, setMaxUses] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [recentCodes, setRecentCodes] = useState([]);
    const [copiedCode, setCopiedCode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, limit: 10 });

    const [summary, setSummary] = useState({ totalUsed: 0, total: 0 });

    const fetchCodes = async (targetPage = page) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/redeem-codes?page=${targetPage}&limit=10`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setRecentCodes(data.codes);
                setSummary(data.summary);
                setPagination(data.pagination);
            }
        } catch (err) {
            console.error("Failed to fetch codes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCodes(page);
    }, [page]);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("/api/admin/redeem-codes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: Number(amount),
                    quantity: isSeries ? 1 : Number(quantity),
                    isSeries,
                    customCode: isSeries ? customCode : "",
                    maxUses: isSeries ? Number(maxUses) : 1
                })
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message + (isSeries ? "" : "\n\nGenerated Codes:\n" + data.codes.join("\n")));
                setAmount("");
                setQuantity("");
                setCustomCode("");
                setMaxUses("");
                fetchCodes();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Failed to generate codes");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExpire = async (codeId) => {
        if (!confirm("Are you sure you want to expire/delete this code?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/redeem-codes?id=${codeId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchCodes();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Failed to expire code");
        }
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-center text-center sm:text-left">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase text-[var(--muted)] tracking-widest mb-0.5 sm:mb-1">Total</p>
                    <p className="text-lg sm:text-2xl font-black italic">{summary.total}</p>
                </div>
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-green-500/5 border border-green-500/10 flex flex-col justify-center text-center sm:text-left">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase text-green-500/60 tracking-widest mb-0.5 sm:mb-1">Claimed</p>
                    <p className="text-lg sm:text-2xl font-black italic text-green-500">{summary.totalUsed}</p>
                </div>
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col justify-center text-center sm:text-left">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase text-blue-500/60 tracking-widest mb-0.5 sm:mb-1">Left</p>
                    <p className="text-lg sm:text-2xl font-black italic text-blue-400">{summary.total - summary.totalUsed}</p>
                </div>
            </div>

            {/* GENERATOR CARD */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-blue-500/5 border border-blue-500/10 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                            <FiGift size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-xl font-black italic uppercase tracking-tight">Redeem Code Generator</h3>
                            <p className="text-[var(--muted)] text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-60">Create single-use or reusable coupons</p>
                        </div>
                    </div>

                    {/* TYPE TOGGLE */}
                    <div className="flex bg-black/20 p-1 rounded-xl self-start sm:self-auto border border-white/5">
                        <button
                            onClick={() => setIsSeries(false)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${!isSeries ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-[var(--muted)]'}`}
                        >
                            Unique
                        </button>
                        <button
                            onClick={() => setIsSeries(true)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${isSeries ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-[var(--muted)]'}`}
                        >
                            Series
                        </button>
                    </div>
                </div>

                <form className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4" onSubmit={handleGenerate}>
                    <div className="space-y-1">
                        <label className="text-[9px] sm:text-[10px] font-black uppercase text-[var(--muted)] ml-1 tracking-widest">Amount (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g. 500"
                            className="w-full h-10 sm:h-12 bg-black/20 border border-[var(--border)] rounded-xl px-4 text-sm focus:border-blue-500/40 outline-none transition-all font-bold"
                            required
                        />
                    </div>

                    {isSeries ? (
                        <>
                            <div className="space-y-1">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase text-[var(--muted)] ml-1 tracking-widest">Coupon Code</label>
                                <input
                                    type="text"
                                    value={customCode}
                                    onChange={(e) => setCustomCode(e.target.value)}
                                    placeholder="e.g. BONUS500"
                                    className="w-full h-10 sm:h-12 bg-black/20 border border-[var(--border)] rounded-xl px-4 text-sm focus:border-blue-500/40 outline-none transition-all font-bold uppercase"
                                    required={isSeries}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase text-[var(--muted)] ml-1 tracking-widest">Max Uses</label>
                                <input
                                    type="number"
                                    value={maxUses}
                                    onChange={(e) => setMaxUses(e.target.value)}
                                    placeholder="e.g. 100"
                                    className="w-full h-10 sm:h-12 bg-black/20 border border-[var(--border)] rounded-xl px-4 text-sm focus:border-blue-500/40 outline-none transition-all font-bold"
                                    required={isSeries}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="space-y-1 col-span-1 sm:col-span-2">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase text-[var(--muted)] ml-1 tracking-widest">Quantity (Unique Codes)</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="e.g. 10"
                                className="w-full h-10 sm:h-12 bg-black/20 border border-[var(--border)] rounded-xl px-4 text-sm focus:border-blue-500/40 outline-none transition-all font-bold"
                                required={!isSeries}
                            />
                        </div>
                    )}

                    <div className="flex items-end pt-1 sm:pt-0">
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="w-full h-10 sm:h-12 bg-blue-500 text-white font-black italic uppercase text-[10px] sm:text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {isGenerating ? "Processing..." : <><FiPlus /> {isSeries ? "Create Series" : "Generate Codes"}</>}
                        </button>
                    </div>
                </form>
            </div>

            {/* RECENT CODES TABLE */}
            <div className="space-y-4">
                <h3 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2 text-white/40">
                    <FiClock /> Recently Generated Codes
                </h3>

                <div className="rounded-2xl border border-[var(--border)] bg-black/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-white/5 text-[var(--muted)] font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Code</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Value</th>
                                    <th className="px-6 py-4">Usage</th>
                                    <th className="px-6 py-4">Redeemed By</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {loading ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-[var(--muted)]">Loading codes...</td></tr>
                                ) : recentCodes.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-[var(--muted)]">No codes generated yet</td></tr>
                                ) : recentCodes.map((code) => (
                                    <tr key={code._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-mono font-bold text-blue-400 select-all">
                                            {code.code}
                                        </td>
                                        <td className="px-6 py-4 uppercase">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black border ${code.isSeries
                                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                }`}>
                                                {code.isSeries ? "Series" : "Unique"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-black italic">
                                            ₹{code.value}
                                        </td>
                                        <td className="px-6 py-4 uppercase">
                                            {code.isSeries ? (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[9px] font-black mb-1">
                                                        <span className={code.claimedBy?.length >= code.maxUses ? "text-red-400" : "text-green-400"}>
                                                            {code.claimedBy?.length || 0} / {code.maxUses}
                                                        </span>
                                                    </div>
                                                    <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500"
                                                            style={{ width: `${Math.min(100, ((code.claimedBy?.length || 0) / code.maxUses) * 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${code.status === "active"
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                                                    }`}>
                                                    {code.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {code.isSeries ? (
                                                <span className="text-[10px] font-bold text-[var(--muted)] uppercase italic">Multiple Users</span>
                                            ) : code.status === "used" && code.usedBy ? (
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-white flex items-center gap-1"><FiUser className="text-blue-400" size={10} /> {code.usedBy.name}</p>
                                                    <p className="text-[9px] opacity-40 uppercase tracking-tighter">ID: {code.usedBy.userId}</p>
                                                    <p className="text-[9px] opacity-40">{new Date(code.usedAt).toLocaleString()}</p>
                                                </div>
                                            ) : (
                                                <span className="opacity-20">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => copyToClipboard(code.code)}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                                                title="Copy Code"
                                            >
                                                {copiedCode === code.code ? <FiCheck /> : <FiCopy />}
                                            </button>
                                            {(code.status === "active" || code.isSeries) && (
                                                <button
                                                    onClick={() => handleExpire(code._id)}
                                                    className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500/40 hover:text-red-500 transition-all"
                                                    title="Expire/Delete Code"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between px-2 pt-2">
                        <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">
                            Page {pagination.currentPage} of {pagination.pages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                disabled={page === 1 || loading}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(prev => Math.min(pagination.pages, prev + 1))}
                                disabled={page === pagination.pages || loading}
                                className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
