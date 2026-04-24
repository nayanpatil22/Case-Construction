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

  const serviceSpecs = [
    { 
      title: 'CASE Care', 
      tagline: 'Smart Maintenance for Maximum Performance',
      desc: 'An annual, cost-effective service plan that keeps your machine in top condition and reduces downtime.',
      points: ['Priority Service: Fast response within 8 hours', 'Expert Support: Skilled engineers with right tools', 'Proactive Maintenance: Prevent issues before they occur', 'Higher Resale Value: Maintain long-term worth']
    },
    { 
      title: 'CASE Care Gold', 
      tagline: 'Total Peace of Mind',
      desc: 'Upgrade with a premium maintenance plan designed for maximum efficiency and zero worries.',
      points: ['Priority Service: Quick support when you need it', 'Proactive Care: Fix issues before they grow', 'Parts Discounts: Save on genuine CASE parts', 'Cost Protection: No surprises during the contract']
    },
    { 
      title: 'CASE Protect', 
      tagline: 'Extended Warranty You Can Trust',
      desc: 'A comprehensive extended warranty designed for reliability, performance, and peace of mind.',
      points: ['Full Coverage: Engine, transmission, hydraulics & more', 'Expert Support: Trained engineers & genuine parts', 'Flexible Plans: Suited to your needs and budget', 'Zero Hassle Service: Smooth maintenance support']
    }
  ];

  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-orange-600 selection:text-white">
      
      {/* 1. CORPORATE HEADER */}
      <nav className="sticky top-0 w-full bg-slate-900 text-white z-[100] border-b-4 border-orange-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex flex-col items-start cursor-pointer">
            <span className="font-black text-2xl md:text-3xl tracking-tighter leading-none">CASE</span>
            <span className="text-[9px] md:text-[10px] font-bold text-orange-500 uppercase tracking-widest">Construction India</span>
          </button>
          <div className="hidden md:flex gap-6 lg:gap-10 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#fleet" className="hover:text-orange-500 transition-colors">Fleet</a>
            <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
            <a href="#refurbish" className="hover:text-orange-500 transition-colors">Refurbish</a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>
          <a href="#contact" className="bg-orange-600 text-white px-5 md:px-8 py-2 md:py-3 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all rounded-sm">
            Get Quote
          </a>
        </div>
      </nav>

      {/* 2. DESIRABLE HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <Image src="/images/fleet/770NX_96x49-01 (1).jpg" alt="Hero Background" fill className="object-cover object-center grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full text-white">
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-orange-600 text-white px-3 md:px-4 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 inline-block">Engineering Excellence since 1842</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase tracking-tighter mb-6 md:mb-8">Built for <br/> <span className="text-orange-500 italic">The Bold.</span></motion.h1>
            <p className="text-slate-300 text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 font-medium max-w-xl leading-relaxed">Dominate the job site with precision-engineered machinery designed for India's toughest terrains.</p>
            <div className="flex flex-wrap gap-4 md:gap-6 font-black text-xs uppercase tracking-widest">
              <a href="#fleet" className="bg-orange-600 text-white px-8 md:px-12 py-4 md:py-5 hover:bg-white hover:text-black transition-all">Explore Catalog</a>
              <a href="#services" className="border-2 border-white/20 text-white px-8 md:px-12 py-4 md:py-5 hover:bg-white hover:text-black transition-all">Service Solutions</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US */}
      <section id="about" className="py-16 md:py-32 px-4 md:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 bg-white p-8 md:p-16 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8">Pithampur: <br/> The Heart of Production.</h2>
                  <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-lg">Our state-of-the-art manufacturing facility in Madhya Pradesh is a benchmark for "Make in India." We engineer precision machinery that empowers national infrastructure.</p>
                </div>
                <div className="mt-8 md:mt-12 flex gap-8 md:gap-12 font-black">
                   <div><p className="text-3xl md:text-4xl text-orange-600">180+</p><p className="text-[9px] md:text-[10px] uppercase text-slate-400">Years of Legacy</p></div>
                   <div><p className="text-3xl md:text-4xl text-slate-900">75+</p><p className="text-[9px] md:text-[10px] uppercase text-slate-400">Global Markets</p></div>
                </div>
            </div>
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl flex flex-col justify-center items-center text-center">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-orange-600 rounded-full flex items-center justify-center mb-6 md:mb-8 font-black italic text-xl md:text-2xl">!</div>
                <h3 className="text-xl md:text-2xl font-black uppercase mb-3 md:mb-4 tracking-tighter">Reliability <br/> Guaranteed.</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Every CASE machine undergoes rigorous testing in 45°C+ heat to ensure maximum uptime on-site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLEET SECTION */}
      <section id="fleet" className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">The <br/> Fleet.</h2>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`px-4 md:px-6 py-2 md:py-3 font-bold text-[9px] md:text-[10px] uppercase tracking-widest border-2 transition-all ${activeTab === cat.id ? 'bg-orange-600 border-orange-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'}`}>{cat.label}</button>
              ))}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {fleetData[activeTab as keyof typeof fleetData].map((model, i) => (
            <div key={i} className="bg-white border-2 border-slate-100 hover:border-orange-500 transition-all group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={model.image} alt={model.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
              <div className="p-5 md:p-8">
                <h4 className="text-xl md:text-2xl font-black uppercase text-slate-900 mb-2 tracking-tighter">{model.name}</h4>
                <p className="text-zinc-500 text-sm mb-6 md:mb-8 font-medium">{model.desc}</p>
                <div className="flex gap-4 border-t border-slate-100 pt-4 md:pt-6 font-black uppercase">
                  <div className="flex-1"><p className="text-[9px] text-slate-400 mb-1">Engine</p><p className="text-slate-900 text-sm">{model.hp}</p></div>
                  <div className="flex-1"><p className="text-[9px] text-slate-400 mb-1">Weight</p><p className="text-slate-900 text-sm">{model.weight}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICES SECTION - LIGHT THEME / PERMANENT INFO */}
      <section id="services" className="py-16 md:py-32 px-4 md:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20">
             <span className="text-orange-600 font-black uppercase text-[9px] md:text-[10px] tracking-widest mb-4 block">Rely on CASE to deliver for you</span>
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 md:mb-6">CASE Service Solutions</h2>
             <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">Discover a portfolio of services customized for your machine and your business needs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceSpecs.map((srv, i) => (
              <div key={i} className="bg-white p-8 md:p-12 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-2 border-b-4 border-orange-600 pb-2 inline-block">{srv.title}</h3>
                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-orange-600 mb-4 md:mb-6">{srv.tagline}</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 md:mb-8">{srv.desc}</p>
                <ul className="space-y-3 md:space-y-4 mt-auto">
                  {srv.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 md:gap-4 text-xs md:text-[13px] font-bold text-zinc-800">
                      <span className="text-orange-600">•</span> {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REFURBISHING FORM */}
      <section id="refurbish" className="py-16 md:py-32 px-4 md:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="text-orange-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 block">Refurbishment Center</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 md:mb-8">Extend your <br/> Machine life.</h2>
              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-8 md:mb-10 italic">Restore your fleet to zero-hour performance using 100% genuine parts.</p>
              <div className="space-y-3 md:space-y-4 font-black text-[10px] md:text-xs uppercase tracking-widest">
                 {['100% Genuine Parts', 'Factory Certified Engineers', 'Extended Warranty'].map((item) => (
                    <div key={item} className="flex items-center gap-3"><span className="text-orange-600 font-black">✓</span> {item}</div>
                 ))}
              </div>
            </div>
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
               <form className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Machine Model" className="w-full bg-white border border-slate-200 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                    <input type="text" placeholder="Hours Logged" className="w-full bg-white border border-slate-200 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  </div>
                  <input type="text" placeholder="Serial Number" className="w-full bg-white border border-slate-200 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  <button className="w-full bg-slate-900 text-white py-4 md:py-5 font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-orange-600 transition-colors">Request Inspection</button>
               </form>
            </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-32 px-4 md:px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12">Connect <br/> with Experts.</h2>
            <div className="space-y-8 md:space-y-12">
               <div><p className="text-orange-500 font-black uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">Toll Free Support</p><p className="text-2xl md:text-4xl font-black">1800-419-7777</p></div>
               <div><p className="text-orange-500 font-black uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">Transmission</p><p className="text-xl md:text-2xl font-bold underline underline-offset-8 decoration-orange-600">fleet.support@caseindia.com</p></div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 lg:p-14 rounded-[2rem] shadow-2xl text-zinc-900">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8">Contact Us</h3>
            <form className="space-y-4 md:space-y-5">
               <select className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs text-slate-500 outline-none focus:border-orange-600">
                  <option>Nature of Inquiry</option>
                  <option>Product Sales</option><option>Service & Support</option>
               </select>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  <div className="flex bg-slate-50 border border-slate-100 p-3 md:p-4 items-center">
                    <span className="text-xs font-bold mr-2 text-zinc-400">+91</span>
                    <input type="tel" placeholder="Phone Number" className="bg-transparent outline-none text-xs font-bold w-full text-zinc-900" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Company Name" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  <input type="text" placeholder="Business Address" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
                  <input type="text" placeholder="State / Province" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs text-slate-500 outline-none"><option>India</option></select>
                  <input type="text" placeholder="Postal Code" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600" />
               </div>
               <textarea rows={3} placeholder="Comments" className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600 resize-none" />
               <div className="space-y-3 md:space-y-4 py-4 text-[9px] md:text-[10px] font-black uppercase text-slate-500">
                  <label className="flex items-start gap-2 md:gap-3 cursor-pointer group"><input type="checkbox" className="mt-1 accent-orange-600 h-4 w-4" /><span>I have read the <span className="text-orange-600 underline">Privacy Notice</span></span></label>
                  <label className="flex items-start gap-2 md:gap-3 cursor-pointer group"><input type="checkbox" className="mt-1 accent-orange-600 h-4 w-4" /><span>CNH Marketing Activities</span></label>
               </div>
               <button className="w-full bg-orange-600 text-white py-5 md:py-6 font-black uppercase text-sm tracking-widest hover:bg-slate-900 transition-all shadow-xl">Submit Request</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 md:py-12 bg-black text-center text-slate-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">© 2026 CASE CONSTRUCTION INDIA</footer>
    </main>
  );
}