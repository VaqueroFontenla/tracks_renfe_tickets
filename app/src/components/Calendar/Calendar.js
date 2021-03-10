import React, { useEffect, useState } from "react";
import "./Calendar.css";

const findMinPrice = (tickets) => {
  var minPrices = _(tickets)
    .groupBy("date")
    .map((tickets, date) => {
      const minPrice = _.min(tickets.map((tickets) => tickets.price));
      const month = new Date(date.split("/").reverse()).getMonth();
      const day = new Date(date.split("/").reverse()).getDate();
      const year = new Date(date.split("/").reverse()).getFullYear();
      return { year, month, day, minPrice };
    })
    .value();

  const months = [
    ...new Set(Array.from(new Set(minPrices.map((item) => item.month)))),
  ];
  const years = [
    ...new Set(Array.from(new Set(minPrices.map((item) => item.year)))),
  ];

  return minPrices;
};

export const Calendar = ({ tickets }) => {
  const locale = "es";
  const actualYear = 2021;
  const monthIndex = 1;
  const [dataCalendar, setDataCalendar] = useState({
    daysOfMonth: undefined,
    monthName: undefined,
    startsOn: undefined,
  });
  const intlForMonths = new Intl.DateTimeFormat(locale, { month: "long" });
  const intlForWeeks = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const weekDays = [...Array(7).keys()].map((dayIndex) =>
    intlForWeeks.format(new Date(actualYear, monthIndex, dayIndex + 1))
  );

  const calendar = (monthIndex) => {
    const monthName = intlForMonths.format(new Date(actualYear, monthIndex));
    const nextMonthIndex = (monthIndex + 1) % 12;
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate();
    const startsOn = new Date(actualYear, monthIndex, 1).getDay();
    console.log({
      daysOfMonth,
      monthName,
      startsOn,
    });
    return {
      daysOfMonth,
      monthName,
      startsOn,
    };
  };

  useEffect(() => setDataCalendar(calendar(monthIndex)), []);

  return (
    <>
      {dataCalendar && (
        <div className="calendar">
          <div className="calendar-header">
            {dataCalendar.monthName} - {actualYear}
          </div>
          <ol className="calendar-body">
            {weekDays.map((day, index) => (
              <li key={index} className="day-of-week">
                {day}
              </li>
            ))}

            {[...Array(dataCalendar.daysOfMonth).keys()].map((day, index) =>
              index === 0 ? (
                <li
                  key={index}
                  className="day"
                  style={{ gridColumnStart: dataCalendar.startsOn }}
                >
                  <span>{day + 1}</span>
                </li>
              ) : (
                <li key={index} className="day">
                  <span>{day + 1}</span>
                </li>
              )
            )}
          </ol>
        </div>
      )}
    </>
  );
};
