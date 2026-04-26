'use client';
import { useState, useRef } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────
const fleetData = {
  cranes: {
    label: 'Cranes',
    subtypes: {
      pick_and_carry: {
        label: 'Pick & Carry',
        products: [
          {
            name: 'Escorts TRX 2319',
            shortDesc: 'High-performance pick-and-carry crane for construction, industrial and infrastructure environments.',
            image: '/gulati/Escorts TRX 2319 Crane (2).webp',
            highlights: [
              'Maximum capacity: 23 Ton',
              'Boom length: ~19 metres',
              '4×2 / 4×4 drive options',
              'Power steering for precise control',
              'Advanced braking system',
              'Ergonomic operator cabin',
            ],
            specs: [
              { label: 'Max Capacity', value: '23 Ton' },
              { label: 'Boom Length', value: '~19 m' },
              { label: 'Drive Type', value: '4×2 / 4×4' },
              { label: 'Engine', value: 'High-torque Diesel' },
              { label: 'Steering', value: 'Power Steering' },
              { label: 'Tyres', value: 'Heavy-duty Rough Terrain' },
            ],
            overview: 'The Escorts TRX 2319 is a high-performance pick-and-carry crane designed for efficient lifting and smooth mobility across job sites. Built for strength, stability, and ease of operation, it delivers reliable performance in construction, industrial, and infrastructure environments.',
            applications: ['Construction – lifting steel, concrete, and heavy materials', 'Infrastructure – roads, bridges, and large-scale projects', 'Industrial – factories, warehouses, and machinery handling', 'Logistics – yard operations and material movement', 'Maintenance – equipment positioning in plants'],
            whyChoose: ['High lifting capacity with excellent stability', 'Smooth operation with easy maneuverability', 'Built for demanding Indian site conditions', 'Low maintenance with dependable performance', 'Ideal for both lifting and on-site mobility'],
          },
          {
            name: 'Escorts TRX 15',
            shortDesc: 'Compact and efficient pick-and-carry crane ideal for light to medium-duty lifting in confined spaces.',
            image: '/gulati/Escorts TRX 15 Crane.jpg',
            highlights: [
              'Maximum capacity: 14–15 Ton',
              'Boom length: ~15–17 metres',
              'Compact turning radius for tight sites',
              'Fuel-efficient diesel engine',
              'Operator-friendly cabin',
              'Heavy-duty site tyres',
            ],
            specs: [
              { label: 'Max Capacity', value: '14–15 Ton' },
              { label: 'Boom Length', value: '~15–17 m' },
              { label: 'Drive Type', value: '4×2' },
              { label: 'Engine', value: 'Fuel-efficient Diesel' },
              { label: 'Steering', value: 'Power Steering' },
              { label: 'Transmission', value: 'Smooth Gear System' },
            ],
            overview: 'The Escorts TRX 15 Crane is a compact and efficient pick-and-carry crane designed for light to medium-duty lifting. With excellent maneuverability, durability, and ease of operation, it is ideal for construction sites, industrial yards, and material handling tasks in confined spaces.',
            applications: ['Construction – lifting steel, bricks, and materials', 'Industrial – loading, unloading, and internal movement', 'Infrastructure – small to medium-scale projects', 'Yard Operations – storage and logistics handling', 'Maintenance – light lifting and repair tasks'],
            whyChoose: ['Compact design with easy maneuverability', 'Reliable for daily lifting operations', 'Fuel-efficient with low maintenance', 'Ideal for tight and congested sites', 'Cost-effective solution for light-duty work'],
          },
        ],
      },
      truck_cranes: {
        label: 'Truck Cranes',
        products: [
          {
            name: 'SANY STC800C',
            shortDesc: 'Versatile 80-ton truck crane with advanced safety controls for medium to heavy-duty operations.',
            image: '/gulati/SANY STC800C Truck Crane.jpg',
            highlights: [
              'Maximum capacity: 80 Ton',
              'Main boom: ~45–50 m',
              'Jib length: up to 10–16 m',
              'Intelligent SANY control system',
              'Overload protection & anti-tipping',
              'Ergonomic wide-visibility cabin',
            ],
            specs: [
              { label: 'Max Capacity', value: '80 Ton' },
              { label: 'Main Boom', value: '~45–50 m' },
              { label: 'Jib Length', value: 'Up to 16 m' },
              { label: 'Drive', value: 'Multi-axle (3–4 axle)' },
              { label: 'Max Speed', value: '~75–80 km/h' },
              { label: 'Hydraulics', value: 'Advanced Load-Sensing' },
            ],
            overview: 'The SANY STC800C Truck Crane is a versatile and high-performance lifting solution designed for medium to heavy-duty operations. With advanced engineering, intelligent controls, and excellent mobility, it ensures efficient, stable, and reliable performance across construction and industrial projects.',
            applications: ['Construction – structural lifting and material handling', 'Infrastructure – roads, bridges, and civil projects', 'Industrial – equipment installation and plant maintenance', 'Oil & Gas – pipelines and refinery operations', 'Logistics – yard handling and material movement'],
            whyChoose: ['Strong lifting performance with optimal reach', 'Excellent mobility and quick deployment', 'Advanced safety and intelligent control systems', 'Reliable and efficient operation', 'Perfect balance of power, flexibility, and cost-efficiency'],
          },
          {
            name: 'SANY STC1100S',
            shortDesc: 'High-performance 110-ton truck crane built for infrastructure and industrial heavy lifts.',
            image: '/gulati/SANY STC1100S Truck Crane.jpg',
            highlights: [
              'Maximum capacity: 110 Ton',
              'Main boom: ~50–60 m',
              'Jib length: up to 15–25 m',
              'Intelligent SANY safety controls',
              'Real-time monitoring system',
              '4–5 axle multi-drive configuration',
            ],
            specs: [
              { label: 'Max Capacity', value: '110 Ton' },
              { label: 'Main Boom', value: '~50–60 m' },
              { label: 'Jib Length', value: 'Up to 25 m' },
              { label: 'Drive', value: 'Multi-axle (4–5 axle)' },
              { label: 'Max Speed', value: '~75–80 km/h' },
              { label: 'Transmission', value: 'Smooth Automatic' },
            ],
            overview: 'The SANY STC1100S Truck Crane is a high-performance lifting solution designed for medium to heavy-duty operations. With strong lifting capacity, excellent mobility, and advanced control systems, it ensures efficient and reliable performance across construction, industrial, and infrastructure projects.',
            applications: ['Infrastructure – bridges, highways, metro, and civil projects', 'Industrial – power plants, factories, and equipment installation', 'Construction – residential and commercial structural lifting', 'Oil & Gas – pipelines, refineries, and plant operations', 'Logistics – heavy material handling in yards and sites'],
            whyChoose: ['Strong lifting capacity with excellent reach', 'High mobility with quick deployment', 'Advanced safety and intelligent control systems', 'Reliable in demanding working conditions', 'Ideal balance of power, efficiency, and flexibility'],
          },
          {
            name: 'SANY STC1600T7',
            shortDesc: 'Heavy-duty 160-ton truck crane engineered for mega infrastructure and wind energy projects.',
            image: '/gulati/SANY STC1600T7 Truck Crane.jpg',
            highlights: [
              'Maximum capacity: 160 Ton',
              'Main boom: ~60–70 m',
              'Jib: up to 20–30 m',
              '6-axle multi-drive chassis',
              'Intelligent load-sensing hydraulics',
              'Real-time SANY safety monitoring',
            ],
            specs: [
              { label: 'Max Capacity', value: '160 Ton' },
              { label: 'Main Boom', value: '~60–70 m' },
              { label: 'Jib Length', value: 'Up to 30 m' },
              { label: 'Drive', value: '6-Axle Multi-Drive' },
              { label: 'Max Speed', value: '~80 km/h' },
              { label: 'Control', value: 'Advanced SANY System' },
            ],
            overview: 'The SANY STC1600T7 Truck Crane is a heavy-duty, high-capacity lifting solution designed for large-scale infrastructure and industrial projects. Equipped with advanced technology, intelligent control systems, and superior mobility, it delivers powerful, safe, and efficient performance even in demanding environments.',
            applications: ['Infrastructure – bridges, highways, metro, and civil projects', 'Industrial – power plants, refineries, heavy equipment installation', 'Wind Energy – lifting and installation of turbine components', 'Construction – high-rise buildings and structural lifting', 'Oil & Gas – pipelines, rigs, and plant operations'],
            whyChoose: ['Extremely high lifting capacity with long reach', 'Advanced safety and intelligent control systems', 'Strong mobility for on-road and site operations', 'Reliable in harsh and demanding conditions', 'Ideal for large-scale, precision lifting tasks'],
          },
        ],
      },
      heavy_cranes: {
        label: 'Heavy Cranes',
        products: [
          {
            name: 'Demag AC 265',
            shortDesc: 'Premium 250-ton all terrain crane with 6-axle all-wheel drive for complex heavy-duty operations.',
            image: '/gulati/Demag AC 265 All Terrain Crane.png',
            highlights: [
              'Maximum capacity: ~250 Ton class',
              'Main boom: ~70–80 m',
              'System length: 100+ m with jib',
              '6-axle all-terrain design',
              'All-wheel drive, multiple steering modes',
              'Panoramic visibility cabin',
            ],
            specs: [
              { label: 'Max Capacity', value: '~250 Ton' },
              { label: 'Main Boom', value: '~70–80 m' },
              { label: 'Max System Length', value: '100+ m' },
              { label: 'Axle Config', value: '6-Axle All-Terrain' },
              { label: 'Drive', value: 'All-Wheel Drive' },
              { label: 'Max Speed', value: '~80 km/h' },
            ],
            overview: 'The Demag AC 265 All Terrain Crane is a premium, high-capacity crane built for complex and heavy-duty lifting operations. With advanced engineering, exceptional reach, and all-terrain mobility, it ensures powerful and reliable performance across both urban and rugged environments.',
            applications: ['Infrastructure – bridges, highways, metro, and mega projects', 'Industrial – power plants, refineries, and heavy machinery installation', 'Wind Energy – turbine installation and maintenance', 'Construction – high-rise and commercial building projects', 'Oil & Gas – pipelines, rigs, and industrial lifting'],
            whyChoose: ['High lifting capacity with extended reach', 'Excellent all-terrain mobility', 'Advanced safety and control systems', 'Reliable in complex, heavy-duty operations', 'Suitable for both urban and rugged job sites'],
          },
          {
            name: 'Demag HC 240',
            shortDesc: 'Robust 240-ton tyre-mounted crane engineered for high-rise and large-scale industrial lifting.',
            image: '/gulati/Demag HC 240 Tyre Mounted Crane.png',
            highlights: [
              'Maximum capacity: ~240 Ton class',
              'Modular boom configuration',
              'Tyre-mounted for easy site movement',
              'Advanced load-sensing hydraulics',
              'Intelligent overload & anti-tipping safety',
              'Ergonomic enhanced-visibility cabin',
            ],
            specs: [
              { label: 'Max Capacity', value: '~240 Ton' },
              { label: 'Boom', value: 'Modular Extended Reach' },
              { label: 'Mobility', value: 'Tyre-Mounted' },
              { label: 'Hydraulics', value: 'Advanced Load-Sensing' },
              { label: 'Safety', value: 'Overload & Anti-Tipping' },
              { label: 'Control', value: 'Intelligent Monitoring' },
            ],
            overview: 'The Demag HC 240 Tyre Mounted Crane is a robust, high-capacity crane built for demanding lifting operations. Designed for strength, precision, and stability, it delivers reliable performance across large-scale infrastructure and industrial projects.',
            applications: ['Infrastructure – bridges, highways, metro, and mega projects', 'Industrial – power plants, refineries, and machinery installation', 'Construction – high-rise and heavy structural lifting', 'Oil & Gas – pipelines, rigs, and plant operations', 'Energy Projects – wind and renewable installations'],
            whyChoose: ['High lifting capacity with strong stability', 'Reliable in tough and demanding conditions', 'Advanced safety and control systems', 'Durable structure for heavy-duty use', 'Ideal for large-scale industrial and infrastructure work'],
          },
        ],
      },
    },
  },
  earthmoving: {
    label: 'Earthmoving Equipment',
    subtypes: {
      loaders: {
        label: 'Loaders',
        products: [
          {
            name: 'CASE 770 NX',
            shortDesc: 'Powerful 74 HP backhoe loader built for high productivity in construction and infrastructure.',
            image: '/gulati/CASE 770 NX Backhoe Loader.jpg',
            highlights: [
              'Engine power: ~74 HP',
              'Operating weight: 7,500–8,000 kg',
              'Max digging depth: 4.5–5.0 m',
              '2WD / 4WD drive options',
              'High-efficiency hydraulic system',
              'Spacious cabin with excellent visibility',
            ],
            specs: [
              { label: 'Engine Power', value: '~74 HP' },
              { label: 'Operating Weight', value: '7,500–8,000 kg' },
              { label: 'Loader Bucket', value: '~1.0 m³' },
              { label: 'Max Dig Depth', value: '4.5–5.0 m' },
              { label: 'Max Reach', value: '5.5–6.0 m' },
              { label: 'Drive Type', value: '2WD / 4WD' },
            ],
            overview: 'The CASE 770 NX Backhoe Loader is a powerful and versatile machine built for high productivity in construction and infrastructure projects. With robust design, advanced hydraulics, and excellent fuel efficiency, it delivers reliable performance even in demanding conditions.',
            applications: ['Construction – excavation, trenching, and material handling', 'Infrastructure – road work, pipelines, and civil projects', 'Utilities – drainage, sewer, and municipal work', 'Agriculture – land leveling and digging operations', 'Industrial – site preparation and loading tasks'],
            whyChoose: ['Powerful performance with fuel efficiency', 'Multi-purpose machine for digging & loading', 'Durable for tough site conditions', 'Comfortable for long working hours', 'Low maintenance with high productivity'],
          },
          {
            name: 'JCB 155 Skid Steer',
            shortDesc: 'Compact and versatile skid steer loader for high performance in confined construction spaces.',
            image: '/gulati/JCB 155 Skid Steer Loader.jpg',
            highlights: [
              'Rated operating capacity: ~700 kg',
              'Engine power: ~50 HP',
              'Hydrostatic drive for smooth control',
              'Compatible with multiple attachments',
              'ROPS/FOPS certified structure',
              'Side-door entry operator cabin',
            ],
            specs: [
              { label: 'Operating Capacity', value: '~700 kg' },
              { label: 'Engine Power', value: '~50 HP' },
              { label: 'Operating Weight', value: '~2,800–3,000 kg' },
              { label: 'Bucket Capacity', value: '~0.3–0.4 m³' },
              { label: 'Tipping Load', value: '~1,400 kg' },
              { label: 'Max Speed', value: '10–12 km/h' },
            ],
            overview: "The JCB 155 Skid Steer Loader is a compact and versatile machine built for high performance in confined spaces. With JCB's trusted engineering, it offers excellent maneuverability, powerful output, and operator comfort—making it ideal for construction, agriculture, and industrial applications.",
            applications: ['Construction – material handling, site cleaning, and light excavation', 'Road Work – maintenance, trenching, and surface preparation', 'Agriculture – soil leveling, loading, and farm operations', 'Industrial Use – loading/unloading and warehouse handling', 'Landscaping – grading, leveling, and site preparation'],
            whyChoose: ['Compact design for tight working spaces', 'Compatible with multiple attachments', 'Fuel-efficient with low maintenance', 'High maneuverability and precise control', 'Safe and comfortable operator cabin'],
          },
        ],
      },
    },
  },
  aerial: {
    label: 'Aerial Work Platforms',
    subtypes: {
      boom_lifts: {
        label: 'Boom Lifts',
        products: [
          {
            name: 'JLG 45 ft Boom Lift',
            shortDesc: 'Compact aerial platform for safe access to medium-height areas in confined construction sites.',
            image: '/gulati/JLG 45 ft Boom Lift.jpg',
            highlights: [
              'Working height: ~45 ft (13–14 m)',
              'Horizontal outreach: 10–12 m',
              'Platform capacity: 230–300 kg',
              '360° continuous rotation',
              'Diesel-powered rough terrain',
              'Tilt alarm and emergency stop',
            ],
            specs: [
              { label: 'Working Height', value: '~45 ft / 13–14 m' },
              { label: 'Platform Height', value: '~40 ft / 12–13 m' },
              { label: 'H. Outreach', value: '10–12 m' },
              { label: 'Platform Capacity', value: '230–300 kg' },
              { label: 'Drive System', value: '2WD / 4WD Rough Terrain' },
              { label: 'Rotation', value: '360° Continuous' },
            ],
            overview: 'The JLG 45 ft Boom Lift is a compact yet powerful aerial work platform designed for safe and efficient access to medium-height areas. With excellent maneuverability, smooth control, and reliable performance, it is ideal for construction, maintenance, and industrial applications in confined spaces.',
            applications: ['Construction – façade work and installations', 'Industrial – inspection, repair, and maintenance', 'Utilities – electrical, telecom, and lighting work', 'Warehousing – access and facility maintenance', 'Events – lighting setup and temporary structures'],
            whyChoose: ['Compact design with efficient reach', 'Easy maneuverability in tight spaces', 'Stable and safe working platform', 'Reliable across multiple applications', 'Cost-effective for medium-height tasks'],
          },
          {
            name: 'JLG 60 ft Boom Lift',
            shortDesc: 'High-reach aerial platform for elevated access in construction and industrial maintenance.',
            image: '/gulati/JLG 60 ft Boom Lift (2).jpg',
            highlights: [
              'Working height: ~60 ft (18–20 m)',
              'Horizontal outreach: 12–15 m',
              'Platform capacity: 230–300 kg',
              '360° continuous rotation',
              'Diesel rough terrain capable',
              'Emergency stop and tilt alarm',
            ],
            specs: [
              { label: 'Working Height', value: '~60 ft / 18–20 m' },
              { label: 'Platform Height', value: '~55 ft / 16–17 m' },
              { label: 'H. Outreach', value: '12–15 m' },
              { label: 'Platform Capacity', value: '230–300 kg' },
              { label: 'Gradeability', value: '40–45%' },
              { label: 'Rotation', value: '360° Continuous' },
            ],
            overview: 'The JLG 60 ft Boom Lift is a high-reach aerial work platform designed for safe and efficient access to elevated areas. With excellent reach, smooth operation, and rugged build quality, it is ideal for construction, maintenance, and industrial applications requiring precision at height.',
            applications: ['Construction – high-rise work, façade installation', 'Industrial – maintenance and inspections', 'Warehousing – access to elevated storage areas', 'Utilities – electrical, lighting, and telecom work', 'Events & Facilities – setup, maintenance, and installations'],
            whyChoose: ['High reach with strong horizontal access', 'Stable and safe working platform', 'Easy operation on rough terrain', 'Advanced safety and control features', 'Reliable for demanding height access tasks'],
          },
          {
            name: 'JLG 66 ft Boom Lift',
            shortDesc: 'Extended reach aerial platform with 4WD for construction and industrial height access.',
            image: '/gulati/JLG 66 ft Boom Lift.jpg',
            highlights: [
              'Working height: ~66 ft (20–21 m)',
              'Horizontal outreach: 15–17 m',
              'Platform capacity: 230–340 kg',
              '4WD rough terrain drive',
              '360° continuous rotation',
              'Overload protection system',
            ],
            specs: [
              { label: 'Working Height', value: '~66 ft / 20–21 m' },
              { label: 'Platform Height', value: '~60 ft / 18–19 m' },
              { label: 'H. Outreach', value: '15–17 m' },
              { label: 'Platform Capacity', value: '230–340 kg' },
              { label: 'Drive System', value: '4WD Rough Terrain' },
              { label: 'Rotation', value: '360° Continuous' },
            ],
            overview: 'The JLG 66 ft Boom Lift is a high-performance aerial work platform built for safe and efficient access to elevated areas. With extended reach, strong stability, and precise control, it is ideal for construction, maintenance, and industrial applications requiring both height and outreach.',
            applications: ['Construction – high-rise work and façade installation', 'Industrial – inspection, repair, and maintenance', 'Utilities – electrical, telecom, and lighting work', 'Warehousing – high-level access and facility maintenance', 'Events – stage setup and infrastructure installations'],
            whyChoose: ['Extended height with strong horizontal reach', 'Stable and safe working platform', 'Smooth control with excellent maneuverability', 'Advanced safety and reliable performance', 'Ideal for demanding high-access operations'],
          },
          {
            name: 'JLG 80 ft Boom Lift',
            shortDesc: 'High-reach 4WD aerial platform delivering reliable performance for construction and infrastructure.',
            image: '/gulati/JLG 80 ft Boom Lift.jpg',
            highlights: [
              'Working height: ~80 ft (24–26 m)',
              'Horizontal outreach: 17–20 m',
              'Platform capacity: 230–340 kg',
              '4WD rough terrain drive',
              'Stability control system',
              'Emergency stop and overload protection',
            ],
            specs: [
              { label: 'Working Height', value: '~80 ft / 24–26 m' },
              { label: 'Platform Height', value: '~75 ft / 22–23 m' },
              { label: 'H. Outreach', value: '17–20 m' },
              { label: 'Platform Capacity', value: '230–340 kg' },
              { label: 'Drive System', value: '4WD Rough Terrain' },
              { label: 'Rotation', value: '360° Continuous' },
            ],
            overview: 'The JLG 80 ft Boom Lift is a high-reach aerial work platform built for safe and efficient access to elevated areas. With strong stability, extended outreach, and smooth control, it delivers reliable performance for construction, industrial, and infrastructure applications.',
            applications: ['Construction – high-rise work and façade installation', 'Industrial – maintenance, inspection, and servicing', 'Utilities – electrical, telecom, and lighting work', 'Infrastructure – bridges, flyovers, and civil projects', 'Facilities & Events – maintenance and setup operations'],
            whyChoose: ['Extended height access with strong outreach', 'Stable and safe at elevated work positions', 'Reliable 4WD rough terrain performance', 'Advanced safety monitoring systems', 'Suitable for demanding infrastructure tasks'],
          },
          {
            name: 'JLG 135 ft Boom Lift',
            shortDesc: 'Ultra high-reach 135 ft aerial platform for extreme-height construction and industrial work.',
            image: '/gulati/JLG 135 ft Boom Lift.jpg',
            highlights: [
              'Working height: ~135 ft (41–43 m)',
              'Horizontal outreach: 24–25 m',
              'Platform capacity: 230–450 kg dual',
              '4WD rough terrain drive',
              'Load sensing and stability monitoring',
              'Advanced proportional control system',
            ],
            specs: [
              { label: 'Working Height', value: '~135 ft / 41–43 m' },
              { label: 'Platform Height', value: '~130 ft / 39–40 m' },
              { label: 'H. Outreach', value: '24–25 m' },
              { label: 'Platform Capacity', value: '230–450 kg' },
              { label: 'Drive System', value: '4WD Rough Terrain' },
              { label: 'Rotation', value: '360° Continuous' },
            ],
            overview: 'The JLG 135 ft Boom Lift is an ultra high-reach aerial work platform designed for demanding operations at extreme heights. With advanced technology, superior stability, and powerful performance, it is ideal for large-scale construction, industrial maintenance, and infrastructure projects.',
            applications: ['Construction – high-rise and façade work at extreme heights', 'Industrial – refineries, plants, and heavy maintenance', 'Infrastructure – bridges, flyovers, and mega projects', 'Oil & Gas – installation and servicing operations', 'Energy – wind turbine and high-elevation maintenance'],
            whyChoose: ['Exceptional height with extended outreach', 'Stable and safe at extreme elevations', 'Powerful performance on rough terrain', 'Advanced safety and precision controls', 'Ideal for large-scale, high-access projects'],
          },
        ],
      },
    },
  },
  utility: {
    label: 'Utility Vehicles',
    subtypes: {
      towing: {
        label: 'Towing Vehicles',
        products: [
          {
            name: 'Tata Yodha Towing Vehicle',
            shortDesc: 'Rugged and reliable utility pickup built for heavy-duty towing and roadside recovery operations.',
            image: '/gulati/Tata Yodha Towing Vehicle.webp',
            highlights: [
              'Engine: 2.2L Varicor Diesel',
              'Power: ~100–120 HP',
              'Payload: ~1.2–1.5 Ton',
              '4×2 / 4×4 drive options',
              'Heavy-duty ladder-frame chassis',
              'All-terrain tyres',
            ],
            specs: [
              { label: 'Engine', value: '2.2L Varicor Diesel' },
              { label: 'Power', value: '~100–120 HP' },
              { label: 'Payload', value: '~1.2–1.5 Ton' },
              { label: 'Drive Type', value: '4×2 / 4×4' },
              { label: 'Transmission', value: '5-Speed Manual' },
              { label: 'Braking', value: 'Hydraulic System' },
            ],
            overview: "The Tata Yodha Towing Vehicle is a rugged and reliable utility vehicle built for heavy-duty towing and roadside assistance. Designed on Tata's strong pickup platform, it offers powerful performance, durability, and efficiency—making it ideal for transport and recovery operations across varied terrains.",
            applications: ['Roadside Assistance – vehicle recovery and towing services', 'Transport – light equipment and material movement', 'Construction Support – shifting small machinery on-site', 'Municipal Services – utility and emergency operations', 'Rural Use – reliable in off-road and remote areas'],
            whyChoose: ['Strong pulling power with high torque', 'Durable build for heavy-duty use', 'Reliable across urban and rough terrains', 'Fuel-efficient with low maintenance', 'Ideal for towing, transport, and utility operations'],
          },
        ],
      },
    },
  },
};

