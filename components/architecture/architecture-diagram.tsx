"use client"

import React from "react"
import { Shield, Server, Cpu, Database, Laptop, ArrowDown } from "lucide-react"

export default function ArchitectureDiagram() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8">
      {/* Frontend Card */}
      <div className="w-full max-w-md bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a]">
        <div className="bg-[#bff000] p-3 border-2 border-[#1a1a1a] text-[#1a1a1a]">
          <Laptop className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-[#1a1a1a] tracking-tight">FRONTEND</h3>
          <p className="text-sm text-gray-600 font-medium">React SPA / Next.js landing page & forms</p>
        </div>
      </div>

      <ArrowDown className="text-[#1a1a1a] h-8 w-8 animate-bounce" />

      {/* AI Gateway Card */}
      <div className="w-full max-w-md bg-[#2d31fa] text-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a]">
        <div className="bg-white p-3 border-2 border-[#1a1a1a] text-[#2d31fa]">
          <Server className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg tracking-tight">AI GATEWAY</h3>
          <p className="text-sm text-blue-100 font-medium">Orchestrator for enterprise AI workflows</p>
        </div>
      </div>

      <ArrowDown className="text-[#1a1a1a] h-8 w-8" />

      {/* Intermediate Services (Parallel columns) */}
      <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Booking Service */}
        <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a]">
          <div className="bg-[#ff4d00] p-3 border-2 border-[#1a1a1a] text-white">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#1a1a1a] tracking-tight">BOOKING SERVICE</h4>
            <p className="text-xs text-gray-600 font-medium">Validates client details & request dates</p>
          </div>
        </div>

        {/* Privacy Service */}
        <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a]">
          <div className="bg-[#bff000] p-3 border-2 border-[#1a1a1a] text-[#1a1a1a]">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#1a1a1a] tracking-tight">PRIVACY SERVICE</h4>
            <p className="text-xs text-gray-600 font-medium">Removes PII and hashes passport/identity</p>
          </div>
        </div>
      </div>

      <ArrowDown className="text-[#1a1a1a] h-8 w-8" />

      {/* LLM Engine Card */}
      <div className="w-full max-w-md bg-[#ff4d00] text-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1a1a1a]">
        <div className="bg-[#bff000] p-3 border-2 border-[#1a1a1a] text-[#1a1a1a]">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg tracking-tight">SARVAM 105B</h3>
          <p className="text-sm text-orange-100 font-medium">Language Model generating safe travel recommendations</p>
        </div>
      </div>
    </div>
  )
}
