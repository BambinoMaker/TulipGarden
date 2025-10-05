import React, { useEffect, useState } from "react";

// 🌷 Tulip Garden App
// This single component holds all the logic, structure, and styling for the garden.
export default function TulipGarden() {
  const [bloom, setBloom] = useState(false);

  // --- 1. Tulip Data Generation ---
  // Generate 20 tulips with varied positions, sizes, and animation delays.
  const tulips = Array.from({ length: 20 }).map((_, i) => {
    // Left position spread across the width, slightly randomized
    const left = 4 + (i * 5) % 94;
    // Size variation
    const size = 100 + (i % 5) * 22;
    // Delay for staggered animation
    const delay = (i % 8) * 0.25 + Math.floor(i / 8) * 0.1;
    // Hue for different colors (starting near 310 - pink/purple)
    const hue = 310 - (i * 12) % 160;
    return { id: i, left, size, delay, hue };
  });

  // --- 2. Initial Bloom Effect ---
  // Automatically trigger the bloom animation after a short delay on mount.
  useEffect(() => {
    const t = setTimeout(() => setBloom(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-blue-100 p-4 md:p-6 font-sans">
      
      {/* --- 3. Custom CSS/Keyframes --- */}
      {/* Custom CSS for animations that cannot be done with simple Tailwind classes. */}
      <style>{`
        /* Custom animation origins for better scaling */
        .bloom-stem { transform-origin: bottom center; }
        .bloom-petal { transform-origin: center bottom; }
        
        /* Keyframe definitions */
        @keyframes stem-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes petal-bloom { 
          from { transform: scale(0.2) translateY(18px); opacity: 0; } 
          to { transform: scale(1) translateY(0); opacity: 1; } 
        }
        @keyframes float { 
          0% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
          100% { transform: translateY(0); } 
        }
        @keyframes pulseHeart { 
          0%, 100% { transform: scale(1); } 
          50% { transform: scale(1.2); } 
        }
      `}</style>

      {/* --- 4. Main Container and Layout --- */}
      <div className="w-full max-w-6xl mx-auto bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden ring-4 ring-rose-200/50">
        
        {/* Header Section */}
        <header className="py-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-rose-700 drop-shadow-lg [text-shadow:2px_2px_4px_rgba(255,255,255,0.7)]">
            Tulip garden for my CUTU
          </h1>
          <p className="mt-3 text-base md:text-lg text-rose-600/90 italic">
            Blooming softly for my Wery 🌷💞
          </p>
        </header>

        {/* Main Garden Area */}
        <main className="relative h-[550px] sm:h-[650px] md:h-[720px] bg-gradient-to-t from-emerald-200 via-blue-100 to-pink-50 overflow-hidden">
          
          {/* Background Cloud/Bubble Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-12 top-10 opacity-25" style={{ animation: 'float 14s ease-in-out infinite' }}>
              <svg width="260" height="140" viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="50" rx="45" ry="20" fill="rgba(255,255,255,0.6)" />
                <ellipse cx="140" cy="40" rx="60" ry="22" fill="rgba(255,255,255,0.5)" />
              </svg>
            </div>
            <div className="absolute -right-24 bottom-60 opacity-20" style={{ animation: 'float 10s linear infinite reverse' }}>
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="50" rx="40" ry="18" fill="rgba(255,255,255,0.6)" />
              </svg>
            </div>
          </div>

          {/* Tulip Rendering Area */}
          <div className="absolute inset-x-0 bottom-0 h-3/4 flex items-end">
            {tulips.map((t) => (
              <div
                key={t.id}
                className="absolute bottom-6 md:bottom-10"
                style={{ left: `${t.left}%`, width: `${t.size}px`, height: `${t.size * 1.6}px`, transform: `translateX(-50%)` }}
              >
                <Tulip size={t.size} hue={t.hue} delay={t.delay} bloom={bloom} />
              </div>
            ))}
          </div>

          {/* Foreground Grass/Soil */}
          <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-300 rounded-t-3xl shadow-inner shadow-green-900/40" />
        </main>

        {/* Footer and Interaction */}
        <footer className="py-6 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-pink-200 via-rose-100 to-blue-200 border-t border-rose-300/50">
          <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-rose-700 mb-4 sm:mb-0">
            Made with
            <span className="inline-block w-6 h-6 bg-rose-600 rounded-full animate-[pulseHeart_1.3s_infinite] shadow-md ring-2 ring-rose-500/50" />
            for my Wery
          </div>
          <button
            onClick={() => setBloom((s) => !s)}
            className="px-6 py-3 rounded-full bg-rose-600 text-white text-base font-bold shadow-xl hover:bg-rose-500 active:scale-95 transition transform duration-150 ease-out"
          >
            {bloom ? 'Reset Garden' : 'Watch Them Bloom!'}
          </button>
        </footer>
      </div>
    </div>
  );
}

// Sub-component for a single Tulip flower
function Tulip({ size = 120, hue = 300, delay = 0, bloom = true }) {
  // Calculate colors based on the base hue for natural variation
  const petal1 = `hsl(${hue} 80% 65%)`;
  const petal2 = `hsl(${(hue + 10) % 360} 85% 60%)`;
  const petal3 = `hsl(${(hue - 10 + 360) % 360} 75% 70%)`;
  const stemColor = '#1b7a3a';

  // Styles for the stem, including the 'stem-grow' animation
  const stemStyle = {
    height: `${size * 1.1}px`,
    width: `${Math.max(8, Math.round(size * 0.14))}px`, // Ensure minimum thickness
    margin: '0 auto',
    transformOrigin: 'bottom center',
    animation: bloom ? `stem-grow 0.9s cubic-bezier(.12,.9,.3,1) ${delay}s forwards` : 'none',
  };

  // Common styles for petals, including the 'petal-bloom' animation
  const petalCommon = (idx) => ({
    animation: bloom ? `petal-bloom 0.8s cubic-bezier(.2,.9,.25,1) ${delay + idx * 0.1}s both` : 'none',
  });

  return (
    <div className="flex flex-col items-center select-none" style={{ width: '100%' }}>
      {/* Use SVG for the custom tulip shape */}
      <svg viewBox="0 0 140 160" width="100%" style={{ display: 'block' }}>
        <g transform={`translate(70, 42)`}>
          {/* Stem (animated) */}
          <rect x="-3.5" y="20" width="7" rx="3" fill={stemColor} style={stemStyle} className="bloom-stem" />

          {/* Flower Head Group */}
          <g transform="translate(0,20)">
            {/* Petals (animated) - using custom path data for tulip shape */}
            <path d="M0 -12 C20 -36, 48 -18, 0 10" fill={petal1} style={petalCommon(0)} className="bloom-petal shadow-md" />
            <path d="M0 -12 C-20 -36, -48 -18, 0 10" fill={petal2} style={petalCommon(1)} className="bloom-petal shadow-md" />
            <path d="M0 -24 C22 -42, 46 -30, 0 4" fill={petal3} style={petalCommon(2)} className="bloom-petal opacity-95 shadow-lg" />
            
            {/* Inner highlight/detail */}
            <ellipse cx="0" cy="-8" rx="8" ry="12" fill={`rgba(255,255,255,0.25)`} style={petalCommon(3)} />
          </g>

          {/* Leaves/Foliage (non-animated) */}
          <path d="M-22 52 C-48 34, -70 14, -26 -8" fill="#1b7a3a" opacity="0.9" transform="rotate(-12)" />
          <path d="M22 52 C48 34, 70 14, 26 -8" fill="#167a3a" opacity="0.9" transform="rotate(12)" />
        </g>
      </svg>
    </div>
  );
} 
