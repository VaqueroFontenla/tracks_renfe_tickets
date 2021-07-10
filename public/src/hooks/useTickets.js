import { useState, useCallback, useEffect } from "react";
import { getTickets } from "../services/getTickets";
import { updateTickets } from "../services/updateTickets";

export const useTickets = (queryParams) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    tickets: [],
    minPricesTickets: [],
    month: new Date().getMonth(),
    journey: "",
  });

  const fetchTickets = useCallback(async (queryParams) => {
    try {
      setLoading(true);
      const { tickets, minPricesTickets, month, journey } = queryParams
        ? await updateTickets(queryParams)
        : await getTickets();
      setData({ tickets, minPricesTickets, month, journey });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => fetchTickets(queryParams), [fetchTickets, queryParams]);

  return { data, loading };
};
