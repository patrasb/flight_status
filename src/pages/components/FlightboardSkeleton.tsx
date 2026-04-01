import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function FlightboardSkeleton() {
  return (
    <Card className="w-9/12 mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold">Flight board</h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={`skeleton-${index}-${Math.random()}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-6 gap-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default FlightboardSkeleton;
