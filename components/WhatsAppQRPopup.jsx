"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { FiX, FiAward, FiZap } from "react-icons/fi";

export default function WhatsAppCommunityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("wa_qr_theme_popup");
    if (!shown) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("wa_qr_theme_popup", "1");
      }, 700);

      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center
                     bg-black/80 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[300px]"
          >
            {/* Background Glows */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/15 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full pointer-events-none" />

            {/* Tactical Frame */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--card)]/80 backdrop-blur-2xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-[50px] border-b border-l border-white/5" />

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-white transition-all z-20"
              >
                <FiX size={14} />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center gap-5">

                {/* Header Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                  <FiAward size={24} />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-[1000] tracking-tighter uppercase italic leading-[0.9] text-[var(--foreground)]">
                    Join for<br />
                    <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Giveaway</span>
                  </h2>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-60">
                    Official Channel
                  </p>
                </div>

                {/* QR Section */}
                <div className="relative group p-0.5">
                  <div className="relative rounded-2xl p-3 bg-white border-2 border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <QRCodeCanvas
                      value="https://whatsapp.com/channel/0029Vb87jgR17En1n5PKy129"
                      size={130}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-center gap-2 text-[var(--muted)]">
                    <FiZap size={9} className="text-blue-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">Scan to Claim</span>
                  </div>
                </div>

                {/* Main Action Button */}
                <a
                  href="https://whatsapp.com/channel/0029Vb87jgR17En1n5PKy129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="text-[10px] font-black uppercase italic tracking-[0.1em] relative z-10">Join Channel</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
