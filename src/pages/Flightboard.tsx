import useGetFlights from "../hooks/useGetFlights";

function Flightboard() {
  const { flights } = useGetFlights();
  console.log(flights);
  return (
    <div>
      <h1 className="text-3xl font-bold">Flight board</h1>
      {flights.map((flight) => (
        <div key={flight.id}>
          <h2>{flight.title}</h2>
          <p>{flight.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Flightboard;
