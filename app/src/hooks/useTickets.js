import { useEffect, useState, useCallback } from "react";
import { getTickets } from "../services/getTickets";

export const useTickets = () => {
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const tickets = await getTickets();
      setTickets(tickets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
  return { tickets, loading };
};
