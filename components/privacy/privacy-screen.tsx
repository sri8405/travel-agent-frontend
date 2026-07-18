"use client"

import React, { useState, useEffect } from "react"
import { ShieldCheck, ArrowRight, Lock, EyeOff, UserCheck, Sparkles } from "lucide-react"

interface PrivacyScreenProps {
  customer: {
    name: string;
    passport: string;
    email: string;
    phone: string;
    meal_preference: string;
  };
  persona: {
    traveler_type: string;
    budget_tier: string;
    meal: string;
    travel_style: string;
  };
  onNext: () => void;
}

export default function PrivacyScreen({ customer, persona, onNext }: PrivacyScreenProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 800), // Encrypted
      setTimeout(() => setAnimationStep(2), 1600), // Anonymous Traveler Profile
      setTimeout(() => setAnimationStep(3), 2400), // AI recommendation ready
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-[#fdf9f0] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] my-6 text-[#1a1a1a]">
      {/* Title & Trust Header */}
      <div className="text-center border-b-[3px] border-[#1a1a1a] pb-6 mb-8">
        <div className="inline-flex bg-[#bff000] border-2 border-[#1a1a1a] p-2 rounded-full mb-3 shadow-[2px_2px_0px_#1a1a1a]">
          <ShieldCheck className="h-8 w-8 text-black stroke-[2.5px]" />
        </div>
        <h3 className="font-black text-2xl uppercase tracking-tight">Your Information Stayed Private</h3>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
          Our Privacy Shield ensures zero PII is exposed to the AI model
        </p>
      </div>

      {/* Cinematic Animation Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center mb-8 relative">
        {/* Step 1: Customer Data */}
        <div className={`p-4 border-2 border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] transition-all duration-500 ${animationStep >= 0 ? "opacity-100 scale-100" : "opacity-30 scale-95"}`}>
          <div className="flex items-center gap-1.5 mb-3 border-b border-gray-100 pb-1.5">
            <EyeOff className="h-4 w-4 text-[#ff4d00]" />
            <h4 className="text-[10px] font-black uppercase text-[#ff4d00] tracking-wider">Customer Data</h4>
          </div>
          <div className="space-y-1.5 font-mono text-[9px] font-semibold text-gray-700">
            <div className="flex justify-between line-through decoration-[#ff4d00] decoration-2">
              <span>NAME:</span> <span>{customer.name}</span>
            </div>
            <div className="flex justify-between line-through decoration-[#ff4d00] decoration-2">
              <span>PASS:</span> <span>{customer.passport}</span>
            </div>
            <div className="flex justify-between line-through decoration-[#ff4d00] decoration-2">
              <span>EMAIL:</span> <span>{customer.email}</span>
            </div>
          </div>
        </div>

        {/* Transition indicator 1 */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] font-black text-xs transition-colors duration-500 ${animationStep >= 1 ? "bg-[#ff4d00] text-white" : "bg-white text-gray-400"}`}>
            <Lock className="h-4 w-4" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">
            {animationStep >= 1 ? "ENCRYPTED" : "PROCESSING"}
          </span>
        </div>

        {/* Step 2: Traveler Profile */}
        <div className={`p-4 border-2 border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] transition-all duration-500 ${animationStep >= 2 ? "opacity-100 scale-100 border-[#2d31fa]" : "opacity-30 scale-95"}`}>
          <div className="flex items-center gap-1.5 mb-3 border-b border-gray-100 pb-1.5">
            <UserCheck className="h-4 w-4 text-[#2d31fa]" />
            <h4 className="text-[10px] font-black uppercase text-[#2d31fa] tracking-wider">Anonymized Profile</h4>
          </div>
          <div className="space-y-1.5 font-mono text-[9px] font-semibold text-gray-700">
            <div className="flex justify-between">
              <span>TYPE:</span> <span className="text-[#2d31fa] font-black">{persona.traveler_type}</span>
            </div>
            <div className="flex justify-between">
              <span>BUDGET:</span> <span className="text-[#2d31fa] font-black">{persona.budget_tier}</span>
            </div>
            <div className="flex justify-between">
              <span>STYLE:</span> <span className="font-bold text-gray-800">{persona.travel_style}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety message */}
      <div className="bg-[#bff000]/15 border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a] text-center mb-8">
        <p className="text-xs font-black uppercase text-black flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#2d31fa]" />
          My Personal Information never left the booking platform
        </p>
        <p className="text-[10px] font-bold text-gray-600 mt-1 uppercase">
          Strict isolation layers hash passport identifiers and scrub all email/phone credentials.
        </p>
      </div>

      {/* Next Button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={animationStep < 2}
          className="flex items-center gap-2 bg-[#bff000] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] px-6 py-3 font-extrabold uppercase text-xs tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#1a1a1a] disabled:opacity-50"
        >
          <span>Reveal Recommendations</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
