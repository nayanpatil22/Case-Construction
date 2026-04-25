"use client";

import React, { useState, useEffect, memo, type ReactNode } from "react";

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

/* ── IMAGE MAP ── */
/*
  PUT ALL YOUR IMAGE FILES FLAT INSIDE:  /public/products/
  Example: /public/products/Husqvarna SMART E.jpg

  ⚠️  Three filenames below were truncated in Finder — verify & rename if needed:
      "Husqvarna BT 90 Screed Section (Petrol/Electric Compatible)" → check actual filename
      "Husqvarna BT 90 Screed Section (1 m / 6.5 ft)"             → check actual filename
      "Husqvarna Screed Blades"                                    → check actual filename
*/
const productImages: Record<string, string> = {
  // ── Internal Vibrators ──────────────────────────────────────────────────────
  "Husqvarna SMART E":        "/products/Husqvarna SMART E.jpg",
  "Husqvarna SMART":          "/products/Husqvarna SMART.png",
  "Husqvarna AX":             "/products/Husqvarna AX.jpg",
  "Husqvarna AX 48":          "/products/Husqvarna AX 48.jpg",
  "Husqvarna Vibrastar":      "/products/Husqvarna Vibrastar.jpg",
  "Husqvarna AME 600":        "/products/Husqvarna AME 600.jpg",
  "Husqvarna AME 1490":       "/products/Husqvarna AME 1490.png",
  "Husqvarna AME 1600":       "/products/Husqvarna AME 1600.png",
  "Husqvarna HA":             "/products/Husqvarna HA.jpg",
  "Husqvarna AMD 3300":       "/products/Husqvarna AMD 3300.png",
  "Husqvarna AMG 3200":       "/products/Husqvarna AMG 3200.jpg",
  "Husqvarna AT":             "/products/Husqvarna AT.jpg",
  "Husqvarna Superflex":      "/products/Husqvarna Superflex.jpg",
  "Husqvarna AA":             "/products/Husqvarna AA.png",
  "Husqvarna AZ":             "/products/Husqvarna AZ.jpg",
  "Husqvarna AY":             "/products/Husqvarna AY.png",
  "Husqvarna AME 2200":       "/products/Husqvarna AME 2200.jpg",

  // ── External Vibrators ──────────────────────────────────────────────────────
  "Husqvarna EP 371 B":       "/products/Husqvarna EP 371 B.jpg",
  "Husqvarna EP 121 B":       "/products/Husqvarna EP 121 B.png",
  "Husqvarna ER 507 B":       "/products/Husqvarna ER 507 B.jpg",
  "Husqvarna ER 407 B":       "/products/Husqvarna ER 407 B.png",
  "Husqvarna ER 207 B":       "/products/Husqvarna ER 207 B.jpg",
  "Husqvarna ER 505":         "/products/Husqvarna ER 505.jpg",
  "Husqvarna ER 405":         "/products/Husqvarna ER 405.png",
  "Husqvarna ER 305":         "/products/Husqvarna ER 305.jpg",

  // ── Frequency Converters ────────────────────────────────────────────────────
  "Husqvarna CF 85 AS":       "/products/Husqvarna CF 85 AS.png",
  "Husqvarna CF 67 T":        "/products/Husqvarna CF 67 T.webp",
  "Husqvarna CF 25 M":        "/products/Husqvarna CF 25 M.png",

  // ── Walk-behind Screeds ─────────────────────────────────────────────────────
  "Husqvarna BV 30":          "/products/Husqvarna BV 30.jpg",
  "Husqvarna BV 20 G":        "/products/Husqvarna BV 20 G.png",
  "Husqvarna Screed Blades":  "/products/Husqvarna Screed Blades.jpg",   // ⚠️ verify filename

  // ── Truss Screeds ───────────────────────────────────────────────────────────
  "Husqvarna BT 90":          "/products/Husqvarna BT 90.png",
  "Husqvarna BT 90 Petrol":   "/products/Husqvarna BT 90 Petrol.jpeg",
  "Husqvarna BT 90 Screed Section (Petrol/Electric Compatible)": "/products/Husqvarna BT 90 Screed Section (on).jpg",   // ⚠️ verify filename
  "Husqvarna BT 90 Screed Section (1 m / 6.5 ft)":              "/products/Husqvarna BT 90 Screed Section (ft).jpg",   // ⚠️ verify filename

  // ── Ride-on Trowels ─────────────────────────────────────────────────────────
  "Husqvarna CRT 36 Ride-On Power Trowel":              "/products/Husqvarna CRT 36.png",

  // ── Walk-behind Trowels ─────────────────────────────────────────────────────
  "Husqvarna MCT 36 Walk-Behind Power Trowel":          "/products/Husqvarna MCT 36.webp",
  "Husqvarna BG 375 Walk-Behind Power Trowel":          "/products/Husqvarna BG 375.webp",
  "Husqvarna BG 245 Walk-Behind Edger Power Trowel":    "/products/Husqvarna BG 245.png",

  // ── Rammers ─────────────────────────────────────────────────────────────────
  "Husqvarna LT 8005 Rammer": "/products/Husqvarna LT 8005.jpg",
  "Husqvarna LT 6005":        "/products/Husqvarna LT 6005.webp",
  "Husqvarna LT 5005":        "/products/Husqvarna LT 5005.png",

  // ── Forward Plate Compactors ────────────────────────────────────────────────
  "Husqvarna LF 75 PACE":           "/products/Husqvarna LF 75 PACE.png",
  "Husqvarna LF 100 PACE":          "/products/Husqvarna LF 100 PACE.jpg",
  "Husqvarna LF 160 (Electrical)":  "/products/Husqvarna LF 160 (Electrical).jpg",
  "Husqvarna LF 160 (Diesel)":      "/products/Husqvarna LF 160 (Diesel).jpg",
  "Husqvarna LF 50 L":              "/products/Husqvarna LF 50 L.jpg",
  "Husqvarna LF 60 LAT":            "/products/Husqvarna LF 60 LAT.png",
  "Husqvarna LFV 80":               "/products/Husqvarna LFV 80.png",
  "Husqvarna LFV 60":               "/products/Husqvarna LFV 60.webp",

  // ── Reversible Plate Compactors ─────────────────────────────────────────────
  "Husqvarna LG 400":   "/products/Husqvarna LG 400.jpg",
  "Husqvarna LG 200":   "/products/Husqvarna LG 200.png",
  "Husqvarna LG 200 S": "/products/Husqvarna LG 200 S.jpg",
  "Husqvarna LH 700":   "/products/Husqvarna LH 700.jpg",

  // ── Compaction Rollers ──────────────────────────────────────────────────────
  "Husqvarna LP 6500":  "/products/Husqvarna LP 6500.jpg",
};

