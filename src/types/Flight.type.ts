type Flight = {
  flightNumber: string;
  origin: string;
  destination: string;
  duration: string;
  status: "On Time" | "Delayed" | "Cancelled";
  gate: string;
  departureTime: string;
};

export type { Flight };
