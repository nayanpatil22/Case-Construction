'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Settings, Shield, Zap, Wrench, MapPin, Calculator } from 'lucide-react';

export default function HusqvarnaConstruction() {
  const router = useRouter();

  return (
    <main className="bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden min-h-screen">
      {/* 1. CLINICAL NAVIGATION */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-[100] mix-blend-difference text-white">
        <button onClick={() => router.push('/')} className="font-bold tracking-tighter text-2xl uppercase cursor-pointer hover:text-blue-500 transition-colors">
          Husqvarna_
        </button>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest hidden md:flex opacity-60">
          <a href="#solutions" className="hover:text-blue-500">01_Solutions</a>
          <a href="#robotics" className="hover:text-blue-500">02_Robotics</a>
          <a href="#digital" className="hover:text-blue-500">03_Digital_Tools</a>
          <a href="#contact" className="hover:text-blue-500">04_Network</a>
        </div>
      </nav>

      {/* 2. HERO - THE RAZOR EDGE */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-[#f4f7f9]">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
        </div>
        
        <div className="absolute inset-0 pointer-events-none border-[1px] border-blue-500/10 m-6 md:m-12" />
        
        <div className="relative z-20 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-[1px] w-12 bg-blue-600"></span>
            <p className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.8em]">Complete Partner India</p>
            <span className="h-[1px] w-12 bg-blue-600"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10vw] font-black text-zinc-900 leading-[0.85] tracking-tighter uppercase"
          >
            EXPECT<br/><span className="text-blue-600 italic">MORE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-zinc-500 font-mono text-xs uppercase tracking-widest"
          >
            Surgical Precision // Sustainable Power // Zero Emissions
          </motion.p>
        </div>
      </section>

      {/* 3. INNOVATION PILLARS */}
      <section id="solutions" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-6xl font-bold tracking-tighter uppercase mb-8">Concrete <br/>Transformation.</h2>
              <p className="text-lg text-zinc-600 font-light leading-relaxed mb-8">
                From high-frequency vibrators to the legendary <b>Elite-Cut F1600C</b> diamond blades, we provide the integrated ecosystem needed to cut, surface, and refine with surgical accuracy.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="border-l-2 border-blue-600 pl-4">
                  <h4 className="font-bold uppercase text-sm text-zinc-900">X-Halt™</h4>
                  <p className="text-xs text-zinc-400 font-mono uppercase">Instant blade brake technology</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <h4 className="font-bold uppercase text-sm text-zinc-900">i-Series</h4>
                  <p className="text-xs text-zinc-400 font-mono uppercase">Cordless battery ecosystem</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-blue-600 text-white p-10 rounded-2xl hidden md:block">
                <p className="text-4xl font-black italic text-white">"Love at first cut."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEMOLITION ROBOTICS */}
      <section id="robotics" className="py-32 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">Advanced Automation</span>
              <h2 className="text-7xl font-black uppercase tracking-tighter text-white">DXR Series</h2>
            </div>
            <p className="max-w-xs text-zinc-400 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
              Remote-controlled demolition robots engineered for high power-to-weight ratios in hazardous Indian job sites.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Dust & Slurry', desc: 'DE 130 H Extractors maintaining clean breathing zones.', icon: <Shield size={32}/> },
              { title: 'Surface Prep', desc: 'Floor grinders and power trowels for total lifecycle management.', icon: <Settings size={32}/> },
              { title: 'Precision Cut', desc: 'Handheld power cutters with zero-emission battery tech.', icon: <Zap size={32}/> }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-zinc-800/50 border border-zinc-800 rounded-3xl hover:border-blue-600 transition-colors group">
                <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h4 className="text-xl font-bold uppercase mb-4 text-white">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIGITAL ECOSYSTEM */}
      <section id="digital" className="py-32 bg-white px-8">
        <div className="max-w-7xl mx-auto border border-zinc-100 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
          <div className="flex-1 p-16 bg-zinc-50">
            <h3 className="text-4xl font-bold uppercase tracking-tighter mb-8 text-zinc-900">Professional <br/> Digital Suite.</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <Calculator className="text-blue-600 shrink-0" size={20} />
                <div>
                  <span className="block font-bold uppercase text-xs text-zinc-900">Diamond Tool Selector</span>
                  <p className="text-sm text-zinc-500">Calculate the exact setup for specific material densities.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <MapPin className="text-blue-600 shrink-0" size={20} />
                <div>
                  <span className="block font-bold uppercase text-xs text-zinc-900">Dealer Locator</span>
                  <p className="text-sm text-zinc-500">Find 24/7 service centers and rental options across India.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Wrench className="text-blue-600 shrink-0" size={20} />
                <div>
                  <span className="block font-bold uppercase text-xs text-zinc-900">Husqvarna Fleet Portal</span>
                  <p className="text-sm text-zinc-500">Centralized tracking for service schedules and parts lists.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 bg-blue-600 p-16 text-white flex flex-col justify-center">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 text-white">Service <br/> Terminal.</h3>
            <p className="text-blue-100 mb-8 font-mono text-xs uppercase">Logged_In // Ready for fleet maintenance request</p>
            <div className="space-y-4">
              <input type="text" placeholder="MODEL_ID" className="w-full bg-white/10 border border-white/20 p-4 rounded-xl outline-none focus:bg-white/20 placeholder:text-white/30 text-white" />
              <button className="w-full py-4 bg-white text-blue-600 font-mono text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-zinc-100 transition-colors">Initialize Support</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT & GLOBAL NETWORK */}
      <section id="contact" className="py-40 px-8 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-8xl font-black tracking-tighter uppercase leading-none mb-8 text-zinc-900">Get <br/> Connected.</h2>
            <div className="font-mono text-[10px] uppercase tracking-widest leading-loose text-zinc-500">
              <p className="text-zinc-900 font-bold mb-2 uppercase">Husqvarna Construction India</p>
              <p>Corporate HQ // Industrial Zone</p>
              <p>Service: 1800-HU-CONST</p>
              <p className="mt-4 text-blue-600">husqvarna.india@construction.com</p>
            </div>
          </div>
          <div className="bg-zinc-50 p-12 rounded-3xl">
            <form className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400">Request_Type</label>
                  <select className="bg-transparent border-b border-zinc-300 py-2 outline-none focus:border-blue-600 text-zinc-900">
                    <option>Sales Inquiry</option>
                    <option>Technical Demo</option>
                    <option>Rental Request</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400">Industry</label>
                  <input type="text" placeholder="Concrete/Stone" className="bg-transparent border-b border-zinc-300 py-2 outline-none focus:border-blue-600 text-zinc-900 placeholder:text-zinc-300" />
                </div>
              </div>
              <input type="email" placeholder="Professional Email" className="bg-transparent border-b border-zinc-300 py-4 outline-none focus:border-blue-600 transition-colors text-zinc-900 placeholder:text-zinc-300" />
              <button className="py-6 bg-black text-white text-[10px] font-mono uppercase tracking-[0.6em] rounded-xl hover:bg-blue-600 transition-all">Submit Protocol</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-zinc-100 text-center">
        <p className="text-zinc-300 font-mono text-[9px] uppercase tracking-[0.4em]">© 2026 HUSQVARNA CONSTRUCTION INDIA // PART OF HUSQVARNA GROUP</p>
      </footer>
    </main>
  );
}