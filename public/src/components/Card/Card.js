import React from "react";
import "./Card.css";

export const Card = ({ date, duration, departure, price, noTickets }) => {
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const event = new Date(date.split("/").reverse());
    return event.toLocaleString("es", options);
  };

  return (
    <div className="card">
      <span className="date">{formatDate(date)}</span>
      {price && <span className="price">{price || "Tren completo"}</span>}
      {duration && <span>Duración: {duration}</span>}
      {departure && <span>Hora salida: {departure}</span>}
      {noTickets && <span>{noTickets}</span>}
    </div>
  );
};
