import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function FlightboardError({
  message,
  refetch,
}: {
  message: string;
  refetch: () => void;
}) {
  return (
    <Card className="w-9/12 mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold">Flight board</h1>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-12">
        <p className="text-destructive text-sm">
          Failed to load flights: {message}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}

export default FlightboardError;
