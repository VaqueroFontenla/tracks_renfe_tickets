import React from "react";
import _ from "lodash";
import "./App.css";
import { ListOfTickets } from "./components/ListOfTickets/ListOfTickets";
import { Calendar } from "./components/Calendar/Calendar";
import { Form } from "./components/Form/Form";
import { useTickets } from "./hooks/useTickets";

export const App = () => {
  const { tickets, minPricesTickets, loading, fetchTickets } = useTickets();
  const actualYear = 2021;
  const monthIndex = 1;
  const onSubmit = (values) => {
    const queryParams = `?journey=${values.journey}&month=${values.month}`;
    fetchTickets(queryParams);
  };
  return (
    <div className="wrapper">
      <div className="header">
        <h1 className="title">Tickets</h1>
        <Form onSubmit={onSubmit} />
      </div>
      {tickets && (
        <>
          <Calendar
            tickets={minPricesTickets}
            actualYear={actualYear}
            monthIndex={monthIndex}
          />
          <ListOfTickets tickets={tickets} />
        </>
      )}
    </div>
  );
};