type CategoryKey = keyof typeof fleetData;

const SERVICES = [
  'Crane Rental Service',
  'Man Basket Crane Rental',
  'Tower Crane Rental',
  'Specialized Lifting Tools',
  'Forklift Rental',
  'Crane Loading Service',
  'Breakdown Towing Vans',
  'Hydraulic Crane Services',
  'Telescopic Crane Rental',
  'Damage Crane Rental',
  'Under Lift Towing Crane',
  'Telescopic Mobile Crane',
  'Industrial Crane Services',
  'Industrial Heavy Crane Service',
  'Buying & Selling Cranes',
];

const WHY_US = [
  { title: 'PAN India Service', desc: 'Deployments across all major states with rapid mobilization.' },
  { title: 'Client-First Approach', desc: 'Your satisfaction ranks first on our list of priorities.' },
  { title: 'Advanced Technology', desc: 'Latest machinery and control systems for every project.' },
  { title: 'Custom Solutions', desc: 'Resources molded to your specific project requirements.' },
  { title: 'Experienced Team', desc: 'Staff overseeing production, QC, dispatch, and after-sales.' },
  { title: 'High-Quality Standards', desc: 'Machines acclaimed for heat resistance, ductility, and stress resistance.' },
];

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Barlow', sans-serif;
    background: #FFFFFF;
    color: #111111;
  }

  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #E55300;
    margin-bottom: 8px;
    display: block;
  }

  .divider {
    width: 40px;
    height: 3px;
    background: #E55300;
    margin-bottom: 18px;
  }

  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1;
    color: #111111;
  }

  .btn-primary {
    display: inline-block;
    background: #E55300;
    color: #FFFFFF;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 13px 30px;
    border: 2px solid #E55300;
    cursor: pointer;
    text-decoration: none;
  }
  .btn-primary:hover { background: #c94700; border-color: #c94700; }

  .btn-outline {
    display: inline-block;
    background: transparent;
    color: #111111;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 13px 30px;
    border: 2px solid #E5E5E5;
    cursor: pointer;
    text-decoration: none;
  }
  .btn-outline:hover { border-color: #E55300; color: #E55300; }

  .btn-white {
    display: inline-block;
    background: #FFFFFF;
    color: #E55300;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 13px 30px;
    border: 2px solid #FFFFFF;
    cursor: pointer;
  }
  .btn-white:hover { background: #f0f0f0; border-color: #f0f0f0; }

  .product-card {
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    display: flex;
    flex-direction: column;
  }

  .tab-btn {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 12px 20px;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: #777777;
    cursor: pointer;
  }
  .tab-btn.active {
    border-bottom-color: #E55300;
    color: #111111;
  }
  .tab-btn:hover { color: #111111; }

  .enquire-btn {
    width: 100%;
    background: #E55300;
    color: #FFFFFF;
    border: none;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 14px;
    cursor: pointer;
  }
  .enquire-btn:hover { background: #c94700; }

  .inp {
    width: 100%;
    border: 1px solid #E5E5E5;
    padding: 11px 13px;
    font-size: 14px;
    font-family: 'Barlow', sans-serif;
    outline: none;
    background: #FFFFFF;
    color: #111111;
    border-radius: 0;
  }
  .inp:focus { border-color: #E55300; }

  .field-label {
    display: block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #777777;
    margin-bottom: 5px;
  }

  .why-card {
    display: flex;
    gap: 18px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-left: 3px solid #E55300;
    padding: 22px 24px;
  }

  .service-item {
    display: flex;
    align-items: center;
    gap: 14px;
    border: 1px solid #E5E5E5;
    padding: 16px 20px;
    background: #FFFFFF;
  }

  .service-num {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E55300;
    color: #FFFFFF;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 12px;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    padding: 16px;
  }

  .nav-link {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #555555;
    text-decoration: none;
  }
  .nav-link:hover { color: #E55300; }

  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* Dropdown styles */
  .dd-cat-btn {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    border-left: 2px solid transparent;
    padding: 10px 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #555555;
    cursor: pointer;
    white-space: nowrap;
  }
  .dd-cat-btn:hover, .dd-cat-btn.active {
    border-left-color: #E55300;
    color: #111111;
    background: #FFFFFF;
  }

  .dd-sub-btn {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    border-left: 2px solid transparent;
    padding: 10px 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #555555;
    cursor: pointer;
    white-space: nowrap;
  }
  .dd-sub-btn:hover, .dd-sub-btn.active {
    border-left-color: #E55300;
    color: #E55300;
    background: #FFFFFF;
  }

  .dd-product-btn {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 10px 14px;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
  }
  .dd-product-btn:last-child { border-bottom: none; }
  .dd-product-btn:hover { background: #FFF5F0; }
  .dd-product-btn:hover .dd-prod-name { color: #E55300; }

  .dd-prod-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #111111;
    display: block;
    margin-bottom: 2px;
  }

  .dd-prod-sub {
    font-family: 'Barlow', sans-serif;
    font-size: 10px;
    color: #999999;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  @media (max-width: 767px) {
    .hide-mobile { display: none !important; }
    .mob-stack { grid-template-columns: 1fr !important; }
    .mob-full { padding-left: 20px !important; padding-right: 20px !important; }
  }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getCardId(catKey: string, subtypeKey: string, productName: string) {
  return `card-${catKey}-${subtypeKey}-${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

// ─── ENQUIRY MODAL ────────────────────────────────────────────────────────────
type EnquiryModalProps = { productName: string; onClose: () => void };

function EnquiryModal({ productName, onClose }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', width: '100%', maxWidth: '500px', borderTop: '4px solid #E55300' }}>
        <div style={{ background: '#E55300', padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Product Enquiry</p>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, textTransform: 'uppercase', color: '#FFFFFF' }}>{productName}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ width: 52, height: 52, background: '#E55300', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#FFFFFF', fontSize: 22 }}>✓</div>
            <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 800, textTransform: 'uppercase', color: '#111111', marginBottom: 10 }}>Enquiry Submitted</h4>
            <p style={{ fontSize: 14, color: '#777777', lineHeight: 1.7, marginBottom: 28 }}>Thank you for your interest in {productName}. Our team will contact you shortly.</p>
            <button onClick={onClose} className="btn-primary">Close</button>
          </div>
        ) : (
          <div style={{ padding: '26px 26px 30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div><label className="field-label">Full Name *</label><input type="text" className="inp" placeholder="Your name" /></div>
              <div><label className="field-label">Phone *</label><input type="tel" className="inp" placeholder="+91 XXXXX XXXXX" /></div>
            </div>
            <div style={{ marginBottom: 14 }}><label className="field-label">Email *</label><input type="email" className="inp" placeholder="you@company.com" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div><label className="field-label">Company</label><input type="text" className="inp" placeholder="Company name" /></div>
              <div><label className="field-label">City</label><input type="text" className="inp" placeholder="Your city" /></div>
            </div>
            <div style={{ marginBottom: 22 }}><label className="field-label">Message</label><textarea rows={3} className="inp" style={{ resize: 'none' }} placeholder="Tell us about your requirement..." /></div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, padding: 12, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', background: 'none', border: '1px solid #E5E5E5', color: '#777777', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setSubmitted(true)} className="enquire-btn" style={{ flex: 2 }}>Send Enquiry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
type Product = {
  name: string;
  shortDesc: string;
  image: string | null;
  highlights: string[];
  specs: { label: string; value: string }[];
};

type ProductCardProps = {
  product: Product;
  onEnquire: (name: string) => void;
  cardId: string;
};

function ProductCard({ product, onEnquire, cardId }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div id={cardId} className="product-card">
      <div style={{ aspectRatio: '16/9', background: '#F7F7F7', overflow: 'hidden', borderBottom: '1px solid #E5E5E5', position: 'relative' }}>
        {product.image && !imgError ? (
          <img src={product.image} alt={product.name} className="product-img" onError={() => setImgError(true)} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 52, height: 52, border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                <path d="M3 17l4-8 4 4 3-5 4 9H3z" /><circle cx="18" cy="5" r="2" />
              </svg>
            </div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bbb' }}>Gulati Cranes</p>
          </div>
        )}
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20, fontWeight: 800, textTransform: 'uppercase', color: '#111111', marginBottom: 6, lineHeight: 1.1 }}>{product.name}</h4>
        <p style={{ fontSize: 13, color: '#555555', lineHeight: 1.65, marginBottom: 18 }}>{product.shortDesc}</p>
        <div style={{ height: 1, background: '#E5E5E5', marginBottom: 16 }} />
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#777777', marginBottom: 8 }}>Highlights</p>
          <ul style={{ listStyle: 'none' }}>
            {product.highlights.slice(0, 4).map((h, i) => (
              <li key={i} style={{ fontSize: 13, color: '#333333', display: 'flex', gap: 8, marginBottom: 5 }}>
                <span style={{ color: '#E55300', fontWeight: 700, flexShrink: 0 }}>—</span>{h}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ height: 1, background: '#E5E5E5', marginBottom: 16 }} />
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#777777', marginBottom: 8 }}>Key Specifications</p>
          <div style={{ border: '1px solid #E5E5E5' }}>
            {product.specs.slice(0, 4).map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderBottom: i < 3 ? '1px solid #E5E5E5' : 'none', background: i % 2 === 0 ? '#F7F7F7' : '#FFFFFF' }}>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#777777' }}>{s.label}</p>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, color: '#111111' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => onEnquire(product.name)} className="enquire-btn">Enquire Now</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function GulatiCranesSite() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('cranes');
  const [activeSubtype, setActiveSubtype] = useState<string>('pick_and_carry');
  const [enquiryProduct, setEnquiryProduct] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ddHoveredCat, setDdHoveredCat] = useState<CategoryKey>('cranes');
  const [ddHoveredSubtype, setDdHoveredSubtype] = useState<string>('pick_and_carry');
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCategoryChange = (catKey: CategoryKey) => {
    setActiveCategory(catKey);
    const firstSubtype = Object.keys(fleetData[catKey].subtypes)[0];
    setActiveSubtype(firstSubtype);
  };

  const currentSubtypes = fleetData[activeCategory].subtypes;
  const currentProducts = (currentSubtypes as Record<string, any>)[activeSubtype]?.products || [];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === '/') {
      window.location.href = '/';
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function handleDdMouseEnter() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }

  function handleDdMouseLeave() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  function handleDdCatHover(catKey: CategoryKey) {
    setDdHoveredCat(catKey);
    const firstSubtype = Object.keys(fleetData[catKey].subtypes)[0];
    setDdHoveredSubtype(firstSubtype);
  }

  function handleDdProductClick(catKey: CategoryKey, subtypeKey: string, productName: string) {
    setDropdownOpen(false);
    // Switch tabs
    setActiveCategory(catKey);
    setActiveSubtype(subtypeKey);
    const cardId = getCardId(catKey, subtypeKey, productName);
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById(cardId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    }, 60);
  }

  const ddSubtypes = fleetData[ddHoveredCat].subtypes;
  const ddProducts = (ddSubtypes as Record<string, any>)[ddHoveredSubtype]?.products || [];

  const NAV_LINKS = [
    { label: 'Home', id: '/' },
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products', hasDropdown: true },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <main style={{ background: '#FFFFFF', color: '#111111', fontFamily: "'Barlow', sans-serif" }}>
      <style>{globalStyles}</style>

      {enquiryProduct && <EnquiryModal productName={enquiryProduct} onClose={() => setEnquiryProduct(null)} />}

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 200, background: '#FFFFFF', borderBottom: '4px solid #E55300' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 26, color: '#111111', textTransform: 'uppercase', lineHeight: 1 }}>Gulati Cranes</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, color: '#E55300', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nashik · Est. 1984</div>
          </button>

          <div className="hide-mobile" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {NAV_LINKS.map(l =>
              l.hasDropdown ? (
                <div
                  key={l.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={handleDdMouseEnter}
                  onMouseLeave={handleDdMouseLeave}
                >
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    {l.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginTop: 1 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: 8,
                        display: 'flex',
                        background: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        borderTop: '3px solid #E55300',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                        zIndex: 300,
                        minWidth: 560,
                      }}
                      onMouseEnter={handleDdMouseEnter}
                      onMouseLeave={handleDdMouseLeave}
                    >
                      {/* COLUMN 1: Categories */}
                      <div style={{ width: 170, background: '#F7F7F7', borderRight: '1px solid #E5E5E5', padding: '8px 0', flexShrink: 0 }}>
                        <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AAAAAA', padding: '6px 16px 8px' }}>Category</p>
                        {(Object.keys(fleetData) as CategoryKey[]).map(catKey => (
                          <button
                            key={catKey}
                            className={`dd-cat-btn ${ddHoveredCat === catKey ? 'active' : ''}`}
                            onMouseEnter={() => handleDdCatHover(catKey)}
                          >
                            {fleetData[catKey].label}
                          </button>
                        ))}
                      </div>

                      {/* COLUMN 2: Subtypes */}
                      <div style={{ width: 150, background: '#FAFAFA', borderRight: '1px solid #E5E5E5', padding: '8px 0', flexShrink: 0 }}>
                        <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AAAAAA', padding: '6px 16px 8px' }}>Type</p>
                        {Object.entries(ddSubtypes).map(([subtypeKey, subtype]) => (
                          <button
                            key={subtypeKey}
                            className={`dd-sub-btn ${ddHoveredSubtype === subtypeKey ? 'active' : ''}`}
                            onMouseEnter={() => setDdHoveredSubtype(subtypeKey)}
                          >
                            {(subtype as any).label}
                          </button>
                        ))}
                      </div>

                      {/* COLUMN 3: Products */}
                      <div style={{ flex: 1, padding: '8px 0', minWidth: 220 }}>
                        <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AAAAAA', padding: '6px 14px 8px' }}>Products</p>
                        {ddProducts.map((product: Product) => (
                          <button
                            key={product.name}
                            className="dd-product-btn"
                            onClick={() => handleDdProductClick(ddHoveredCat, ddHoveredSubtype, product.name)}
                          >
                            <span className="dd-prod-name">{product.name}</span>
                            <span className="dd-prod-sub">{product.shortDesc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link">{l.label}</button>
              )
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => scrollTo('contact')} className="btn-primary hide-mobile" style={{ fontSize: 12, padding: '9px 22px' }}>Get Quote</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: '#111111', fontSize: 22, cursor: 'pointer', display: 'none' }} className="show-mobile">☰</button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: '#FFFFFF', borderTop: '1px solid #E5E5E5', padding: '16px 24px' }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: '#111111', padding: '14px 0', borderBottom: '1px solid #E5E5E5', background: 'none', border: 'none', cursor: 'pointer' }}>{l.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', background: '#0B1F3A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1586458995526-09ce6839babe?q=80&w=2073&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(229,83,0,0.15) 0%, transparent 60%)', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(255,255,255,0.15)', padding: '6px 16px', marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, background: '#E55300', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Established 1984 · Nashik, Maharashtra · PAN India</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(60px, 9vw, 104px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#FFFFFF', marginBottom: 24 }}>
            Welcome<br />To Gulati<br /><span style={{ color: '#E55300' }}>Cranes.</span>
          </h1>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#E55300', marginBottom: 12 }}>Lifting India's Heavy Industry Since 1984</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 460, marginBottom: 44 }}>Leading service providers of crane and lifting solutions across India. Reliable, safe, and engineered for every challenge.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('products')} className="btn-primary" style={{ fontSize: 13, padding: '14px 36px' }}>Explore Our Fleet</button>
            <button onClick={() => scrollTo('contact')} className="btn-white" style={{ fontSize: 13, padding: '14px 36px' }}>Request a Quote</button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {['Crane Rental', 'Truck Cranes', 'Heavy Lift', 'Boom Lifts', 'Earthmoving', 'Forklift Rental', 'PAN India Service'].map((item, i) => (
            <span key={i} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 14, paddingRight: 20 }}>
              {i > 0 && <span style={{ color: '#E55300', fontSize: 6 }}>◆</span>}
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderLeft: '1px solid #E5E5E5' }}>
          {[['40+ Years', 'Proven Industrial Experience'], ['PAN India', 'Nationwide Deployment'], ['Grade A Fleet', 'Industrial Class Equipment']].map(([val, lbl]) => (
            <div key={val} style={{ padding: '28px 32px', textAlign: 'center', borderRight: '1px solid #E5E5E5' }}>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 28, color: '#111111', lineHeight: 1, marginBottom: 6 }}>{val}</p>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '80px 48px', background: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="mob-stack">
          <div>
            <span className="section-label">About Us</span>
            <div className="divider" />
            <h2 className="section-title" style={{ fontSize: 'clamp(36px,5vw,56px)', marginBottom: 24 }}>40 Years of<br />Lifting<br />Excellence.</h2>
            <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.75, marginBottom: 18 }}>Established in the year 1984, Gulati Cranes are counted amongst the leading service providers of all types of cranes. Our range of services includes Crane Rental, Man Basket Crane Rental, Tower Cranes Rental, Specialized Lifting Tools, Forklift Rental, and much more.</p>
            <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.75, marginBottom: 18 }}>Acclaimed for heat resistance, friction resistance, ductility, ability to withstand fluctuations, and stress resistance — our machines are built for India's most demanding conditions.</p>
            <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.75, marginBottom: 40 }}>Banking on our team, we have earned a reputed position in the market. We make effective use of the latest technology in our service providing process. Our experienced staff efficiently oversees every task related to production, quality control, dispatch, and after-sales services.</p>
            <button onClick={() => scrollTo('contact')} className="btn-primary">Learn More About Us</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {WHY_US.map((w, i) => (
              <div key={i} className="why-card">
                <div style={{ width: 44, height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E55300', color: '#FFFFFF', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 16 }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 17, textTransform: 'uppercase', color: '#111111', marginBottom: 5 }}>{w.title}</p>
                  <p style={{ fontSize: 13, color: '#555555', lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT CATEGORIES STRIP ── */}
      <div style={{ background: '#F7F7F7', borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid #E5E5E5' }}>
          {[['Cranes', '10+ Models'], ['Earthmoving', 'Loaders & More'], ['Aerial Platforms', 'Boom Lifts'], ['Utility Vehicles', 'Recovery & Towing']].map(([label, sub]) => (
            <div key={label} style={{ padding: '28px 0', textAlign: 'center', borderRight: '1px solid #E5E5E5' }}>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 17, fontWeight: 800, textTransform: 'uppercase', color: '#111111', marginBottom: 4 }}>{label}</p>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#E55300' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '80px 48px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }} className="mob-stack">
            <div style={{ position: 'sticky', top: 80 }}>
              <span className="section-label">Our Services</span>
              <div className="divider" />
              <h2 className="section-title" style={{ fontSize: 'clamp(36px,4vw,52px)', marginBottom: 18 }}>Complete<br />Crane &<br />Lifting<br />Solutions.</h2>
              <p style={{ color: '#555555', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>From rental to specialized operations, Gulati Cranes provides end-to-end industrial lifting services across India.</p>
              <button onClick={() => scrollTo('contact')} className="btn-primary">Enquire About a Service</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {SERVICES.map((svc, i) => (
                <div key={i} className="service-item">
                  <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#111111' }}>{svc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: '80px 48px', background: '#F7F7F7', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <span className="section-label">Our Fleet</span>
            <div className="divider" />
            <h2 className="section-title" style={{ fontSize: 'clamp(40px,6vw,68px)' }}>The Products.</h2>
          </div>

          {/* Category tabs */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777', marginBottom: 10 }}>Category</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid #E5E5E5' }}>
              {Object.entries(fleetData).map(([key, cat]) => (
                <button key={key} onClick={() => handleCategoryChange(key as CategoryKey)} className={`tab-btn ${activeCategory === key ? 'active' : ''}`}>{cat.label}</button>
              ))}
            </div>
          </div>

          {/* Subtype tabs */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777', marginBottom: 10 }}>Type</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid #E5E5E5' }}>
              {Object.entries(currentSubtypes).map(([key, sub]) => (
                <button key={key} onClick={() => setActiveSubtype(key)} className={`tab-btn ${activeSubtype === key ? 'active' : ''}`}>{sub.label}</button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid #E5E5E5' }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#555555' }}>
                {(currentSubtypes as Record<string, any>)[activeSubtype]?.label}
              </span>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, background: '#E55300', color: '#FFFFFF', padding: '2px 8px' }}>
                {currentProducts.length} Products
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {currentProducts.map((product: Product, i: number) => (
                <ProductCard
                  key={i}
                  product={product}
                  onEnquire={setEnquiryProduct}
                  cardId={getCardId(activeCategory, activeSubtype, product.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAN INDIA ── */}
      <section id="pan-india" style={{ padding: '80px 48px', background: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="mob-stack">
            <div>
              <span className="section-label">PAN India Presence</span>
              <div className="divider" />
              <h2 className="section-title" style={{ fontSize: 'clamp(36px,5vw,52px)', marginBottom: 20 }}>Wherever Your<br />Project Demands.</h2>
              <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.75, marginBottom: 18 }}>We provide services across PAN India with fast deployment and reliable support. From Nashik's heartland to the farthest project sites, Gulati Cranes ensures your equipment is where you need it, when you need it.</p>
              <p style={{ color: '#555555', fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>Our experienced team efficiently oversees every task — from dispatch to after-sales — ensuring uninterrupted operations across all major states and industrial corridors.</p>
              <button onClick={() => scrollTo('contact')} className="btn-primary">Contact Us Today</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Fast Deployment', 'Quick mobilization to your project site across India.'], ['Reliable Support', 'Continuous after-sales and maintenance assistance.'], ['All Terrains', 'Equipment suited for urban, industrial, and remote sites.'], ['Nationwide Network', 'Operations covering all major Indian states.']].map(([title, desc]) => (
                <div key={title} style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderTop: '3px solid #E55300', padding: '22px 20px' }}>
                  <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 16, textTransform: 'uppercase', color: '#111111', marginBottom: 8 }}>{title}</p>
                  <p style={{ fontSize: 13, color: '#555555', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '80px 48px', background: '#F7F7F7', borderTop: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }} className="mob-stack">
          <div>
            <span className="section-label">Contact Us</span>
            <div className="divider" />
            <h2 className="section-title" style={{ fontSize: 'clamp(40px,6vw,68px)', marginBottom: 40 }}>Connect<br />With Us.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 40 }}>
              {[['Location', 'Nashik, Maharashtra, India'], ['Service Coverage', 'PAN India'], ['Established', '1984']].map(([label, val]) => (
                <div key={label} style={{ borderLeft: '3px solid #E55300', paddingLeft: 18 }}>
                  <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777', marginBottom: 5 }}>{label}</p>
                  <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 800, color: '#111111' }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderTop: '3px solid #E55300', padding: '36px' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', color: '#111111', marginBottom: 28 }}>Send Us a Message</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label className="field-label">Name *</label><input type="text" className="inp" placeholder="Your name" /></div>
                <div><label className="field-label">Phone *</label><input type="tel" className="inp" placeholder="+91 XXXXX XXXXX" /></div>
              </div>
              <div><label className="field-label">Email *</label><input type="email" className="inp" placeholder="you@company.com" /></div>
              <div>
                <label className="field-label">Service Required</label>
                <select className="inp">
                  <option value="">Select a service...</option>
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div><label className="field-label">Message</label><textarea rows={4} className="inp" style={{ resize: 'none' }} placeholder="Tell us about your project or requirement..." /></div>
              <button className="enquire-btn" style={{ marginTop: 8 }}>Submit Enquiry</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0B1F3A', borderTop: '4px solid #E55300' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 32, flexWrap: 'wrap' }} className="mob-stack">
          <div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1, marginBottom: 6 }}>Gulati Cranes</p>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E55300', marginBottom: 16 }}>Nashik · Established 1984</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, maxWidth: 320 }}>Leading crane and lifting solutions across PAN India. Reliable, safe, and engineered for every challenge.</p>
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Navigation</p>
              {NAV_LINKS.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8, textAlign: 'left', letterSpacing: '0.04em' }}>{l.label}</button>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Equipment</p>
              {['Cranes', 'Earthmoving', 'Aerial Platforms', 'Utility Vehicles'].map(item => (
                <p key={item} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.04em' }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 32px', maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Gulati Cranes · PAN India Lifting Solutions</p>
        </div>
      </footer>
    </main>
  );
}