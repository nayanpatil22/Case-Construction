'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { image } from 'framer-motion/client';

export default function CaseConstructionSite() {
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fleetData = {
    backhoe: [
      {
        name: "770NX",
        image: "/images/fleet/770NX_96x49-01 (1).jpg",
        desc: "Delivers power, efficiency, and versatility with dual power curves (60 HP & 74 HP). Ideal for excavation and material handling with ECO, Standard, and Power modes.",
        specs: { engine: "54.6 kW / 74 hp", weight: "7600 kg" },
        highlights: ["Two power curves: 60HP/74HP", "ROPS/FOPS cabin with 360° visibility", "Smart Telematics", "Reliable at -20°C"]
      },
      {
        name: "770NX MAGNUM",
        image: "/images/fleet/770_Magnum_96x49-01.jpg",
        desc: "Robust 74 HP engine with a reinforced build for heavy excavation. Features a 4.4 m digging depth and 1.1 m³ loader bucket for high-demand job sites.",
        specs: { engine: "54.6 kW / 74 hp", weight: "7700 kg" },
        highlights: ["74 HP fuel-efficient engine", "4.4 m digging depth", "3 Work modes (RPM control)", "Spacious cabin"]
      },
      {
        name: "851NX",
        image: "/images/fleet/851NX_96x49_5x3.jpg",
        desc: "Superior reach with a 4.7 m digging depth and 1.2 m³ bucket. Available in side-shift or center-pivot designs to adapt to diverse site requirements.",
        specs: { engine: "54.6 kW / 74 hp", weight: "7800 / 7700 kg" },
        highlights: ["4.7 m digging depth", "Side-shift or Center-pivot", "Premium HVAC system", "Low-noise cabin"]
      }
    ],
    compactors: [
      {
        series: "Single Drum Rollers",
        name: "1107NX Soil Compactor",
        image: "/images/fleet/Compactor_1107NX_96x49-01.jpg",
        desc: "High power and stability with a 101 HP engine and 31% gradeability. Dual-mode vibration ensures effective compaction across soil types.",
        specs: { engine: "101 hp", weight: "11100/11550 kg", extra: "Frequency: 31 Hz" },
        highlights: ["Powerful 101 HP engine", "Dual-mode vibration", "myCASE Construction telematics", "Reinforced drum design"]
      },
      {
        series: "Double Drum Rollers",
        name: "Tandem Vibratory Compactor",
        image: "/images/fleet/450_DX_96x49-01.jpg",
        desc: "Precision road finishing with a 9,200 kg operating weight and up to 121.6 kN compaction force. Dual amplitude-frequency adapts to urban road conditions.",
        specs: { engine: "74 hp", weight: "9200 kg", extra: "Frequency: 36.5 - 50 Hz" },
        highlights: ["Class-leading curb clearance", "Vibration-free design", "Rotating operator seat", "Dual pump sprinkler system"]
      }
    ],
    excavators: [
      {
        name: "CX220C",
        image: "/images/fleet/Cx220C.jpg",
        desc: "Equipped with the Case Intelligent Hydraulic System (CIHS), ensuring strong breakout force, faster cycle times, and perfectly balanced performance.",
        specs: { engine: "157 hp / 117 kW", weight: "21600 kg" },
        highlights: ["Advanced CIHS technology", "Faster cycle times", "Balanced productivity", "Heavy-duty durability"]
      },
      {
        name: "CX220C LC",
        image: "/images/fleet/Chex_96x49_9x6.jpg",
        desc: "Delivers up to 17% more horsepower. Built for reliability in tough conditions with a wide range from 1.7 to 80 metric tons available.",
        specs: { engine: "157 hp / 117 kW", weight: "22220 kg" },
        highlights: ["17% more horsepower", "Significant fuel savings", "Minimum swing radius", "LC undercarriage stability"]
      }
    ],
    dozers: [
      {
        series: "L-Series",
        name: "1105L",
        image: "/images/fleet/trator-esteira-case-1150L.banner_.webp",
        desc: "Precision and versatility for demanding sites. Features a PAT (Pitch Angle Tilt) blade for faster dozing and XLT tracks for stable performance.",
        specs: { engine: "132 hp / 97 kW", weight: "13625 kg" },
        highlights: ["PAT Blade technology", "XLT Track stability", "Common rail engine", "High pulling capacity"]
      },
      {
        series: "L-Series",
        name: "1650L",
        image: "/images/fleet/crawler-dozers-1650l.webp",
        desc: "High-performance FPT Industrial engine with dual-path hydrostatic transmission for superior maneuverability in demanding operations.",
        specs: { engine: "158 hp / 116 kW", weight: "17960 kg" },
        highlights: ["Dual-path hydrostatic drive", "Tiltable cab for service", "Ground-level access", "Quick load response"]
      },
      {
        series: "M-Series",
        name: "2050M",
        image: "/images/fleet/Dozzer_96x49-01.jpg",
        desc: "Built for large cuts and heavy earthmoving. Compatible with advanced machine and grade control systems for maximum accuracy.",
        specs: { engine: "214 hp / 160 kW", weight: "20592 - 20599 kg" },
        highlights: ["Industry-leading visibility", "Grade control compatible", "Maximum earthmoving strength", "Clean operator station"]
      }
    ]
  };

  return (
    <main className="bg-[#fdfdfd] selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans text-zinc-900">
      
      {/* 1. DYNAMIC NAVIGATION */}
      <nav className={`fixed top-0 w-full p-8 flex justify-between items-center z-[100] transition-all duration-700 ${hasScrolled ? 'bg-white/80 backdrop-blur-xl py-6 border-b border-zinc-100' : 'bg-transparent'}`}>
        <button onClick={() => router.push('/')} className="flex flex-col items-start group cursor-pointer">
          <span className="font-black tracking-tighter text-2xl uppercase leading-none">CASE</span>
          <span className="text-[9px] font-mono tracking-[0.4em] text-orange-600 mt-1 uppercase font-bold">Equipment India</span>
        </button>
        
        <div className="hidden md:flex gap-12 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
          {['Heritage', 'Fleet', 'Refurbish', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors">{item}</a>
          ))}
        </div>

        <button className="bg-black text-white px-8 py-3 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-black/5 cursor-pointer">
          Get Quote _
        </button>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center relative pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute inset-0 opacity-[0.05]" 
                  style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             <motion.div 
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 0.1, scale: 1 }}
               transition={{ duration: 2 }}
               className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581094288338-2314dddb7ec3?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" 
             />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-orange-600 font-mono text-[11px] uppercase tracking-[0.8em] mb-8 block font-bold"
          >
            Engineering Legacy since 1842
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[14vw] font-black text-black leading-[0.8] tracking-tighter uppercase mb-12"
          >
            BORN <br/> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-zinc-400">TO BUILD.</span>
          </motion.h1>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="font-mono text-[10px] uppercase tracking-widest text-zinc-300">Scroll to Deploy ↓</motion.div>
        </div>
      </section>

      {/* 3. HERITAGE BENTO */}
      <section id="heritage" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-zinc-50 rounded-[3rem] p-16 flex flex-col justify-between border border-zinc-100 min-h-[450px]">
             <span className="text-zinc-300 font-mono text-sm uppercase">01 // The Facility</span>
             <div>
                <h2 className="text-5xl font-bold tracking-tighter uppercase mb-6">Pithampur: <br/> The Global Engine.</h2>
                <p className="text-zinc-500 text-lg max-w-md font-light leading-relaxed">Our state-of-the-art manufacturing plant in Madhya Pradesh serves as a vital hub for the "Make in India" initiative, exporting precision machinery to over 75 countries.</p>
             </div>
          </div>
          <div className="bg-orange-50 rounded-[3rem] p-12 flex flex-col justify-center items-center border border-orange-100 text-center group shadow-sm">
             <div className="w-20 h-20 rounded-full border border-orange-200 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-500">
                <span className="text-orange-600 group-hover:text-white font-bold">180+</span>
             </div>
             <p className="font-mono text-[10px] uppercase tracking-widest text-orange-600 font-bold mb-2">Years Excellence</p>
             <p className="text-zinc-400 text-xs">Global heritage localized for the Indian frontier.</p>
          </div>
        </div>
      </section>

      {/* 4. FLEET SECTION */}
      <section id="fleet" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">The <br/> Fleet.</h2>
            <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest max-w-xs border-l border-zinc-100 pl-6 font-bold leading-relaxed">
              Next-Gen machinery engineered for maximum uptime and structural integrity.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { id: '01', title: 'Backhoe Loaders', key: 'backhoe', desc: 'Industry-leading utility for diverse digging and loading tasks.' },
              { id: '02', title: 'Compactors', key: 'compactors', desc: 'Precision soil and asphalt rollers for road construction.' },
              { id: '03', title: 'Crawler Excavators', key: 'excavators', desc: 'Heavy-duty performance with advanced hydraulic intelligence.' },
              { id: '04', title: 'Crawler Dozers', key: 'dozers', desc: 'High-torque surface mastery for large-scale earthmoving.' }
            ].map((section) => (
              <div key={section.id} className="w-full">
                <motion.div 
                  onClick={() => setActiveCategory(activeCategory === section.key ? null : section.key)}
                  whileHover={{ x: activeCategory === section.key ? 0 : 10 }}
                  className={`group flex flex-col md:flex-row justify-between items-start md:items-center p-12 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                    activeCategory === section.key ? 'bg-black border-black mb-4' : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100 shadow-sm shadow-black/5'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                    <span className={`font-mono text-xs font-bold transition-colors ${activeCategory === section.key ? 'text-orange-500' : 'text-orange-600'}`}>
                      {section.id} //
                    </span>
                    <div>
                      <h3 className={`text-3xl md:text-4xl font-bold uppercase tracking-tighter transition-colors ${activeCategory === section.key ? 'text-white' : 'text-black'}`}>
                        {section.title}
                      </h3>
                      <p className={`text-xs font-mono uppercase tracking-widest mt-2 transition-colors ${activeCategory === section.key ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {section.desc}
                      </p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: activeCategory === section.key ? 180 : 0 }} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${activeCategory === section.key ? 'border-orange-500' : 'border-zinc-200'}`}>
                    <span className={activeCategory === section.key ? 'text-orange-500' : 'text-zinc-400'}>↓</span>
                  </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {activeCategory === section.key && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-zinc-50 rounded-[2.5rem] border border-zinc-100 mb-8">
                      <div className="p-8 md:p-16 space-y-32">
                        {(fleetData[section.key as keyof typeof fleetData] as any[]).map((model, i) => (
                          <div key={i} className="pb-20 border-b border-zinc-200 last:border-0 last:pb-0">
                            {model.series && <p className="text-orange-600 font-mono text-[10px] uppercase font-bold mb-8">Series // {model.series}</p>}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                                {/* IMAGE SECTION - Grayscale removed, now always colorful */}
                                <div className="aspect-video bg-zinc-200 rounded-[2rem] overflow-hidden relative border border-zinc-300 shadow-inner group">
                                   {model.image ? (
                                     <Image 
                                       src={model.image} 
                                       alt={model.name} 
                                       fill 
                                       className="object-cover transition-transform duration-700 ease-in-out scale-100 group-hover:scale-105" // Grayscale classes removed
                                     />
                                   ) : (
                                     <div className="h-full flex items-center justify-center text-zinc-400 font-mono text-[10px] uppercase tracking-widest bg-zinc-100">Visual Coming Soon</div>
                                   )}
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-4xl font-black uppercase tracking-tighter text-black">{model.name}</h4>
                                    <div className="h-px flex-1 bg-zinc-200 mx-6"></div>
                                    <span className="font-mono text-orange-600 text-[10px] uppercase font-bold tracking-widest">NX Series</span>
                                  </div>
                                  <p className="text-zinc-600 font-medium text-lg leading-relaxed mb-10">{model.desc}</p>
                                  <div className="grid grid-cols-2 gap-6 mb-12">
                                    <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">Engine Power</p>
                                      <p className="text-xl font-bold text-zinc-900">{model.specs.engine}</p>
                                    </div>
                                    <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">Op. Weight</p>
                                      <p className="text-xl font-bold text-zinc-900">{model.specs.weight}</p>
                                    </div>
                                    {model.specs.extra && (
                                        <div className="col-span-2 p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">Category Specs</p>
                                            <p className="text-xl font-bold text-orange-600">{model.specs.extra}</p>
                                        </div>
                                    )}
                                  </div>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                    {model.highlights.map((h: string, idx: number) => (
                                      <li key={idx} className="flex items-center gap-4 text-sm text-zinc-800 font-bold">
                                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full shrink-0"></div> {h}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REFURBISH FORM */}
      <section id="refurbish" className="py-40 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-orange-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-8">Service // Refurbishment</p>
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-16">Extend Your <br/> Machine Lifecycle.</h2>
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-black/[0.02] border border-zinc-100 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <div className="border-b border-zinc-100 pb-4">
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Machine Model</label>
                    <input type="text" placeholder="e.g. 770 EX" className="w-full bg-transparent outline-none text-xl pt-2 placeholder:text-zinc-200 font-light" />
                  </div>
                  <div className="border-b border-zinc-100 pb-4">
                    <label className="text-[10px] font-mono uppercase text-zinc-400">Hours Used</label>
                    <input type="text" placeholder="Approx hrs" className="w-full bg-transparent outline-none text-xl pt-2 placeholder:text-zinc-200 font-light" />
                  </div>
               </div>
               <div className="flex flex-col justify-end">
                  <p className="text-zinc-400 text-sm mb-8 font-medium">Restore your machinery to factory-spec performance using 100% genuine parts.</p>
                  <button className="w-full py-6 bg-orange-600 text-white rounded-2xl font-mono text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-orange-600/20 cursor-pointer">Submit Inquiry _</button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-40 bg-[#0a0a0a] px-8 relative overflow-hidden text-white rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <h2 className="text-[10vw] lg:text-8xl font-black tracking-tighter uppercase mb-12 text-white">Talk to <br/> Expert.</h2>
            <div className="space-y-12">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-bold mb-2 underline decoration-orange-600">Transmission</p>
                <p className="text-2xl font-light">fleet.support@caseindia.com</p>
            </div>
          </div>
          <div className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl border border-white/10">
            <form className="flex flex-col gap-10">
              <input type="text" placeholder="Full Name" className="w-full bg-zinc-50 border-b-2 border-zinc-200 p-6 outline-none text-zinc-900 font-bold placeholder:text-zinc-300" />
              <textarea rows={3} placeholder="Project Vision" className="w-full bg-zinc-50 border-b-2 border-zinc-200 p-6 outline-none text-zinc-900 font-bold placeholder:text-zinc-300 resize-none" />
              <button className="w-full py-8 bg-orange-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-black transition-all cursor-pointer">Establish Connection _</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0a0a0a] text-center border-t border-white/5">
        <p className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.5em]">© 2026 CASE CONSTRUCTION // POWERED BY DESYN</p>
      </footer>
    </main>
  );
}