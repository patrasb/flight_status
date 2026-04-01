import type { Flight } from "../../types/Flight.type";

function FlightItem({ flight }: { flight: Flight }) {
  return (
    <div>
      <h2>{flight.title}</h2>
      <p>{flight.body}</p>
    </div>
  );
}

export default FlightItem;
