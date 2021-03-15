import React from "react";
import { Card } from "../Card/Card";
import "./ListOfTickets.css";

export const ListOfTickets = ({ tickets }) => {

  return (
    <div className="list">
      {tickets.map(({ duration, price, departure, date }, index) => (
        <Card
          key={index}
          date={date}
          price={price}
          departure={departure}
          duration={duration}
        />
      ))}
    </div>
  );
};
