import React, { useEffect, useState } from "react";
import "./Calendar.css";

export const Calendar = ({
  minPricesTickets,
  monthIndex,
  actualYear,
  journey,
}) => {
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
      return { day: day + 1 };
    });

    let getCoincidentDay = (day) =>
      minPricesTickets.find((minPricesTicket) => minPricesTicket.day == day);

    let calendar = monthDays.map((day) => {
      let coincidentDay = getCoincidentDay(day.day);
      return coincidentDay ? { ...coincidentDay } : { ...day };
    });

    return {
      calendar,
      monthName,
      startsOn: startsOn == 0 ? 7 : startsOn,
    };
  };

  useEffect(() => {
    setDataCalendar(calendar());
  }, [minPricesTickets]);

  return (
    <>
      {dataCalendar && (
        <>
          <span className="last-search">Última búsqueda: {journey} </span>

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
        </>
      )}
    </>
  );
};
