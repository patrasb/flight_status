import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGetFlights from "../hooks/useGetFlights";
import FlightItem from "./components/FlightItem";
import { ScrollArea } from "@/components/ui/scroll-area";

function Flightboard() {
  const { flights } = useGetFlights();
  return (
    <Card className="w-9/12 mx-auto my-4">
      <CardHeader>
        <h1 className="text-3xl font-bold">Flight board</h1>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[80vh]">
          <div className="flex flex-col gap-4 p-4">
            {flights.map((flight) => (
              <FlightItem
                key={`${flight.flightNumber}-${flight.departureTime}`}
                flight={flight}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default Flightboard;
