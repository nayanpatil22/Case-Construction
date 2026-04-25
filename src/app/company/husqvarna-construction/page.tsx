"use client";

import React, { useState, useEffect, memo, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/* ── TYPES ── */
interface Product {
  name: string;
  description: string;
  specs: string[];
  features: string[];
  useCase: string;
}
interface ProductGroup { name: string; items: Product[]; }
interface MachineCategory {
  name: string;
  subcategories: { name: string; groups?: ProductGroup[]; items?: Product[]; }[];
}
interface Rep { name: string; location: string; phone: string; email: string; title: string; }

const parseSpecs = (rawSpecs: string[]): { label: string; value: string }[] =>
  rawSpecs.map((s) => {
    const [label, ...rest] = s.split(":");
    return { label: label.trim(), value: rest.join(":").trim() };
  });

/* ── ALL DATA (unchanged) ── */
const machineData: MachineCategory[] = [
  {
    name: "Concrete Placement",
    subcategories: [
      {
        name: "Concrete Vibrators",
        groups: [
          {
            name: "Internal Vibrators (17)",
            items: [
              { name: "Husqvarna SMART E", description: "A powerful, high-frequency concrete vibrator designed for professional use. It delivers strong and consistent vibration for better concrete compaction with reduced air gaps.", specs: ["Tube Diameter: 40 mm (also 48 mm available)", "Hose Length: 0.36 m", "Cable Length: 1.7 m"], features: ["Smart ergonomic handle for comfort", "Plug-and-work with built-in converter", "Powerful and reliable performance", "Extended reach for flexible use"], useCase: "Ideal for concrete floors, slabs, and structural work." },
              { name: "Husqvarna SMART", description: "A powerful, high-frequency concrete vibrator designed for professional use. It delivers strong, stable vibration for efficient and smooth concrete compaction.", specs: ["Tube Diameter: 40 mm", "Hose Length: 5 m", "Cable Length: 15 m"], features: ["Plug-and-work system", "Powerful and reliable", "Easily slides over rebar", "Extended reach for large areas"], useCase: "Ideal for slabs, columns, and heavy construction work." },
              { name: "Husqvarna AX", description: "A durable and high-performance concrete vibrator series designed to handle all types of concrete with reliable and consistent results.", specs: ["Tube Diameter: 38 mm", "Hose Length: 5 m", "Cable Length: 10 m"], features: ["Handles all types of concrete", "Built to last", "Tough and flexible materials", "Covers all internal concrete vibrations"], useCase: "Ideal for all concrete applications, from general construction to heavy-duty jobs." },
              { name: "Husqvarna AX 48", description: "A durable and high-performance concrete vibrator built for tough construction work and reliable results.", specs: ["Voltage: 42 V", "Frequency: 200 Hz", "Phase: 3 Ph", "Hose Length: 12 m"], features: ["Handles all types of concrete", "Built to last", "Tough, flexible materials", "Covers all internal concrete vibrations"], useCase: "Ideal for heavy-duty concrete applications and professional construction projects." },
              { name: "Husqvarna Vibrastar", description: "A reliable and robust concrete vibrator designed for efficient performance and long-lasting durability.", specs: ["Hose Length: 5 m", "Cable Length: 10 m"], features: ["High uptime and reliability", "Ergonomic design for easy use", "Cost and energy efficient", "Service-friendly construction"], useCase: "Ideal for medium to high slump concrete and general construction work." },
              { name: "Husqvarna AME 600", description: "A lightweight and portable electric drive unit designed for flexible-shaft concrete vibrators.", specs: ["Power: 230 V | 1 Phase | 50 Hz"], features: ["Operator-friendly design", "Extended reach", "Easy to assemble and use", "Lightweight and portable"], useCase: "Ideal for powering modular concrete vibrators in construction work." },
              { name: "Husqvarna AME 1490", description: "A powerful and durable electric drive unit designed for mechanical concrete vibrators.", specs: [], features: ["Long service life", "Easy to service", "Modular design", "Ergonomic and user-friendly"], useCase: "Ideal for powering AA and AZ series concrete vibrators in demanding construction work." },
              { name: "Husqvarna AME 1600", description: "A powerful and portable electric drive unit designed for modular concrete vibrators.", specs: ["Power: 230 V | 1 Phase | 50/60 Hz"], features: ["Long service life", "Easy to service", "Modular design", "Ergonomic and user-friendly"], useCase: "Ideal for powering AT series concrete vibrators in heavy-duty construction work." },
              { name: "Husqvarna HA", description: "A lightweight and efficient concrete vibrator head series designed for easy handling and high productivity.", specs: [], features: ["Optimal diameter for performance", "High productivity", "Easy to connect", "Flexible shaft options"], useCase: "Ideal for small pours, slabs, and beams in construction work." },
              { name: "Husqvarna AMD 3300", description: "A powerful diesel drive unit designed for mechanical concrete vibrators, delivering reliable performance in tough conditions.", specs: [], features: ["Engine protection for durability", "Easy to service", "Low fuel consumption", "Quick-release coupling"], useCase: "Ideal for heavy-duty construction and powering AA & AZ series concrete vibrators." },
              { name: "Husqvarna AMG 3200", description: "A reliable petrol drive unit designed for mechanical concrete vibrators, delivering consistent power on-site.", specs: [], features: ["Engine protection for durability", "Easy to service", "Low fuel consumption", "Quick-release coupling"], useCase: "Ideal for powering AA & AZ series concrete vibrators in demanding construction environments." },
              { name: "Husqvarna AT", description: "A versatile concrete vibrator head series designed for reliable performance and efficient concrete compaction.", specs: ["Tube Diameter: 29 mm (also 39, 49, 59 mm available)"], features: ["Optimal diameter for efficiency", "High productivity", "Durable design", "Reliable operation"], useCase: "Ideal for floors, slabs, and beams in construction projects." },
              { name: "Husqvarna Superflex", description: "A durable and flexible drive shaft series designed for efficient connection with AT vibrator heads.", specs: ["Hose Length: 1 m (also 2 m, 3 m, 4 m available)"], features: ["Optimal length options", "Quick and easy connection", "Durable design", "Versatile for different applications"], useCase: "Ideal for connecting vibrator heads to drive units in concrete work." },
              { name: "Husqvarna AA", description: "A premium mechanical concrete vibrator series built for heavy-duty performance and demanding construction work.", specs: ["Tube Diameter: 63 mm (also 75 mm available)"], features: ["Extended reach", "Designed for high performance", "Built to last", "Simple, cost-effective maintenance"], useCase: "Ideal for heavy-duty concrete applications on large construction sites." },
              { name: "Husqvarna AZ", description: "A reliable and cost-effective mechanical concrete vibrator series designed for medium-sized construction projects.", specs: ["Tube Diameter: 45 mm (also 25, 35, 55 mm available)"], features: ["Extended reach", "Built to last", "Easy to transport", "Simple, cost-effective maintenance"], useCase: "Ideal for medium-duty concrete applications in construction sites." },
              { name: "Husqvarna AY", description: "A powerful and durable pneumatic concrete vibrator designed for efficient performance in demanding applications.", specs: ["Hose Length: 2 m (also 4 m available)"], features: ["Wide range of applications", "Ball-stop handle for maximum efficiency", "Ergonomic design", "Long service life"], useCase: "Ideal for vibrating walls, columns, and structural concrete work." },
              { name: "Husqvarna AME 2200", description: "A powerful and portable electric drive unit designed for mechanical concrete vibrators.", specs: [], features: ["Long service life", "Easy to service", "Modular design", "Ergonomic and user-friendly"], useCase: "Ideal for powering AA and AZ series concrete vibrators in demanding construction work." },
            ],
          },
          {
            name: "External Vibrators (8)",
            items: [
              { name: "Husqvarna EP 371 B", description: "A high-speed external pneumatic vibrator designed for efficient and consistent concrete compaction.", specs: ["Centrifugal Force: 26.8 N", "Pressure: 6 bars", "Speed: 9350 vpm"], features: ["Adjustable centrifugal force", "Quick-release brackets", "Durable and long-lasting", "Trouble-free operation"], useCase: "Ideal for precast concrete and civil engineering applications." },
              { name: "Husqvarna EP 121 B", description: "A compact and efficient external pneumatic vibrator designed for reliable concrete compaction.", specs: ["Centrifugal Force: 8.1 N", "Pressure: 6 bars", "Speed: 9000 vpm"], features: ["Adjustable centrifugal force", "Quick-release brackets", "Durable and long-lasting", "Trouble-free operation"], useCase: "Ideal for precast concrete and civil engineering applications." },
              { name: "Husqvarna ER 507 B", description: "A high-performance external electric vibrator designed for efficient and precise concrete compaction.", specs: ["Power: 42 V | 3 Phase | 200 Hz"], features: ["Adjustable centrifugal force", "Quick-release brackets", "Durable and long-lasting", "Service-friendly design"], useCase: "Ideal for precast factories and heavy-duty concrete applications." },
              { name: "Husqvarna ER 407 B", description: "A high-performance external electric vibrator designed for efficient and reliable concrete compaction.", specs: ["Power: 42 V | 3 Phase | 200 Hz"], features: ["Adjustable centrifugal force", "Quick-release brackets", "Durable and long-lasting", "Service-friendly design"], useCase: "Ideal for precast factories and heavy-duty concrete applications." },
              { name: "Husqvarna ER 207 B", description: "A compact and efficient external electric vibrator designed for reliable concrete compaction.", specs: ["Power: 42 V | 3 Phase | 200 Hz"], features: ["Adjustable centrifugal force", "Quick-release brackets", "Durable and long-lasting", "Service-friendly design"], useCase: "Ideal for precast factories and heavy-duty concrete applications." },
              { name: "Husqvarna ER 505", description: "A reliable external electric vibrator designed for controlled and efficient concrete compaction.", specs: ["Power: 230/400 V | 3 Phase | 50 Hz"], features: ["Adjustable centrifugal force", "Vibration control for precision", "Durable and long-lasting", "Service-friendly design"], useCase: "Ideal for precast and heavy-duty concrete applications requiring controlled vibration." },
              { name: "Husqvarna ER 405", description: "A reliable external electric vibrator designed for controlled and efficient concrete compaction.", specs: ["Power: 230/400 V | 3 Phase | 50 Hz"], features: ["Adjustable centrifugal force", "Vibration control for precision", "Durable and long-lasting", "Service-friendly design"], useCase: "Ideal for precast and heavy-duty concrete applications requiring controlled vibration." },
              { name: "Husqvarna ER 305", description: "A reliable external electric vibrator designed for precise and efficient concrete compaction.", specs: ["Power: 230/400 V | 3 Phase | 50 Hz"], features: ["Adjustable centrifugal force", "Vibration control for precision", "Durable and long-lasting", "Service-friendly design"], useCase: "Ideal for precast and heavy-duty concrete applications requiring controlled vibration." },
            ],
          },
          {
            name: "Frequency Converters (3)",
            items: [
              { name: "Husqvarna CF 85 AS", description: "A high-performance frequency converter designed to power multiple concrete vibrators efficiently.", specs: ["Output Power: 6.2 kW", "Frequency: 50 Hz", "Rated Current: 13 A", "Intensity at 42V: 21 A"], features: ["Reliable power output", "Protects connected equipment", "Reset button prevents unwanted restarts", "Runs up to 4 vibrators simultaneously"], useCase: "Ideal for powering multiple concrete vibrators in large construction projects." },
              { name: "Husqvarna CF 67 T", description: "A compact and efficient electric frequency converter designed to power concrete vibrators reliably on-site.", specs: ["Output Power: 3.76 kW"], features: ["Reliable and stable power output", "Protection against overheating", "Reset button prevents unwanted restarts", "Can run up to 4 vibrators simultaneously"], useCase: "Perfect for portable concrete vibration systems, allowing you to operate multiple vibrators efficiently across construction sites." },
              { name: "Husqvarna CF 25 M", description: "A compact, electrically powered frequency converter designed for efficient and portable operation of concrete vibrators.", specs: ["Output Power: 1.8 kW", "Intensity at 42V: 25 A", "Power Supply: 230V | 1 phase | 50 Hz / 42V | 3 phase | 200 Hz"], features: ["Reliable and stable output", "Overheating protection for safety", "Reset button prevents unwanted restarts"], useCase: "Ideal for small to medium construction tasks, providing a portable and efficient solution for running concrete vibrators on-site." },
            ],
          },
        ],
      },
      {
        name: "Concrete Screeds",
        groups: [
          {
            name: "Walk-behind Screeds (3)",
            items: [
              { name: "Husqvarna BV 30", description: "A versatile, petrol-driven walk-behind concrete power screed designed to deliver smooth, high-quality slabs with ease.", specs: ["Fuel Tank Volume: 0.65 L", "Engine Power: 1 kW"], features: ["Operator-friendly design for easy handling", "Multiple working widths with interchangeable blades", "Strong build quality and durability", "User and service-friendly maintenance"], useCase: "Ideal for concrete slab finishing, offering precision, ease of use, and adaptability for different construction needs." },
              { name: "Husqvarna BV 20 G", description: "A petrol-powered vibrating walk-behind concrete screed, designed for efficient slab finishing with precision and ease.", specs: ["Fuel Tank Volume: 0.58 L", "Engine Power: 0.72 kW", "Working Width: 200 cm"], features: ["Durable build with long-lasting performance", "Adjustable vibration for precise finishing", "Long reach for efficient coverage", "Consistent professional results"], useCase: "Ideal for thin slabs (up to 150 mm), allowing direct application without pre-vibration." },
              { name: "Husqvarna Screed Blades", description: "High-quality interchangeable blades designed for use with the BV 30 power screed, delivering smooth and professional concrete finishes.", specs: ["Working Width Options: 182 cm, 244 cm, 300 cm, 366 cm, 426 cm"], features: ["Multiple working widths for flexibility", "User and service-friendly design", "Consistent professional results", "Strong build quality and durability", "Easy cleaning and maintenance"], useCase: "Ideal for concrete finishing applications, especially when used with Husqvarna BV 30 screeds." },
            ],
          },
          {
            name: "Truss Screeds (4)",
            items: [
              { name: "Husqvarna BT 90", description: "A high-performance modular truss screed system, designed for large-scale concrete applications requiring precision, strength, and flexibility.", specs: [], features: ["Smart and modular design", "Easy and quick setup (single operator friendly)", "Engineered for long-lasting durability", "Built to deliver consistent high performance"], useCase: "Perfect for heavy-duty concrete levelling, compaction, and finishing in large-scale infrastructure and industrial projects." },
              { name: "Husqvarna BT 90 Petrol", description: "A powerful modular truss screed system designed for large-scale concrete projects, offering flexibility, strength, and reliable performance with petrol-driven operation.", specs: [], features: ["Smart modular design for versatility", "Easy setup, even for a single operator", "Engineered for durability and long service life", "Even and continuous pulling force for smooth finishing"], useCase: "Ideal for large-scale concrete compaction, leveling, and finishing, especially where petrol-powered mobility is preferred." },
              { name: "Husqvarna BT 90 Screed Section (Petrol/Electric Compatible)", description: "The BT 90 Screed Section is a modular component used with both petrol and electric BT 90 screed systems.", specs: ["Working Width: 0.5 m", "Product Type: Modular screed section", "Compatibility: BT 90 Petrol & Electric systems"], features: ["Smart modular design for flexible configurations", "Easy setup with quick assembly", "Engineered for durability and long-term use", "Built to deliver consistent, high-quality performance"], useCase: "Perfect for heavy-duty concrete compaction, leveling, and finishing, especially in projects requiring customizable screed lengths." },
              { name: "Husqvarna BT 90 Screed Section (1 m / 6.5 ft)", description: "The BT 90 screed section (1 m) is a modular component designed for large-scale concrete applications such as floors, bridges, and runways up to 20 meters wide.", specs: ["Section Length: 1 m (6.5 ft)", "Type: Modular truss screed section", "Compatibility: Husqvarna BT 90 Petrol & Electric systems", "Art No.: 967 96 78-02"], features: ["Smart modular design", "Quick and easy setup", "Engineered for durability", "High-performance concrete finishing"], useCase: "Perfect for heavy-duty concrete leveling, compaction, and finishing, especially where precision and scalability are required." },
            ],
          },
        ],
      },
      {
        name: "Power Trowels",
        groups: [
          {
            name: "Ride-on Trowels (1)",
            items: [
              { name: "Husqvarna CRT 36 Ride-On Power Trowel", description: "A high-performance ride-on concrete power trowel designed to deliver superior finishing results with maximum productivity and operator comfort. The machine is ideal for finishing large surfaces ranging from 250 m² up to 1,000 m².", specs: ["Troweling Diameter: 915 mm", "Engine Power: 16.5 kW", "Blades: 8 pcs", "Type: Ride-on power trowel"], features: ["Optimum manoeuvrability for easy control", "Ideal for floating and high production work", "Smooth automatic operation", "Excellent visibility for precision finishing"], useCase: "Perfect for large-scale concrete flooring projects, including industrial floors, warehouses, and commercial slabs." },
            ],
          },
          {
            name: "Walk-behind Trowels (3)",
            items: [
              { name: "Husqvarna MCT 36 Walk-Behind Power Trowel", description: "A walk-behind power trowel designed for efficiency and value, making it ideal for small to medium-sized concrete areas (up to 500 m²). It offers excellent balance and control.", specs: ["Troweling Diameter: 915 mm", "Engine Power: 4.1 kW", "Blades: 4 pcs", "Type: Walk-behind power trowel"], features: ["Ergonomic working position for operator comfort", "Powerful engine for efficient performance", "Variable speed control for better finishing", "Easy loading and transportation"], useCase: "Best suited for finishing smaller concrete surfaces, such as floors, pavements, and slabs." },
              { name: "Husqvarna BG 375 Walk-Behind Power Trowel", description: "A powerful walk-behind concrete trowel built for handling large and demanding finishing tasks. Powered by a reliable Honda engine with QUICKSTOP clutch system.", specs: ["Troweling Diameter: 900 mm", "Engine Power Options: 4.3 kW / 6.3 kW", "Engine Type: Honda engine", "Type: Walk-behind power trowel"], features: ["High-capacity performance for demanding jobs", "QUICKSTOP clutch for enhanced safety", "Foldable, de-vibrated handle for comfort", "Maintenance stand for increased uptime"], useCase: "Ideal for medium to large concrete surfaces, including floors, slabs, and industrial areas." },
              { name: "Husqvarna BG 245 Walk-Behind Edger Power Trowel", description: "A compact walk-behind edger trowel, specifically designed for working in tight spaces, edges, and corners where larger machines cannot reach.", specs: ["Troweling Diameter: 600 mm", "Engine Power: 3.6 kW", "Type: Walk-behind edger trowel", "Engine: Petrol-powered"], features: ["Tilt with ease for better control near edges", "Compact design for easy transportation", "QUICKSTOP clutch for enhanced safety", "Height-adjustable handle for operator comfort"], useCase: "Perfect for edge finishing, corners, and small concrete surfaces, complementing larger trowels." },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Compactors",
    subcategories: [
      {
        name: "Tamping Rammers",
        groups: [
          {
            name: "Rammers (3)",
            items: [
              { name: "Husqvarna LT 8005 Rammer", description: "A well-balanced and powerful rammer designed for efficient compaction of granular and cohesive soils. Offers smooth control with low noise and emissions.", specs: ["Plate Width: 230 mm", "Weight: 75 kg"], features: ["High compaction performance", "Great ergonomics", "Easy to manoeuvre", "Easy to service"], useCase: "Ideal for trenches, narrow spaces, and areas around pillars, pipes, and foundations." },
              { name: "Husqvarna LT 6005", description: "A well-balanced and powerful rammer designed for efficient compaction of granular and cohesive soils. Offers smooth control with low noise and emissions.", specs: ["Plate Width: 230 mm", "Weight: 68 kg"], features: ["High compaction performance", "Great ergonomics", "Easy to manoeuvre", "Easy to service"], useCase: "Ideal for trenches, narrow spaces, and areas around pillars, pipes, and foundations." },
              { name: "Husqvarna LT 5005", description: "A lightweight yet powerful rammer designed for efficient compaction of granular and cohesive soils. Delivers smooth control with low noise and emissions.", specs: ["Plate Width: 230 mm", "Weight: 61 kg"], features: ["High compaction performance", "Great ergonomics", "Easy to manoeuvre", "Easy to service"], useCase: "Ideal for trenches, narrow spaces, and areas around pillars, pipes, and foundations." },
            ],
          },
        ],
      },
      {
        name: "Forward Plate Compactors",
        groups: [
          {
            name: "Soil & Asphalt Plates (8)",
            items: [
              { name: "Husqvarna LF 75 PACE", description: "A battery-powered plate compactor designed for efficient soil and asphalt compaction. Delivers petrol-like performance with low maintenance and zero emissions.", specs: ["Plate Width: 420 mm", "Weight: 90 kg", "Centrifugal Force: 14.6 kN"], features: ["No direct emissions", "High productivity", "Long run time", "Comfortable operation"], useCase: "Ideal for driveways, parking areas, landscaping, and general construction work." },
              { name: "Husqvarna LF 100 PACE", description: "A powerful and wider battery-powered compactor offering higher performance for demanding jobs, with zero emissions and efficient operation.", specs: ["Plate Width: 500 mm", "Weight: 105 kg", "Centrifugal Force: 16.7 kN"], features: ["No direct emissions", "High productivity", "Long run time", "Easy to use"], useCase: "Suitable for larger areas like roads, parking lots, and heavy-duty compaction work." },
              { name: "Husqvarna LF 160 (Electrical)", description: "A powerful electric plate compactor designed for efficient soil compaction. Offers low maintenance, reduced vibration, and easy transport.", specs: ["Plate Width: 500 mm", "Centrifugal Force: 25.4 kN"], features: ["Hours of efficient work", "Easy handling", "Paving protection", "Low vibration handle"], useCase: "Ideal for paving, road work, and compaction of thin to medium soil layers." },
              { name: "Husqvarna LF 160 (Diesel)", description: "A heavy-duty, fast-operating diesel plate compactor designed for efficient compaction of granular soils. Offers low maintenance, high productivity, and long-term durability.", specs: ["Plate Width: 500 mm", "Centrifugal Force: 25.4 kN"], features: ["Hours of efficient work", "Easy handling", "Paving protection"], useCase: "Ideal for compacting thin to medium soil layers, paving work, and construction projects." },
              { name: "Husqvarna LF 50 L", description: "A lightweight and fast-operating compactor designed for efficient compaction of granular soils. Its compact design and low-vibration handle improve comfort and productivity.", specs: ["Plate Width: 320 mm", "Weight: 55.8 kg", "Centrifugal Force: 8.4 kN"], features: ["Hours of efficient work", "Easy handling", "Paving protection", "Saving storage space"], useCase: "Ideal for compacting thin to medium soil layers, trenches, and small construction or paving jobs." },
              { name: "Husqvarna LF 60 LAT", description: "A lightweight compactor designed for both soil and asphalt applications. Features a large water tank system, easy maintenance, and clean operation.", specs: ["Plate Width: 350 mm", "Weight: 67 kg", "Centrifugal Force: 10 kN"], features: ["Hours of efficient work", "More work with less water", "Easy to transport", "Optimized for asphalt"], useCase: "Ideal for asphalt compaction, repair work, driveways, parking areas, and general construction tasks." },
              { name: "Husqvarna LFV 80", description: "A fast-operating plate compactor designed for efficient compaction of granular soils. Optimized speed and force deliver high productivity.", specs: ["Plate Width: 420 mm", "Weight: 81 kg", "Centrifugal Force: 19 kN"], features: ["Durable design", "High reliability", "Additional capability for asphalt applications", "Paving protection"], useCase: "Ideal for soil and asphalt compaction, paving work, and medium-scale construction projects." },
              { name: "Husqvarna LFV 60", description: "A compact and efficient plate compactor built for smooth and fast compaction of thin to medium soil layers with consistent performance.", specs: ["Plate Width: 350 mm", "Weight: 64.9 kg", "Centrifugal Force: 10.4 kN"], features: ["Durable design", "High reliability", "Additional capability for asphalt applications", "Paving protection"], useCase: "Ideal for compacting soil and asphalt in repair work, pathways, and small to medium construction projects." },
            ],
          },
        ],
      },
      {
        name: "Reversible Plate Compactors",
        groups: [
          {
            name: "Reversible Plates (4)",
            items: [
              { name: "Husqvarna LG 400", description: "A powerful and reliable reversible plate compactor designed for efficient compaction of deep and medium-depth granular soil. Built with a robust engine and ergonomic design.", specs: ["Plate Width: 650 mm", "Weight: 436 kg", "Centrifugal Force: 52 kN"], features: ["Plates made to last", "Strong protection, easy transportation", "Ergonomics and efficiency", "Easy operation"], useCase: "Ideal for deep compaction, confined areas, and heavy construction work as an alternative to rollers." },
              { name: "Husqvarna LG 200", description: "A compact yet powerful reversible compactor designed for smaller jobs. Offers excellent compaction efficiency with responsive handling and reduced operator fatigue.", specs: ["Plate Width: 500 mm", "Weight: 246 kg", "Centrifugal Force: 36 kN"], features: ["Strong protection, easy transportation", "Easy operation", "Low handle vibration levels"], useCase: "Ideal for driveways, pathways, trenches, and small to medium compaction tasks." },
              { name: "Husqvarna LG 200 S", description: "A compact yet powerful reversible plate compactor designed for smaller jobs. Delivers high efficiency and smooth handling for faster and more productive work.", specs: ["Plate Width: 500 mm", "Weight: 241 kg", "Centrifugal Force: 36 kN"], features: ["Kohler engine", "Strong protection, easy transportation", "Easy operation", "Low handle vibration levels"], useCase: "Ideal for driveways, pathways, trenches, and small to medium compaction jobs." },
              { name: "Husqvarna LH 700", description: "A high-performance, fully hydraulic compactor designed for heavy-duty applications. Provides powerful compaction for medium to thick soil layers.", specs: ["Type: Fully hydraulic compactor", "Engine: Hatz diesel engine"], features: ["Easy to manoeuvre", "More hours of efficient work", "Handles the toughest jobs", "Sturdy and service-friendly"], useCase: "Ideal for heavy construction, deep compaction, and demanding job sites like roads and infrastructure projects." },
            ],
          },
        ],
      },
      {
        name: "Compaction Rollers",
        groups: [
          {
            name: "Duplex Rollers (1)",
            items: [
              { name: "Husqvarna LP 6500", description: "A fully hydraulic duplex roller designed for compacting thin layers of soil and asphalt. High speed and centrifugal force improve productivity, while the compact design allows easy operation in tight spaces.", specs: ["Weight: 681 kg", "Centrifugal Force: 20 kN", "Type: Fully hydraulic duplex roller"], features: ["Work anywhere", "Hours of efficient work", "Longer service life", "Effective engine"], useCase: "Ideal for compacting asphalt, granular soil, trenches, and areas close to walls or confined job sites." },
            ],
          },
        ],
      },
    ],
  },
];

const salesReps: Rep[] = [
  { name: "Mr. Dattatray Thorat", location: "Pune", phone: "+91 9150544403", email: "Dattatray.Thorat@husqvarnagroup.com", title: "RSM – West Distribution Business" },
  { name: "Mr. Sathish Kumar", location: "Chennai", phone: "+91 7530000493", email: "Sathish.Kumar@husqvarnagroup.com", title: "RSM – South Distribution Business" },
  { name: "Mr. Ramesh Satyanarayana", location: "Hyderabad", phone: "+91 9150075235", email: "Ramesh.Satyanarayana@husqvarnagroup.com", title: "ASM – Central Distribution Business" },
  { name: "Mr. Senthilkumar Jayaraman", location: "Bengaluru", phone: "+91 7338841145", email: "Senthilkumar.Jayaraman@husqvarnagroup.com", title: "RSM – South Direct Business" },
  { name: "Sonu", location: "Bhubaneswar (East)", phone: "+91 7387101711", email: "sonu.a.singh@husqvarnagroup.com", title: "RSM – Eastern India" },
];

/* ── DESIGN TOKENS — Industrial Light / Steel Blue ── */
const T = {
  // Backgrounds
  bg: "#EEF1F5",           // cool concrete light
  bgAlt: "#E4E8EE",        // slightly darker cool surface
  bgPanel: "#F8FAFC",      // near white panel
  bgDark: "#111827",       // deep navy charcoal
  bgDarkAlt: "#1A2233",    // navy alt
  bgOrange: "#1A56A0",     // primary blue (replacing orange bg role)
  bgOrangeHover: "#144788",
  bgOrangeLight: "#DDEAF8",

  // Text
  ink: "#111827",          // near black ink
  inkMid: "#2D3A4A",       // dark cool grey
  inkDim: "#5A6880",       // muted mid
  inkLight: "#8A98A8",     // light muted

  // Accents — steel blue family
  orange: "#1A6CB8",       // primary blue
  orangeLight: "#2E82D4",  // lighter blue (hover)
  orangeDim: "#124E8A",    // darker blue
  orangePale: "#D6E8F7",   // very light blue tint

  // Borders
  rule: "rgba(17,24,39,0.10)",
  ruleMid: "rgba(17,24,39,0.20)",
  ruleHeavy: "rgba(17,24,39,0.38)",

  white: "#FFFFFF",
};

/* ── FONTS ── */
const FONT_DISPLAY = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FONT_BODY = "'DM Sans', 'Helvetica Neue', sans-serif";
const FONT_MONO = "'DM Mono', 'Courier New', monospace";

/* ── FADE IN ── */
const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── LABEL TAG ── */
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  }}>
    <div style={{ width: "24px", height: "2px", background: T.orange }} />
    <span style={{
      fontFamily: FONT_BODY,
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: T.orange,
    }}>{children}</span>
  </div>
);

/* ── PRODUCT CARD ── */
const ProductCard = memo(({ product, index }: { product: Product; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const specs = parseSpecs(product.specs);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.bgPanel,
        border: `1px solid ${hovered ? T.orange : T.rule}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? "4px 4px 0px " + T.orange : "2px 2px 0px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Number badge */}
      <div style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        fontFamily: FONT_MONO,
        fontSize: "9px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        color: T.inkLight,
      }}>{String(index + 1).padStart(2, "0")}</div>

      {/* Orange top bar */}
      <div style={{ height: "3px", background: hovered ? T.orange : T.rule, transition: "background 0.2s", flexShrink: 0 }} />

      <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h4 style={{
            fontFamily: FONT_BODY,
            fontSize: "14px",
            fontWeight: 700,
            color: T.ink,
            margin: "0 0 8px",
            lineHeight: 1.3,
            paddingRight: "28px",
          }}>
            {product.name}
          </h4>
          <p style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.inkDim, margin: 0, lineHeight: 1.75 }}>
            {product.description}
          </p>
        </div>

        {specs.length > 0 && (
          <div>
            <p style={{
              fontFamily: FONT_MONO,
              fontSize: "8.5px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: T.orange,
              margin: "0 0 8px",
            }}>Specifications</p>
            <div style={{ borderTop: `1px solid ${T.rule}` }}>
              {specs.map((s, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: `1px solid ${T.rule}`,
                  gap: "12px",
                }}>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "11px", color: T.inkDim }}>{s.label}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: "11px", color: T.ink, fontWeight: 500, textAlign: "right" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p style={{
            fontFamily: FONT_MONO,
            fontSize: "8.5px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.orange,
            margin: "0 0 8px",
          }}>Key Features</p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
            {product.features.map((f, i) => (
              <li key={i} style={{
                display: "flex",
                gap: "8px",
                fontFamily: FONT_BODY,
                fontSize: "11.5px",
                color: T.inkMid,
                alignItems: "flex-start",
              }}>
                <span style={{
                  width: "4px",
                  height: "4px",
                  background: T.orange,
                  borderRadius: "0",
                  flexShrink: 0,
                  marginTop: "6px",
                }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {product.useCase && (
        <div style={{
          padding: "12px 24px",
          background: T.orangePale,
          borderTop: `1px solid rgba(212,90,26,0.2)`,
        }}>
          <p style={{
            fontFamily: FONT_MONO,
            fontSize: "8px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.orangeDim,
            margin: "0 0 3px",
          }}>Application</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "11.5px", color: T.inkMid, margin: 0, lineHeight: 1.6 }}>
            {product.useCase}
          </p>
        </div>
      )}
    </div>
  );
});
ProductCard.displayName = "ProductCard";

/* ── ACCORDION ── */
const Accordion = ({ title, count, children }: { title: string; count?: string; children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.rule}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: open ? T.bgOrangeLight : "transparent",
          border: "none",
          cursor: "pointer",
          padding: "18px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          textAlign: "left",
          transition: "background 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{
            fontFamily: FONT_BODY,
            fontSize: "13px",
            fontWeight: 600,
            color: open ? T.orange : T.ink,
            letterSpacing: "0.01em",
            transition: "color 0.2s",
          }}>{title}</span>
          {count && (
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: "9px",
              color: T.white,
              background: open ? T.orange : T.inkLight,
              padding: "2px 8px",
              transition: "background 0.2s",
            }}>{count}</span>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: open ? T.orange : "transparent",
            border: `1px solid ${open ? T.orange : T.ruleMid}`,
            color: open ? T.white : T.inkMid,
            fontSize: "18px",
            lineHeight: 1,
            flexShrink: 0,
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
        >+</motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "28px", paddingTop: "8px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── CONTACT FORM ── */
const ContactForm = () => {
  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: T.bgPanel,
    border: "none",
    borderBottom: `2px solid ${T.ruleMid}`,
    color: T.ink,
    fontSize: "14px",
    padding: "14px 0",
    outline: "none",
    fontFamily: FONT_BODY,
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_MONO,
    display: "block",
    fontSize: "9px",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: T.inkDim,
    marginBottom: "6px",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input type="text" placeholder="Your name" style={{ ...fieldStyle, width: "100%" }} />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" placeholder="you@company.com" style={{ ...fieldStyle, width: "100%" }} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Phone Number</label>
        <input type="tel" placeholder="+91 XXXXX XXXXX" style={fieldStyle} />
      </div>
      <div>
        <label style={labelStyle}>Requirement Details</label>
        <textarea
          rows={4}
          placeholder="Describe your requirement..."
          style={{ ...fieldStyle, resize: "none", paddingTop: "10px" }}
        />
      </div>
      <button
        style={{
          background: T.orange,
          color: T.white,
          border: "none",
          padding: "16px 36px",
          fontFamily: FONT_BODY,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          width: "fit-content",
          transition: "background 0.2s, transform 0.1s",
          position: "relative",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = T.orangeLight)}
        onMouseLeave={e => (e.currentTarget.style.background = T.orange)}
        onMouseDown={e => (e.currentTarget.style.transform = "translateY(1px)")}
        onMouseUp={e => (e.currentTarget.style.transform = "translateY(0)")}
      >
        Submit Inquiry →
      </button>
    </div>
  );
};

/* ── SALES REP CARD ── */
const SalesRepCard = ({ rep, idx }: { rep: Rep; idx: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={idx * 0.07}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "4px 1fr",
          gap: "0",
          transition: "transform 0.2s",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <div style={{ background: hovered ? T.orange : T.rule, transition: "background 0.2s" }} />
        <div style={{
          padding: "20px 24px",
          background: T.bgPanel,
          border: `1px solid ${hovered ? T.orange : T.rule}`,
          borderLeft: "none",
        }}>
          <p style={{
            fontFamily: FONT_MONO,
            fontSize: "8.5px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: T.orange,
            margin: "0 0 4px",
          }}>{rep.title}</p>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
            <h4 style={{ fontFamily: FONT_BODY, fontSize: "16px", fontWeight: 700, color: T.ink, margin: 0 }}>
              {rep.name}
            </h4>
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: "10px",
              color: T.inkLight,
              whiteSpace: "nowrap",
            }}>{rep.location}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a href={`tel:${rep.phone}`} style={{
              fontFamily: FONT_MONO,
              fontSize: "12px",
              color: hovered ? T.orange : T.ink,
              textDecoration: "none",
              transition: "color 0.2s",
              fontWeight: 500,
            }}>{rep.phone}</a>
            <a href={`mailto:${rep.email}`} style={{
              fontFamily: FONT_BODY,
              fontSize: "11.5px",
              color: T.inkDim,
              textDecoration: "none",
              transition: "color 0.2s",
              wordBreak: "break-all",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = T.orange)}
              onMouseLeave={e => (e.currentTarget.style.color = T.inkDim)}
            >{rep.email}</a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

/* ── CATEGORY BLOCK ── */
const CategoryBlock = ({ category, idx }: { category: MachineCategory; idx: number }) => (
  <FadeIn delay={0.04}>
    <div className="category-block" style={{ marginBottom: "96px" }}>
      {/* Category header — big industrial type */}
      <div className="cat-header" style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "0",
        marginBottom: "48px",
        alignItems: "stretch",
      }}>
        <div style={{
          background: T.orange,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{
            fontFamily: FONT_MONO,
            fontSize: "11px",
            fontWeight: 500,
            color: T.white,
            letterSpacing: "0.12em",
          }}>{String(idx + 1).padStart(2, "0")}</span>
        </div>
        <div style={{
          background: T.bgDark,
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          justifyContent: "space-between",
        }}>
          <h2 className="cat-title" style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 400,
            color: T.white,
            margin: 0,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {category.name}
          </h2>
          <div style={{
            fontFamily: FONT_MONO,
            fontSize: "9px",
            color: T.inkLight,
            letterSpacing: "0.14em",
            whiteSpace: "nowrap",
          }}>
            {category.subcategories.length} SUBCATEGORIES
          </div>
        </div>
      </div>

      {category.subcategories.map((sub, si) => (
        <div key={si} style={{ marginBottom: "48px" }}>
          {/* Subcategory label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
            paddingBottom: "12px",
            borderBottom: `2px solid ${T.ink}`,
          }}>
            <span style={{
              fontFamily: FONT_BODY,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: T.ink,
            }}>{sub.name}</span>
            <div style={{ flex: 1, height: "1px", background: T.rule }} />
          </div>

          {sub.groups ? (
            <div className="sub-group" style={{ paddingLeft: "24px", borderLeft: `2px solid ${T.rule}` }}>
              {sub.groups.map((grp) => (
                <Accordion
                  key={grp.name}
                  title={grp.name.replace(/\s*\(\d+\)$/, "")}
                  count={grp.name.match(/\((\d+)\)$/)?.[1]}
                >
                  <div className="product-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "12px",
                    paddingTop: "12px",
                  }}>
                    {grp.items.map((prod, pi) => (
                      <ProductCard key={prod.name} product={prod} index={pi} />
                    ))}
                  </div>
                </Accordion>
              ))}
            </div>
          ) : sub.items ? (
            <div className="product-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "12px",
              paddingLeft: "24px",
              borderLeft: `2px solid ${T.rule}`,
            }}>
              {sub.items.map((prod, pi) => (
                <ProductCard key={prod.name} product={prod} index={pi} />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  </FadeIn>
);

/* ── MAIN PAGE ── */
export default function HusqvarnaPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -100]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["about", "machines", "services", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["about", "machines", "services", "contact"];
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      color: T.ink,
      fontFamily: FONT_BODY,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${T.orange}; color: ${T.white}; }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: ${T.inkLight}; }
        input:focus, textarea:focus { border-bottom-color: ${T.orange} !important; }
        
        /* Cool concrete texture */
        .concrete-bg {
          position: relative;
        }
        .concrete-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          pointer-events: none;
          z-index: 0;
        }

        /* Cross-hatch grid pattern */
        .grid-pattern::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(17,24,39,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,24,39,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        
        /* Responsive helpers */
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
          .product-grid { grid-template-columns: 1fr !important; }
          .cat-header { grid-template-columns: auto 1fr !important; }
          .cat-title { font-size: 32px !important; }
          .hero-stats { display: none !important; }
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .section-padding { padding: 80px 20px !important; }
          .hero-heading { font-size: 48px !important; }
          .hero-subheading { font-size: 14px !important; }
          .hero-rightpanel { display: none; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-stats { display: flex; flex-direction: column; width: 160px; }
          .hero-heading { font-size: 64px !important; }
          .section-padding { padding: 100px 32px !important; }
          .form-row { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .form-row { grid-template-columns: 1fr 1fr !important; }
          .section-padding { padding: 120px 48px !important; }
        }
        
        /* Hamburger menu */
        .hamburger { display: none; }
        @media (max-width: 767px) {
          .hamburger { display: flex; }
          .desktop-nav { display: none; }
        }
      `}</style>

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          background: scrolled ? "rgba(240,237,230,0.97)" : "transparent",
          borderBottom: scrolled ? `1px solid ${T.ruleMid}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          justifyContent: "space-between",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <a 
          href="/" 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0", 
            textDecoration: "none", 
            cursor: "pointer" 
          }}
        >
          <div style={{
            background: T.orange,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}>
            <span style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "14px",
              color: T.white,
              letterSpacing: "0.12em",
            }}>H</span>
          </div>
          <div>
            <span style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "15px",
              letterSpacing: "0.14em",
              color: T.ink,
            }}>HUSQVARNA</span>
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: "8px",
              color: T.inkDim,
              letterSpacing: "0.18em",
              display: "block",
              marginTop: "-2px",
            }}>CONSTRUCTION</span>
          </div>
        </a>

        {/* Desktop navigation */}
        <div className="desktop-nav" style={{ display: "flex", gap: "0px", alignItems: "stretch", height: "64px" }}>
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link}`}
              style={{
                fontFamily: FONT_BODY,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: activeSection === link ? T.white : T.inkMid,
                background: activeSection === link ? T.orange : "transparent",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                borderLeft: `1px solid ${T.rule}`,
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontFamily: FONT_BODY,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: T.white,
              background: T.ink,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              borderLeft: `1px solid ${T.rule}`,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = T.orange)}
            onMouseLeave={e => (e.currentTarget.style.background = T.ink)}
          >
            Inquire →
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none",
          border: "none",
          color: T.ink,
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 110,
          display: isMobile ? "flex" : "none",
        }}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile nav overlay */}
        <AnimatePresence>
          {menuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "absolute",
                top: "64px",
                left: 0,
                right: 0,
                background: "rgba(240,237,230,0.98)",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                borderBottom: `1px solid ${T.ruleMid}`,
                zIndex: 99,
              }}
            >
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: activeSection === link ? T.orange : T.ink,
                    padding: "16px 24px",
                    borderBottom: `1px solid ${T.rule}`,
                  }}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: T.white,
                  background: T.ink,
                  padding: "16px 24px",
                  textAlign: "center",
                }}
              >
                Inquire →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section
        className="concrete-bg grid-pattern section-padding"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          overflow: "hidden",
          background: T.bg,
          padding: "120px 48px 0",
        }}
      >
        {/* Large background text */}
        <div className="hide-mobile" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(120px, 22vw, 300px)",
          letterSpacing: "-0.02em",
          color: "rgba(28,26,23,0.035)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}>HUSQVARNA</div>

        {/* Orange vertical stripe (hidden on mobile) */}
        <div className="hide-mobile" style={{
          position: "absolute",
          right: "80px",
          top: 0,
          bottom: 0,
          width: "4px",
          background: T.orange,
          zIndex: 1,
        }} />

        {/* Horizontal measurement lines */}
        <div className="hide-mobile" style={{
          position: "absolute",
          top: "120px",
          left: "48px",
          right: "100px",
          height: "1px",
          background: T.rule,
          zIndex: 1,
        }} />
        <div className="hide-mobile" style={{
          position: "absolute",
          top: "120px",
          left: "48px",
          width: "1px",
          height: "12px",
          background: T.ruleMid,
          zIndex: 1,
        }} />
        <div className="hide-mobile" style={{
          position: "absolute",
          top: "120px",
          right: "100px",
          width: "1px",
          height: "12px",
          background: T.ruleMid,
          zIndex: 1,
        }} />

        <motion.div
          style={{ y: heroY, position: "relative", zIndex: 2, padding: "0 0 0" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "flex", gap: isMobile ? "24px" : "0", flexDirection: isMobile ? "column" : "row", alignItems: "flex-end" }}>
              {/* Big headline */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: T.orange,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}>
                   
                    
                  </span>
                </div>
                <h1 className="hero-heading" style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: isMobile ? "48px" : "clamp(72px, 11vw, 148px)",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: T.ink,
                  lineHeight: 0.9,
                  margin: "0 0 24px",
                }}>
                  Built For
                  <span style={{ color: T.orange }}>The Site.</span>
                  Built To<br />Last.
                </h1>

                <p className="hero-subheading" style={{
                  fontFamily: FONT_BODY,
                  fontSize: isMobile ? "14px" : "16px",
                  color: T.inkDim,
                  maxWidth: "520px",
                  lineHeight: 1.8,
                  marginBottom: "30px",
                  fontWeight: 400,
                }}>
                  Global leader in manufacturing innovative equipment and diamond tools for the light construction industry. Engineering relentless productivity since the 20th century.
                </p>

                <div style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "wrap" }}>
                  <a
                    href="#machines"
                    style={{
                      background: T.ink,
                      color: T.white,
                      textDecoration: "none",
                      padding: "14px 28px",
                      fontFamily: FONT_BODY,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      transition: "background 0.2s",
                      display: "inline-block",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = T.orange)}
                    onMouseLeave={e => (e.currentTarget.style.background = T.ink)}
                  >
                    Explore Fleet →
                  </a>
                  <a
                    href="#about"
                    style={{
                      color: T.ink,
                      textDecoration: "none",
                      padding: "14px 28px",
                      fontFamily: FONT_BODY,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      border: `1px solid ${T.ruleMid}`,
                      borderLeft: "none",
                      display: "inline-block",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = T.orange; e.currentTarget.style.borderColor = T.orange; }}
                    onMouseLeave={e => { e.currentTarget.style.color = T.ink; e.currentTarget.style.borderColor = T.ruleMid; }}
                  >
                    Our Story
                  </a>
                </div>
              </div>

              {/* Right panel — vertical stats (hidden on mobile) */}
              <div className={isMobile ? "hide-mobile" : ""} style={{
                width: "200px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                borderLeft: `1px solid ${T.ruleMid}`,
                marginBottom: "0",
                paddingLeft: "32px",
                gap: "0",
                alignSelf: "flex-end",
                paddingBottom: "0",
              }}>
                {[
                  ["SEK 7.2B", "Annual Revenue"],
                  ["2,500+", "Employees"],
                  ["4", "Continents"],
                  ["40+", "Categories"],
                ].map(([val, label], i) => (
                  <div key={i} style={{
                    padding: "20px 0",
                    borderBottom: i < 3 ? `1px solid ${T.rule}` : "none",
                  }}>
                    <div style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: "36px",
                      letterSpacing: "0.04em",
                      color: T.ink,
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}>{val}</div>
                    <div style={{
                      fontFamily: FONT_MONO,
                      fontSize: "8px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: T.inkLight,
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom ticker bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            position: "relative",
            zIndex: 2,
            background: T.bgDark,
            marginTop: "40px",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            overflowX: "auto",
            borderTop: `3px solid ${T.orange}`,
          }}
        >
          {["Concrete Vibrators", "Power Screeds", "Power Trowels", "Plate Compactors", "Reversible Plates", "Compaction Rollers", "Rammers"].map((item, i) => (
            <span key={i} style={{
              fontFamily: FONT_MONO,
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: T.inkLight,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}>
              {i > 0 && <span style={{ color: T.orange, fontSize: "6px" }}>◆</span>}
              {item}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-padding" style={{ background: T.bgAlt, padding: "120px 48px", position: "relative" }}>
        {/* Corner marks (hidden on mobile) */}
        <div className="hide-mobile" style={{ position: "absolute", top: "40px", left: "40px", width: "20px", height: "20px", borderTop: `2px solid ${T.orange}`, borderLeft: `2px solid ${T.orange}` }} />
        <div className="hide-mobile" style={{ position: "absolute", top: "40px", right: "40px", width: "20px", height: "20px", borderTop: `2px solid ${T.orange}`, borderRight: `2px solid ${T.orange}` }} />

        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <FadeIn>
            <Eyebrow>About Husqvarna Construction</Eyebrow>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "start" }}>
            <FadeIn>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: isMobile ? "36px" : "clamp(40px, 5vw, 72px)",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: T.ink,
                lineHeight: 0.95,
                marginBottom: "24px",
              }}>
                Pioneering<br />
                <span style={{ color: T.orange }}>Performance</span><br />
                Since Day One.
              </h2>
              <p style={{ fontSize: "15px", color: T.inkDim, lineHeight: 1.85, marginBottom: "16px" }}>
                Husqvarna Construction specializes in construction equipment, diamond tools, and cutting, drilling, and surface preparation solutions.
              </p>
              <p style={{ fontSize: "15px", color: T.inkDim, lineHeight: 1.85, marginBottom: "32px" }}>
                The company aims to help shape modern urban environments by providing advanced tools and technology. Its goal is to be a trusted business partner while staying at the forefront of industry innovation.
              </p>
              <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
                {["Founded in Sweden", "Jonsered HQ", "Global Operations"].map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: FONT_MONO,
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: T.ink,
                    border: `1px solid ${T.ruleMid}`,
                    borderLeft: i > 0 ? "none" : `1px solid ${T.ruleMid}`,
                    padding: "8px 14px",
                  }}>{tag}</span>
                ))}
              </div>
            </FadeIn>

            {/* Stats grid */}
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "0",
                border: `1px solid ${T.ruleMid}`,
              }}>
                {[
                  { icon: "◉", title: "Global Presence", desc: "Factories in Europe, North America, China, and India. Wide network of sales companies, service centers, and distributors worldwide.", stat: "4 Continents" },
                  { icon: "▦", title: "Head Office", desc: "Located in Jonsered, Sweden. Steering global operations with around 2,500 employees internationally.", stat: "Jonsered, SE" },
                  { icon: "◈", title: "Annual Revenue", desc: "2025 annual revenue reflecting our position as a trusted and reliable industry leader in construction equipment.", stat: "SEK 7.2B" },
                  { icon: "◇", title: "Innovation First", desc: "Providing advanced tools and technology. Widely used in construction, infrastructure, and urban development projects.", stat: "40+ Categories" },
                ].map((h, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div style={{
                      padding: "32px 28px",
                      borderRight: (!isMobile && i % 2 === 0) ? `1px solid ${T.ruleMid}` : "none",
                      borderBottom: i < 2 ? `1px solid ${T.ruleMid}` : "none",
                      background: T.bgPanel,
                      position: "relative",
                      overflow: "hidden",
                      transition: "background 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = T.bgOrangeLight)}
                      onMouseLeave={e => (e.currentTarget.style.background = T.bgPanel)}
                    >
                      <div style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: "32px",
                        color: T.orange,
                        letterSpacing: "0.06em",
                        marginBottom: "8px",
                        lineHeight: 1,
                      }}>{h.stat}</div>
                      <div style={{
                        fontFamily: FONT_BODY,
                        fontSize: "12px",
                        fontWeight: 700,
                        color: T.ink,
                        marginBottom: "8px",
                        letterSpacing: "0.02em",
                      }}>{h.title}</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.inkDim, lineHeight: 1.7 }}>{h.desc}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MACHINES ─── */}
      <section id="machines" className="section-padding" style={{ background: T.bg, padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
              gap: "24px",
              alignItems: "end",
              marginBottom: "48px",
              paddingBottom: "24px",
              borderBottom: `3px solid ${T.ink}`,
            }}>
              <div>
                <Eyebrow>Equipment Catalog</Eyebrow>
                <h2 style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: isMobile ? "36px" : "clamp(40px, 5.5vw, 80px)",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: T.ink,
                  lineHeight: 0.95,
                  margin: 0,
                }}>
                  The Full<br />
                  <span style={{ color: T.orange }}>Arsenal.</span>
                </h2>
              </div>
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: "14px",
                color: T.inkDim,
                maxWidth: "380px",
                lineHeight: 1.85,
              }}>
                Comprehensive range of heavy-duty construction machinery. From precision concrete placement to heavy compaction — engineered for continuous industrial performance.
              </p>
            </div>
          </FadeIn>

          <div>
            {machineData.map((cat, i) => (
              <CategoryBlock key={i} category={cat} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="section-padding" style={{ background: T.bgDark, padding: "120px 48px", position: "relative", overflow: "hidden" }}>
        {/* Large watermark */}
        <div className="hide-mobile" style={{
          position: "absolute",
          bottom: "-40px",
          right: "-20px",
          fontFamily: FONT_DISPLAY,
          fontSize: "200px",
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.03)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}>SERVICE</div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "24px", height: "2px", background: T.orange }} />
                <span style={{
                  fontFamily: FONT_BODY,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: T.orange,
                }}>Services</span>
              </div>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: isMobile ? "36px" : "clamp(40px, 5.5vw, 80px)",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: T.white,
                lineHeight: 0.95,
              }}>
                Global Support.<br />
                <span style={{ color: T.orange }}>Zero Compromise.</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "64px", alignItems: "start" }}>
            <div>
              <FadeIn delay={0.1}>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.85,
                  marginBottom: "24px",
                }}>
                  At Husqvarna, we look after every aspect of your business. From powerful, precise, and ergonomic equipment to a complete range of services that help you stay productive every hour of every workday.
                </p>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.85,
                  marginBottom: "40px",
                }}>
                  Whether you're operating machines on-site, managing your fleet, or maintaining equipment in the workshop, Husqvarna services help you work with confidence. Our professional service centres and certified partners deliver reliable support throughout your machine's entire lifecycle.
                </p>
              </FadeIn>

              {/* Service pillars */}
              <FadeIn delay={0.2}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr", gap: "0", border: `1px solid rgba(255,255,255,0.12)` }}>
                  {[
                    { title: "On-site Support", num: "01" },
                    { title: "Fleet Management", num: "02" },
                    { title: "Workshop Service", num: "03" },
                    { title: "Lifecycle Care", num: "04" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      padding: "24px 20px",
                      borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                      borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none",
                      transition: "background 0.2s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(26,108,184,0.15)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{
                        fontFamily: FONT_MONO,
                        fontSize: "8px",
                        color: T.orange,
                        letterSpacing: "0.14em",
                        marginBottom: "8px",
                      }}>{s.num}</div>
                      <div style={{
                        fontFamily: FONT_BODY,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: T.white,
                        letterSpacing: "0.02em",
                      }}>{s.title}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Service Centre Card */}
            <FadeIn delay={0.15}>
              <div style={{
                border: `1px solid rgba(255,255,255,0.12)`,
                overflow: "hidden",
              }}>
                {/* Header */}
                <div style={{
                  background: T.orange,
                  padding: "14px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: T.white,
                  }}>Service Centre</span>
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.7)",
                  }}>Nashik, MH</span>
                </div>

                <div style={{ padding: "36px 28px", background: T.bgDarkAlt }}>
                  <h4 style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "32px",
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: T.white,
                    marginBottom: "8px",
                  }}>Nashik Service Centre</h4>
                  <p style={{
                    fontFamily: FONT_BODY,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "32px",
                    lineHeight: 1.7,
                  }}>
                    Knowledgeable, service-focused staff providing world-class support. Our priority is your uptime.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <p style={{
                        fontFamily: FONT_MONO,
                        fontSize: "8px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: T.orange,
                        marginBottom: "8px",
                      }}>Address</p>
                      <p style={{
                        fontFamily: FONT_BODY,
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.75,
                      }}>
                        G No 312A/B266-269/270/276, Hissa No 12,<br />
                        Plot No 9–15, Tehsil Gonde Dumala, Igatpuri,<br />
                        Nashik, Maharashtra – 422403
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontFamily: FONT_MONO,
                        fontSize: "8px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: T.orange,
                        marginBottom: "10px",
                      }}>Contact Person</p>
                      <p style={{
                        fontFamily: FONT_DISPLAY,
                        fontSize: "22px",
                        letterSpacing: "0.06em",
                        color: T.white,
                        marginBottom: "6px",
                      }}>Nachiket Kapure</p>
                      <a href="tel:+917550277721" style={{
                        fontFamily: FONT_MONO,
                        fontSize: "15px",
                        color: T.orange,
                        textDecoration: "none",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                      }}>+91 7550277721</a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-padding" style={{ background: T.bg, padding: "120px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <FadeIn>
            <Eyebrow>Contact</Eyebrow>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "24px",
              marginBottom: "60px",
              alignItems: "end",
              paddingBottom: "32px",
              borderBottom: `3px solid ${T.ink}`,
            }}>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: isMobile ? "36px" : "clamp(40px, 5.5vw, 72px)",
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: T.ink,
                lineHeight: 0.95,
              }}>
                Let's Build<br />
                <span style={{ color: T.orange }}>Together.</span>
              </h2>
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: "15px",
                color: T.inkDim,
                lineHeight: 1.85,
                paddingLeft: isMobile ? "0" : "48px",
                borderLeft: isMobile ? "none" : `1px solid ${T.rule}`,
              }}>
                Need to get in contact with Husqvarna Construction? Send us your question or comments. We will get back to you as soon as possible.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "start" }}>
            {/* Left — form + factory info */}
            <div>
              <FadeIn delay={0.1}>
                <ContactForm />
              </FadeIn>

              <FadeIn delay={0.2}>
                <div style={{
                  marginTop: "40px",
                  paddingTop: "32px",
                  borderTop: `1px solid ${T.rule}`,
                }}>
                  <p style={{
                    fontFamily: FONT_MONO,
                    fontSize: "8.5px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: T.inkLight,
                    marginBottom: "20px",
                  }}>Factory & Registered Address</p>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "4px 1fr",
                    gap: "0",
                  }}>
                    <div style={{ background: T.orange }} />
                    <div style={{
                      padding: "20px 20px",
                      background: T.bgPanel,
                      border: `1px solid ${T.rule}`,
                      borderLeft: "none",
                    }}>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.inkDim, lineHeight: 1.75, marginBottom: "12px" }}>
                        G No 312A/B266-269/270/276, Hissa No 12, Plot No 9–15,<br />
                        Tehsil Gonde Dumala, Igatpuri, Nashik, Maharashtra – 422403
                      </p>
                      <a href="mailto:enquiries.marketingconstructions@husqvarnagroup.com"
                        style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.inkDim, textDecoration: "none", display: "block", marginBottom: "4px" }}>
                        enquiries.marketingconstructions@husqvarnagroup.com
                      </a>
                      <a href="tel:+917397775202" style={{ fontFamily: FONT_MONO, fontSize: "13px", color: T.orange, textDecoration: "none", fontWeight: 500 }}>
                        +91 7397775202
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — sales reps */}
            <div>
              <FadeIn>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: `2px solid ${T.ink}`,
                }}>
                  <span style={{
                    fontFamily: FONT_BODY,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: T.ink,
                  }}>Sales Representatives</span>
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: "9px",
                    color: T.white,
                    background: T.orange,
                    padding: "2px 8px",
                  }}>{salesReps.length}</span>
                </div>
              </FadeIn>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {salesReps.map((rep, i) => (
                  <SalesRepCard key={i} rep={rep} idx={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: T.bgDark,
        padding: "0",
        borderTop: `4px solid ${T.orange}`,
      }}>
        {/* Top strip */}
        <div className={isMobile ? "footer-grid" : ""} style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          {[
            { label: "Equipment", items: ["Concrete Vibrators", "Concrete Screeds", "Power Trowels"] },
            { label: "Compactors", items: ["Tamping Rammers", "Plate Compactors", "Compaction Rollers"] },
            { label: "Services", items: ["On-site Support", "Fleet Management", "Workshop Service"] },
            { label: "Company", items: ["About", "Contact", "Careers"] },
          ].map((col, i) => (
            <div key={i} style={{
              padding: isMobile ? "24px 16px" : "40px 32px",
              borderRight: (isMobile ? i % 2 === 0 : i < 3) ? "1px solid rgba(255,255,255,0.08)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <p style={{
                fontFamily: FONT_MONO,
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: T.orange,
                marginBottom: "16px",
              }}>{col.label}</p>
              {col.items.map((item, j) => (
                <p key={j} style={{
                  fontFamily: FONT_BODY,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "8px",
                  cursor: "default",
                  transition: "color 0.2s",
                }}>{item}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: isMobile ? "20px 20px" : "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <div style={{
              background: T.orange,
              padding: "5px 8px",
              marginRight: "8px",
            }}>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "12px", color: T.white, letterSpacing: "0.08em" }}>H</span>
            </div>
            <div>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "13px", letterSpacing: "0.14em", color: T.white }}>HUSQVARNA</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: "7px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", display: "block", marginTop: "-1px" }}>CONSTRUCTION</span>
            </div>
          </div>

          <p style={{
            fontFamily: FONT_MONO,
            fontSize: "10px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}>
            © {new Date().getFullYear()} Husqvarna Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}