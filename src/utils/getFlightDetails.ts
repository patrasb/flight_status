import type { Flight } from "@/types/Flight.type";

const STATUSES: Flight["status"][] = ["On Time", "Delayed", "Cancelled"];

function getFlightStatus(flightNumber: string): Flight["status"] {
  return STATUSES[parseInt(flightNumber, 10) % 3];
}

function getFlightGate(flightNumber: string): string {
  return `Gate ${(parseInt(flightNumber, 10) % 20) + 1}`;
}

function getDepartureTime(departureTime: string): string {
  if (!departureTime) return "N/A";
  return new Date(departureTime).toLocaleTimeString();
}

function getFlightDuration(duration: {
  hours?: number;
  minutes?: number;
}): string {
  if (!duration.hours && !duration.minutes) return "N/A";
  return `${duration.hours ? duration.hours + "h" : ""} ${duration.minutes ? duration.minutes + "m" : ""}`.trim();
}

export { getFlightStatus, getFlightGate, getDepartureTime, getFlightDuration };
