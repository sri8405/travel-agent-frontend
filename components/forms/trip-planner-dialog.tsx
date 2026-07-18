"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import BookingWidget from "./booking-widget"
import LoadingScreen from "../recommendation/loading-screen"
import PrivacyScreen from "../privacy/privacy-screen"
import RecommendationScreen from "../recommendation/recommendation-screen"
import ErrorState from "../recommendation/error-state"
import { planTrip } from "../../services/trip"
import { PlanTripRequest, PlanTripResponse } from "../../types"

interface TripPlannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchData?: any | null;
}

type Stage = "FORM" | "LOADING" | "PRIVACY" | "RESULTS" | "ERROR";

export default function TripPlannerDialog({ isOpen, onClose, initialSearchData = null }: TripPlannerDialogProps) {
  const [stage, setStage] = useState<Stage>("FORM");
  const [requestData, setRequestData] = useState<PlanTripRequest | null>(null);
  const [responseData, setResponseData] = useState<PlanTripResponse | null>(null);
  const [error, setError] = useState<{ message: string; status?: string | number } | null>(null);
  const [apiCallCompleted, setApiCallCompleted] = useState(false);
  const [loadingScreenCompleted, setLoadingScreenCompleted] = useState(false);

  // If initialSearchData is passed, run search immediately on open
  useEffect(() => {
    if (isOpen) {
      if (initialSearchData) {
        handleTriggerSearch(initialSearchData);
      } else {
        setStage("FORM");
        setRequestData(null);
        setResponseData(null);
        setError(null);
        setApiCallCompleted(false);
        setLoadingScreenCompleted(false);
      }
    }
  }, [isOpen, initialSearchData]);

  const handleTriggerSearch = async (searchParams: any) => {
    // Map standard B2C search widget details into frontend API request format
    const payload: PlanTripRequest = {
      customer: {
        name: searchParams.customerName || "Rahul Sharma",
        passport: searchParams.passportNumber || "K123456",
        email: searchParams.email || "rahul@gmail.com",
        phone: searchParams.phone || "9876543210",
        meal_preference: searchParams.mealPreference || "Vegetarian",
      },
      trip: {
        source: searchParams.from.replace(/\s\([A-Z]{3}\)/g, ""),
        destination: searchParams.to.replace(/\s\([A-Z]{3}\)/g, ""),
        departure_date: searchParams.departureDate,
        return_date: searchParams.returnDate,
        budget: searchParams.budget || 300000,
        travellers: searchParams.passengers,
        travel_style: searchParams.cabinClass === "Economy" ? "Leisure" : "Luxury",
        purpose: "Vacation",
      },
    };

    setRequestData(payload);
    setStage("LOADING");
    setError(null);
    setApiCallCompleted(false);
    setLoadingScreenCompleted(false);

    try {
      const response = await planTrip(payload);
      setResponseData(response);
      setApiCallCompleted(true);
    } catch (err: any) {
      setError({
        message: err.message || "An unexpected error occurred",
        status: err.status,
      });
      setStage("ERROR");
    }
  };

  useEffect(() => {
    if (stage === "LOADING" && apiCallCompleted && loadingScreenCompleted) {
      setStage("PRIVACY");
    }
  }, [stage, apiCallCompleted, loadingScreenCompleted]);

  const handleLoadingFinished = () => {
    setLoadingScreenCompleted(true);
  };

  const handleRetry = () => {
    if (initialSearchData) {
      handleTriggerSearch(initialSearchData);
    } else {
      setStage("FORM");
    }
  };

  const handleNextToResults = () => {
    setStage("RESULTS");
  };

  const handleReset = () => {
    setStage("FORM");
    setRequestData(null);
    setResponseData(null);
    setError(null);
    setApiCallCompleted(false);
    setLoadingScreenCompleted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={stage !== "LOADING"}
        className="bg-[#fdf9f0] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-none text-[#1a1a1a]"
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="font-black text-2xl uppercase tracking-tight text-[#1a1a1a]">
            {stage === "FORM" && "Plan Your Secure Journey"}
            {stage === "LOADING" && "Orchestrating Request"}
            {stage === "PRIVACY" && "PII Protection Check"}
            {stage === "RESULTS" && "Your Secure Travel Plan"}
            {stage === "ERROR" && "Execution Failed"}
          </DialogTitle>
        </DialogHeader>

        {stage === "FORM" && (
          <BookingWidget onSearch={handleTriggerSearch} isLoading={false} />
        )}

        {stage === "LOADING" && (
          <LoadingScreen onLoadingComplete={handleLoadingFinished} />
        )}

        {stage === "PRIVACY" && requestData && responseData && (
          <PrivacyScreen
            customer={requestData.customer}
            persona={responseData.persona}
            onNext={handleNextToResults}
          />
        )}

        {stage === "RESULTS" && responseData && (
          <RecommendationScreen data={responseData} onReset={handleReset} />
        )}

        {stage === "ERROR" && error && (
          <ErrorState error={error} onRetry={handleRetry} />
        )}
      </DialogContent>
    </Dialog>
  )
}
