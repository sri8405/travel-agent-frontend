"use client"

import React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorStateProps {
  error: {
    message: string;
    status?: string | number;
  };
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  let title = "An Error Occurred";
  let description = error.message;

  if (error.status === "NETWORK_ERROR") {
    title = "Network Connection Issue";
    description = "Could not reach the AI Gateway server. Make sure the backend is running at http://localhost:8000.";
  } else if (error.status === 400) {
    title = "Invalid Request Parameter";
    description = "The details provided did not meet validation checks. Please correct the fields and try again.";
  } else if (error.status === 504 || error.status === "TIMEOUT") {
    title = "Request Timeout";
    description = "The AI Gateway took too long to respond. The LLM processing is currently under heavy load.";
  } else if (typeof error.status === "number" && error.status >= 500) {
    title = "AI Gateway Server Error";
    description = "The booking or privacy service had an internal server error. Please try again.";
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] text-center max-w-md mx-auto my-6">
      <div className="bg-[#ff4d00] text-white p-3 border-2 border-[#1a1a1a] mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h3 className="font-black text-xl uppercase tracking-tight text-[#1a1a1a] mb-2">{title}</h3>
      <p className="text-sm text-gray-700 font-medium mb-6 leading-relaxed">{description}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-[#bff000] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] px-5 py-2 font-extrabold uppercase text-xs tracking-wider transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a1a1a]"
      >
        <RefreshCw className="h-4 w-4" />
        Retry Form Submission
      </button>
    </div>
  )
}
