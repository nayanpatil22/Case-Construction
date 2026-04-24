'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const companies = [
  { 
    id: '01', 
    name: 'Case Construction', 
    desc: 'World-class earthmoving and construction equipment for the most demanding job sites.', 
    gridClass: 'md:col-span-2 md:row-span-2',
    color: 'from-orange-500/10 to-stone-400/10',
    modalColor: 'from-orange-600 to-stone-700',
    hoverGlow: '0 20px 80px -10px rgba(249, 115, 22, 0.4)'
  },
  { 
    id: '02', 
    name: 'Gulati Cranes', 
    desc: 'Heavy lifting and specialized crane services for large-scale infrastructure projects.', 
    gridClass: 'md:col-span-1 md:row-span-1',
    color: 'from-blue-500/10 to-teal-400/10',
    modalColor: 'from-blue-600 to-teal-400',
    hoverGlow: '0 20px 80px -10px rgba(59, 130, 246, 0.4)'
  },
  { 
    id: '03', 
    name: 'Husqvarna Construction', 
    desc: 'Precision cutting, drilling, and floor surfacing solutions for construction professionals.', 
    gridClass: 'md:col-span-1 md:row-span-2',
    color: 'from-zinc-500/10 to-blue-400/10',
    modalColor: 'from-zinc-700 to-blue-500',
    hoverGlow: '0 20px 80px -10px rgba(161, 161, 170, 0.4)'
  },
  { 
    id: '04', 
    name: 'Franna Terex', 
    desc: 'The original pick-and-carry crane experts, providing versatility and power on wheels.', 
    gridClass: 'md:col-span-1 md:row-span-1',
    color: 'from-red-500/10 to-zinc-400/10',
    modalColor: 'from-red-600 to-zinc-700',
    hoverGlow: '0 20px 80px -10px rgba(239, 68, 68, 0.4)'
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (id: string) => {
    // Map IDs to their dedicated folders
    const routeMap: Record<string, string> = {
      '01': 'case-construction',
      '02': 'gulati-cranes',
      '03': 'husqvarna-construction',
      '04': 'franna-terex'
    };
    router.push(`/company/${routeMap[id]}`);
  };

  return (
    <main className="bg-[#fdfdfd] selection:bg-black selection:text-white overflow-x-hidden min-h-screen">
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <span className="font-bold tracking-tighter text-2xl uppercase pointer-events-auto cursor-pointer">Desyn</span>
        <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Hub // 2026</span>
      </nav>

      {/* 2. BENTO HERO SECTION */}
      <section className="min-h-screen w-full p-6 md:p-12 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[85vh] md:h-[75vh]">
          {companies.map((company) => (
            <motion.div
              layoutId={company.id}
              key={company.id}
              onClick={() => setSelectedId(company.id)}
              whileHover={{ 
                y: -8, 
                boxShadow: company.hoverGlow, 
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              className={`relative group overflow-hidden rounded-[2.5rem] p-10 flex flex-col justify-between cursor-pointer ${company.gridClass}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${company.color} border border-zinc-100 group-hover:border-black/5 transition-colors duration-500 rounded-[2.5rem]`} />
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" 
                   style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="flex justify-between items-start relative z-10">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">0{company.id}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-black transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className={`font-bold tracking-tighter uppercase group-hover:translate-x-2 transition-transform duration-700 text-black ${company.gridClass.includes('col-span-2') ? 'text-6xl md:text-7xl' : 'text-3xl'}`}>
                  {company.name}
                </h3>
                <p className="mt-4 text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Enter Platform _
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SHARED LAYOUT MODAL */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/60 backdrop-blur-3xl"
            />
            {companies.filter(c => c.id === selectedId).map(company => (
              <motion.div
                layoutId={company.id}
                key={company.id}
                className="relative w-full max-w-6xl h-[75vh] bg-white rounded-[3.5rem] shadow-2xl border border-black/5 overflow-hidden flex flex-col md:flex-row"
              >
                <div className={`flex-1 bg-gradient-to-br ${company.modalColor} flex items-center justify-center relative`}>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} className="text-[25vw] font-black text-white">
                    0{company.id}
                  </motion.span>
                </div>
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center items-start bg-white">
                  <button onClick={() => setSelectedId(null)} className="absolute top-10 right-10 text-[10px] font-mono uppercase tracking-widest opacity-30 hover:opacity-100">Close [x]</button>
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-7xl font-black tracking-tighter uppercase leading-none mb-8 text-black">{company.name}</motion.h2>
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-zinc-500 font-light mb-12 leading-relaxed">{company.desc}</motion.p>
                  <motion.button 
                    onClick={() => handleNavigation(company.id)}
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.4 }} 
                    className="px-12 py-5 bg-black text-white rounded-full text-[10px] font-mono uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    Visit Website _
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 4. MANIFESTO */}
      <section className="py-80 px-8 flex flex-col items-center justify-center bg-white">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.6em] mb-12">Manifesto // 02</motion.p>
        <div className="max-w-5xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.95] text-black"
          >
            We don't just build. <br />
            <span className="italic bg-gradient-to-r from-violet-600 via-teal-500 to-amber-400 bg-clip-text text-transparent">We engineer legacy.</span> <br />
            Precision is our pulse.
          </motion.h2>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section className="min-h-screen py-40 bg-zinc-950 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div>
            <h3 className="text-white text-[12vw] lg:text-9xl font-black tracking-tighter leading-none mb-12">LET'S <br />TALK.</h3>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest hover:text-white transition-colors cursor-pointer inline-block">hello@desyn.agency</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white/10">
            <form className="flex flex-col gap-10">
              <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-xl text-white placeholder:text-zinc-700 focus:border-teal-400 transition-colors" />
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-xl text-white placeholder:text-zinc-700 focus:border-teal-400 transition-colors" />
              <textarea rows={3} placeholder="Project Vision" className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-xl text-white placeholder:text-zinc-700 focus:border-teal-400 transition-colors resize-none" />
              <button className="w-full py-6 mt-4 border border-white/20 rounded-2xl text-white text-[10px] font-mono uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 cursor-pointer">Launch Inquiry _</button>
            </form>
          </motion.div>
        </div>
        <div className="absolute top-1/2 right-0 w-[60vh] h-[60vh] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* 6. COMPACT FOOTER */}
      <footer className="bg-black text-white pt-24 pb-12 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 border-t border-white/5 pt-12">
            {/* Common Pages Column */}
            <div className="space-y-4">
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Directory</p>
              <nav className="flex flex-col gap-2 text-sm font-light text-zinc-300">
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all">About Us</a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all">Contact Page</a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all">Service Form</a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all">Refurbishing Form</a>
              </nav>
            </div>
            <div className="hidden md:block"></div>
            <div className="md:text-right space-y-4">
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Headquarters</p>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">Desyn Agency Terminal<br />Pune, Maharashtra, India</p>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1 }}
              className="text-[12vw] font-black tracking-tighter leading-[0.8] text-white opacity-5 mb-[-1vw] text-center"
            >
              DESYN.
            </motion.h2>
          </div>
          <div className="w-full border-t border-white/5 pt-8 flex justify-between items-center text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em]">
            <span>© 2026 // CASE . GULATI . HUSQVARNA . FRANNA</span>
            <span>Handcrafted with Precision</span>
          </div>
        </div>
      </footer>
    </main>
  );
}