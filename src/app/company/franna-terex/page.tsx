"use client";
import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const T = {
  bg:       "#FFFFFF",
  bgGrey:   "#F7F7F7",
  bgCard:   "#FFFFFF",
  navy:     "#0B1F3A",
  navyMid:  "#163155",
  orange:   "#E55300",
  text:     "#111111",
  textMid:  "#444444",
  textLight:"#777777",
  border:   "#E2E6EA",
  borderMid:"#CBD2DA",
};

/* ─────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────── */
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Oswald:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body { font-family: 'DM Sans', sans-serif; background: ${T.bg}; color: ${T.text}; -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; }
  img { display: block; }

  /* INPUTS */
  .inp {
    width: 100%; padding: 11px 14px;
    border: 1px solid ${T.border}; background: ${T.bg};
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: ${T.text};
    outline: none; transition: border-color .2s;
    border-radius: 0;
  }
  .inp:focus { border-color: ${T.navy}; }
  .inp::placeholder { color: #AABBCC; }
  textarea.inp { resize: vertical; }

  /* BUTTONS */
  .btn-navy {
    display: inline-block; padding: 11px 28px;
    background: ${T.navy}; color: #fff;
    font-family: 'Oswald', sans-serif; font-weight: 500;
    font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
    border: 2px solid ${T.navy}; transition: background .2s, color .2s;
    cursor: pointer;
  }
  .btn-navy:hover { background: ${T.navyMid}; border-color: ${T.navyMid}; }

  .btn-outline {
    display: inline-block; padding: 10px 26px;
    background: transparent; color: ${T.navy};
    font-family: 'Oswald', sans-serif; font-weight: 500;
    font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
    border: 2px solid ${T.navy}; transition: background .2s, color .2s;
    cursor: pointer;
  }
  .btn-outline:hover { background: ${T.navy}; color: #fff; }

  .btn-orange {
    display: inline-block; padding: 11px 28px;
    background: ${T.orange}; color: #fff;
    font-family: 'Oswald', sans-serif; font-weight: 500;
    font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
    border: 2px solid ${T.orange}; transition: background .2s;
    cursor: pointer;
  }
  .btn-orange:hover { background: #cc4900; border-color: #cc4900; }

  /* SECTION LABEL */
  .eyebrow {
    font-family: 'Oswald', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: .14em; text-transform: uppercase;
    color: ${T.orange}; display: block; margin-bottom: 10px;
  }
  /* SECTION TITLE */
  .section-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700; text-transform: uppercase;
    color: ${T.navy}; line-height: 1.05; margin-bottom: 14px;
  }
  /* BODY TEXT */
  .body-text {
    font-size: 15px; color: ${T.textMid};
    line-height: 1.75; font-weight: 400;
  }

  /* NAV LINK */
  .nav-link {
    font-family: 'Oswald', sans-serif;
    font-size: 13px; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    color: ${T.navy}; transition: color .2s;
  }
  .nav-link:hover { color: ${T.orange}; }

  /* CRANE DROPDOWN */
  .crane-nav-item {
    position: relative;
  }
  .crane-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: ${T.bg};
    border: 1px solid ${T.border};
    border-top: 2px solid ${T.navy};
    min-width: 180px;
    z-index: 400;
    box-shadow: 0 4px 16px rgba(11,31,58,.10);
  }
  .crane-dropdown-item {
    display: block;
    width: 100%;
    padding: 10px 16px;
    font-family: 'Oswald', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: ${T.navy};
    background: none;
    border: none;
    border-bottom: 1px solid ${T.border};
    text-align: left;
    cursor: pointer;
    transition: background .15s, color .15s;
  }
  .crane-dropdown-item:last-child { border-bottom: none; }
  .crane-dropdown-item:hover { background: ${T.bgGrey}; color: ${T.orange}; }

  /* CRANE CARD */
  .crane-card {
    background: ${T.bgCard}; border: 1px solid ${T.border};
    display: flex; flex-direction: column;
    transition: box-shadow .25s, transform .25s;
  }
  .crane-card:hover {
    box-shadow: 0 8px 32px rgba(11,31,58,.10);
    transform: translateY(-3px);
  }

  /* WHY CARD */
  .why-card {
    padding: 28px 24px; background: ${T.bg};
    border: 1px solid ${T.border};
    border-top: 3px solid ${T.navy};
    transition: border-top-color .2s;
  }
  .why-card:hover { border-top-color: ${T.orange}; }

  /* SERVICE CARD */
  .svc-card {
    padding: 24px 22px; background: ${T.bgGrey};
    border-left: 3px solid ${T.navy};
  }

  /* MODAL OVERLAY */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 800;
    background: rgba(11,31,58,.45); backdrop-filter: blur(3px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }

  /* UTILITY */
  .divider { width: 36px; height: 3px; background: ${T.orange}; margin-bottom: 20px; }
  .tag {
    display: inline-block;
    font-family: 'Oswald', sans-serif;
    font-size: 10px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
    padding: 3px 10px; border: 1px solid ${T.border}; color: ${T.textLight};
    background: ${T.bgGrey};
  }

  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .cranes-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 700px) {
    .cranes-grid { grid-template-columns: 1fr !important; }
    .hero-grid  { grid-template-columns: 1fr !important; }
    .about-grid { grid-template-columns: 1fr !important; }
    .why-grid   { grid-template-columns: 1fr 1fr !important; }
    .svc-grid   { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .footer-grid  { grid-template-columns: 1fr 1fr !important; }
    .mob-hide { display: none !important; }
    .mob-pad { padding: 48px 20px !important; }
    .mob-pad-sm { padding: 36px 20px !important; }
  }
`;

/* ─────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────── */
const cranes: Crane[] = [
  {
    id: "at15",
    name: "Franna AT 15-3",
    shortName: "AT 15-3",
    tag: "Compact Lifter",
    img: "/franna/Franna AT 15-3.jpg",
    description:
      "The Franna AT 15-3 is a compact, highly manoeuvrable articulated pick and carry crane engineered for fast deployment in confined urban environments. Its outrigger-free design allows immediate lifting from the moment it arrives on site, with no setup time required.",
    specs: [
      { label: "Max Capacity",     value: "15 t" },
      { label: "Max Reach",        value: "11.81 m" },
      { label: "Hook Height",      value: "17 m" },
      { label: "Engine",           value: "170 kW Mercedes Diesel" },
      { label: "Drive",            value: "4-wheel drive, articulated" },
      { label: "Travel Speed",     value: "Up to 25 km/h on site" },
      { label: "Boom Type",        value: "Telescopic, full-power" },
      { label: "Outriggers",       value: "None required" },
    ],
    features: [
      "Outrigger-free articulated design for instant operation",
      "Compact footprint — ideal for congested job sites",
      "Full-power telescopic boom with smooth extension",
      "Reliable Mercedes diesel engine",
      "Four-wheel drive for rough terrain performance",
    ],
    application:
      "Tight urban spaces, industrial maintenance, building construction, machine installation in confined areas, factory floor lifts.",
  },
  {
    id: "at22",
    name: "Franna AT 22",
    shortName: "AT 22",
    tag: "Heavy Builder",
    img: "/franna/Franna AT 22.jpg",
    description:
      "The Franna AT 22 bridges the gap between compact urban lifting and serious heavy-duty construction work. With a rated capacity of up to 22 tonnes and a high-speed road travel capability of 85 km/h, it moves quickly between jobs while delivering outstanding lift performance.",
    specs: [
      { label: "Max Capacity",       value: "16.8 – 22 t" },
      { label: "Max Reach",          value: "11.75 m" },
      { label: "Engine",             value: "205 kW Diesel" },
      { label: "Travel Speed",       value: "85 km/h (road registered)" },
      { label: "Drive",              value: "Articulated 4-wheel drive" },
      { label: "Boom Type",          value: "Telescopic, full-power" },
      { label: "Outriggers",         value: "None required" },
      { label: "Gross Vehicle Mass", value: "Compliant for public roads" },
    ],
    features: [
      "Road speed of 85 km/h — fastest pick & carry available",
      "High capacity range: 16.8 t to 22 t",
      "Full-power telescopic boom for smooth, controlled lifts",
      "Outrigger-free operation — no setup delay",
      "Articulated chassis for tight-space manoeuvrability",
    ],
    application:
      "Heavy-duty building construction, precast concrete placement, steel erection, infrastructure projects, multi-site operations.",
  },
  {
    id: "at40",
    name: "Franna AT 40",
    shortName: "AT 40",
    tag: "Flagship · 40 Tonne",
    img: "/franna/Franna AT 40.jpg",
    description:
      "The Franna AT 40 is the flagship of the range — a 40-tonne class pick and carry crane built for large infrastructure, mining, and heavy industrial applications.",
    specs: [
      { label: "Max Capacity",      value: "40 t" },
      { label: "Hook Height",       value: "19 m" },
      { label: "Boom Length",       value: "19.8 m (full extension)" },
      { label: "Drive",             value: "Articulated 4-wheel drive" },
      { label: "Outriggers",        value: "None required" },
      { label: "Application Class", value: "Mining, Infrastructure, Industrial" },
      { label: "Boom Type",         value: "Telescopic, full-power" },
      { label: "Certification",     value: "Meets Australian & international standards" },
    ],
    features: [
      "40-tonne capacity — the highest in the Franna range",
      "19.8 m telescopic boom for maximum hook height",
      "Outrigger-free design — immediate operation on arrival",
      "Proven in heavy mining and infrastructure environments",
      "Articulated chassis for performance in difficult terrain",
    ],
    application:
      "Large infrastructure projects, open-cut mining, heavy industrial maintenance, plant and equipment installation, structural steel erection at scale.",
  },
  {
    id: "mac25",
    name: "Franna MAC 25-4",
    shortName: "MAC 25-4",
    tag: "Superlift System",
    img: "/franna/Franna MAC 25-4.webp",
    description:
      "The Franna MAC 25-4 is a 25-tonne articulated pick and carry crane featuring the unique Franna Superlift system, which increases rated capacity by up to 30% when activated. ",
    specs: [
      { label: "Max Capacity",   value: "25 t" },
      { label: "Hook Height",    value: "18 m" },
      { label: "Boom Length",    value: "18.4 m" },
      { label: "Superlift Boost",value: "+30% capacity when engaged" },
      { label: "Drive",          value: "Articulated 4-wheel drive" },
      { label: "Outriggers",     value: "None required" },
      { label: "Boom Type",      value: "Telescopic, full-power" },
      { label: "Certifications", value: "Australian standard compliant" },
    ],
    features: [
      "Unique Superlift system: +30% rated capacity boost",
      "25-tonne standard capacity for everyday lifting",
      "18.4 m telescopic boom for extended reach",
      "Outrigger-free articulated design",
      "Versatile across a wide range of lift scenarios",
    ],
    application:
      "Versatile industrial lifting, precast concrete installation, mechanical and electrical plant maintenance, oil & gas facilities, manufacturing and fabrication yards.",
  },
];

const whyItems = [
  { title: "Safety First",          desc: "Every Franna crane meets rigorous international safety certifications. The outrigger-free design reduces site hazards and operator risk." },
  { title: "Continuous Innovation", desc: "Over 40 years of engineering refinement. Franna cranes evolve with the industry — from Superlift technology to advanced drive systems." },
  { title: "Versatility",           desc: "One crane, countless applications. From tight urban sites to open mining environments, the Franna range covers the full spectrum." },
  { title: "Guaranteed Quality",    desc: "Premium materials, rigorous testing, and globally recognised certification. Built to perform reliably across every shift." },
  { title: "Strong Support",        desc: "A global service network ensures fast parts supply, trained technicians, and comprehensive backup — wherever you operate." },
];

const services = [
  { title: "Rental Services", desc: "Access the full Franna range without capital commitment. Flexible short-term and long-term rental plans matched to your project needs." },
  { title: "Maintenance",     desc: "Scheduled and emergency maintenance by factory-trained technicians. Genuine Franna parts. Designed to maximise your crane's uptime." },
  { title: "Parts & Support", desc: "Rapid supply of genuine components through our global parts network. 24/7 technical support for critical operations." },
];

interface CraneSpec {
  label: string;
  value: string;
}

interface Crane {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  img: string;
  description: string;
  specs: CraneSpec[];
  features: string[];
  application: string;
}

interface CraneCardProps {
  crane: Crane;
  onEnquire: (productName: string) => void;
}

/* ─────────────────────────────────────────
   ENQUIRY MODAL
───────────────────────────────────────── */
interface EnquiryModalProps {
  productName: string;
  onClose: () => void;
}

function EnquiryModal({ productName, onClose }: EnquiryModalProps) {
  const [done, setDone] = useState(false);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: T.bg, width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", borderTop: `4px solid ${T.orange}` }}
      >
        {/* Header */}
        <div style={{ padding: "22px 28px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ display: "block", fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: T.orange, marginBottom: 4 }}>Product Enquiry</span>
            <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700, textTransform: "uppercase", color: T.navy }}>{productName}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${T.border}`, color: T.textLight, width: 34, height: 34, fontSize: 15, cursor: "pointer" }}>✕</button>
        </div>

        {done ? (
          <div style={{ padding: "56px 28px", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: T.navy, color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>✓</div>
            <h4 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700, textTransform: "uppercase", color: T.navy, marginBottom: 10 }}>Enquiry Received</h4>
            <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.7, marginBottom: 28 }}>Thank you for your interest in the {productName}. Our team will be in touch shortly.</p>
            <button className="btn-navy" onClick={onClose}>Close</button>
          </div>
        ) : (
          <div style={{ padding: "24px 28px 30px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div><label style={labelStyle}>Full Name *</label><input type="text" placeholder="Your name" className="inp" /></div>
              <div><label style={labelStyle}>Phone *</label><input type="tel" placeholder="+61 XXXX XXXX" className="inp" /></div>
            </div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Email *</label><input type="email" placeholder="you@company.com" className="inp" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div><label style={labelStyle}>Company</label><input type="text" placeholder="Company name" className="inp" /></div>
              <div><label style={labelStyle}>City</label><input type="text" placeholder="City" className="inp" /></div>
            </div>
            <div style={{ marginBottom: 22 }}><label style={labelStyle}>Message</label><textarea rows={3} placeholder="Tell us about your lifting requirement..." className="inp" /></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "10px", fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", background: "none", border: `1px solid ${T.border}`, color: T.textLight, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => setDone(true)} className="btn-orange" style={{ flex: 2, border: "none" }}>Send Enquiry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500,
  letterSpacing: ".1em", textTransform: "uppercase" as const, color: T.textLight, marginBottom: 6,
};

/* ─────────────────────────────────────────
   CRANE CARD
───────────────────────────────────────── */
function CraneCard({ crane, onEnquire }: CraneCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div id={`crane-${crane.id}`} className="crane-card">
      {/* Image */}
      <div style={{ height: 200, overflow: "hidden", background: T.bgGrey, position: "relative" }}>
        {!imgError ? (
          <img
            src={crane.img}
            alt={crane.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
              <path d="M3 17l4-8 4 4 3-5 4 9H3z" /><circle cx="18" cy="5" r="2" />
            </svg>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(11,31,58,.55), transparent)" }} />
        <span className="tag" style={{ position: "absolute", top: 12, left: 12, background: T.navy, color: "#fff", border: "none", borderRadius: 0 }}>{crane.tag}</span>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 20px 0", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: T.navy, marginBottom: 12, lineHeight: 1.1 }}>{crane.name}</h3>
        <p style={{ fontSize: 13.5, color: T.textMid, lineHeight: 1.72, marginBottom: 20 }}>{crane.description}</p>

        {/* Specs */}
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: T.orange, marginBottom: 8 }}>Specifications</p>
          <div style={{ border: `1px solid ${T.border}` }}>
            {crane.specs.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderBottom: i < crane.specs.length - 1 ? `1px solid ${T.border}` : "none",
                  background: i % 2 === 0 ? T.bgGrey : T.bg,
                }}
              >
                <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase", color: T.textLight }}>{s.label}</span>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 600, color: T.navy }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: T.orange, marginBottom: 8 }}>Key Features</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
            {crane.features.map((f, i) => (
              <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: T.textMid, lineHeight: 1.55 }}>
                <span style={{ color: T.orange, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>{f}
              </li>
            ))}
          </ul>
        </div>

        {/* Application */}
        <div style={{ padding: "12px 14px", background: T.bgGrey, borderLeft: `3px solid ${T.navy}`, marginBottom: 20 }}>
          <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.navy, marginBottom: 4 }}>Applications</p>
          <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.6 }}>{crane.application}</p>
        </div>
      </div>

      {/* Enquire Button */}
      <div style={{ padding: "0 20px 20px", marginTop: "auto" }}>
        <button className="btn-navy" onClick={() => onEnquire(crane.name)} style={{ width: "100%", textAlign: "center" }}>
          Enquire Now
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CRANES NAV ITEM WITH DROPDOWN
───────────────────────────────────────── */
function CranesNavItem() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const scrollToCrane = (id: string) => {
    setOpen(false);
    const el = document.getElementById(`crane-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={ref}
      className="crane-nav-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href="#cranes" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
        Cranes
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ marginTop: 1, transition: "transform .15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke={T.navy} strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </a>
      {open && (
        <div className="crane-dropdown">
          {cranes.map((c) => (
            <button
              key={c.id}
              className="crane-dropdown-item"
              onClick={() => scrollToCrane(c.id)}
            >
              {c.shortName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function FrannaLight() {
  const [enquiry, setEnquiry] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactDone, setContactDone] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const NAV_STATIC = [["Home","#top"],["About","#about"],["Services","#services"],["Contact","#contact"]];

  return (
    <main id="top" style={{ background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GS}</style>
      {enquiry && <EnquiryModal productName={enquiry} onClose={() => setEnquiry(null)} />}

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <nav style={{
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  zIndex: 300,
  background: T.bg,
  borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
  boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,.06)" : "none",
}}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#top" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 24, textTransform: "uppercase", color: T.navy, letterSpacing: ".06em" }}>FRANNA</span>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: T.orange }}>Pick &amp; Carry Cranes</span>
          </a>
          {/* Desktop nav */}
          <div className="mob-hide" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            <a href="/" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <CranesNavItem />
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="mob-hide">
            <a href="#contact" className="btn-navy" style={{ fontSize: 12, padding: "9px 22px" }}>Get Quote</a>
          </div>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: `1px solid ${T.border}`, color: T.navy, width: 38, height: 38, fontSize: 18, cursor: "pointer" }}
            className="mob-ham">☰</button>
        </div>
        {mobileOpen && (
          <div style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "8px 0" }}>
            <a href="#top" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 40px", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: T.navy, borderBottom: `1px solid ${T.border}` }}>Home</a>
            <a href="#about" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 40px", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: T.navy, borderBottom: `1px solid ${T.border}` }}>About</a>
            <a href="#cranes" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 40px", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: T.navy, borderBottom: `1px solid ${T.border}` }}>Cranes</a>
            {cranes.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setMobileOpen(false);
                  const el = document.getElementById(`crane-${c.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{ display: "block", width: "100%", padding: "10px 56px", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: T.textLight, background: T.bgGrey, border: "none", borderBottom: `1px solid ${T.border}`, textAlign: "left", cursor: "pointer" }}
              >
                — {c.shortName}
              </button>
            ))}
            <a href="#services" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 40px", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: T.navy, borderBottom: `1px solid ${T.border}` }}>Services</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 40px", fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: T.navy, borderBottom: `1px solid ${T.border}` }}>Contact</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section style={{ background: T.bg, padding: "72px 40px 80px", borderBottom: `1px solid ${T.border}` }} className="mob-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <span className="eyebrow">Pick &amp; Carry Cranes</span>
              <h1 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(44px,6vw,72px)", textTransform: "uppercase", color: T.navy, lineHeight: 1, marginBottom: 20, letterSpacing: ".02em" }}>
                BUILT TO LIFT.<br />BUILT TO MOVE.
              </h1>
              <div className="divider" />
              <p className="body-text" style={{ maxWidth: 440, marginBottom: 36 }}>
                High-performance articulated cranes built for strength, mobility, and efficiency. No outriggers. Immediate operation.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#cranes" className="btn-navy">View Cranes</a>
                <a href="#contact" className="btn-outline">Contact Us</a>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ background: T.bgGrey, overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src="https://images.unsplash.com/photo-1703243053050-ed42aa88e2ac?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Franna crane on site"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: -1, left: -1, background: T.navy, color: "#fff", padding: "16px 22px" }}>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>40+</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginTop: 2 }}>Years of Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <section id="about" style={{ background: T.bgGrey, padding: "80px 40px", borderBottom: `1px solid ${T.border}` }} className="mob-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 72, alignItems: "start" }}>
            <div>
              <span className="eyebrow">About Franna</span>
              <h2 className="section-title">Built for the Real World.</h2>
              <div className="divider" />
              <p className="body-text" style={{ marginBottom: 18 }}>
                Franna pick and carry cranes are built for strength, speed, and flexibility. Their articulated design eliminates outriggers, allowing immediate operation from the moment they arrive on site — no setup, no delay.
              </p>
              <p className="body-text">
                For over 40 years, Franna has been a global leader in crane manufacturing, trusted by construction companies, mining operators, and industrial facilities on every continent.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.borderMid }}>
              {[
                { num: "40+",    label: "Years Experience",    sub: "Global leader since 1985" },
                { num: "15–40T", label: "Capacity Range",      sub: "Full fleet coverage" },
                { num: "85",     label: "km/h Travel Speed",   sub: "Road-registered models" },
                { num: "Zero",   label: "Outriggers Required", sub: "Instant setup. Instant lift." },
              ].map((s, i) => (
                <div key={i} style={{ background: T.bg, padding: "28px 24px" }}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 36, fontWeight: 700, color: i % 2 === 0 ? T.navy : T.orange, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: T.text, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: T.textLight, lineHeight: 1.5 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY FRANNA ══════════════════════════════════════ */}
      <section style={{ background: T.bg, padding: "80px 40px", borderBottom: `1px solid ${T.border}` }} className="mob-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span className="eyebrow">Why Choose Franna</span>
            <h2 className="section-title">The Franna Advantage.</h2>
          </div>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
            {whyItems.map((w, i) => (
              <div key={i} className="why-card">
                <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700, textTransform: "uppercase", color: T.navy, marginBottom: 8, letterSpacing: ".04em" }}>{w.title}</h3>
                <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CRANES ══════════════════════════════════════════ */}
      <section id="cranes" style={{ background: T.bgGrey, padding: "80px 40px", borderBottom: `1px solid ${T.border}` }} className="mob-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="eyebrow">Our Fleet</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Our Cranes.</h2>
            </div>
            <p style={{ fontSize: 14, color: T.textLight, maxWidth: 280, lineHeight: 1.65, textAlign: "right" }}>
              Four articulated pick and carry cranes. Every lifting requirement covered.
            </p>
          </div>

          <div className="cranes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, alignItems: "start" }}>
            {cranes.map(c => <CraneCard key={c.id} crane={c} onEnquire={setEnquiry} />)}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════ */}
      <section id="services" style={{ background: T.bg, padding: "80px 40px", borderBottom: `1px solid ${T.border}` }} className="mob-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
            <div>
              <span className="eyebrow">Service Solutions</span>
              <h2 className="section-title">Beyond the Crane.</h2>
              <div className="divider" />
              <p className="body-text" style={{ marginBottom: 28 }}>
                Franna's service ecosystem keeps your cranes working productively from commissioning through to end of life.
              </p>
              <a href="#contact" className="btn-navy">Contact Service Team</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {services.map((s, i) => (
                <div key={i} className="svc-card">
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, textTransform: "uppercase", color: T.navy, marginBottom: 8, letterSpacing: ".04em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════ */}
      <section id="contact" style={{ background: T.bgGrey, padding: "80px 40px", borderBottom: `1px solid ${T.border}` }} className="mob-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }}>
            <div>
              <span className="eyebrow">Get in Touch</span>
              <h2 className="section-title">Talk to Our Team.</h2>
              <div className="divider" />
              <p className="body-text" style={{ marginBottom: 36 }}>
                Whether you're planning a project, comparing models, or need technical advice — our team is ready to help.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ borderLeft: `3px solid ${T.orange}`, paddingLeft: 16 }}>
                  <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.textLight, marginBottom: 4 }}>Email</p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: T.navy }}>enquiries@franna.com.au</p>
                </div>
                <div style={{ borderLeft: `3px solid ${T.orange}`, paddingLeft: 16 }}>
                  <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.textLight, marginBottom: 4 }}>Phone</p>
                  <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 26, fontWeight: 700, color: T.navy }}>+61 3 9703 3000</p>
                </div>
                <div style={{ borderLeft: `3px solid ${T.orange}`, paddingLeft: 16 }}>
                  <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.textLight, marginBottom: 4 }}>Headquarters</p>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.6 }}>Dandenong South, Victoria<br />Australia</p>
                </div>
              </div>
            </div>

            <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderTop: `3px solid ${T.navy}`, padding: "32px" }}>
              {contactDone ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 52, height: 52, background: T.navy, color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>✓</div>
                  <h4 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 700, textTransform: "uppercase", color: T.navy, marginBottom: 10 }}>Message Sent</h4>
                  <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.7 }}>Thank you. Our team will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: T.navy, marginBottom: 22 }}>Send an Enquiry</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div><label style={labelStyle}>Name *</label><input type="text" placeholder="Your name" className="inp" /></div>
                      <div><label style={labelStyle}>Phone *</label><input type="tel" placeholder="+61 XXXX XXXX" className="inp" /></div>
                    </div>
                    <div><label style={labelStyle}>Email *</label><input type="email" placeholder="you@company.com" className="inp" /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div><label style={labelStyle}>Company</label><input type="text" placeholder="Company" className="inp" /></div>
                      <div><label style={labelStyle}>City</label><input type="text" placeholder="City" className="inp" /></div>
                    </div>
                    <div><label style={labelStyle}>Message</label><textarea rows={4} placeholder="Tell us about your project..." className="inp" /></div>
                    <button className="btn-navy" onClick={() => setContactDone(true)} style={{ border: "none", width: "fit-content", marginTop: 4 }}>Submit Enquiry</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{ background: T.navy, color: "#fff", padding: "40px 40px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 36, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div>
              <p style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 22, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>FRANNA</p>
              <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: T.orange, marginBottom: 16 }}>Pick &amp; Carry Cranes</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.65 }}>Global leaders in articulated pick and carry crane manufacturing since 1985.</p>
            </div>
            {[
              { head: "Cranes",  links: ["AT 15-3", "AT 22", "AT 40", "MAC 25-4"] },
              { head: "Company", links: ["About", "Services", "Contact"] },
              { head: "Support", links: ["Rental", "Maintenance", "Parts"] },
            ].map((col, i) => (
              <div key={i}>
                <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: 14 }}>{col.head}</p>
                {col.links.map((l, j) => <p key={j} style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.45)", marginBottom: 8, letterSpacing: ".04em" }}>{l}</p>)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.25)", letterSpacing: ".04em" }}>© {new Date().getFullYear()} Franna Industries Pty Ltd. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>Dandenong South, VIC, Australia</p>
          </div>
        </div>
      </footer>
    </main>
  );
}