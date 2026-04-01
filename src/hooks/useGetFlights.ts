import { useEffect, useMemo, useRef, useState } from "react";
import type { Flight } from "@/types/Flight.type";
import {
  getFlightDuration,
  getFlightStatus,
  getFlightGate,
  getDepartureTime,
  getFlightTerminal,
} from "@/utils/getFlightDetails";

const API_URL = "http://localhost:4000/flights?date=2026-04-01";
const POLL_INTERVAL_MS = 30_000;

interface RawFlight {
  flightNumber?: string;
  origin?: { city?: string };
  destination?: { city?: string };
  duration?: { hours?: number; minutes?: number };
  departureTime?: string;
}

function useGetFlights() {
  const [rawFlights, setRawFlights] = useState<RawFlight[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isLoading = isFetching && rawFlights.length === 0;

  const flights: Flight[] = useMemo(
    () =>
      rawFlights.map((item) => ({
        flightNumber: item?.flightNumber ?? "",
        origin: item?.origin?.city ?? "",
        destination: item?.destination?.city ?? "",
        duration: getFlightDuration(item?.duration ?? {}),
        status: getFlightStatus(item?.flightNumber ?? ""),
        gate: getFlightGate(item?.flightNumber ?? ""),
        departureTime: getDepartureTime(item?.departureTime ?? ""),
        terminal: getFlightTerminal(item?.flightNumber ?? ""),
      })),
    [rawFlights],
  );

  useEffect(() => {
    fetchFlights();
    const intervalId = setInterval(fetchFlights, POLL_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      abortControllerRef.current?.abort();
    };
  }, []);

  async function fetchFlights() {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setIsFetching(true);
      const response = await fetch(API_URL, { signal: controller.signal });
      const data = await response.json();
      setRawFlights(data);
      setError(null);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError(err as Error);
      }
    } finally {
      setIsFetching(false);
    }
  }

  return { flights, isLoading, isFetching, error, refetch: fetchFlights };
}

export default useGetFlights;
