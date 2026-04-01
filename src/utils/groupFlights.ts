import type { Flight } from "@/types/Flight.type";

type GroupKey = "terminal" | "gate";

type GroupStrategy = (flight: Flight) => string;

const groupStrategies: Record<GroupKey, GroupStrategy> = {
  terminal: (flight) => flight.terminal,
  gate: (flight) => flight.gate,
};

function groupFlights(
  flights: Flight[],
  key: GroupKey,
): Record<string, Flight[]> {
  const strategy = groupStrategies[key];
  const groups: Record<string, Flight[]> = {};
  for (const flight of flights) {
    const groupName = strategy(flight);
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(flight);
  }
  return groups;
}

export { groupFlights };
export type { GroupKey };
