import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useGetFlights from "../hooks/useGetFlights";
import useFilteredFlights from "../hooks/useFilteredFlights";
import { groupFlights, type GroupKey } from "../utils/groupFlights";
import FlightItem from "./components/FlightItem";
import FlightboardSkeleton from "./components/FlightboardSkeleton";
import type { Flight } from "@/types/Flight.type";
import FlightboardError from "./components/FlightboardError";
import { RefreshCcwDotIcon } from "lucide-react";

const STATUS_OPTIONS = ["all", "On Time", "Delayed", "Cancelled"] as const;
type StatusFilter = (typeof STATUS_OPTIONS)[number];

type VirtualRow =
  | { kind: "header"; label: string }
  | { kind: "flight"; flight: Flight };

function Flightboard() {
  const { flights, isLoading, isFetching, error, refetch } = useGetFlights();
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [groupKey] = useState<GroupKey>("gate");
  const parentRef = useRef<HTMLDivElement>(null);

  const filteredFlights = useFilteredFlights(flights, activeStatus);

  const rows: VirtualRow[] = useMemo(() => {
    const grouped = groupFlights(filteredFlights, groupKey);
    const result: VirtualRow[] = [];
    const sortedGrouped = Object.entries(grouped).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    for (const [label, groupFlightList] of sortedGrouped) {
      result.push({ kind: "header", label });
      for (const flight of groupFlightList) {
        result.push({ kind: "flight", flight });
      }
    }
    return result;
  }, [filteredFlights, groupKey]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (rows[index].kind === "header" ? 48 : 150),
    overscan: 5,
    gap: 8,
  });

  if (isLoading) {
    return <FlightboardSkeleton />;
  }

  if (error) {
    return <FlightboardError message={error.message} refetch={refetch} />;
  }

  return (
    <Card className="w-9/12 mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Flight board</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            <RefreshCcwDotIcon className="w-4 h-4" />
          </Button>
          {isFetching && (
            <span className="text-xs text-muted-foreground animate-pulse">
              Refreshing…
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 pb-4">
          {STATUS_OPTIONS.map((status) => (
            <Button
              key={status}
              variant={activeStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveStatus(status)}
            >
              {status === "all" ? "All" : status}
            </Button>
          ))}
        </div>

        <div ref={parentRef} className="h-[75vh] overflow-auto">
          <div
            className="relative w-full"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualRow.index}
                  className="absolute left-0 w-full px-4"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.kind === "header" ? (
                    <h2 className="text-lg font-semibold text-muted-foreground pt-2 pb-1">
                      {row.label}
                    </h2>
                  ) : (
                    <FlightItem flight={row.flight} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Flightboard;
