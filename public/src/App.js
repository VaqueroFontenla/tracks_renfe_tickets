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
  const { data, loading } = useTickets(queryParams);
  const actualYear = new Date().getFullYear();

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
      {data && !loading && (
        <span className="last-search">Última búsqueda: </span>
      )}
      {data.minPricesTickets && !loading && (
        <Calendar
          minPricesTickets={data.minPricesTickets}
          actualYear={actualYear}
          monthIndex={data.month}
        />
      )}
      {data.tickets && !loading && <ListOfTickets tickets={data.tickets} />}
    </div>
  );
};
