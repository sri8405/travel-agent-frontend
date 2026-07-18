"use client"

import React from "react"
import { Ticket, ArrowUpRight } from "lucide-react"

interface DealCardProps {
  title: string;
  image: string;
  tagline: string;
  discount: string;
  onClaim: () => void;
}

export default function DealCard({ title, image, tagline, discount, onClaim }: DealCardProps) {
  return (
    <div className="border-[3px] border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a] relative overflow-hidden flex flex-col md:flex-row group">
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 bg-[#ff4d00] text-white border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] text-xs font-black uppercase px-2.5 py-1 z-10">
        {discount}
      </div>

      {/* Image Block */}
      <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden relative border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#1a1a1a]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Block */}
      <div className="p-5 flex flex-col justify-between flex-grow md:w-3/5">
        <div>
          <h3 className="font-black text-xl uppercase tracking-tight text-[#1a1a1a] mb-1">
            {title}
          </h3>
          <p className="text-xs text-gray-500 font-extrabold uppercase tracking-wide mb-4">
            {tagline}
          </p>
        </div>

        <button
          onClick={onClaim}
          className="bg-white hover:bg-[#bff000] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] py-2 px-4 font-black uppercase text-xs tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a] flex items-center justify-center gap-1.5 self-start text-[#1a1a1a]"
        >
          <Ticket className="h-3.5 w-3.5" />
          <span>Claim Offer</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
