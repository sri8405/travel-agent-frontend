const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! Status: ${response.status}`;
      const error = new Error(errorMessage) as any;
      error.status = response.status;
      throw error;
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      const netError = new Error("Network Error: Could not connect to AI Gateway") as any;
      netError.status = "NETWORK_ERROR";
      throw netError;
    }
    throw error;
  }
}
