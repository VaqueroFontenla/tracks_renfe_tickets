import React from "react";
import _ from "lodash";
import "./App.css";
import { ListOfTickets } from "./components/ListOfTickets/ListOfTickets";
import { useTickets } from "./hooks/useTickets";

export const App = () => {
  const { tickets, loading } = useTickets();

  const findMinPrice = (tickets) => {
    var res = _(tickets)
      .groupBy("date")
      .map((tickets, date) => {
        const minPrice = _.min(tickets.map((tickets) => tickets.price))
        return { date, minPrice };
      })
   
      .value();
    console.log(res);
  };
  findMinPrice(tickets);
  return (
    <>
      {tickets && (
        <div className="wrapper">
          <h1 className="title">Tickets</h1>
          <ListOfTickets tickets={tickets} />
        </div>
      )}
    </>
  );
};
