"use client"

import React, { useState } from "react"
import BookingWidget from "@/components/forms/booking-widget"
import DestinationCard from "@/components/cards/destination-card"
import DealCard from "@/components/cards/deal-card"
import TripPlannerDialog from "@/components/forms/trip-planner-dialog"
import { Plane, Compass, Globe, Luggage, Hotel, Shield, Wallet, Ticket, Calendar, Map, Sparkles, Clock, Star } from "lucide-react"

export default function Home() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [activeSearchData, setActiveSearchData] = useState<any | null>(null);

  const handleBookingSearch = (searchData: any) => {
    setActiveSearchData(searchData);
    setIsPlannerOpen(true);
  };

  const handleExploreDestination = (destName: string) => {
    // Preset booking search parameters for the destination clicked
    const searchData = {
      tripType: "Round-trip",
      from: "Bengaluru (BLR)",
      to: destName,
      departureDate: "2026-08-15",
      returnDate: "2026-08-22",
      passengers: 2,
      cabinClass: "Economy",
      customerName: "Rahul Sharma",
      passportNumber: "K123456",
      email: "rahul@gmail.com",
      phone: "9876543210",
      mealPreference: "Vegetarian",
    };
    handleBookingSearch(searchData);
  };

  const destinations = [
    { name: "Tokyo", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", fare: "₹45,200", duration: "8h 15m", weather: "22°C Clear" },
    { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80", fare: "₹28,600", duration: "6h 10m", weather: "29°C Sunny" },
    { name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80", fare: "₹34,100", duration: "3h 45m", weather: "28°C Showers" },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80", fare: "₹21,800", duration: "4h 20m", weather: "34°C Hot" },
    { name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80", fare: "₹18,900", duration: "5h 5m", weather: "30°C Rain" },
    { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80", fare: "₹56,400", duration: "10h 30m", weather: "16°C Drizzle" },
    { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80", fare: "₹52,800", duration: "9h 55m", weather: "18°C Cloudy" },
    { name: "Swiss Alps", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", fare: "₹61,000", duration: "11h 15m", weather: "12°C Snowing" },
  ];

  const deals = [
    { title: "Weekend Escapes", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80", tagline: "Quick getaways under 4 hours", discount: "20% OFF", dest: "Singapore" },
    { title: "Family Vacations", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80", tagline: "Memories for everyone", discount: "₹10,000 OFF", dest: "Bali" },
    { title: "Luxury Resorts", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80", tagline: "5-star stays with flights included", discount: "FREE UPGRADES", dest: "Maldives" },
    { title: "Student Discounts", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", tagline: "Extra baggage & cheap fares", discount: "15% OFF", dest: "London" },
    { title: "Monsoon Offers", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=600&q=80", tagline: "Rainy day special packages", discount: "25% OFF", dest: "Singapore" },
    { title: "Summer Specials", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", tagline: "Sunny beach destinations", discount: "BEST PRICE", dest: "Tokyo" },
  ];

  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo" style={{ color: "var(--dark)" }}>INTENT OS</div>
        <nav>
          <a href="#">Home</a>
          <a href="#explore">Explore</a>
          <a href="#deals">Deals</a>
          <a href="#why-us">Why Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#inspiration">Inspiration</a>
        </nav>
        <button className="btn-cta" onClick={() => { setActiveSearchData(null); setIsPlannerOpen(true); }}>
          Search Flights
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="bg-[#bff000] border-2 border-[#1a1a1a] px-3 py-1 text-[10px] font-black uppercase text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a] self-start mb-4">
              AI Travel Assistant
            </span>
            <h1 className="hero-title" style={{ fontSize: "2.75rem", lineHeight: "1" }}>
              Where Will You <span>Go Next?</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555] font-semibold mt-4">
              Book flights, discover unforgettable destinations, and receive personalized travel recommendations powered by AI.
            </p>
            
            {/* Booking Search Widget dominates the Hero */}
            <BookingWidget onSearch={handleBookingSearch} />
          </div>
          <div
            className="hero-img"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80")`
            }}
          >
            <div className="sticker">
              100% PRIVATE
              <br />
              SECURE
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #TRAVEL_SMARTER
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              AI_ENABLED
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="marquee">
          <div className="marquee-content">
            &nbsp; ★ TRAVEL SMARTER ★ BOOK FASTER ★ ZERO PERSONAL DATA EXPOSED ★ 100% PRIVATE SECURE BOOKING ★ DISCOVER THE WORLD ★ TRAVEL SMARTER ★ BOOK FASTER ★ ZERO PERSONAL DATA EXPOSED ★ 100% PRIVATE SECURE BOOKING ★ DISCOVER THE WORLD
          </div>
        </div>

        {/* Popular Destinations */}
        <section id="explore" className="section-padding">
          <div className="section-header">
            <h2 className="section-title">POPULAR DESTINATIONS</h2>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleExploreDestination("Bali"); }}
              className="text-sm md:text-base"
              style={{ color: "var(--dark)", fontWeight: 800, textTransform: "uppercase" }}
            >
              View All Locations →
            </a>
          </div>

          <div className="menu-grid">
            {destinations.map((dest) => (
              <DestinationCard
                key={dest.name}
                name={dest.name}
                image={dest.image}
                fare={dest.fare}
                duration={dest.duration}
                weather={dest.weather}
                onExplore={() => handleExploreDestination(dest.name)}
              />
            ))}
          </div>
        </section>

        {/* Promo Deals */}
        <section id="deals" className="section-padding bg-white border-t-3 border-b-3 border-[#1a1a1a]">
          <div className="section-header">
            <h2 className="section-title">HANDPICKED DEALS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <DealCard
                key={deal.title}
                title={deal.title}
                image={deal.image}
                tagline={deal.tagline}
                discount={deal.discount}
                onClaim={() => handleExploreDestination(deal.dest)}
              />
            ))}
          </div>
        </section>

        {/* Traveler Benefits */}
        <section id="why-us" className="section-padding">
          <div className="section-header text-center">
            <h2 className="section-title text-center mx-auto">WHY TRAVELERS LOVE INTENTOS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4">
              <div className="bg-[#bff000] p-3 border-2 border-[#1a1a1a] h-12 w-12 flex items-center justify-center text-black">
                <Plane className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1a1a1a]">AI Finds Better Flights</h3>
                <p className="text-xs text-gray-500 font-bold mt-1">Orchestration models parse departure slots to locate matching timings.</p>
              </div>
            </div>

            <div className="bg-white border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4">
              <div className="bg-[#2d31fa] p-3 border-2 border-[#1a1a1a] h-12 w-12 flex items-center justify-center text-white">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1a1a1a]">Save Time</h3>
                <p className="text-xs text-gray-500 font-bold mt-1">Get custom travel proposals, hotels, and itineraries in seconds.</p>
              </div>
            </div>

            <div className="bg-white border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4">
              <div className="bg-[#ff4d00] p-3 border-2 border-[#1a1a1a] h-12 w-12 flex items-center justify-center text-white">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1a1a1a]">Better Prices</h3>
                <p className="text-xs text-gray-500 font-bold mt-1">Algorithms lock in partner pricing and check alternate dates automatically.</p>
              </div>
            </div>

            <div className="bg-white border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4">
              <div className="bg-[#bff000] p-3 border-2 border-[#1a1a1a] h-12 w-12 flex items-center justify-center text-black">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1a1a1a]">Personalized Itineraries</h3>
                <p className="text-xs text-gray-500 font-bold mt-1">Daily checklists created specifically around your dining preferences and style.</p>
              </div>
            </div>

            <div className="bg-white border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4">
              <div className="bg-[#2d31fa] p-3 border-2 border-[#1a1a1a] h-12 w-12 flex items-center justify-center text-white">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1a1a1a]">Travel Smarter</h3>
                <p className="text-xs text-gray-500 font-bold mt-1">Weather forecasts and packing suggestions linked directly to your recommendation.</p>
              </div>
            </div>

            <div className="bg-white border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a] flex gap-4">
              <div className="bg-[#ff4d00] p-3 border-2 border-[#1a1a1a] h-12 w-12 flex items-center justify-center text-white">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase text-[#1a1a1a]">Secure Booking</h3>
                <p className="text-xs text-gray-500 font-bold mt-1">Personally Identifiable Information is encrypted and hashed at our privacy boundaries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Banner */}
        <section className="bg-[#2d31fa] text-white py-12 px-6 border-b-3 border-[#1a1a1a] text-center">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-3xl font-black text-[#bff000]">10M+</p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-85">Flights Compared</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#bff000]">120+</p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-85">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#bff000]">4.9★</p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-85">Customer Rating</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#bff000]">99.9%</p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-85">Booking Success</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-3xl font-black text-[#bff000]">100K+</p>
              <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-85">Happy Travelers</p>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section id="reviews" className="section-padding bg-white">
          <div className="section-header text-center">
            <h2 className="section-title text-center mx-auto">WHAT OUR TRAVELERS SAY</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-[#fdf9f0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a]">
              <div className="flex items-center gap-1 text-[#ff4d00] mb-3">
                <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-gray-700 font-bold leading-relaxed mb-4">
                "IntentOS found me a fantastic flight to Tokyo with zero passport exposure. The custom daily itinerary matched my vegetarian preference perfectly. Highly recommended!"
              </p>
              <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[10px] font-black uppercase">
                <span>Rohan M. (Mumbai)</span>
                <span className="text-[#2d31fa]">✈ Tokyo</span>
              </div>
            </div>

            <div className="bg-[#fdf9f0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a]">
              <div className="flex items-center gap-1 text-[#ff4d00] mb-3">
                <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-gray-700 font-bold leading-relaxed mb-4">
                "Booking a last-minute resort package to the Maldives was seamless. The privacy reports are so reassuring—I knew my information never left the local system."
              </p>
              <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[10px] font-black uppercase">
                <span>Priya K. (Bengaluru)</span>
                <span className="text-[#2d31fa]">✈ Maldives</span>
              </div>
            </div>

            <div className="bg-[#fdf9f0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#1a1a1a]">
              <div className="flex items-center gap-1 text-[#ff4d00] mb-3">
                <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-gray-700 font-bold leading-relaxed mb-4">
                "The travel tips, local checks, and packing suggestions were so accurate. Best travel planner I have ever used. Booking was confirmed in under 10 seconds."
              </p>
              <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-[10px] font-black uppercase">
                <span>Alex S. (Singapore)</span>
                <span className="text-[#2d31fa]">✈ Swiss Alps</span>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Inspiration Categories */}
        <section id="inspiration" className="section-padding border-t-3 border-[#1a1a1a]">
          <div className="section-header">
            <h2 className="section-title">TRAVEL INSPIRATION</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div onClick={() => handleExploreDestination("Bali")} className="bg-white border-2 border-[#1a1a1a] p-4 text-center cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#bff000] hover:translate-y-[-1px] transition-all">
              <span className="text-xs font-black uppercase">Beach Escapes</span>
            </div>
            <div onClick={() => handleExploreDestination("Swiss Alps")} className="bg-white border-2 border-[#1a1a1a] p-4 text-center cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#bff000] hover:translate-y-[-1px] transition-all">
              <span className="text-xs font-black uppercase">Adventure Trips</span>
            </div>
            <div onClick={() => handleExploreDestination("Maldives")} className="bg-white border-2 border-[#1a1a1a] p-4 text-center cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#bff000] hover:translate-y-[-1px] transition-all">
              <span className="text-xs font-black uppercase">Luxury Travel</span>
            </div>
            <div onClick={() => handleExploreDestination("London")} className="bg-white border-2 border-[#1a1a1a] p-4 text-center cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#bff000] hover:translate-y-[-1px] transition-all">
              <span className="text-xs font-black uppercase">Road Trips</span>
            </div>
            <div onClick={() => handleExploreDestination("Tokyo")} className="bg-white border-2 border-[#1a1a1a] p-4 text-center cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#bff000] hover:translate-y-[-1px] transition-all">
              <span className="text-xs font-black uppercase">Family Holidays</span>
            </div>
            <div onClick={() => handleExploreDestination("Paris")} className="bg-white border-2 border-[#1a1a1a] p-4 text-center cursor-pointer shadow-[3px_3px_0px_#1a1a1a] hover:bg-[#bff000] hover:translate-y-[-1px] transition-all">
              <span className="text-xs font-black uppercase">Solo Adventures</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">INTENT OS</div>
          <p style={{ color: "#666", lineHeight: 1.6, fontWeight: 600 }}>
            Premium privacy-preserving AI flight and hotel booking orchestration.
          </p>
        </div>
        <div className="footer-links">
          <h4>Discover</h4>
          <ul>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Popular Flight Deals</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Explore Destinations</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Why Travel With Us</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Support & Safety</h4>
          <ul>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Privacy Shield Policy</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Booking Guarantee</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Traveler Help Desk</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© 2026 INTENTOS TRAVEL GROUP</span>
          <span>SECURED BY AI PRIVACY SHIELD</span>
          <span>FLIGHTS / HOTELS / VACATIONS</span>
        </div>
      </footer>

      <TripPlannerDialog
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        initialSearchData={activeSearchData}
      />
    </>
  )
}
