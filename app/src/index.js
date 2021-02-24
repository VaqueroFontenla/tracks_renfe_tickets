import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useTickets } from "./hooks/useTickets";

const App = () => {
  const { tickets, loading } = useTickets();

  return <h1>Hola mundo</h1>;
};

ReactDOM.render(<App />, document.getElementById("root"));
