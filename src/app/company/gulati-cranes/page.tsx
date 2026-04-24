'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function GulatiCranesPage() {
  const router = useRouter();

  return (
    <main className="bg-[#020617] selection:bg-cyan-400 selection:text-black overflow-x-hidden min-h-screen">
      {/* 1. BLUEPRINT NAVIGATION */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-[100] mix-blend-difference text-white">
        <button onClick={() => router.push('/')} className="font-bold tracking-tighter text-2xl uppercase cursor-pointer hover:text-cyan-400 transition-colors italic">GULATI_CRANES</button>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest hidden md:flex opacity-80">
          <a href="#about" className="hover:text-cyan-400 transition-colors">History_1984</a>
          <a href="#fleet" className="hover:text-cyan-400 transition-colors">The_Fleet</a>
          <a href="#service" className="hover:text-cyan-400 transition-colors">Deployment</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Terminal</a>
        </div>
      </nav>

      {/* 2. HERO - THE VERTICAL AXIS */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617] z-10" />
            {/* Background image should be a heavy crane on an industrial site */}
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1545063328-c8e3f6e2f186?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
        </div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        <div className="relative z-20 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-mono text-xs uppercase mb-6 tracking-[0.8em]"
          >
            Heavy Lifting Solutions // Established 1984
          </motion.p>
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] font-black text-white leading-none tracking-tighter uppercase"
          >
            GULATI<br/><span className="text-zinc-800 outline-text">CRANES.</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
             <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Nashik, Maharashtra // Serving PAN India</p>
             <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-400 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - 4 DECADES OF EXPERTISE */}
      <section id="about" className="py-40 px-8 bg-white text-black rounded-t-[4rem] relative z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517524206127-48bbd362f39c?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000" />
             </div>
             <div className="absolute -bottom-10 -right-10 bg-cyan-400 p-12 rounded-3xl hidden md:block">
                <p className="text-5xl font-black italic">40+</p>
                <p className="text-xs font-mono uppercase tracking-widest font-bold">Years of Trust</p>
             </div>
          </div>
          <div>
            <h2 className="text-7xl font-black tracking-tighter uppercase leading-none mb-10 text-zinc-900">Precision <br/>Since 1984.</h2>
            <p className="text-xl text-zinc-600 font-light leading-relaxed mb-8">
              Based in Nashik, Gulati Cranes is a premier provider of heavy lifting solutions. We specialize in machinery designed to withstand extreme heat, friction, and stress—ensuring reliability where others fail.
            </p>
            <ul className="space-y-4 mb-12">
              {['Project Management', 'Free Site Inspections', 'After-Sales Support'].map((item, index) => (
                <li key={index} className="flex items-center gap-3 font-mono text-sm uppercase text-cyan-600">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" /> {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-12 border-t border-zinc-100 pt-12">
                <div>
                    <span className="text-zinc-400 font-mono text-[10px] block mb-2 uppercase">Core Philosophy</span>
                    <p className="text-xl font-bold uppercase italic">Quality & Unity</p>
                </div>
                <div>
                    <span className="text-zinc-400 font-mono text-[10px] block mb-2 uppercase">Service Reach</span>
                    <p className="text-xl font-bold uppercase italic">PAN India</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE FLEET SPECS */}
      <section id="fleet" className="py-40 bg-zinc-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h3 className="text-6xl font-black tracking-tighter uppercase leading-none">The<br/>Machinery.</h3>
            <p className="max-w-md text-zinc-500 text-sm font-mono uppercase leading-relaxed">
              Our ready-to-work fleet is equipped for complex maneuvers and heavy-duty recovery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Telescopic Cranes', desc: 'High-performance hydraulic systems.' },
              { title: 'Tower Cranes', desc: 'Precision vertical lifting for construction.' },
              { title: 'Under Lift Towing', desc: 'Heavy-duty vehicle recovery specialists.' },
              { title: 'Forklifts', desc: 'Versatile industrial material handling.' },
              { title: 'Man Baskets', desc: 'Safe aerial access for intricate maneuvers.' },
              { title: 'Breakdown Vans', desc: '24/7 mobile recovery and support.' }
            ].map((unit, i) => (
              <div key={i} className="p-10 bg-white border border-zinc-200 rounded-3xl hover:border-cyan-400 transition-all group flex flex-col justify-between min-h-[300px]">
                <div>
                    <p className="text-cyan-600 font-mono text-[10px] mb-8 uppercase tracking-widest">ASSET_REF_0{i+1}</p>
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">{unit.title}</h4>
                    <p className="text-zinc-400 text-sm italic">{unit.desc}</p>
                </div>
                <div className="h-[2px] w-12 bg-zinc-100 group-hover:w-full group-hover:bg-cyan-400 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REQUEST DEPLOYMENT (Service Form) */}
      <section id="service" className="py-40 bg-[#020617] px-8 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
                <h2 className="text-6xl font-black tracking-tighter uppercase mb-8 leading-none text-cyan-400 underline decoration-1 underline-offset-8">Asset<br/>Trading.</h2>
                <p className="text-zinc-400 text-lg mb-12 max-w-md">Beyond rentals, we facilitate the buying and selling of industrial cranes, helping you liquidate or upgrade your fleet with technical proficiency.</p>
                <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                    <p className="font-mono text-xs uppercase text-cyan-400 mb-4 tracking-widest">// Technical Oversight</p>
                    <p className="text-sm text-zinc-300">Every machine undergoes a rigorous quality control check by our experienced supervisors before deployment.</p>
                </div>
            </div>
            <div className="bg-zinc-900/50 p-12 rounded-[3rem] border border-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold uppercase mb-10">Deployment Inquiry</h3>
                <form className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Service Type</label>
                            <select className="bg-transparent border-b border-white/10 py-2 outline-none text-white focus:border-cyan-400 transition-colors">
                                <option>Crane Rental</option>
                                <option>Buy/Sell</option>
                                <option>Towing</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-mono uppercase text-zinc-500">Project Location</label>
                            <input type="text" placeholder="City" className="bg-transparent border-b border-white/10 py-2 outline-none text-white placeholder:text-zinc-800" />
                        </div>
                    </div>
                    <button className="w-full py-6 bg-cyan-400 text-black rounded-xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all">Check Availability _</button>
                </form>
            </div>
        </div>
      </section>

      {/* 6. CONTACT TERMINAL */}
      <section id="contact" className="py-40 px-8 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-8xl font-black tracking-tighter uppercase leading-none mb-8">Heavy<br/>Lifting.</h2>
            <div className="space-y-6">
                <div>
                    <p className="text-cyan-600 font-mono text-xs uppercase font-bold mb-1">Corporate HQ</p>
                    <p className="text-zinc-500 text-xl">Nashik, Maharashtra, India</p>
                </div>
                <div>
                    <p className="text-cyan-600 font-mono text-xs uppercase font-bold mb-1">Operational Range</p>
                    <p className="text-zinc-500 text-xl">PAN India Logistics</p>
                </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-4xl font-light tracking-tight text-zinc-800 mb-12">Let’s discuss your next industrial project or site inspection.</p>
            <button className="text-left group">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 block mb-2">Primary Terminal</span>
                <span className="text-4xl font-bold border-b-4 border-black group-hover:text-cyan-600 group-hover:border-cyan-600 transition-all">ops.gulaticranes@example.com</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-20 bg-white px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.4em]">© 2026 GULATI CRANES NASHIK // RIGGING EXCELLENCE</p>
            <div className="flex gap-12 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                <span>ISO 9001:2015</span>
                <span>Safety Certified</span>
            </div>
        </div>
      </footer>
    </main>
  );
}