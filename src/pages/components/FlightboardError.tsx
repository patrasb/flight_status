function FlightboardError({ message }: { message: string }) {
  return (
    <>
      <p className="text-destructive text-sm">
        Failed to load flights, you are viewing the last known data: {message}
      </p>
    </>
  );
}

export default FlightboardError;
