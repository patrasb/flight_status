import { useMemo } from "react";
import type { Flight } from "@/types/Flight.type";

function useFilteredFlights(
  flights: Flight[],
  status: Flight["status"] | "all",
): Flight[] {
  return useMemo(
    () =>
      status === "all"
        ? flights
        : flights.filter((flight) => flight.status === status),
    [flights, status],
  );
}

export default useFilteredFlights;