/* ── ALL DATA ── */
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

/* ── DESIGN TOKENS ── */
const C = {
  navy: "#0B1F3A",
  orange: "#E55300",
  white: "#FFFFFF",
  offWhite: "#F7F7F7",
  border: "#E5E5E5",
  text: "#111111",
  textMid: "#444444",
  textLight: "#777777",
};

/* ── GLOBAL STYLES ── */
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Barlow', sans-serif; background: ${C.white}; color: ${C.text}; }
  input::placeholder, textarea::placeholder { color: #aaa; }
  input:focus, textarea:focus, select:focus { border-color: ${C.navy} !important; outline: none; }
  button, a { font-family: inherit; }
  img { display: block; }

  .btn-primary {
    display: inline-block;
    background: ${C.navy};
    color: ${C.white};
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 12px 32px;
    border: 2px solid ${C.navy};
    cursor: pointer;
    text-decoration: none;
  }
  .btn-primary:hover { background: #071428; border-color: #071428; }

  .btn-outline {
    display: inline-block;
    background: transparent;
    color: ${C.white};
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 12px 32px;
    border: 2px solid rgba(255,255,255,0.5);
    cursor: pointer;
    text-decoration: none;
  }
  .btn-outline:hover { border-color: ${C.white}; }

  .btn-orange {
    display: inline-block;
    background: ${C.orange};
    color: ${C.white};
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 12px 32px;
    border: 2px solid ${C.orange};
    cursor: pointer;
    text-decoration: none;
  }
  .btn-orange:hover { background: #c94700; border-color: #c94700; }

  .nav-link {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
  }
  .nav-link:hover { color: ${C.white}; }

  .prod-card {
    background: ${C.white};
    border: 1px solid ${C.border};
    display: flex;
    flex-direction: column;
  }

  .enquire-btn {
    width: 100%;
    background: ${C.navy};
    color: ${C.white};
    border: none;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 13px;
    cursor: pointer;
  }
  .enquire-btn:hover { background: #071428; }

  .inp {
    width: 100%;
    border: 1px solid ${C.border};
    padding: 11px 13px;
    font-size: 14px;
    font-family: 'Barlow', sans-serif;
    outline: none;
    background: ${C.white};
    color: ${C.text};
    border-radius: 0;
  }
  .inp:focus { border-color: ${C.navy}; }

  .label-sm {
    display: block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${C.textLight};
    margin-bottom: 5px;
  }

  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${C.textLight};
    margin-bottom: 8px;
    display: block;
  }

  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 5vw, 56px);
    text-transform: uppercase;
    color: ${C.text};
    line-height: 1;
    margin-bottom: 16px;
  }

  .rep-card {
    background: ${C.white};
    border: 1px solid ${C.border};
    padding: 20px 22px;
  }
  .rep-card:hover { border-color: #bbb; }

  @media (max-width: 767px) {
    .hide-mobile { display: none !important; }
    .mob-col { grid-template-columns: 1fr !important; }
    .mob-full { padding-left: 20px !important; padding-right: 20px !important; }
    .hero-h { font-size: 52px !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

/* ── ENQUIRY MODAL ── */
const EnquiryModal = ({ productName, onClose }: { productName: string; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", borderTop: `4px solid ${C.navy}` }}>
        <div style={{ background: C.navy, padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Product Enquiry</p>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, textTransform: "uppercase", color: C.white }}>{productName}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "48px 32px" }}>
            <div style={{ width: 52, height: 52, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: C.white, fontSize: 22 }}>✓</div>
            <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 800, textTransform: "uppercase", color: C.text, marginBottom: 10 }}>Enquiry Submitted</h4>
            <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.7, marginBottom: 28 }}>Thank you for your interest in {productName}. Our team will contact you shortly.</p>
            <button onClick={onClose} className="btn-primary">Close</button>
          </div>
        ) : (
          <div style={{ padding: "26px 26px 30px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label className="label-sm">Full Name *</label>
                <input type="text" placeholder="Your name" className="inp" />
              </div>
              <div>
                <label className="label-sm">Phone *</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className="inp" />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="label-sm">Email *</label>
              <input type="email" placeholder="you@company.com" className="inp" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label className="label-sm">Company</label>
                <input type="text" placeholder="Company name" className="inp" />
              </div>
              <div>
                <label className="label-sm">City</label>
                <input type="text" placeholder="Your city" className="inp" />
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label className="label-sm">Message</label>
              <textarea rows={3} placeholder="Tell us about your requirement..." className="inp" style={{ resize: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, padding: 12, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase", background: "none", border: `1px solid ${C.border}`, color: C.textLight, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => setSubmitted(true)} className="enquire-btn" style={{ flex: 2 }}>Send Enquiry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── PRODUCT CARD ── */
const ProductCard = memo(({ product, onEnquire }: { product: Product; onEnquire: (name: string) => void }) => {
  const specs = parseSpecs(product.specs).slice(0, 3);
  const imgSrc = productImages[product.name];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="prod-card">
      {/* Image area */}
      <div style={{
        aspectRatio: "4/3",
        background: C.offWhite,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${C.border}`,
        overflow: "hidden",
      }}>
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "16px" }}
          />
        ) : (
          /* Fallback placeholder shown when no image path or image fails to load */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 56, height: 56, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="0" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>Husqvarna</p>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 17, fontWeight: 800, textTransform: "uppercase", color: C.text, marginBottom: 8, lineHeight: 1.1 }}>{product.name}</h4>
        <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.65, marginBottom: 16 }}>{product.description}</p>

        {specs.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <p className="section-label">Key Specs</p>
            <div style={{ border: `1px solid ${C.border}` }}>
              {specs.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : "none", background: i % 2 === 0 ? C.offWhite : C.white }}>
                  <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: C.textLight }}>{s.label}</p>
                  <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, color: C.text }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.useCase && (
          <div style={{ marginBottom: 18, padding: "10px 12px", background: C.offWhite, borderLeft: `3px solid ${C.navy}` }}>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.navy, marginBottom: 3 }}>Application</p>
            <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>{product.useCase}</p>
          </div>
        )}

        <div style={{ marginTop: "auto" }}>
          <button onClick={() => onEnquire(product.name)} className="enquire-btn">Enquire Now</button>
        </div>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

/* ── PRODUCTS SECTION (4-level hierarchy) ── */
const ProductsSection = ({ onEnquire }: { onEnquire: (name: string) => void }) => {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);

  const cat = machineData[activeCat];
  const sub = cat.subcategories[activeSub];
  const groups = sub.groups || [];
  const group = groups[activeGroup];
  const products = group ? group.items : (sub.items || []);

  const handleCat = (i: number) => { setActiveCat(i); setActiveSub(0); setActiveGroup(0); };
  const handleSub = (i: number) => { setActiveSub(i); setActiveGroup(0); };

  return (
    <section id="machines" style={{ background: C.white, borderTop: `1px solid ${C.border}` }}>
      <div style={{ background: C.navy, padding: "48px 48px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>Our Equipment</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,60px)", textTransform: "uppercase", color: C.white, lineHeight: 1, marginBottom: 12 }}>The Products.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 480, lineHeight: 1.65 }}>Comprehensive range of heavy-duty construction machinery — from precision concrete placement to heavy compaction.</p>
        </div>
      </div>

      <div style={{ background: "#0a1b30", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginRight: 24, whiteSpace: "nowrap" }}>Category</span>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {machineData.map((c, i) => (
              <button key={i} onClick={() => handleCat(i)} style={{
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em",
                textTransform: "uppercase", padding: "16px 24px", border: "none", cursor: "pointer",
                background: activeCat === i ? C.white : "transparent",
                color: activeCat === i ? C.navy : "rgba(255,255,255,0.45)",
                borderRight: `1px solid rgba(255,255,255,0.05)`,
              }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: C.navy, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginRight: 24, whiteSpace: "nowrap" }}>Type</span>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {cat.subcategories.map((s, i) => (
              <button key={i} onClick={() => handleSub(i)} style={{
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em",
                textTransform: "uppercase", padding: "13px 20px", border: "none", cursor: "pointer",
                background: "transparent",
                color: activeSub === i ? C.white : "rgba(255,255,255,0.4)",
                borderBottom: activeSub === i ? `2px solid ${C.white}` : "2px solid transparent",
                borderRight: `1px solid rgba(255,255,255,0.05)`,
              }}>
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {groups.length > 0 && (
        <div style={{ background: "#f0f0f0", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textLight, marginRight: 24, whiteSpace: "nowrap" }}>Group</span>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {groups.map((g, i) => (
                <button key={i} onClick={() => setActiveGroup(i)} style={{
                  fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em",
                  textTransform: "uppercase", padding: "12px 18px", border: "none", cursor: "pointer",
                  background: "transparent",
                  color: activeGroup === i ? C.navy : C.textLight,
                  borderBottom: activeGroup === i ? `2px solid ${C.navy}` : "2px solid transparent",
                  borderRight: `1px solid ${C.border}`,
                }}>
                  {g.name.replace(/\s*\(\d+\)$/, "")}
                  {g.name.match(/\((\d+)\)$/) && (
                    <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: activeGroup === i ? C.navy : "#aaa" }}>
                      ({g.name.match(/\((\d+)\)$/)?.[1]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ background: C.offWhite, padding: "40px 48px 64px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: C.textMid }}>
              {groups.length > 0 ? group?.name.replace(/\s*\(\d+\)$/, "") : sub.name}
            </span>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, background: C.navy, color: C.white, padding: "2px 8px" }}>
              {products.length} Products
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {products.map((p, i) => (
              <ProductCard key={`${p.name}-${i}`} product={p} onEnquire={onEnquire} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── CONTACT FORM ── */
const ContactForm = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <input type="text" placeholder="Full Name" className="inp" />
      <input type="email" placeholder="Email" className="inp" />
    </div>
    <input type="tel" placeholder="+91 Phone Number" className="inp" />
    <textarea rows={4} placeholder="Describe your requirement..." className="inp" style={{ resize: "none" }} />
    <button className="btn-primary" style={{ border: "none", width: "fit-content" }}>Submit Inquiry</button>
  </div>
);

/* ── SALES REP CARD ── */
const RepCard = ({ rep }: { rep: Rep }) => (
  <div className="rep-card">
    <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: C.navy, marginBottom: 6 }}>{rep.title}</p>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
      <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 16, fontWeight: 800, color: C.text }}>{rep.name}</h4>
      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, color: C.textLight }}>{rep.location}</span>
    </div>
    <a href={`tel:${rep.phone}`} style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, textDecoration: "none", marginBottom: 3 }}>{rep.phone}</a>
    <a href={`mailto:${rep.email}`} style={{ fontSize: 12, color: C.textLight, textDecoration: "none", wordBreak: "break-all" }}>{rep.email}</a>
  </div>
);

/* ── MAIN PAGE ── */
export default function HusqvarnaPage() {
  const [enquiryProduct, setEnquiryProduct] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setWindowWidth(window.innerWidth);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const isMobile = windowWidth > 0 && windowWidth < 768;
  
const NAV = [
  ["Home", "/"],   // 👈 added this
  ["About", "#about"],
  ["Machines", "#machines"],
  ["Services", "#services"],
  ["Contact", "#contact"]
];  return (
    <main style={{ background: C.white, color: C.text, fontFamily: "'Barlow', sans-serif", minHeight: "100vh" }}>
      <style>{GS}</style>

      {enquiryProduct && <EnquiryModal productName={enquiryProduct} onClose={() => setEnquiryProduct(null)} />}

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: C.navy, borderBottom: `3px solid ${C.orange}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#hero" style={{ textDecoration: "none" }}>            
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 22, textTransform: "uppercase", color: C.white, lineHeight: 1 }}>HUSQVARNA</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Construction India</div>
          </a>
          <div className="hide-mobile" style={{ display: "flex", gap: 32 }}>
            {NAV.map(([label, href]) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="#contact" className="btn-orange" style={{ fontSize: 12, padding: "9px 22px" }}>Get Quote</a>
            {isMobile && (
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", color: C.white, fontSize: 22, cursor: "pointer" }}>{mobileMenuOpen ? "✕" : "☰"}</button>
            )}
          </div>
        </div>
        {mobileMenuOpen && (
          <div style={{ background: "#071428", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
            {NAV.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} style={{ display: "block", padding: "13px 24px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden", background: C.navy }}>
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop"
          alt="Construction site"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: 0.25 }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: C.orange }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", padding: "0 60px 80px", width: "100%" }}>
          <span style={{ display: "inline-block", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 28, border: `1px solid rgba(255,255,255,0.15)`, padding: "5px 14px" }}>
            Global Leader in Construction Equipment · India
          </span>
          <h1 className="hero-h" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(60px,9vw,100px)", lineHeight: 0.92, textTransform: "uppercase", color: C.white, marginBottom: 22 }}>
            Built<br />For<br /><span style={{ color: C.orange }}>The Site.</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 440, marginBottom: 40 }}>
            Global leader in manufacturing innovative equipment and diamond tools for the light construction industry. Engineering relentless productivity.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#machines" className="btn-orange" style={{ fontSize: 13, padding: "14px 36px" }}>View Products</a>
            <a href="#contact" className="btn-outline" style={{ fontSize: 13, padding: "14px 36px" }}>Enquire Now</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.4)", borderTop: `1px solid rgba(255,255,255,0.06)`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 0, overflowX: "auto" }}>
          {["Concrete Vibrators", "Power Screeds", "Power Trowels", "Plate Compactors", "Reversible Plates", "Compaction Rollers", "Tamping Rammers"].map((item, i) => (
            <span key={i} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 14, paddingRight: 20 }}>
              {i > 0 && <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>}
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: C.white, padding: "72px 48px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 24 }} className="mob-col">
            <div style={{ background: C.offWhite, border: `1px solid ${C.border}`, padding: "48px 48px" }}>
              <span className="section-label">About Husqvarna</span>
              <div style={{ width: 36, height: 3, background: C.navy, marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", textTransform: "uppercase", color: C.text, lineHeight: 1, marginBottom: 20 }}>
                Jonsered:<br />Heart of Innovation.
              </h2>
              <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.75, maxWidth: 540, marginBottom: 36 }}>
                Husqvarna Construction specializes in construction equipment, diamond tools, and cutting, drilling, and surface preparation solutions — helping shape modern urban environments worldwide.
              </p>
              <div style={{ display: "flex", gap: 40, borderTop: `1px solid ${C.border}`, paddingTop: 28 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: C.navy, padding: "32px 28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>Global HQ</span>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 26, textTransform: "uppercase", color: C.white, lineHeight: 1, marginBottom: 10 }}>Jonsered,<br />Sweden</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>Steering global operations with a 2,500-strong team across 4 continents.</p>
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: "32px 28px", flex: 1, borderLeft: `3px solid ${C.navy}` }}>
                <span className="section-label">Reliability</span>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 22, textTransform: "uppercase", color: C.text, lineHeight: 1, marginBottom: 10 }}>Maximum<br />Uptime.</p>
                <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.65 }}>Every machine is built to deliver maximum uptime in the most demanding construction environments.</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: `1px solid ${C.border}`, borderRight: "none", borderBottom: "none" }} className="mob-col">
            {[
              { stat: "4 Continents", title: "Global Presence", desc: "Factories in Europe, North America, China, and India." },
              { stat: "Jonsered, SE", title: "Head Office", desc: "Global HQ steering ~2,500 employees internationally." },
              { stat: "SEK 7.2B", title: "Annual Revenue", desc: "Trusted leader in construction equipment worldwide." },
              { stat: "40+ Categories", title: "Innovation First", desc: "Advanced tools used in construction and infrastructure." },
            ].map((h, i) => (
              <div key={i} style={{ padding: "24px 24px", background: C.white, borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 4 }}>{h.stat}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: C.text, marginBottom: 6 }}>{h.title}</div>
                <div style={{ fontSize: 12, color: C.textLight, lineHeight: 1.65 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <ProductsSection onEnquire={(name) => setEnquiryProduct(name)} />

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "72px 48px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56, alignItems: "start" }} className="mob-col">
            <div style={{ position: "sticky", top: 72 }}>
              <span className="section-label">Service Solutions</span>
              <div style={{ width: 36, height: 3, background: C.navy, marginBottom: 16 }} />
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,48px)", textTransform: "uppercase", color: C.text, lineHeight: 1, marginBottom: 16 }}>
                Husqvarna<br />Service.
              </h2>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, marginBottom: 24 }}>
                From powerful equipment to a complete range of services that help you stay productive every hour of every workday.
              </p>
              <a href="#contact" className="btn-primary">Contact Service Team</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "On-site Support", tag: "Fast Response, Maximum Uptime", desc: "Expert engineers on-site to resolve issues quickly. Priority response within 8 hours.", points: ["Priority Service: Fast response within 8 hours", "Expert Support: Skilled engineers with right tools", "Proactive Maintenance: Prevent issues before they occur", "Higher Resale Value: Maintain long-term worth"] },
                { title: "Fleet Management", tag: "Total Peace of Mind", desc: "Comprehensive fleet oversight designed for maximum efficiency and minimal disruption.", points: ["Priority Service: Quick support when you need it", "Proactive Care: Fix issues before they grow", "Parts Discounts: Save on genuine Husqvarna parts", "Cost Protection: No surprises during the contract"] },
                { title: "Lifecycle Care", tag: "Extended Warranty You Can Trust", desc: "A comprehensive extended warranty designed for reliability and peace of mind.", points: ["Full Coverage: Engine, hydraulics & more", "Expert Support: Trained engineers & genuine parts", "Flexible Plans: Suited to your needs and budget", "Zero Hassle Service: Smooth maintenance support"] },
              ].map((srv, i) => (
                <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, padding: "28px 32px", borderLeft: `3px solid ${C.navy}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20, fontWeight: 800, textTransform: "uppercase", color: C.text }}>{srv.title}</h3>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: C.textLight, background: C.offWhite, padding: "3px 10px", border: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{srv.tag}</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.7, marginBottom: 18 }}>{srv.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
                    {srv.points.map((pt, pi) => (
                      <div key={pi} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, fontWeight: 500, color: C.textMid }}>
                        <span style={{ color: C.navy, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>—</span>{pt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ background: C.navy, border: `1px solid ${C.navy}` }}>
                <div style={{ borderBottom: `1px solid rgba(255,255,255,0.08)`, padding: "10px 26px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Service Centre</span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>Nashik, MH</span>
                </div>
                <div style={{ padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="mob-col">
                  <div>
                    <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20, fontWeight: 800, textTransform: "uppercase", color: C.white, marginBottom: 8 }}>Nashik Service Centre</h4>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 14 }}>World-class support. Our priority is your uptime.</p>
                    <span className="section-label" style={{ color: "rgba(255,255,255,0.3)" }}>Address</span>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>G No 312A/B266-269/270/276, Hissa No 12,<br />Plot No 9–15, Tehsil Gonde Dumala, Igatpuri,<br />Nashik, Maharashtra – 422403</p>
                  </div>
                  <div>
                    <span className="section-label" style={{ color: "rgba(255,255,255,0.3)" }}>Contact Person</span>
                    <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, textTransform: "uppercase", color: C.white, marginBottom: 8 }}>Nachiket Kapure</p>
                    <a href="tel:+917550277721" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 800, color: C.white, textDecoration: "none" }}>+91 7550277721</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: C.offWhite, padding: "72px 48px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }} className="mob-col">
            <div>
              <span className="section-label">Get in Touch</span>
              <div style={{ width: 36, height: 3, background: C.navy, marginBottom: 16 }} />
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,68px)", textTransform: "uppercase", color: C.text, lineHeight: 0.95, marginBottom: 40 }}>
                Connect<br />with<br />Experts.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
                <div style={{ borderLeft: `3px solid ${C.navy}`, paddingLeft: 16 }}>
                  <span className="section-label">General Enquiries</span>
                  <a href="mailto:enquiries.marketingconstructions@husqvarnagroup.com" style={{ fontSize: 13, fontWeight: 500, color: C.text, textDecoration: "none" }}>enquiries.marketingconstructions<br />@husqvarnagroup.com</a>
                </div>
                <div style={{ borderLeft: `3px solid ${C.navy}`, paddingLeft: 16 }}>
                  <span className="section-label">Phone</span>
                  <a href="tel:+917397775202" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 800, color: C.text, textDecoration: "none" }}>+91 7397775202</a>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: C.textMid }}>Sales Representatives</span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, background: C.navy, color: C.white, padding: "2px 7px" }}>{salesReps.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {salesReps.map((rep, i) => <RepCard key={i} rep={rep} />)}
                </div>
              </div>
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.navy}`, padding: "36px" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 800, textTransform: "uppercase", color: C.text, marginBottom: 24 }}>Send an Enquiry</h3>
              <ContactForm />
              <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${C.border}` }}>
                <span className="section-label">Factory & Registered Address</span>
                <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.75 }}>
                  G No 312A/B266-269/270/276, Hissa No 12, Plot No 9–15,<br />
                  Tehsil Gonde Dumala, Igatpuri, Nashik, Maharashtra – 422403
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.navy, borderTop: `3px solid ${C.orange}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: `1px solid rgba(255,255,255,0.06)` }} className="footer-grid">
            {[
              { label: "Equipment", items: ["Concrete Vibrators", "Concrete Screeds", "Power Trowels"] },
              { label: "Compactors", items: ["Tamping Rammers", "Plate Compactors", "Compaction Rollers"] },
              { label: "Services", items: ["On-site Support", "Fleet Management", "Workshop Service"] },
              { label: "Company", items: ["About", "Contact", "Enquire"] },
            ].map((col, i) => (
              <div key={i} style={{ padding: "32px 28px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>{col.label}</p>
                {col.items.map((item, j) => (
                  <p key={j} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 17, color: C.white, textTransform: "uppercase" }}>HUSQVARNA</p>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Construction India</p>
            </div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              © {new Date().getFullYear()} Husqvarna Construction India
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}