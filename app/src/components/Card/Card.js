import React from "react";
import dayjs from "dayjs";
import "./Card.css";
import es from 'dayjs/locale/es'

export const Card = ({ date, duration, departure, price }) => {
    dayjs.locale("es");
  console.log(dayjs(date, "YYYY-MM-DD", "es", true));
  return (
    <div className="card">
      <span className="price">{price}</span>
      <span>{duration}</span>
      <span>{departure}</span>
      <span className="date">{date}</span>
    </div>
  );
};
