"use client"

import React, { useState } from "react"
import { 
  Plane, 
  Hotel, 
  Calendar, 
  Sparkles, 
  Sun, 
  Check, 
  Clock, 
  Wallet, 
  Umbrella, 
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface RecommendationScreenProps {
  data: {
    booking_context: {
      origin: string;
      destination: string;
      trip_type: string;
      travellers: number;
      budget: number;
    };
    persona: {
      traveler_type: string;
      budget_tier: string;
      meal: string;
      travel_style: string;
    };
    recommendation: {
      flight: {
        airline: string;
        flight_number: string;
        reason: string;
      };
      hotel: {
        name: string;
        reason: string;
      };
      itinerary: Array<{
        day: number;
        activities: string[];
      }>;
    };
    reasoning: string[];
    confidence: number;
  };
  onReset: () => void;
}

export default function RecommendationScreen({ data, onReset }: RecommendationScreenProps) {
  const { booking_context, persona, recommendation, reasoning, confidence } = data;
  const [isBooked, setIsBooked] = useState(false);

  // Generate nice mock details if not in payload to enrich the B2C results page
  const alternateFlights = [
    { airline: "Singapore Airlines", price: "₹82,400", time: "11h 20m (1 Stop)" },
    { airline: "Japan Airlines", price: "₹96,800", time: "8h 15m (Direct)" }
  ];

  const weatherForecast = "24°C Partly Cloudy (Ideal for walking)";
  const packingList = [
    "Comfortable walking shoes for city walks",
    "Light jacket / windbreaker for breezy evenings",
    "Universal power adapter",
    "Travel documents wallet",
  ];

  const travelTips = [
    "Pick up a local pocket Wi-Fi router at the terminal gate.",
    "Pre-book a train transit card for seamless city navigation.",
  ];

  const handleBookNow = () => {
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] my-6 text-center text-[#1a1a1a]">
        <div className="bg-[#bff000] border-2 border-[#1a1a1a] p-4 inline-block mb-4 shadow-[2px_2px_0px_#1a1a1a]">
          <CheckCircle className="h-10 w-10 text-black stroke-[2.5px]" />
        </div>
        <h3 className="font-black text-2xl uppercase tracking-tight mb-2">Booking Confirmed!</h3>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
          Your flights and accommodations have been locked in securely.
        </p>

        <div className="bg-[#bff000]/10 border-2 border-dashed border-[#1a1a1a] p-4 text-xs font-mono text-left space-y-2 mb-6">
          <div className="flex justify-between"><span>DESTINATION:</span> <span className="font-black text-[#2d31fa]">{booking_context.destination}</span></div>
          <div className="flex justify-between"><span>PASSENGERS:</span> <span className="font-black">{booking_context.travellers}</span></div>
          <div className="flex justify-between"><span>FLIGHT:</span> <span className="font-black">{recommendation.flight.airline} ({recommendation.flight.flight_number})</span></div>
          <div className="flex justify-between"><span>HOTEL:</span> <span className="font-black">{recommendation.hotel.name}</span></div>
        </div>

        <button
          onClick={onReset}
          className="bg-[#bff000] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] py-2.5 px-6 font-black uppercase text-xs tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a]"
        >
          Book Another Vacation
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-[#fdf9f0] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] my-6 text-[#1a1a1a]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-[#1a1a1a] pb-4 mb-6">
        <div>
          <span className="bg-[#ff4d00] border-2 border-[#1a1a1a] px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-[1px_1px_0px_#1a1a1a]">
            Match Rating {confidence}%
          </span>
          <h3 className="font-black text-2xl uppercase tracking-tight mt-1">
            Your Tailored Proposal
          </h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-0.5">
            {booking_context.origin} → {booking_context.destination} • {booking_context.travellers} Travellers
          </p>
        </div>

        <button
          onClick={handleBookNow}
          className="bg-[#ff4d00] hover:bg-[#ff4d00]/95 text-white border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] py-2 px-6 font-black uppercase text-xs tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a]"
        >
          Book This Trip Now
        </button>
      </div>

      {/* Flight comparison grid */}
      <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a] mb-6">
        <h4 className="font-black text-xs uppercase text-[#2d31fa] mb-3 flex items-center gap-1.5">
          <Plane className="h-4 w-4" /> Recommended Flights
        </h4>
        <div className="space-y-3">
          {/* Main Recommended Flight */}
          <div className="border-2 border-[#bff000] bg-[#bff000]/10 p-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] bg-[#bff000] border border-[#1a1a1a] px-1.5 py-0.2 font-black uppercase">Lowest Fare</span>
              <p className="text-sm font-black uppercase mt-1">{recommendation.flight.airline} ({recommendation.flight.flight_number})</p>
              <p className="text-[11px] text-gray-500 font-bold uppercase">Direct Flight • Matches Preferences</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-[#2d31fa]">Included</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Recommended Option</p>
            </div>
          </div>

          {/* Alternate flights */}
          {alternateFlights.map((f, i) => (
            <div key={i} className="border border-gray-200 p-3 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-gray-700">{f.airline}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{f.time}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-800">{f.price}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">Upgrade Fee</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel & Destination metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Hotel Card */}
        <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a] flex flex-col justify-between">
          <div>
            <h4 className="font-black text-xs uppercase text-[#ff4d00] mb-2 flex items-center gap-1.5">
              <Hotel className="h-4 w-4" /> Recommended Hotel
            </h4>
            <h5 className="font-bold text-sm text-[#1a1a1a]">{recommendation.hotel.name}</h5>
            <p className="text-xs text-gray-600 font-medium leading-relaxed mt-2">
              {recommendation.hotel.reason}
            </p>
          </div>
        </div>

        {/* Weather / Budget / packing details */}
        <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a] space-y-3">
          <div>
            <span className="text-[9px] font-black uppercase text-gray-400 block">Forecast</span>
            <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Sun className="h-4 w-4 text-[#ff4d00]" />
              {weatherForecast}
            </p>
          </div>
          <div>
            <span className="text-[9px] font-black uppercase text-gray-400 block">Estimated Budget</span>
            <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Wallet className="h-4 w-4 text-[#2d31fa]" />
              ₹{booking_context.budget.toLocaleString()} Total (All Passengers)
            </p>
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a] mb-6">
        <h4 className="font-black text-xs uppercase text-[#1a1a1a] mb-3 border-b pb-2 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-[#2d31fa]" /> Daily Plan Overview
        </h4>
        <div className="space-y-3">
          {recommendation.itinerary.map((day) => (
            <div key={day.day} className="flex gap-4 items-start pl-2 border-l-2 border-[#2d31fa]">
              <div className="bg-[#bff000] border border-[#1a1a1a] text-black font-black text-[9px] px-1.5 py-0.2 whitespace-nowrap">
                DAY {day.day}
              </div>
              <ul className="text-xs text-gray-700 font-semibold space-y-1.5 list-disc list-inside">
                {day.activities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Packing list & tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a]">
          <h4 className="font-black text-xs uppercase text-[#1a1a1a] mb-2.5 flex items-center gap-1.5">
            <Umbrella className="h-4 w-4 text-sky-500" /> Packing Checklist
          </h4>
          <ul className="text-xs text-gray-600 font-semibold space-y-1.5 list-inside list-none">
            {packingList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#bff000] font-black">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a]">
          <h4 className="font-black text-xs uppercase text-[#1a1a1a] mb-2.5 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#ff4d00]" /> Destination Tips
          </h4>
          <ul className="text-xs text-gray-600 font-semibold space-y-1.5 list-inside list-none">
            {travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#2d31fa] font-black">✦</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI explanation */}
      <div className="bg-[#2d31fa]/5 border-2 border-dashed border-[#2d31fa] p-4 text-xs font-semibold text-gray-600 leading-relaxed mb-6">
        <p>
          <strong>AI Selection Insights:</strong> {reasoning.join(" ")}
        </p>
      </div>

      {/* Footer Reset buttons */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-xs">
        <span className="text-gray-400 font-bold uppercase">
          Style: {persona.travel_style} • Meal: {persona.meal}
        </span>
        <button
          onClick={onReset}
          className="border-2 border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] py-1.5 px-4 font-black uppercase text-[10px] tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a]"
        >
          Cancel & Edit search
        </button>
      </div>
    </div>
  )
}
