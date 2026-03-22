"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import AuthGuard from "@/components/AuthGuard";
import UsersTab from "@/components/admin/UsersTab";
import OrdersTab from "@/components/admin/OrdersTab";
import PricingTab from "@/components/admin/PricingTab";
import TransactionsTab from "@/components/admin/TransactionsTab";
import SupportQueriesTab from "@/components/admin/SupportQueriesTab";
import BannersTab from "@/components/admin/BannersTab";
import StatsTab from "@/components/admin/StatsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import RedeemCodesTab from "@/components/admin/RedeemCodesTab";
import ApiKeysTab from "@/components/admin/ApiKeysTab";


export default function AdminPanalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("users");
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userType");
    if (role === "owner") {
      setIsOwner(true);
      setLoading(false);
    } else {
      // For extra security, verify with API
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user?.userType === "owner") {
            setIsOwner(true);
            localStorage.setItem("userType", "owner");
          } else {
            router.push("/");
          }
        })
        .catch(() => router.push("/"))
        .finally(() => setLoading(false));
    }
  }, []);

  const [queries, setQueries] = useState([]);

  const [balance, setBalance] = useState(null);
  const [banners, setBanners] = useState([]);


  /* ================= TABLE CONTROLS ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  /* ================= PRICING STATE ================= */
  const [pricingType, setPricingType] = useState("admin");
  const [slabs, setSlabs] = useState([{ min: 0, max: 100, percent: 0 }]);
  const [overrides, setOverrides] = useState([]);
  const [savingPricing, setSavingPricing] = useState(false);

  /* ================= HELPERS ================= */
  const normalizeSlabs = (list) =>
    [...list].sort((a, b) => a.min - b.min);

  const resetControls = () => {
    setSearch("");
    setPage(1);
  };


  /* ================= FETCH BALANCE ================= */
  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/game/balance");
      const data = await res.json();
      if (data.success) {
        setBalance(data?.balance?.data?.balance ?? data.balance);
      }
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  };


  const fetchBanners = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/banners/game-banners", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBanners(data.data || []);
  };




  /* ================= FETCH PRICING ================= */
  const fetchPricing = async (type) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/admin/pricing?userType=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data.success) {
      setSlabs(
        data.data?.slabs?.length
          ? data.data.slabs
          : [{ min: 0, max: 0, percent: 0 }]
      );
      setOverrides(data.data?.overrides || []);
    }
  };

  /* ================= SAVE PRICING ================= */
  const savePricing = async () => {
    try {
      setSavingPricing(true);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/pricing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userType: pricingType,
          slabs: normalizeSlabs(slabs),
          overrides,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed");
      } else {
        alert("Pricing updated successfully");
      }
    } finally {
      setSavingPricing(false);
    }
  };



  /* ================= EFFECTS ================= */
  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    resetControls();
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === "banners") fetchBanners();
  }, [activeTab]);


  useEffect(() => {
    if (activeTab === "pricing") fetchPricing(pricingType);
  }, [activeTab, pricingType, page, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isOwner) return null;

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] px-6 py-3">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                  Owner Control
                </h1>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </div>
              <p className="mt-0.5 text-[10px] md:text-xs text-[var(--muted)] max-w-lg leading-snug">
                Manage your customers, sales, and settings here.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col min-w-[120px] relative overflow-hidden group hover:border-[var(--accent)]/30 transition-all">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-500" />
              <p className="text-[10px] uppercase font-bold text-[var(--muted)]/60 tracking-wider">My Funds</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-black text-[var(--foreground)] tabular-nums">{balance !== null ? balance : "..."}</span>
                <span className="text-[9px] font-bold text-emerald-500/80 uppercase">Ready</span>
              </div>
            </div>
          </div>


          <div className="mb-4 flex flex-wrap gap-1.5">
            {["wallet", "redeem", "users", "api-keys", "orders", "transactions", "queries", "pricing", "banners", "settings"].map(
              (tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
            relative
            px-3.5 py-1.5
            rounded-lg
            text-xs sm:text-sm
            font-semibold
            border
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40
            ${isActive
                        ? `
                  bg-[var(--accent)]/15
                  text-[var(--accent)]
                  border-[var(--accent)]/40
                `
                        : `
                  bg-[var(--card)]
                  text-[var(--muted)]
                  border-[var(--border)]
                  hover:text-[var(--foreground)]
                  hover:border-[var(--accent)]/30
                `
                      }
          `}
                  >
                    {tab.toUpperCase()}

                    {/* Active underline */}
                    {isActive && (
                      <span className="
              absolute left-1/2 -bottom-1
              h-0.5 w-6
              -translate-x-1/2
              rounded-full
              bg-gradient-to-r
              from-[var(--accent)]
              to-purple-500
            " />
                    )}
                  </button>
                );
              }
            )}
          </div>



          {/* PANEL */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            {activeTab === "wallet" && <StatsTab />}
            {activeTab === "redeem" && <RedeemCodesTab />}
            {activeTab === "users" && (
              <UsersTab />
            )}

            {activeTab === "api-keys" && (
              <ApiKeysTab />
            )}

            {activeTab === "orders" && (
              <OrdersTab

              />
            )}

            {activeTab === "transactions" && (
              <TransactionsTab />
            )}

            {activeTab === "queries" && (
              <SupportQueriesTab

              />
            )}
            {activeTab === "banners" && (
              <BannersTab banners={banners} onRefresh={fetchBanners} />
            )}


            {activeTab === "pricing" && (
              <PricingTab
                pricingType={pricingType}
                setPricingType={setPricingType}
                slabs={slabs}
                setSlabs={setSlabs}
                overrides={overrides}
                setOverrides={setOverrides}
                savingPricing={savingPricing}
                onSave={savePricing}
              />
            )}
            {activeTab === "settings" && (
              <SettingsTab />
            )}
          </div>


        </div>
      </section>
    </AuthGuard>
  );
}
