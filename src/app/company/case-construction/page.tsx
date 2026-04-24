'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CaseConstructionSite() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('backhoe');

  const fleetData = {
    backhoe: [
      { name: "770NX", image: "/images/fleet/770NX_96x49-01 (1).jpg", hp: "74 hp", weight: "7600 kg", desc: "Dual power curves for optimal performance." },
      { name: "770NX MAGNUM", image: "/images/fleet/770_Magnum_96x49-01.jpg", hp: "74 hp", weight: "7700 kg", desc: "Reinforced build for heavy excavation." },
      { name: "851NX", image: "/images/fleet/851NX_96x49_5x3.jpg", hp: "74 hp", weight: "7800 kg", desc: "Superior reach with 4.7m digging depth." }
    ],
    compactors: [
      { name: "1107NX Soil", image: "/images/fleet/Compactor_1107NX_96x49-01.jpg", hp: "101 hp", weight: "11100 kg", desc: "High stability road construction specialist." },
      { name: "Tandem Vibratory", image: "/images/fleet/450_DX_96x49-01.jpg", hp: "74 hp", weight: "9200 kg", desc: "Precision asphalt finishing." }
    ],
    excavators: [
      { name: "CX220C", image: "/images/fleet/Cx220C.jpg", hp: "157 hp", weight: "21600 kg", desc: "Intelligent hydraulic system for fast cycles." },
      { name: "CX220C LC", image: "/images/fleet/Chex_96x49_9x6.jpg", hp: "157 hp", weight: "22220 kg", desc: "Boosted productivity with LC undercarriage." }
    ],
    dozers: [
      { name: "1105L", image: "/images/fleet/trator-esteira-case-1150L.banner_.webp", hp: "132 hp", weight: "13625 kg", desc: "PAT blade technology for faster dozing." },
      { name: "1650L", image: "/images/fleet/crawler-dozers-1650l.webp", hp: "158 hp", weight: "17960 kg", desc: "Dual-path hydrostatic transmission." },
      { name: "2050M", image: "/images/fleet/Dozzer_96x49-01.jpg", hp: "214 hp", weight: "20592 kg", desc: "Maximum power for heavy earthmoving." }
    ]
  };

  const categories = [
    { id: 'backhoe', label: 'Backhoe Loaders' },
    { id: 'compactors', label: 'Compactors' },
    { id: 'excavators', label: 'Crawler Excavators' },
    { id: 'dozers', label: 'Crawler Dozers' }
  ];

  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-orange-600 selection:text-white">
      
      {/* 1. CORPORATE HEADER */}
      <nav className="sticky top-0 w-full bg-slate-900 text-white z-[100] border-b-4 border-orange-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex flex-col items-start cursor-pointer">
            <span className="font-black text-3xl tracking-tighter leading-none">CASE</span>
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Construction India</span>
          </button>
          <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#fleet" className="hover:text-orange-500 transition-colors">Fleet</a>
            <a href="#refurbish" className="hover:text-orange-500 transition-colors">Refurbish</a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>
          <button className="bg-orange-600 text-white px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all rounded-sm">
            Get Quote
          </button>
        </div>
      </nav>

      {/* 2. DESIRABLE HERO - INDUSTRIAL POWER */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <Image 
              src="/images/fleet/770NX_96x49-01 (1).jpg" 
              alt="Hero Background" 
              fill 
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-orange-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block"
            >
              Engineering Excellence since 1842
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8"
            >
              Built for <br/> <span className="text-orange-500 italic">The Bold.</span>
            </motion.h1>
            <p className="text-slate-300 text-xl md:text-2xl mb-12 font-medium max-w-xl leading-relaxed">
              Dominate the job site with precision-engineered machinery designed for India's toughest terrains. 
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#fleet" className="bg-orange-600 text-white px-12 py-5 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-orange-600/20">Explore Catalog</a>
              <a href="#refurbish" className="border-2 border-white/20 text-white px-12 py-5 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">Service Center</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US - BENTO GRID */}
      <section id="about" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-16 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Pithampur: <br/> The Heart of Production.</h2>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-lg">
                    Our state-of-the-art manufacturing facility in Madhya Pradesh is a benchmark for "Make in India." We engineer precision machinery that empowers national infrastructure and exports to 75+ countries.
                  </p>
                </div>
                <div className="mt-12 flex gap-12">
                   <div>
                     <p className="text-4xl font-black text-orange-600">180+</p>
                     <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Years of Legacy</p>
                   </div>
                   <div>
                     <p className="text-4xl font-black text-slate-900">75+</p>
                     <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Global Markets</p>
                   </div>
                </div>
            </div>
            <div className="bg-slate-900 text-white p-12 rounded-3xl flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-orange-600/40">
                  <span className="text-2xl font-black italic">!</span>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">Reliability <br/> Guaranteed.</h3>
                <p className="text-slate-400 text-sm font-medium">Every CASE machine undergoes rigorous testing in 45°C+ heat to ensure maximum uptime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLEET SECTION */}
      <section id="fleet" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">The <br/> Fleet.</h2>
            <div className="flex gap-4 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-6 py-3 font-bold text-[10px] uppercase tracking-widest border-2 transition-all ${
                    activeTab === cat.id 
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetData[activeTab as keyof typeof fleetData].map((model, i) => (
            <motion.div 
              layout key={i}
              className="bg-white border-2 border-slate-100 hover:border-orange-500 transition-all group overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={model.image} alt={model.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-black uppercase text-slate-900 mb-2 tracking-tighter">{model.name}</h4>
                <p className="text-slate-500 text-sm mb-8 font-medium">{model.desc}</p>
                <div className="flex gap-4 border-t border-slate-100 pt-6">
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Engine</p>
                    <p className="font-black text-slate-900 uppercase">{model.hp}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                    <p className="font-black text-slate-900 uppercase">{model.weight}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. REFURBISHING FORM - INDUSTRIAL SPEC */}
      <section id="refurbish" className="py-32 px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Certified Service</span>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-8">Extend your <br/> Machine life.</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10">
                Give your legacy CASE machinery a second life with our Factory-spec Refurbishment Program. We restore your fleet to zero-hour performance using 100% genuine parts.
              </p>
              <div className="space-y-4">
                 {['100% Genuine Parts', 'Factory Certified Engineers', 'Extended Warranty Options'].map((item) => (
                    <div key={item} className="flex items-center gap-3 font-bold text-sm text-slate-900 uppercase">
                       <span className="text-orange-600">✓</span> {item}
                    </div>
                 ))}
              </div>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-2xl shadow-slate-900/5 border border-slate-200">
               <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Machine Model" className="w-full bg-slate-50 border border-slate-200 p-4 font-bold text-xs outline-none focus:border-orange-600" />
                    <input type="text" placeholder="Hours Logged" className="w-full bg-slate-50 border border-slate-200 p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  </div>
                  <input type="text" placeholder="Serial Number (Optional)" className="w-full bg-slate-50 border border-slate-200 p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  <button className="w-full bg-slate-900 text-white py-5 font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-colors">Request Inspection _</button>
               </form>
            </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION - DARK SPEC */}
      <section id="contact" className="py-32 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="text-white">
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-12">Connect <br/> with Experts.</h2>
            <div className="space-y-12">
               <div>
                  <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-4">India Headquarters</p>
                  <p className="text-3xl font-light text-slate-300">New Delhi / Pithampur</p>
               </div>
               <div>
                  <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-4">Toll Free Support</p>
                  <p className="text-4xl font-black text-white">1800-419-7777</p>
               </div>
               <div>
                  <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-4">Email Inquiry</p>
                  <p className="text-2xl font-bold text-slate-300 underline decoration-orange-600 underline-offset-8">fleet.support@caseindia.com</p>
               </div>
            </div>
          </div>
          
          <div className="bg-white p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <form className="relative z-10 space-y-8">
               <h3 className="text-2xl font-black uppercase text-slate-900 border-b-4 border-orange-600 pb-4 inline-block">General Inquiry</h3>
               <div className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full border-b-2 border-slate-100 p-4 font-bold outline-none focus:border-orange-600 transition-colors" />
                  <input type="email" placeholder="Email Address" className="w-full border-b-2 border-slate-100 p-4 font-bold outline-none focus:border-orange-600 transition-colors" />
                  <textarea rows={4} placeholder="Tell us about your project requirements" className="w-full border-b-2 border-slate-100 p-4 font-bold outline-none focus:border-orange-600 resize-none transition-colors" />
               </div>
               <button className="w-full bg-orange-600 text-white py-6 font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all">Establish Connection</button>
            </form>
            {/* Visual Industrial Accent */}
            <div className="absolute -bottom-10 -right-10 text-[10vw] font-black text-slate-50 opacity-10 select-none">CASE</div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
        © 2026 CASE CONSTRUCTION INDIA // POWERED BY DESYN HUB
      </footer>
    </main>
  );
}