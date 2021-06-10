import { useState, useCallback, useEffect } from "react";
import { getTickets } from "../services/getTickets";
import { updateTickets } from "../services/updateTickets";

export const useTickets = (queryParams) => {
  const [tickets, setTickets] = useState();
  const [minPricesTickets, setMinPricesTickets] = useState();
  const [loading, setLoading] = useState(false);

  const fetchTickets = useCallback(async (queryParams) => {
    try {
      setLoading(true);
      queryParams && (await updateTickets(queryParams));
      const { tickets, minPricesTickets } = await getTickets();
      setTickets(tickets);
      setMinPricesTickets(minPricesTickets);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => fetchTickets(queryParams), [fetchTickets, queryParams]);

  return { tickets, loading, minPricesTickets };
};
