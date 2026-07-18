"use client"

import React, { useState, useEffect, useRef } from "react"
import { Plane, Calendar, Users, Briefcase, MapPin, X } from "lucide-react"

interface BookingWidgetProps {
  onSearch: (searchData: any) => void;
  isLoading?: boolean;
}

const POPULAR_AIRPORTS = [
  { city: "Bengaluru", code: "BLR", name: "Kempegowda Int'l Airport" },
  { city: "Tokyo", code: "HND", name: "Haneda Airport" },
  { city: "Bali", code: "DPS", name: "Ngurah Rai Int'l Airport" },
  { city: "Maldives", code: "MLE", name: "Velana Int'l Airport" },
  { city: "Dubai", code: "DXB", name: "Dubai Int'l Airport" },
  { city: "Singapore", code: "SIN", name: "Changi Airport" },
  { city: "London", code: "LHR", name: "Heathrow Airport" },
  { city: "Paris", code: "CDG", name: "Charles de Gaulle Airport" },
  { city: "New York", code: "JFK", name: "John F. Kennedy Int'l Airport" },
  { city: "Mumbai", code: "BOM", name: "Chhatrapati Shivaji Maharaj Airport" },
];

export default function BookingWidget({ onSearch, isLoading = false }: BookingWidgetProps) {
  const [tripType, setTripType] = useState("Round-trip");
  const [from, setFrom] = useState("Bengaluru (BLR)");
  const [to, setTo] = useState("Tokyo (HND)");
  const [departureDate, setDepartureDate] = useState("2026-08-15");
  const [returnDate, setReturnDate] = useState("2026-08-22");
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState("Economy");

  // Autocomplete state
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSearch, setFromSearch] = useState("Bengaluru");
  const [toSearch, setToSearch] = useState("Tokyo");

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    onSearch({
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
      // For mock PII generation on B2C client side
      customerName: "Rahul Sharma",
      passportNumber: "K123456",
      email: "rahul@gmail.com",
      phone: "9876543210",
      mealPreference: "Vegetarian",
    });
  };

  const inputStyle =
    "w-full bg-white border-2 border-[#1a1a1a] p-3 text-xs font-black uppercase tracking-tight text-[#1a1a1a] focus:outline-none focus:bg-[#bff000]/5 focus:border-[#2d31fa] transition-all";
  const labelStyle =
    "block text-[10px] font-black uppercase text-[#1a1a1a] tracking-widest mb-1";

  const filteredFromAirports = POPULAR_AIRPORTS.filter(
    (ap) =>
      ap.city.toLowerCase().includes(fromSearch.toLowerCase()) ||
      ap.code.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToAirports = POPULAR_AIRPORTS.filter(
    (ap) =>
      ap.city.toLowerCase().includes(toSearch.toLowerCase()) ||
      ap.code.toLowerCase().includes(toSearch.toLowerCase())
  );

  return (
    <div className="w-full bg-[#fdf9f0] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] p-4 md:p-6 transition-all hover:shadow-[8px_8px_0px_#1a1a1a]">
      {/* Top filters */}
      <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-200">
        <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          className="bg-white border-2 border-[#1a1a1a] px-3 py-1 text-[11px] font-extrabold uppercase tracking-tight text-[#1a1a1a] cursor-pointer"
        >
          <option value="Round-trip">Round-trip</option>
          <option value="One-way">One-way</option>
        </select>

        <select
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
          className="bg-white border-2 border-[#1a1a1a] px-3 py-1 text-[11px] font-extrabold uppercase tracking-tight text-[#1a1a1a] cursor-pointer"
        >
          <option value="Economy">Economy</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>

        <div className="flex items-center bg-white border-2 border-[#1a1a1a] px-3 py-1">
          <Users className="h-3 w-3 mr-1.5 text-gray-500" />
          <span className="text-[11px] font-extrabold uppercase text-[#1a1a1a] mr-2">Passengers:</span>
          <input
            type="number"
            min="1"
            max="9"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-8 border-none text-[11px] font-black text-[#1a1a1a] focus:outline-none"
          />
        </div>
      </div>

      {/* Main Fields Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        {/* From Field */}
        <div className="relative sm:col-span-1" ref={fromRef}>
          <label className={labelStyle}>From</label>
          <div className="relative">
            <input
              type="text"
              value={fromSearch}
              onFocus={() => setShowFromSuggestions(true)}
              onChange={(e) => {
                setFromSearch(e.target.value);
                setFrom(e.target.value);
              }}
              placeholder="Origin City"
              className={inputStyle}
            />
          </div>
          {showFromSuggestions && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] max-h-56 overflow-y-auto">
              {filteredFromAirports.map((ap) => (
                <button
                  key={ap.code}
                  type="button"
                  onClick={() => {
                    setFrom(`${ap.city} (${ap.code})`);
                    setFromSearch(`${ap.city} (${ap.code})`);
                    setShowFromSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold uppercase hover:bg-[#bff000] border-b border-gray-100 flex justify-between items-center"
                >
                  <span>{ap.city}, {ap.name}</span>
                  <span className="bg-[#2d31fa]/10 text-[#2d31fa] px-1.5 py-0.5 border border-[#2d31fa] text-[10px] font-black">{ap.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To Field */}
        <div className="relative sm:col-span-1" ref={toRef}>
          <label className={labelStyle}>To</label>
          <div className="relative">
            <input
              type="text"
              value={toSearch}
              onFocus={() => setShowToSuggestions(true)}
              onChange={(e) => {
                setToSearch(e.target.value);
                setTo(e.target.value);
              }}
              placeholder="Destination City"
              className={inputStyle}
            />
          </div>
          {showToSuggestions && (
            <div className="absolute z-50 left-0 right-0 mt-1 bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] max-h-56 overflow-y-auto">
              {filteredToAirports.map((ap) => (
                <button
                  key={ap.code}
                  type="button"
                  onClick={() => {
                    setTo(`${ap.city} (${ap.code})`);
                    setToSearch(`${ap.city} (${ap.code})`);
                    setShowToSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold uppercase hover:bg-[#bff000] border-b border-gray-100 flex justify-between items-center"
                >
                  <span>{ap.city}, {ap.name}</span>
                  <span className="bg-[#2d31fa]/10 text-[#2d31fa] px-1.5 py-0.5 border border-[#2d31fa] text-[10px] font-black">{ap.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <div className="sm:col-span-1">
          <label className={labelStyle}>Departure</label>
          <div className="relative">
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="sm:col-span-1">
          {tripType === "Round-trip" ? (
            <div className="w-full">
              <label className={labelStyle}>Return</label>
              <div className="relative">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={inputStyle}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-[52px]" /> // Spacer
          )}
        </div>

        {/* Search Action Row */}
        <div className="sm:col-span-2 mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff4d00] hover:bg-[#ff4d00]/95 text-white border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] py-3.5 font-black uppercase text-xs tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#1a1a1a] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Plane className="h-4 w-4 rotate-45 stroke-[3px]" />
            {isLoading ? "Searching Safe Options..." : "Search Flights"}
          </button>
        </div>
      </form>
    </div>
  )
}
