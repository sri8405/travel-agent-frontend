"use client"

import React, { useState } from "react"
import { PlanTripRequest } from "../../types"

interface TripFormProps {
  onSubmit: (data: PlanTripRequest) => void;
  isLoading: boolean;
}

export default function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [formData, setFormData] = useState({
    // Customer details (PII)
    name: "Rahul Sharma",
    passport: "K123456",
    email: "rahul@gmail.com",
    phone: "9876543210",
    meal_preference: "Vegetarian",

    // Trip details
    source: "Bengaluru",
    destination: "Tokyo",
    departure_date: "2026-08-15",
    return_date: "2026-08-22",
    budget: 300000,
    travellers: 2,
    travel_style: "Leisure",
    purpose: "Vacation",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" || name === "travellers" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const requestPayload: PlanTripRequest = {
      customer: {
        name: formData.name,
        passport: formData.passport,
        email: formData.email,
        phone: formData.phone,
        meal_preference: formData.meal_preference,
      },
      trip: {
        source: formData.source,
        destination: formData.destination,
        departure_date: formData.departure_date,
        return_date: formData.return_date,
        budget: formData.budget,
        travellers: formData.travellers,
        travel_style: formData.travel_style,
        purpose: formData.purpose,
      },
    };

    onSubmit(requestPayload);
  };

  const inputClass =
    "w-full bg-white border-2 border-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] p-2.5 text-xs font-extrabold uppercase focus:outline-none focus:shadow-[4px_4px_0px_#1a1a1a] transition-all text-[#1a1a1a] placeholder-gray-400";
  const labelClass = "block text-[10px] font-black uppercase text-[#1a1a1a] tracking-wider mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Details Block (PII) */}
      <div className="bg-[#ff4d00]/5 border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a]">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#ff4d00] mb-3 border-b-2 border-[#1a1a1a] pb-1">
          1. Customer Details (Sensitive PII)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Passport Number</label>
            <input
              type="text"
              name="passport"
              required
              value={formData.passport}
              onChange={handleChange}
              placeholder="e.g. K123456"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@gmail.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Trip Details Block */}
      <div className="bg-white border-2 border-[#1a1a1a] p-4 shadow-[3px_3px_0px_#1a1a1a]">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#2d31fa] mb-3 border-b-2 border-[#1a1a1a] pb-1">
          2. Trip Specifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Source City</label>
            <input
              type="text"
              name="source"
              required
              value={formData.source}
              onChange={handleChange}
              placeholder="e.g. Bengaluru"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Destination City</label>
            <input
              type="text"
              name="destination"
              required
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Tokyo"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Departure Date</label>
            <input
              type="date"
              name="departure_date"
              required
              value={formData.departure_date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Return Date</label>
            <input
              type="date"
              name="return_date"
              required
              value={formData.return_date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Budget (INR)</label>
            <input
              type="number"
              name="budget"
              min="1"
              required
              value={formData.budget}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Number of Travellers</label>
            <input
              type="number"
              name="travellers"
              min="1"
              required
              value={formData.travellers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Meal Preference</label>
            <select
              name="meal_preference"
              value={formData.meal_preference}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Kosher">Kosher</option>
              <option value="Halal">Halal</option>
              <option value="None">None</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Travel Style</label>
            <select
              name="travel_style"
              value={formData.travel_style}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Leisure">Leisure</option>
              <option value="Adventure">Adventure</option>
              <option value="Luxury">Luxury</option>
              <option value="Backpacker">Backpacker</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Trip Purpose</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Vacation">Vacation</option>
              <option value="Business">Business</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Conference">Conference</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#bff000] border-[3px] border-[#1a1a1a] shadow-[5px_5px_0px_#1a1a1a] py-3.5 font-black uppercase text-sm tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed text-[#1a1a1a]"
      >
        {isLoading ? "Securely Orchestrating..." : "Plan My Trip"}
      </button>
    </form>
  )
}
