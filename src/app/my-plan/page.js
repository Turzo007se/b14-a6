"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const { 
    planItems, 
    savedItems, 
    activeTab, 
    setActiveTab, 
    removeFromPlan, 
    removeFromSaved 
  } = usePlan();
  
  const [sortBy, setSortBy] = useState("duration");


  const currentList = activeTab === "today" ? planItems : savedItems;

 
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });


  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
  const totalCalories = currentList.reduce((acc, item) => acc + (Number(item.caloriesBurned) || 0), 0);

  return (
    <div className="bg-[#09090b] min-h-screen text-white px-6 lg:px-20 py-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold font-oswald uppercase tracking-wider text-white">MY PLAN</h1>
        <p className="text-gray-500 text-xs mt-1">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-[#121212] border border-gray-800 p-6 rounded-xl mb-6">
        <div>
          <span className="text-gray-500 uppercase font-oswald text-[10px] tracking-widest block mb-1">EXERCISES</span>
          <span className="text-3xl font-bold font-oswald text-[#ccff00]">{totalExercises}</span>
        </div>
        <div className="border-x border-gray-800/80 px-4">
          <span className="text-gray-500 uppercase font-oswald text-[10px] tracking-widest block mb-1">MINUTES</span>
          <span className="text-3xl font-bold font-oswald text-white">{totalMinutes}</span>
        </div>
        <div>
          <span className="text-gray-500 uppercase font-oswald text-[10px] tracking-widest block mb-1">CALORIES</span>
          <span className="text-3xl font-bold font-oswald text-white">{totalCalories}</span>
        </div>
      </div>

      
      <div className="flex justify-between items-center border-b border-gray-800/50 pb-4 mb-6">
        <div className="bg-[#161616] border border-gray-800 p-1 rounded-lg flex gap-1">
          <button 
            onClick={() => setActiveTab("today")}
            className={`px-4 py-1.5 rounded-md font-oswald text-xs uppercase font-medium tracking-wide transition-all ${
              activeTab === "today" ? "bg-[#ccff00] text-black font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-md font-oswald text-xs uppercase font-medium tracking-wide transition-all ${
              activeTab === "saved" ? "bg-[#ccff00] text-black font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121212] border border-gray-800 rounded px-3 py-1.5 font-medium text-gray-300"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      
      {sortedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <p className="text-gray-500 font-oswald uppercase tracking-wider text-sm">NOTHING HERE YET</p>
          <p className="text-gray-600 text-xs max-w-xs">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="bg-[#ccff00] text-black font-oswald font-bold px-6 py-2.5 rounded text-xs uppercase">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#121212] border border-gray-800 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image 
                    src={item.image || "https://placeholder.com"} 
                    alt={item.name || "Workout"} 
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold uppercase text-white">{item.name}</h3>
                  <p className="text-gray-500 text-xs capitalize">{item.equipment}</p>
                  <div className="flex gap-3 text-[11px] text-gray-400 mt-1">
                    <span>⏱️ {item.duration} min</span>
                    <span>🔥 {item.caloriesBurned} kcal</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Link href={`/workout/${item.id}`} className="btn btn-sm btn-outline text-xs text-gray-400 border-gray-800 hover:bg-zinc-800">
                  View Details
                </Link>
                <button 
                  onClick={() => activeTab === "today" ? removeFromPlan(item.id) : removeFromSaved(item.id)}
                  className="text-gray-500 hover:text-red-500 text-sm p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

