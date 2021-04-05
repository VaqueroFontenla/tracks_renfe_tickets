import React from "react";
import "./Card.css";

export const Card = ({ date, duration, departure, price }) => {
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
      <span className="price">{price}</span>
      <span>Duración: {duration}</span>
      <span>Hora salida: {departure}</span>
    </div>
  );
};
