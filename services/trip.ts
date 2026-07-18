import { apiRequest } from "./api";
import { PlanTripRequest, PlanTripResponse } from "../types";

export async function planTrip(request: PlanTripRequest): Promise<PlanTripResponse> {
  return apiRequest<PlanTripResponse>("/plan-trip", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
