import { useEffect, useState } from "react";
import type { Flight } from "@/types/Flight.type";
import {
  getFlightDuration,
  getFlightStatus,
  getFlightGate,
  getDepartureTime,
} from "@/utils/getFlightDetails";

const API_URL = "http://localhost:4000/flights?date=2026-04-01";

function useGetFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFlights(
        data.map((item: any) => ({
          flightNumber: item?.flightNumber,
          origin: item?.origin?.city,
          destination: item?.destination?.city,
          duration: getFlightDuration(item?.duration),
          status: getFlightStatus(item?.flightNumber),
          gate: getFlightGate(item?.flightNumber),
          departureTime: getDepartureTime(item?.departureTime),
        })),
      );
    };
    fetchFlights();
  }, []);

  return { flights };
}

export default useGetFlights;
