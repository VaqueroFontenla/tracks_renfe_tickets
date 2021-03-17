import { useEffect, useState, useCallback } from "react";
import { getTickets } from "../services/getTickets";

export const useTickets = () => {
  const [tickets, setTickets] = useState();
  const [minPricesTickets, setMinPricesTickets] = useState();
  const [loading, setLoading] = useState(false);

  const fetchTickets = useCallback(async (queryParams) => {
    try {
      setLoading(true);
      const { data, minPricesTickets } = await getTickets(queryParams)
      setTickets(data);
      setMinPricesTickets(minPricesTickets)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { tickets, loading, fetchTickets, minPricesTickets };
};
