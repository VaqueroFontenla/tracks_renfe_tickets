import React from "react";
import _ from "lodash";
import "./App.css";
import { ListOfTickets } from "./components/ListOfTickets/ListOfTickets";
import { Calendar } from "./components/Calendar/Calendar";
import { useTickets } from "./hooks/useTickets";

export const App = () => {
  const { tickets, loading } = useTickets();

  return (
    <>
      {tickets && (
        <div className="wrapper">
          <h1 className="title">Tickets</h1>
          <Calendar tickets={tickets}/>
          <ListOfTickets tickets={tickets} />
        </div>
      )}
    </>
  );
};
