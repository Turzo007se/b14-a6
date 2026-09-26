"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext"; 
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { planItems, savedItems } = usePlan(); 

  const isActive = (path) => pathname === path;

  return (
    <div className="navbar bg-[#121212] px-6 py-4 border-b border-gray-800 text-white flex justify-between items-center">
      
      <div className="navbar-start flex items-center">
        <Link href="/" className="font-oswald text-xl font-bold tracking-wider uppercase text-white flex items-center gap-2">
          <Image src={logoImg} alt="FitLog Logo" width={24} height={24} className="object-contain" />
          FITLOG
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li>
            <Link href="/" className={`${isActive("/") ? "text-[#ccff00] font-semibold" : "text-gray-400"} hover:text-white transition-colors`}>
              Workouts
            </Link>
          </li>
          <li>
            
            <Link href="/my-plan" className={`${isActive("/my-plan") ? "text-[#ccff00] font-semibold" : "text-gray-400"} hover:text-white transition-colors`}>
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      
      <div className="navbar-end flex items-center gap-3">
        
        
        <div className="btn btn-sm no-animation bg-[#161616] border border-gray-800 text-gray-400 rounded-full font-oswald text-xs uppercase font-bold px-3 py-1 cursor-default hover:bg-[#161616] hover:border-gray-800">
          <span>Plan</span>
          <span className="bg-[#ccff00] text-black w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black ml-1.5">
            {planItems.length}
          </span>
        </div>

        
        <div className="btn btn-sm no-animation bg-[#161616] border border-gray-800 text-gray-400 rounded-full font-oswald text-xs uppercase font-bold px-3 py-1 cursor-default hover:bg-[#161616] hover:border-gray-800">
          <span>Saved</span>
          <span className="bg-zinc-800 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black border border-zinc-700 ml-1.5">
            {savedItems.length}
          </span>
        </div>

      </div>
    </div>
  );
}
