'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const companies = [
  { 
    id: '01', 
    name: 'Case Construction', 
    desc: 'World-class earthmoving and construction equipment for the most demanding job sites.', 
    gridClass: 'md:col-span-2 md:row-span-2',
    image: '/images/case.jpg', 
    modalColor: 'from-orange-50 to-orange-100/20',
    accentColor: 'bg-orange-500',
    hoverGlow: '0 20px 80px -10px rgba(249, 115, 22, 0.3)'
  },
  { 
    id: '02', 
    name: 'Gulati Cranes', 
    desc: 'Heavy lifting and specialized crane services for large-scale infrastructure projects.', 
    gridClass: 'md:col-span-1 md:row-span-1',
    image: '/images/gulati.jpg',
    modalColor: 'from-blue-50 to-teal-50/20',
    accentColor: 'bg-blue-600',
    hoverGlow: '0 20px 80px -10px rgba(59, 130, 246, 0.3)'
  },
  { 
    id: '03', 
    name: 'Husqvarna Construction', 
    desc: 'Precision cutting, drilling, and floor surfacing solutions for professionals.', 
    gridClass: 'md:col-span-1 md:row-span-2',
    image: '/images/husq.jpg',
    modalColor: 'from-zinc-100 to-blue-50/20',
    accentColor: 'bg-zinc-800',
    hoverGlow: '0 20px 80px -10px rgba(161, 161, 170, 0.3)'
  },
  { 
    id: '04', 
    name: 'Franna Terex', 
    desc: 'The original pick-and-carry crane experts, providing versatility and power on wheels.', 
    gridClass: 'md:col-span-1 md:row-span-1',
    image: '/images/franna.jpg',
    modalColor: 'from-red-50 to-zinc-50/20',
    accentColor: 'bg-red-600',
    hoverGlow: '0 20px 80px -10px rgba(239, 68, 68, 0.3)'
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (id: string) => {
    const routeMap: Record<string, string> = {
      '01': 'case-construction', '02': 'gulati-cranes', '03': 'husqvarna-construction', '04': 'franna-terex'
    };
    router.push(`/company/${routeMap[id]}`);
  };

  return (
    <main className="bg-[#fdfdfd] selection:bg-black selection:text-white overflow-x-hidden min-h-screen">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full p-4 md:p-8 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <span className="font-bold tracking-tighter text-xl md:text-2xl uppercase pointer-events-auto cursor-pointer"></span>
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em]"></span>
      </nav>

      {/* 2. BENTO HERO SECTION */}
      <section className="min-h-screen w-full p-4 md:p-12 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-auto md:h-[75vh]">
          {companies.map((company) => (
            <motion.div
              layoutId={`card-${company.id}`}
              key={company.id}
              onClick={() => setSelectedId(company.id)}
              whileHover={{ y: -10, boxShadow: company.hoverGlow }}
              className={`relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between cursor-pointer border border-zinc-100 ${company.gridClass}`}
            >
              <motion.div layoutId={`image-${company.id}`} className="absolute inset-0 z-0">
                <Image 
                  src={company.image} 
                  alt={company.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  priority={company.id === '01'}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              </motion.div>

              <div className="flex justify-between items-start relative z-10 text-white">
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest opacity-80">0{company.id}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
              </div>
              
              <div className="relative z-10">
                <h3 className={`font-bold tracking-tighter uppercase text-white transition-transform duration-700
                  ${company.gridClass.includes('col-span-2')
                    ? 'text-4xl sm:text-5xl md:text-7xl group-hover:translate-x-2'
                    : 'text-2xl md:text-3xl group-hover:translate-x-1'
                  }`}>
                  {company.name}
                </h3>
                <p className="mt-3 md:mt-4 text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Enter Platform _
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. LIGHT THEME MODAL */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-2xl"
            />
            
            {companies.filter(c => c.id === selectedId).map(company => (
              <motion.div
                layoutId={`card-${company.id}`}
                key={company.id}
                className="relative w-full max-w-7xl h-auto max-h-[95vh] md:h-[75vh] bg-[#fdfdfd] rounded-3xl md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-auto md:overflow-hidden flex flex-col md:flex-row border border-zinc-200/50"
              >
                <motion.div layoutId={`image-${company.id}`} className="flex-[1.2] relative min-h-[40vh] md:min-h-full">
                  <Image 
                    src={company.image} 
                    alt={company.name} 
                    fill 
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${company.modalColor} mix-blend-multiply opacity-30`} />
                </motion.div>
                
                <div className="flex-1 p-6 md:p-20 flex flex-col justify-center items-start bg-white relative">
                  <button 
                    onClick={() => setSelectedId(null)} 
                    className="absolute top-4 right-4 md:top-10 md:right-10 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                  >
                    Close [x]
                  </button>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className={`w-12 h-1 mb-6 md:mb-8 ${company.accentColor}`} 
                  />

                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-6 md:mb-8 text-black"
                  >
                    {company.name}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-base md:text-xl text-zinc-500 font-light mb-8 md:mb-12 leading-relaxed max-w-md"
                  >
                    {company.desc}
                  </motion.p>
                  
                  <motion.button 
                    onClick={() => handleNavigation(company.id)}
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                    className="px-8 py-4 md:px-12 md:py-5 bg-black text-white rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    Visit Website _
                  </motion.button>

                  <span className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[15vw] md:text-[12vw] font-black text-zinc-50 pointer-events-none -z-10 select-none">
                    0{company.id}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}