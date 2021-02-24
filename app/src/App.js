import React from "react";
import "./App.css";
import { ListOfTickets } from "./components/ListOfTickets/ListOfTickets";
import { useTickets } from "./hooks/useTickets";

export const App = () => {
  const { tickets, loading } = useTickets();
  console.log(tickets);
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
