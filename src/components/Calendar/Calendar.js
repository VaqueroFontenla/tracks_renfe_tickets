import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./Calendar.css";

export const Calendar = ({ minPricesTickets, monthIndex, actualYear }) => {
  const locale = "es";
  const weekDaysNames = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const [dataCalendar, setDataCalendar] = useState();
  const intlForMonths = new Intl.DateTimeFormat(locale, { month: "long" });

  const calendar = () => {
    const monthName = intlForMonths.format(new Date(actualYear, monthIndex));
    const nextMonthIndex = (monthIndex + 1) % 12;
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate();
    const startsOn = new Date(actualYear, monthIndex, 1).getDay();
    const monthDays = [...Array(daysOfMonth).keys()].map((day) => {
      return { day: day +1 };
    });
    const calendar = _.unionBy(minPricesTickets, monthDays, "day").sort(
      function (a, b) {
        return parseFloat(a.day) - parseFloat(b.day);
      }
    );
    console.log(calendar);
    return {
      calendar,
      monthName,
      startsOn,
    };
  };

  useEffect(() => {
    setDataCalendar(calendar());
  }, [minPricesTickets]);

  return (
    <>
      {dataCalendar && (
        <div className="calendar">
          <div className="calendar-header">
            {dataCalendar.monthName} - {actualYear}
          </div>
          <ol className="calendar-body">
            {weekDaysNames.map((day, index) => (
              <li key={index} className="day-of-week">
                {day}
              </li>
            ))}

            {dataCalendar.calendar.map((day, index) =>
              index === 0 ? (
                <li
                  key={index}
                  className="day"
                  style={{ gridColumnStart: dataCalendar.startsOn }}
                >
                  <span className="day-of-month">{day.day}</span>
                  <span className="price-of-day">{day.minPrice}</span>
                </li>
              ) : (
                <li key={index} className="day">
                  <span className="day-of-month">{day.day}</span>
                  <span className="price-of-day">{day.minPrice}</span>
                </li>
              )
            )}
          </ol>
        </div>
      )}
    </>
  );
};
