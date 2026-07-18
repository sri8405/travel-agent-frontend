export interface CustomerData {
  name: string;
  passport: string;
  email: string;
  phone: string;
  meal_preference: string;
}

export interface TripData {
  source: string;
  destination: string;
  departure_date: string;
  return_date: string;
  budget: number;
  travellers: number;
  travel_style: string;
  purpose: string;
}

export interface PlanTripRequest {
  customer: CustomerData;
  trip: TripData;
}

export interface BookingContext {
  origin: string;
  destination: string;
  trip_type: string;
  travellers: number;
  budget: number;
}

export interface TravelerPersona {
  traveler_type: string;
  budget_tier: string;
  meal: string;
  travel_style: string;
}

export interface FlightRecommendation {
  airline: string;
  flight_number: string;
  reason: string;
}

export interface HotelRecommendation {
  name: string;
  reason: string;
}

export interface ItineraryItem {
  day: number;
  activities: string[];
}

export interface RecommendationDetails {
  flight: FlightRecommendation;
  hotel: HotelRecommendation;
  itinerary: ItineraryItem[];
}

export interface PlanTripResponse {
  booking_context: BookingContext;
  persona: TravelerPersona;
  recommendation: RecommendationDetails;
  reasoning: string[];
  confidence: number;
}
