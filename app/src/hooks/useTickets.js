import { useEffect, useState, useCallback } from "react";
import { getTickets } from "../services/getTickets";

export const useTickets = () => {
  const [tickets, setTickets] = useState();
  const [loading, setLoading] = useState(false);

  const fetchTickets = useCallback(async (queryParams) => {
    try {
      setLoading(true);
      const tickets = await getTickets(queryParams)
      setTickets(tickets);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { tickets, loading, fetchTickets };
};
