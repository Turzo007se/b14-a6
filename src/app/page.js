import Image from "next/image";
import Link from "next/link";
import bannerImg from "@/assets/banner.png";


async function getWorkouts() {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <div className="bg-[#09090b] min-h-screen text-white">
      
      <div className="min-h-[calc(100vh-80px)] flex items-center px-8 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          <div className="flex flex-col justify-center text-left space-y-6">
            <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase font-oswald">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase font-oswald text-white leading-tight">
              TRAIN WITH INTENT.<br />
              LOG EVERY SET.
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed italic">
              &ldquo;FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.&rdquo;
            </p>
            <div className="pt-4">
              <a 
                href="#library" 
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-oswald font-bold px-6 py-3 rounded-md hover:bg-[#b5e600] transition-colors uppercase tracking-wider text-sm"
              >
                BROWSE WORKOUTS
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
              </a>
            </div>
          </div>

          
          <div className="flex justify-center lg:justify-end w-full">
            <Image src={bannerImg} alt="Gym Workout Banner" priority className="w-full max-w-md md:max-w-lg object-contain" />
          </div>
        </div>
      </div>

      
      <div id="library" className="px-8 lg:px-20 py-16 max-w-7xl mx-auto border-t border-gray-900">
        
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-oswald uppercase tracking-wider text-white">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <Link 
              key={workout.id} 
              href={`/workout/${workout.id}`}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-gray-800/80 hover:border-gray-700 transition-all flex flex-col group cursor-pointer"
            >
              
              
              <div className="w-full h-52 bg-[#1a1a1a] relative flex items-center justify-center overflow-hidden">
                <img 
                  src={workout.image || "https://placeholder.com"} 
                  alt={workout.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                
                <div className="space-y-3">
                  
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups?.map((group, index) => (
                      <span 
                        key={index} 
                        className="bg-[#ccff00] text-black text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full font-oswald"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  
                  <div>
                    <h3 className="font-oswald text-xl font-bold tracking-wide text-white uppercase group-hover:text-[#ccff00] transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {workout.equipment}
                    </p>
                  </div>
                </div>

                
                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium pt-2 border-t border-gray-800/60">
                  <span className="flex items-center gap-1">🕒 {workout.duration} min</span>
                  <span className="flex items-center gap-1">🔥 {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1 text-gray-300">⭐ {workout.rating}</span>
                </div>

              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
