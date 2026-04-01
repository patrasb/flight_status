import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGetFlights from "../hooks/useGetFlights";
import FlightItem from "./components/FlightItem";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

function Flightboard() {
  const { flights } = useGetFlights();
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: flights.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
    gap: 16,
  });
  return (
    <Card className="w-9/12 mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold">Flight board</h1>
      </CardHeader>
      <CardContent>
        <div ref={parentRef} className="h-[80vh] overflow-auto pt-4">
          <div
            className="relative w-full"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                className="absolute left-0 w-full px-4"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <FlightItem flight={flights[virtualRow.index]} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Flightboard;
