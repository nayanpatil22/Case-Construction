'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface FleetModel {
  name: string;
  image: string;
  hp: string;
  weight: string;
  desc: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}

interface ServiceSpec {
  title: string;
  tagline: string;
  desc: string;
  points: string[];
}

// ─── ENQUIRY MODAL ────────────────────────────────────────────────────────────
function EnquiryModal({
  productName,
  onClose,
}: {
  productName: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg border border-slate-200 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter">
              Enquire about this product
            </h3>
            <p className="text-orange-600 font-bold text-sm mt-1">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 font-black text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                Full Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-slate-200 p-3 text-sm font-medium outline-none focus:border-orange-600"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                Phone <span className="text-orange-600">*</span>
              </label>
              <input
                type="tel"
                required
                className="w-full border border-slate-200 p-3 text-sm font-medium outline-none focus:border-orange-600"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
              Email <span className="text-orange-600">*</span>
            </label>
            <input
              type="email"
              required
              className="w-full border border-slate-200 p-3 text-sm font-medium outline-none focus:border-orange-600"
              placeholder="you@company.com"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                Company
              </label>
              <input
                type="text"
                className="w-full border border-slate-200 p-3 text-sm font-medium outline-none focus:border-orange-600"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full border border-slate-200 p-3 text-sm font-medium outline-none focus:border-orange-600"
                placeholder="Your city"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
              Message
            </label>
            <textarea
              rows={3}
              className="w-full border border-slate-200 p-3 text-sm font-medium outline-none focus:border-orange-600 resize-none"
              placeholder="Tell us about your requirement..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 border-2 border-slate-200 py-3 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:border-slate-400"
            >
              Cancel
            </button>
            <button className="flex-1 bg-orange-600 text-white py-3 font-black text-[10px] uppercase tracking-widest hover:bg-orange-700">
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FLEET CARD ───────────────────────────────────────────────────────────────
function FleetCard({ model, onEnquire }: { model: FleetModel; onEnquire: () => void }) {
  return (
    <div className="bg-white border border-slate-200 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={model.image}
          alt={model.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-2">
          {model.name}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{model.desc}</p>

        {/* Highlights */}
        <div className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Highlights
          </p>
          <ul className="space-y-1">
            {model.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <span className="text-orange-600 font-black mt-0.5">•</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Specs */}
        <div className="mb-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Key Specifications
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border border-slate-100">
            {model.specs.map((spec, i) => (
              <div
                key={i}
                className={`px-3 py-2 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
              >
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  {spec.label}
                </p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={onEnquire}
            className="w-full bg-orange-600 text-white py-3 font-black text-[10px] uppercase tracking-widest hover:bg-orange-700"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows: { section: string; spec: string; vals: string[] }[] = [
    // Engine
    { section: 'Engine', spec: 'Make', vals: ['CNH (India)', 'CNH (India)', 'CNH (India)'] },
    { section: 'Engine', spec: 'Cylinders', vals: ['4', '4', '4'] },
    { section: 'Engine', spec: 'Displacement (L)', vals: ['2.80', '2.80', '2.80'] },
    { section: 'Engine', spec: 'Air Intake', vals: ['Turbo Intercooled', 'Turbo Intercooled', 'Turbo Intercooled'] },
    { section: 'Engine', spec: 'Fuel Injection', vals: ['CRDI Electronic', 'CRDI Electronic', 'CRDI Electronic'] },
    { section: 'Engine', spec: 'Emission Level', vals: ['CEV Stage-V', 'CEV Stage-V', 'CEV Stage-V'] },
    { section: 'Engine', spec: 'Max. Gross Power (kW/hp)', vals: ['54.6 / 74', '54.6 / 74', '54.6 / 74'] },
    { section: 'Engine', spec: 'Max. Gross Torque (Nm)', vals: ['375 @ 1400 rpm', '375 @ 1400 rpm', '375 @ 1400 rpm'] },
    // Dimensions & Weight
    { section: 'Dimensions & Weight', spec: 'Operating Weight (kg)', vals: ['7600', '7700', '7800 / 7700'] },
    { section: 'Dimensions & Weight', spec: 'Transport Length (m)', vals: ['5.88', '5.96', '6.06'] },
    { section: 'Dimensions & Weight', spec: 'Width over Stabilizer (m)', vals: ['2.27', '2.27', '2.27'] },
    { section: 'Dimensions & Weight', spec: 'Height to Top of Cabin (m)', vals: ['2.83', '2.83', '2.83'] },
    { section: 'Dimensions & Weight', spec: 'Wheelbase (m)', vals: ['2.18', '2.18', '2.18'] },
    { section: 'Dimensions & Weight', spec: 'Ground Clearance (m)', vals: ['0.38', '0.38', '0.38'] },
    // Loader
    { section: 'Loader', spec: 'Dump Height (m)', vals: ['2.73', '2.73', '2.72'] },
    { section: 'Loader', spec: 'Load Over Height (m)', vals: ['3.3', '3.3', '3.3'] },
    { section: 'Loader', spec: 'Bucket Capacity (m³)', vals: ['1.1', '1.1', '1.2'] },
    { section: 'Loader', spec: 'Max. Payload (kg)', vals: ['1925', '1925', '2050'] },
    { section: 'Loader', spec: 'Max. Lifting Capacity (kg)', vals: ['3430', '3650', '3650'] },
    { section: 'Loader', spec: 'Bucket Breakout Force (kgf)', vals: ['5400', '5650', '5000'] },
    // Backhoe
    { section: 'Backhoe', spec: 'Max. Dig Depth (m)', vals: ['4.4', '4.70', '4.7'] },
    { section: 'Backhoe', spec: 'Reach at Ground (m)', vals: ['5.63', '5.90', '5.90'] },
    { section: 'Backhoe', spec: 'Max. Working Height (m)', vals: ['5.5', '5.7', '5.7'] },
    { section: 'Backhoe', spec: 'Bucket Capacity (m³)', vals: ['0.26', '0.3', '0.3 / 0.41'] },
    { section: 'Backhoe', spec: 'Bucket Rotation (deg)', vals: ['204° & 160°', '204° & 160°', '204° & 160°'] },
    { section: 'Backhoe', spec: 'Max. Lift Capacity (kg)', vals: ['1417', '1477', '1477'] },
    { section: 'Backhoe', spec: 'Dipper Tearout Force (kgf)', vals: ['3200', '3900', '3900'] },
    // Hydraulics
    { section: 'Hydraulics', spec: 'System Type', vals: ['Open Center LS', 'Open Center LS', 'Open Center LS'] },
    { section: 'Hydraulics', spec: 'Hydraulic Type', vals: ['Variable Displacement', 'Variable Displacement', 'Variable Displacement'] },
    { section: 'Hydraulics', spec: 'Pump Flow (lpm)', vals: ['119', '143', '143'] },
    { section: 'Hydraulics', spec: 'Relief Pressure (bar)', vals: ['235', '250', '250'] },
    // Drivetrain
    { section: 'Drivetrain', spec: 'Transmission', vals: ['4F-4R Power Shuttle', '4F-4R Power Shuttle', '4F-4R Power Shuttle'] },
    { section: 'Drivetrain', spec: 'Drive Options', vals: ['2WD / 4WD', '2WD / 4WD', '2WD / 4WD'] },
    // Travel Speed
    { section: 'Travel Speed', spec: 'Forward 1st/2nd/3rd/4th (kmph)', vals: ['5.7 / 9.3 / 19.5 / 34', '5.7 / 9.3 / 19.5 / 34', '5.7 / 9.3 / 19.5 / 34'] },
    { section: 'Travel Speed', spec: 'Reverse 1st/2nd (kmph)', vals: ['7.0 / 11.5', '7.0 / 11.5', '7.0 / 11.5'] },
  ];

  const sections = Array.from(new Set(rows.map((r) => r.section)));

  return (
    <section id="comparison" className="py-16 md:py-24 px-4 md:px-6 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-orange-600 font-black uppercase text-[10px] tracking-widest mb-2 block">
            Side-by-Side
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Model Comparison
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Backhoe Loaders — 770 NX · 770NX Magnum · 851 NX</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[640px]">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="border border-slate-700 px-4 py-3 text-left font-black text-[10px] uppercase tracking-widest w-[200px]">
                  Parts
                </th>
                <th className="border border-slate-700 px-4 py-3 text-left font-black text-[10px] uppercase tracking-widest w-[240px]">
                  Specifications
                </th>
                <th className="border border-slate-700 px-4 py-3 text-center font-black text-[10px] uppercase tracking-widest">
                  770 NX
                </th>
                <th className="border border-slate-700 px-4 py-3 text-center font-black text-[10px] uppercase tracking-widest">
                  770 NX Magnum
                </th>
                <th className="border border-slate-700 px-4 py-3 text-center font-black text-[10px] uppercase tracking-widest">
                  851 NX
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => {
                const sectionRows = rows.filter((r) => r.section === section);
                return sectionRows.map((row, rowIdx) => (
                  <tr
                    key={`${section}-${rowIdx}`}
                    className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    {rowIdx === 0 && (
                      <td
                        rowSpan={sectionRows.length}
                        className="border border-slate-200 px-4 py-2 font-black text-[10px] uppercase tracking-widest text-white bg-slate-700 align-top"
                      >
                        {section}
                      </td>
                    )}
                    <td className="border border-slate-200 px-4 py-2 text-slate-600 text-xs font-semibold">
                      {row.spec}
                    </td>
                    {row.vals.map((v, vi) => (
                      <td
                        key={vi}
                        className="border border-slate-200 px-4 py-2 text-xs font-bold text-center text-slate-900"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CaseConstructionSite() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('backhoe');
  const [enquiryModel, setEnquiryModel] = useState<string | null>(null);

  const fleetData: Record<string, FleetModel[]> = {
    backhoe: [
      {
        name: '770NX',
        image: '/images/fleet/770NX_96x49-01 (1).jpg',
        hp: '74 hp',
        weight: '7,600 kg',
        desc:
          'The 770NX delivers outstanding performance with dual power curves and a CEV Stage-V compliant engine. Designed for versatile excavation and loading tasks on demanding Indian job sites.',
        highlights: [
          'CEV Emission Stage-V compliant engine',
          'Dual power curves for optimal fuel efficiency',
          'Open Center Load Sensing hydraulic system',
          'CARRARO 2WD/4WD drivetrain options',
          'Rock breaker hydraulic circuit ready',
          'Cold start capability up to -20°C',
        ],
        specs: [
          { label: 'Engine Power', value: '54.6 kW / 74 hp' },
          { label: 'Operating Weight', value: '7,600 kg' },
          { label: 'Max Dig Depth', value: '4.4 m' },
          { label: 'Loader Bucket', value: '1.1 m³' },
          { label: 'Pump Flow', value: '119 lpm' },
          { label: 'Max Payload', value: '1,925 kg' },
          { label: 'Max Lift (Loader)', value: '3,430 kg' },
          { label: 'Gross Torque', value: '375 Nm @ 1400 rpm' },
        ],
      },
      {
        name: '770NX MAGNUM',
        image: '/images/fleet/770_Magnum_96x49-01.jpg',
        hp: '74 hp',
        weight: '7,700 kg',
        desc:
          'The 770NX Magnum upgrades the standard 770NX with reinforced hydraulics, higher breakout forces, and greater digging reach — purpose-built for more demanding excavation and heavy loading operations.',
        highlights: [
          'Higher hydraulic pump flow — 143 lpm vs 119 lpm',
          'Increased system relief pressure — 250 bar',
          'Greater dig depth — 4.70 m',
          'Higher bucket & arm breakout forces',
          'Max lifting capacity: 3,650 kg',
          '15 ft extendable dipper option (+1.2 m reach)',
        ],
        specs: [
          { label: 'Engine Power', value: '54.6 kW / 74 hp' },
          { label: 'Operating Weight', value: '7,700 kg' },
          { label: 'Max Dig Depth', value: '4.70 m' },
          { label: 'Loader Bucket', value: '1.1 m³' },
          { label: 'Pump Flow', value: '143 lpm' },
          { label: 'Max Payload', value: '1,925 kg' },
          { label: 'Max Lift (Loader)', value: '3,650 kg' },
          { label: 'Relief Pressure', value: '250 bar' },
        ],
      },
      {
        name: '851NX',
        image: '/images/fleet/851NX_96x49_5x3.jpg',
        hp: '74 hp',
        weight: '7,800 kg',
        // FIXED: escaped the apostrophe in "CASE's"
        desc:
          'The 851NX is CASE\'s highest-spec backhoe loader, offering the largest loader bucket in class at 1.2 m³, maximum payload of 2,050 kg, and a wide selection of backhoe bucket sizes for all applications.',
        highlights: [
          'Largest loader bucket — 1.2 m³ standard',
          'Max payload: 2,050 kg',
          'Backhoe bucket range: 0.08 to 0.4 m³',
          'Dig depth of 4.7 m — superior reach',
          'Max loader lift capacity: 3,650 kg',
          '15 ft extendable dipper option',
        ],
        specs: [
          { label: 'Engine Power', value: '54.6 kW / 74 hp' },
          { label: 'Operating Weight', value: '7,800 kg' },
          { label: 'Max Dig Depth', value: '4.7 m' },
          { label: 'Loader Bucket', value: '1.2 m³' },
          { label: 'Pump Flow', value: '143 lpm' },
          { label: 'Max Payload', value: '2,050 kg' },
          { label: 'Max Lift (Loader)', value: '3,650 kg' },
          { label: 'Relief Pressure', value: '250 bar' },
        ],
      },
    ],
    compactors: [
      {
        name: '1107NX Soil',
        image: '/images/fleet/Compactor_1107NX_96x49-01.jpg',
        hp: '101 hp',
        weight: '11,100 kg',
        desc:
          'The 1107NX is built for road construction and soil compaction. Its high stability chassis and powerful drum deliver consistent compaction in all conditions.',
        highlights: [
          'High stability chassis for road construction',
          'Powerful vibratory drum system',
          'Suited for large-scale earthmoving projects',
          'Excellent maneuverability on confined sites',
        ],
        specs: [
          { label: 'Engine Power', value: '101 hp' },
          { label: 'Operating Weight', value: '11,100 kg' },
          { label: 'Application', value: 'Soil Compaction' },
          { label: 'Drive', value: '4WD' },
        ],
      },
      {
        name: 'Tandem Vibratory',
        image: '/images/fleet/450_DX_96x49-01.jpg',
        hp: '74 hp',
        weight: '9,200 kg',
        desc:
          'The Tandem Vibratory Roller is designed for precision asphalt finishing. Twin drums provide uniform compaction and smooth surface results on road paving projects.',
        highlights: [
          'Twin drum design for uniform compaction',
          'Precision asphalt finishing capability',
          'Suitable for road paving and resurfacing',
          'Compact profile for tight urban sites',
        ],
        specs: [
          { label: 'Engine Power', value: '74 hp' },
          { label: 'Operating Weight', value: '9,200 kg' },
          { label: 'Application', value: 'Asphalt Compaction' },
          { label: 'Drum Config', value: 'Tandem' },
        ],
      },
    ],
    excavators: [
      {
        name: 'CX220C',
        image: '/images/fleet/Cx220C.jpg',
        hp: '157 hp',
        weight: '21,600 kg',
        desc:
          'The CX220C crawler excavator features an intelligent hydraulic management system for fast cycle times and high productivity on heavy earthmoving and demolition jobs.',
        highlights: [
          'Intelligent hydraulic system — fast cycle times',
          'High digging force for tough terrain',
          'Fuel-efficient Tier 4 / Stage V engine',
          'Spacious air-conditioned cab',
          'Multiple work modes for varied applications',
        ],
        specs: [
          { label: 'Engine Power', value: '157 hp' },
          { label: 'Operating Weight', value: '21,600 kg' },
          { label: 'Undercarriage', value: 'Standard Track' },
          { label: 'Application', value: 'Heavy Excavation' },
        ],
      },
      {
        name: 'CX220C LC',
        image: '/images/fleet/Chex_96x49_9x6.jpg',
        hp: '157 hp',
        weight: '22,220 kg',
        desc:
          'The CX220C LC features an extended long carriage (LC) undercarriage for improved stability on soft or sloped terrain. Ideal for heavy-duty digging where ground bearing is critical.',
        highlights: [
          'Extended LC undercarriage for stability',
          'Higher ground pressure distribution',
          'Suited for soft soil and waterlogged terrain',
          'Same high-output engine as standard CX220C',
        ],
        specs: [
          { label: 'Engine Power', value: '157 hp' },
          { label: 'Operating Weight', value: '22,220 kg' },
          { label: 'Undercarriage', value: 'Long Carriage (LC)' },
          { label: 'Application', value: 'Heavy Excavation' },
        ],
      },
    ],
    dozers: [
      {
        name: '1105L',
        image: '/images/fleet/trator-esteira-case-1150L.banner_.webp',
        hp: '132 hp',
        weight: '13,625 kg',
        desc:
          'The 1105L crawler dozer delivers efficient earthmoving with PAT blade technology for automatic tilt and angle adjustments — reducing operator effort and speeding up cycle times.',
        highlights: [
          'PAT blade technology — auto tilt & angle',
          'Efficient fuel consumption for long shifts',
          'Reliable hydrostatic transmission',
          'Excellent visibility from cab',
        ],
        specs: [
          { label: 'Engine Power', value: '132 hp' },
          { label: 'Operating Weight', value: '13,625 kg' },
          { label: 'Blade Tech', value: 'PAT Blade' },
          { label: 'Transmission', value: 'Hydrostatic' },
        ],
      },
      {
        name: '1650L',
        image: '/images/fleet/crawler-dozers-1650l.webp',
        hp: '158 hp',
        weight: '17,960 kg',
        desc:
          'The 1650L is equipped with a dual-path hydrostatic transmission for smooth, responsive steering control. Suited for precision grading on large infrastructure and mining sites.',
        highlights: [
          'Dual-path hydrostatic transmission',
          'Smooth independent track steering',
          'Robust undercarriage for rugged terrain',
          'High-performance hydraulic blade control',
        ],
        specs: [
          { label: 'Engine Power', value: '158 hp' },
          { label: 'Operating Weight', value: '17,960 kg' },
          { label: 'Transmission', value: 'Dual-Path Hydrostatic' },
          { label: 'Application', value: 'Precision Grading' },
        ],
      },
      {
        name: '2050M',
        image: '/images/fleet/Dozzer_96x49-01.jpg',
        hp: '214 hp',
        weight: '20,592 kg',
        desc:
          'The 2050M is CASE\'s most powerful dozer, engineered for the toughest heavy earthmoving and mining operations. It delivers maximum force and reliability even in extreme conditions.',
        highlights: [
          'Highest power output in CASE dozer range',
          'Maximum pushing force for heavy earthwork',
          'Built for mining and large infrastructure',
          'Robust chassis for continuous operation',
        ],
        specs: [
          { label: 'Engine Power', value: '214 hp' },
          { label: 'Operating Weight', value: '20,592 kg' },
          { label: 'Class', value: 'Large Dozer' },
          { label: 'Application', value: 'Heavy Earthmoving' },
        ],
      },
    ],
  };

  const categories = [
    { id: 'backhoe', label: 'Backhoe Loaders' },
    { id: 'compactors', label: 'Compactors' },
    { id: 'excavators', label: 'Crawler Excavators' },
    { id: 'dozers', label: 'Crawler Dozers' },
  ];

  const serviceSpecs: ServiceSpec[] = [
    {
      title: 'CASE Care',
      tagline: 'Smart Maintenance for Maximum Performance',
      desc: 'An annual, cost-effective service plan that keeps your machine in top condition and reduces downtime.',
      points: [
        'Priority Service: Fast response within 8 hours',
        'Expert Support: Skilled engineers with right tools',
        'Proactive Maintenance: Prevent issues before they occur',
        'Higher Resale Value: Maintain long-term worth',
      ],
    },
    {
      title: 'CASE Care Gold',
      tagline: 'Total Peace of Mind',
      desc: 'Upgrade with a premium maintenance plan designed for maximum efficiency and zero worries.',
      points: [
        'Priority Service: Quick support when you need it',
        'Proactive Care: Fix issues before they grow',
        'Parts Discounts: Save on genuine CASE parts',
        'Cost Protection: No surprises during the contract',
      ],
    },
    {
      title: 'CASE Protect',
      tagline: 'Extended Warranty You Can Trust',
      desc: 'A comprehensive extended warranty designed for reliability, performance, and peace of mind.',
      points: [
        'Full Coverage: Engine, transmission, hydraulics & more',
        'Expert Support: Trained engineers & genuine parts',
        'Flexible Plans: Suited to your needs and budget',
        'Zero Hassle Service: Smooth maintenance support',
      ],
    },
  ];

  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-orange-600 selection:text-white">

      {/* ENQUIRY MODAL */}
      {enquiryModel && (
        <EnquiryModal productName={enquiryModel} onClose={() => setEnquiryModel(null)} />
      )}

      {/* 1. NAVBAR */}
      <nav className="sticky top-0 w-full bg-white text-slate-900 z-[100] border-b-4 border-orange-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <button
            onClick={() => {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-start cursor-pointer"
          >
            <span className="font-black text-2xl md:text-3xl tracking-tighter leading-none text-slate-900">CASE</span>
            <span className="text-[9px] md:text-[10px] font-bold text-orange-600 uppercase tracking-widest">
              Construction India
            </span>
          </button>
          <div className="hidden md:flex gap-6 lg:gap-10 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <a href="/" className="hover:text-orange-600">Home</a>
            <a href="#about" className="hover:text-orange-600">About</a>
            <a href="#fleet" className="hover:text-orange-600">Products</a>
            <a href="#services" className="hover:text-orange-600">Services</a>
            <a href="#refurbish" className="hover:text-orange-600">Refurbish</a>
            <a href="#contact" className="hover:text-orange-600">Contact</a>
          </div>
          <a
            href="#contact"
            className="bg-orange-600 text-white px-5 md:px-8 py-2 md:py-3 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-orange-700"
          >
            Get Quote
          </a>
        </div>
      </nav>

      {/* 2. HERO */}
      <section id="hero" className="relative min-h-[90vh] flex items-center bg-slate-100 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/fleet/770NX_96x49-01 (1).jpg"
            alt="Hero Background"
            fill
            className="object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full text-slate-900">
          <div className="max-w-3xl">
            <span className="bg-orange-600 text-white px-3 md:px-4 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 inline-block">
              Engineering Excellence since 1842
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase tracking-tighter mb-6 md:mb-8 text-slate-900">
              Built for <br />
              <span className="text-orange-600 italic">The Bold.</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 font-medium max-w-xl leading-relaxed">
              Dominate the job site with precision-engineered machinery designed for India's toughest terrains.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 font-black text-xs uppercase tracking-widest">
              <a href="#fleet" className="bg-orange-600 text-white px-8 md:px-12 py-4 md:py-5 hover:bg-orange-700">
                Explore Catalog
              </a>
              <a
                href="#services"
                className="border-2 border-slate-300 text-slate-900 px-8 md:px-12 py-4 md:py-5 hover:bg-slate-900 hover:text-white hover:border-slate-900"
              >
                Service Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 bg-white p-8 md:p-16 border border-slate-200 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8">
                  Pithampur: <br /> The Heart of Production.
                </h2>
                <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                  Our state-of-the-art manufacturing facility in Madhya Pradesh is a benchmark for "Make in India." We
                  engineer precision machinery that empowers national infrastructure.
                </p>
              </div>
              <div className="mt-8 md:mt-12 flex gap-8 md:gap-12 font-black">
                <div>
                  <p className="text-3xl md:text-4xl text-orange-600">180+</p>
                  <p className="text-[9px] md:text-[10px] uppercase text-slate-400">Years of Legacy</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl text-slate-900">75+</p>
                  <p className="text-[9px] md:text-[10px] uppercase text-slate-400">Global Markets</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-8 md:p-12 flex flex-col justify-center items-center text-center">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-white flex items-center justify-center mb-6 md:mb-8 font-black italic text-xl md:text-2xl text-orange-600">
                !
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase mb-3 md:mb-4 tracking-tighter text-slate-900">
                Reliability <br /> Guaranteed.
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Every CASE machine undergoes rigorous testing in 45°C+ heat to ensure maximum uptime on-site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLEET */}
      <section id="fleet" className="py-16 md:py-24 px-4 md:px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
            <div>
              <span className="text-orange-600 font-black uppercase text-[10px] tracking-widest mb-2 block">
                Our Equipment
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                THE PRODUCTS.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 font-bold text-[9px] md:text-[10px] uppercase tracking-widest border-2 ${
                    activeTab === cat.id
                      ? 'bg-orange-600 border-orange-600 text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {fleetData[activeTab as keyof typeof fleetData].map((model, i) => (
              <FleetCard key={i} model={model} onEnquire={() => setEnquiryModel(model.name)} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE */}
      <ComparisonTable />

      {/* 6. SERVICES */}
      <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <span className="text-orange-600 font-black uppercase text-[9px] md:text-[10px] tracking-widest mb-4 block">
              Rely on CASE to deliver for you
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 md:mb-6">
              CASE Service Solutions
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Discover a portfolio of services customized for your machine and your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceSpecs.map((srv, i) => (
              <div key={i} className="bg-white p-8 md:p-10 border-2 border-slate-200 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-2 border-b-4 border-orange-600 pb-2 inline-block">
                  {srv.title}
                </h3>
                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-orange-600 mb-4 md:mb-6">
                  {srv.tagline}
                </p>
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

      {/* 7. REFURBISHMENT */}
      <section id="refurbish" className="py-16 md:py-24 px-4 md:px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <span className="text-orange-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-4 block">
              Refurbishment Center
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 md:mb-8">
              Extend your <br /> Machine life.
            </h2>
            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-8 md:mb-10 italic">
              Restore your fleet to zero-hour performance using 100% genuine parts.
            </p>
            <div className="space-y-3 md:space-y-4 font-black text-[10px] md:text-xs uppercase tracking-widest">
              {['100% Genuine Parts', 'Factory Certified Engineers', 'Extended Warranty'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-orange-600 font-black">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-8 md:p-12 border border-slate-200">
            <h3 className="text-lg font-black uppercase tracking-tighter mb-6 border-b border-slate-200 pb-4">
              Request Inspection
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Machine Model"
                  className="w-full bg-white border border-slate-200 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
                <input
                  type="text"
                  placeholder="Hours Logged"
                  className="w-full bg-white border border-slate-200 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
              </div>
              <input
                type="text"
                placeholder="Serial Number"
                className="w-full bg-white border border-slate-200 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
              />
              <button className="w-full bg-orange-600 text-white py-4 md:py-5 font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-orange-700">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12 text-slate-900">
              Connect <br /> with Experts.
            </h2>
            <div className="space-y-8 md:space-y-12">
              <div>
                <p className="text-orange-600 font-black uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">Toll Free Support</p>
                <p className="text-2xl md:text-4xl font-black text-slate-900">1800-419-7777</p>
              </div>
              <div>
                <p className="text-orange-600 font-black uppercase text-[9px] md:text-[10px] mb-3 md:mb-4">Transmission</p>
                <p className="text-xl md:text-2xl font-bold underline underline-offset-8 decoration-orange-600 text-slate-900">
                  fleet.support@caseindia.com
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 lg:p-14 text-zinc-900 border border-slate-200">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8">Contact Us</h3>
            <div className="space-y-4 md:space-y-5">
              <select className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs text-slate-500 outline-none focus:border-orange-600">
                <option>Nature of Inquiry</option>
                <option>Product Sales</option>
                <option>Service & Support</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
                <div className="flex bg-slate-50 border border-slate-100 p-3 md:p-4 items-center">
                  <span className="text-xs font-bold mr-2 text-zinc-400">+91</span>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-transparent outline-none text-xs font-bold w-full text-zinc-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
                <input
                  type="text"
                  placeholder="Business Address"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs text-slate-500 outline-none">
                  <option>India</option>
                </select>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Comments"
                className="w-full bg-slate-50 border border-slate-100 p-3 md:p-4 font-bold text-xs outline-none focus:border-orange-600 resize-none"
              />
              <div className="space-y-3 md:space-y-4 py-4 text-[9px] md:text-[10px] font-black uppercase text-slate-500">
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-orange-600 h-4 w-4" />
                  <span>
                    I have read the <span className="text-orange-600 underline">Privacy Notice</span>
                  </span>
                </label>
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-orange-600 h-4 w-4" />
                  <span>CNH Marketing Activities</span>
                </label>
              </div>
              <button className="w-full bg-orange-600 text-white py-5 md:py-6 font-black uppercase text-sm tracking-widest hover:bg-orange-700">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 md:py-12 bg-slate-900 text-center text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">
        © 2026 CASE CONSTRUCTION INDIA
      </footer>
    </main>
  );
}