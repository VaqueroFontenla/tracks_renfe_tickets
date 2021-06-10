import React, { useState, useCallback } from "react";
import _ from "lodash";
import "./App.css";
import { ListOfTickets } from "./components/ListOfTickets/ListOfTickets";
import { Calendar } from "./components/Calendar/Calendar";
import { Form } from "./components/Form/Form";
import { Spinner } from "./components/Spinner/Spinner";
import { useTickets } from "./hooks/useTickets";

export const App = () => {
  const [queryParams, setQueryParams] = useState();
  const { tickets, minPricesTickets, loading } = useTickets(queryParams);
  const actualYear = new Date().getFullYear();
  const monthIndex = new Date().getMonth();

  const onSubmit = async (values) => {
    const queryParams = `?journey=${values.journey}&month=${values.month}`;
    setQueryParams(queryParams);
  };

  return (
    <div className="wrapper">
      <div className="header">
        <h1 className="title">
          Tickets{" "}
          <span className="emoji" role="img" aria-label="locomotive">
            🚂
          </span>
        </h1>
        <Form onSubmit={onSubmit} />
      </div>
      {loading && <Spinner />}
      {minPricesTickets && !loading && (
        <Calendar
          minPricesTickets={minPricesTickets}
          actualYear={actualYear}
          monthIndex={monthIndex}
        />
      )}
      {tickets && !loading && <ListOfTickets tickets={tickets} />}
    </div>
  );
};
