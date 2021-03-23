import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./Calendar.css";

export const Calendar = ({ minPricesTickets, monthIndex, actualYear }) => {
  const locale = "es";
  const [dataCalendar, setDataCalendar] = useState();
  const intlForMonths = new Intl.DateTimeFormat(locale, { month: "long" });
  const intlForWeeks = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const weekDays = [...Array(7).keys()].map((dayIndex) =>
    intlForWeeks.format(new Date(actualYear, monthIndex, dayIndex + 1))
  );

  const calendar = () => {
    const monthName = intlForMonths.format(new Date(actualYear, monthIndex));
    const nextMonthIndex = (monthIndex + 1) % 12;
    const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate();
    const startsOn = new Date(actualYear, monthIndex, 1).getDay();
    const monthDays = [...Array(daysOfMonth).keys()].map((day) => {
      return { day: day };
    });
    const calendar = _.unionBy(minPricesTickets, monthDays, "day").sort(
      function (a, b) {
        return parseFloat(a.day) - parseFloat(b.day);
      }
    );
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
            {weekDays.map((day, index) => (
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
                  <span className="day-of-month">{day.day + 1}</span>
                  <span className="price-of-day">{day.minPrice}</span>
                </li>
              ) : (
                <li key={index} className="day">
                  <span className="day-of-month">{day.day + 1}</span>
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
