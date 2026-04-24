'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

export default function FrannaTerex() {
  const router = useRouter();
  const targetRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? targetRef : undefined,
    offset: ["start start", "end end"]
  });

  if (!isMounted) return <div className="bg-[#0a0a0a] min-h-screen" />;

  return (
    <main ref={targetRef} className="bg-[#0a0a0a] selection:bg-red-600 selection:text-white overflow-x-hidden min-h-screen font-sans">
      {/* 1. INDUSTRIAL NAVIGATION */}
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-[100] text-white mix-blend-difference">
        <div className="flex flex-col">
          <button onClick={() => router.push('/')} className="font-black tracking-tighter text-3xl uppercase cursor-pointer hover:text-red-600 transition-colors leading-none">FRANNA</button>
          <span className="text-[10px] font-mono tracking-[0.3em] text-red-600">BY TEREX</span>
        </div>
        <div className="flex gap-10 font-mono text-[10px] uppercase tracking-widest hidden lg:flex items-center">
          <a href="#pick-carry" className="hover:text-red-600 transition-colors border-b border-transparent hover:border-red-600 pb-1">Engineering</a>
          <a href="#global" className="hover:text-red-600 transition-colors border-b border-transparent hover:border-red-600 pb-1">Global_Scale</a>
          <a href="#service" className="hover:text-red-600 transition-colors border-b border-transparent hover:border-red-600 pb-1">Lifecycle</a>
          <button className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all rounded-full">Request Quote</button>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a] z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1513106580663-1d8066aa3452?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
        </motion.div>
        <div className="relative z-20 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1 border border-red-600 text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">
            40 Years of Lifting Excellence
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[12vw] font-black text-white leading-[0.75] tracking-tighter uppercase">
            PICK. CARRY.<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DOMINATE.</span>
          </motion.h1>
        </div>
      </section>

      {/* 3. ENGINEERING PILLARS */}
      <section id="pick-carry" className="py-40 px-8 bg-white text-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-10">Articulated<br/>Precision.</h2>
              <p className="text-xl text-zinc-600 leading-relaxed mb-12 max-w-lg">
                Franna cranes utilize a unique articulated frame requiring <strong>no outriggers</strong>. Navigate confined industrial spaces that stop traditional cranes in their tracks.
              </p>
              <div className="space-y-8">
                {[
                  { title: "Safety Integrated", desc: "Built-in protection for operators and ground crew." },
                  { title: "High Speed Transit", desc: "No specialized transport required between jobsites." },
                  { title: "Immediate Efficiency", desc: "Start lifting the moment you arrive on site." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <span className="text-red-600 font-bold text-xl">0{idx + 1}</span>
                    <div>
                      <h4 className="font-bold uppercase tracking-tight">{item.title}</h4>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1541625602330-2244a247a576?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Franna Crane" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL REACH TICKER */}
      <section id="global" className="py-20 bg-zinc-900 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex gap-20 items-center pr-20">
            {['TANZANIA_DISTRIBUTION', '100th_CRANE_INDONESIA', 'DUBAI_GLOBAL_CONFERENCE', 'NORTH_AMERICA_UTILITY_AT24', 'METRIC_&_IMPERIAL_FLEETS'].map((text, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-4xl md:text-6xl font-black text-white/20 uppercase tracking-tighter italic">{text}</span>
                <div className="w-3 h-3 bg-red-600 rotate-45" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. SERVICE FORM */}
      <section id="service" className="py-40 bg-[#0a0a0a] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-950 border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-6xl font-black tracking-tighter uppercase mb-8 text-white leading-none">Lifecycle <br/> <span className="text-red-600">Support.</span></h2>
                <p className="text-zinc-400 mb-12 max-w-md">Extensive parts, service support, and professional refurbishing to ensure 100% machine uptime.</p>
                <div className="inline-flex flex-col gap-2 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-red-600 font-mono text-[10px] uppercase">Direct Line</span>
                  <span className="text-xl text-white font-bold tracking-tight">+61 FRANNA OPS</span>
                </div>
              </div>
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <input type="text" placeholder="Chassis #" className="bg-transparent border-b border-zinc-800 py-3 outline-none text-white focus:border-red-600 transition-colors" />
                  <input type="text" placeholder="Region" className="bg-transparent border-b border-zinc-800 py-3 outline-none text-white focus:border-red-600 transition-colors" />
                </div>
                <textarea placeholder="Technical Notes" className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none text-white focus:border-red-600 transition-colors resize-none" rows={3} />
                <button className="w-full py-6 bg-red-600 text-white font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY & FOOTER */}
      <section className="py-20 px-8 bg-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold italic">C26</div>
            <p className="text-sm font-bold uppercase tracking-tight">Active Participant:<br/><span className="text-zinc-500">Clean Up Australia Day 2026</span></p>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-xs text-right">Supporting the Sony Foundation Children’s Holiday Camp.</p>
        </div>
      </section>

      <footer className="py-20 bg-black text-center border-t border-white/5">
        <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em]">
          © 2026 FRANNA TEREX // GLOBAL SALES DIRECTOR: PETER KOSCHEL
        </p>
      </footer>
    </main>
  );
}