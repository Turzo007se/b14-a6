"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext"; // কাস্টম হুক
import Image from "next/image";

export default function WorkoutDetails({ params }) {
  
  const resolvedParams = use(params); 
  const workoutId = resolvedParams.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, addToSaved } = usePlan(); // কনটেক্সট ফাংশন

  useEffect(() => {
    if (!workoutId) return;
    
    setLoading(true);
    fetch(`https://api.api-store.workers.dev/api/fitlog/${workoutId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Workout not found in API");
        }
        return res.json();
      })
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setWorkout(null);
        setLoading(false);
      });
  }, [workoutId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white font-oswald tracking-wider">
        LOADING WORKOUT DETAILS...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-white space-y-4">
        <p className="font-oswald text-xl uppercase tracking-wider text-red-500">Workout not found</p>
        <p className="text-gray-500 text-xs">ID: {workoutId} </p>
        <Link href="/" className="bg-[#ccff00] text-black font-oswald font-bold px-6 py-2 rounded text-xs uppercase">
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] min-h-screen text-white px-6 lg:px-20 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        
        <div className="w-full bg-[#121212] rounded-2xl border border-gray-800 p-4 flex items-center justify-center overflow-hidden h-[400px]">
          <Image 
            src={workout.image || "https://placeholder.com"} 
            alt={workout.name || "Workout Image"} 
            width={500} 
            height={500} 
            className="w-full h-full object-contain rounded-xl"
            unoptimized
          />
        </div>

        
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-oswald text-white">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mt-2">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {workout.muscleGroups?.map((group, index) => (
                <span key={index} className="bg-[#ccff00] text-black text-[10px] font-extrabold tracking-wide px-2.5 py-1 rounded">
                  {group}
                </span>
              ))}
            </div>
          </div>

          
          <div className="bg-[#121212] rounded-xl border border-gray-800 p-4 space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-800/50">
              <span className="text-gray-500">Equipment</span>
              <span className="text-gray-300 font-medium capitalize">{workout.equipment}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-800/50">
              <span className="text-gray-500">Duration</span>
              <span className="text-gray-300 font-medium">{workout.duration} mins</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-800/50">
              <span className="text-gray-500">Calories Burned</span>
              <span className="text-gray-300 font-medium">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-800/50">
              <span className="text-gray-500">Target Muscle</span>
              <span className="text-gray-300 font-medium capitalize">{workout.targetMuscle}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Rating</span>
              <span className="text-gray-300 font-medium">⭐ {workout.rating}</span>
            </div>
          </div>

          
          <div className="space-y-3">
            <h3 className="font-oswald text-base font-bold tracking-wider text-white uppercase">Instructions</h3>
            <ol className="list-decimal list-inside text-xs text-gray-400 space-y-2 leading-relaxed">
              {workout.instructions?.map((ins, index) => (
                <li key={index} className="pl-1"><span className="text-gray-300">{ins}</span></li>
              ))}
            </ol>
          </div>

          
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => addToPlan(workout)} 
              className="btn bg-[#ccff00] text-black hover:bg-[#b8e600] font-oswald text-xs uppercase font-bold border-none"
            >
              Add to today's plan
            </button>
            <button 
              onClick={() => addToSaved(workout)} 
              className="btn btn-outline border-gray-700 text-gray-300 hover:bg-zinc-800 font-oswald text-xs uppercase font-bold"
            >
              Save for later
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}




