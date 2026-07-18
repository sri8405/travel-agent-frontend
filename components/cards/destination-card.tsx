"use client"

import React from "react"
import { Sun, CloudRain, Clock, Plane, Compass } from "lucide-react"

interface DestinationCardProps {
  name: string;
  image: string;
  fare: string;
  duration: string;
  weather: string;
  onExplore: () => void;
}

export default function DestinationCard({
  name,
  image,
  fare,
  duration,
  weather,
  onExplore,
}: DestinationCardProps) {
  const isRainy = weather.toLowerCase().includes("rain") || weather.toLowerCase().includes("shower");

  return (
    <div className="menu-card flex flex-col h-full bg-white border-[3px] border-[#1a1a1a] transition-all duration-300 hover:shadow-[8px_8px_0px_#1a1a1a] hover:-translate-y-1 relative overflow-hidden group">
      {/* Starting Fare Tag */}
      <span className="menu-tag z-10 bg-[#2d31fa] text-white border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]">
        From {fare}
      </span>

      {/* Image container with scale hover */}
      <div className="overflow-hidden border-b-[3px] border-[#1a1a1a] h-56 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Weather Overlay */}
        <div className="absolute bottom-3 right-3 bg-[#bff000] border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] px-2 py-0.5 text-[10px] font-black uppercase text-[#1a1a1a] flex items-center gap-1">
          {isRainy ? <CloudRain className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
          {weather}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-black text-xl uppercase tracking-tight text-[#1a1a1a] group-hover:text-[#2d31fa] transition-colors">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
            <Clock className="h-3.5 w-3.5" />
            <span>Avg Flight: {duration}</span>
          </div>
        </div>

        <button
          onClick={onExplore}
          className="w-full bg-[#bff000] hover:bg-[#bff000]/95 text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] py-2 font-black uppercase text-xs tracking-wider transition-all active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] flex items-center justify-center gap-1"
        >
          <Compass className="h-3.5 w-3.5" />
          Explore Deals
        </button>
      </div>
    </div>
  )
}
