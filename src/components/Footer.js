import React from 'react';
import Image from 'next/image';
import logoImg from '@/assets/logo.png'; 

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-zinc-900 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-8 lg:px-20 py-10 flex flex-row items-center justify-between">
        
        
        <div className="flex items-center gap-2">
          
          <Image 
            src={logoImg} 
            alt="FitLog Logo" 
            width={20} 
            height={20} 
            className="object-contain"
          />
          <span className="text-sm font-black tracking-widest uppercase text-white font-oswald">
            Fit<span className="text-white">log</span>
          </span>
        </div>

        
        <div className="text-zinc-600 text-xs tracking-wide">
          <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>

      </div>
    </footer>
  );
}
