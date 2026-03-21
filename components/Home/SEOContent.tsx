"use client";

import { motion } from "framer-motion";
import { FiShield, FiZap, FiInfo, FiCheckCircle } from "react-icons/fi";

export default function SEOContent() {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[var(--background)]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-[var(--accent)]" />
              <span className="text-[10px] font-[900] uppercase tracking-[0.3em] text-[var(--accent)]">
                Market Leader
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-[900] italic leading-[1.1] tracking-tight uppercase">
              Cheapest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-cyan-400">
                MLBB Recharge
              </span> <br />
              In India
            </h2>

            <p className="text-[var(--muted)] text-lg leading-relaxed max-w-xl">
              Blue Buff stands as the gold standard for <strong className="text-[var(--foreground)]">MLBB top up india instant</strong> services. 
              We specialize in providing the <strong className="text-[var(--foreground)]">cheapest mlbb recharge website</strong> experience, 
              ensuring every diamond is delivered with surgical precision and elite speed.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-sm">
                <FiShield className="text-[var(--accent)] text-lg" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-sm">
                <FiZap className="text-[var(--accent)] text-lg" />
                <span className="text-[10px] font-black uppercase tracking-widest">Fast</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT - CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] relative group overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 blur-2xl rounded-full" />
               <FiInfo className="text-2xl text-[var(--accent)] mb-6" />
               
               <h3 className="text-xs font-[900] uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
                 Our Advantage
               </h3>

               <div className="space-y-6">
                 <div>
                   <h4 className="text-[11px] font-black uppercase tracking-wider text-[var(--foreground)] mb-2 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> 
                     MLBB Recharge with UPI
                   </h4>
                   <p className="text-[11px] text-[var(--muted)] font-medium leading-relaxed">
                     Native integration with all major Indian UPI apps for seamless transactions.
                   </p>
                 </div>

                 <div>
                   <h4 className="text-[11px] font-black uppercase tracking-wider text-[var(--foreground)] mb-2 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> 
                     No Login Required
                   </h4>
                   <p className="text-[11px] text-[var(--muted)] font-medium leading-relaxed">
                     Safe top-up via Player ID & Zone ID only. Protecting your account privacy.
                   </p>
                 </div>
               </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] relative group overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full" />
               <FiCheckCircle className="text-2xl text-cyan-400 mb-6" />
               
               <h3 className="text-xs font-[900] uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
                 Reliability
               </h3>

               <div className="space-y-4">
                  <p className="text-[11px] text-[var(--muted)] font-medium leading-relaxed">
                    As a <strong className="text-[var(--foreground)]">mlbb recharge trusted site india</strong>, we prioritize your account safety above all else.
                  </p>
                  <p className="text-[11px] text-[var(--muted)] font-medium leading-relaxed">
                    Our <strong className="text-[var(--foreground)]">mobile legends recharge india fast</strong> protocols ensure that <strong className="text-[var(--foreground)]">mlbb diamonds instant delivery india</strong> is not just a promise, but a consistent reality for our elite community.
                  </p>
               </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM FOOTER BAND */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-16 py-6 px-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-center"
        >
          <span className="text-[9px] font-[900] uppercase tracking-[0.3em] text-[var(--muted)] italic">Elite Gaming Infrastructure</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-30" />
          <span className="text-[9px] font-[900] uppercase tracking-[0.3em] text-[var(--foreground)]">Blue Buff India</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-30" />
          <span className="text-[9px] font-[900] uppercase tracking-[0.3em] text-[var(--muted)] italic">High Fidelity Automation</span>
        </motion.div>
      </div>
    </section>
  );
}
