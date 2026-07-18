"use client"

import React, { useEffect, useState } from "react"
import { Globe, Plane, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const steps = [
    { text: "Searching thousands of flights...", icon: Plane },
    { text: "Finding the lowest fares...", icon: Sparkles },
    { text: "Matching your travel style...", icon: Globe },
    { text: "Protecting your personal info...", icon: ShieldCheck },
    { text: "Building your customized itinerary...", icon: Sparkles },
    { text: "Almost ready...", icon: CheckCircle2 },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const interval = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(interval);
    } else {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }
  }, [currentStep, steps.length, onLoadingComplete]);

  const percent = Math.min(100, Math.round((currentStep / steps.length) * 100));

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-[#fdf9f0] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] max-w-lg mx-auto my-6 text-[#1a1a1a]">
      {/* Globe & Flight Path Animation Area */}
      <div className="relative h-44 w-44 flex items-center justify-center mb-8 border-[3px] border-[#1a1a1a] bg-white rounded-full shadow-[4px_4px_0px_#1a1a1a] overflow-hidden">
        {/* Particle circles */}
        <div className="absolute inset-2 border-2 border-dashed border-gray-200 rounded-full animate-spin [animation-duration:15s]" />
        <div className="absolute inset-6 border border-dotted border-gray-300 rounded-full animate-spin [animation-duration:8s] reverse" />
        
        {/* Animated Globe Icon */}
        <Globe className="h-20 w-20 text-[#2d31fa] animate-pulse" />

        {/* Flying Airplane Path */}
        <div className="absolute inset-0 animate-spin [animation-duration:4s]">
          <div className="absolute top-1 left-[50%] -translate-x-[50%] translate-y-0 rotate-90 text-[#ff4d00]">
            <Plane className="h-6 w-6 fill-current stroke-[3px]" />
          </div>
        </div>

        {/* Floating Shield Badge */}
        {currentStep >= 3 && (
          <div className="absolute bottom-2 right-2 bg-[#bff000] border-2 border-[#1a1a1a] p-1.5 rounded-full shadow-[2px_2px_0px_#1a1a1a] animate-bounce">
            <ShieldCheck className="h-5 w-5 text-black stroke-[3px]" />
          </div>
        )}
      </div>

      {/* Progress Info */}
      <div className="w-full text-center mb-6">
        <h3 className="font-black text-xl uppercase tracking-tight mb-1">
          Orchestrating AI Travel Plan
        </h3>
        <p className="text-xs font-extrabold uppercase text-[#2d31fa]">
          Scanning partner databases securely
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-7 bg-white border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] relative overflow-hidden mb-8">
        <div
          className="h-full bg-[#bff000] border-r-[3px] border-[#1a1a1a] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase">
          {percent}% Analyzed
        </span>
      </div>

      {/* Progress Steps Details */}
      <div className="w-full space-y-3">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isDone = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={step.text}
              className={`flex items-center gap-3 p-3 border-2 transition-all ${
                isDone
                  ? "bg-white border-[#1a1a1a] text-gray-500"
                  : isActive
                  ? "bg-[#2d31fa] text-white border-[#1a1a1a] translate-y-[-1px] shadow-[2px_2px_0px_#1a1a1a]"
                  : "bg-white/40 border-gray-200 text-gray-400 opacity-60"
              }`}
            >
              <div
                className={`h-6 w-6 border-2 flex items-center justify-center text-xs font-black ${
                  isDone
                    ? "bg-[#bff000] border-[#1a1a1a] text-black"
                    : isActive
                    ? "bg-white border-[#1a1a1a] text-[#2d31fa]"
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                {isDone ? "✓" : isActive ? "→" : ""}
              </div>
              <div className="flex items-center gap-2 flex-grow">
                <StepIcon className={`h-4 w-4 ${isActive ? "animate-bounce" : ""}`} />
                <span className="text-xs font-bold uppercase tracking-tight">{step.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
