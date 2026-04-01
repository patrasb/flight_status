import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Flight } from "../../types/Flight.type";

const statusColor: Record<Flight["status"], string> = {
  "On Time": "text-green-600",
  Delayed: "text-yellow-600",
  Cancelled: "text-red-600",
};

function FlightItem({ flight }: { flight: Flight }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          FL-{flight.flightNumber}
        </CardTitle>
        <span className={`text-sm font-medium ${statusColor[flight.status]}`}>
          {flight.status}
        </span>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        <p>
          <span className="text-muted-foreground">From:</span> {flight.origin}
        </p>
        <p>
          <span className="text-muted-foreground">To:</span>{" "}
          {flight.destination}
        </p>
        <p>
          <span className="text-muted-foreground">Departure:</span>{" "}
          {flight.departureTime}
        </p>
        <p>
          <span className="text-muted-foreground">Duration:</span>{" "}
          {flight.duration}
        </p>
        <p>
          <span className="text-muted-foreground">Gate:</span> {flight.gate}
        </p>
      </CardContent>
    </Card>
  );
}

export default FlightItem;
