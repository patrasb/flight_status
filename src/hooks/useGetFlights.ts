import { useEffect, useState } from "react";
import type { Flight } from "../types/Flight.type";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
function useGetFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFlights(
        data.map((item: any) => ({
          id: item.id,
          group: item.userId,
          title: item.title,
          body: item.body,
        })),
      );
    };
    fetchFlights();
  }, []);

  return { flights };
}

export default useGetFlights;
