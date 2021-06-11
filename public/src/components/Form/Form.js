import React, { useState } from "react";
import "./Form.css";

export const Form = ({ onSubmit }) => {
  const locale = "es-ES";
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const months = [...Array(12).keys()];
  const intlForMonths = new Intl.DateTimeFormat(locale, { month: "long" });
  const currentYearMonths = months.map((monthKey) => {
    return {
      key: monthKey,
      label: intlForMonths.format(new Date(currentYear, monthKey)),
    };
  });

  const [dataForm, setDataForm] = useState({
    month: currentMonth,
    journey: "departure",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(dataForm);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <legend>Elige un trayecto:</legend>
        <label className="radio-wrapper">
          <input
            type="radio"
            name="journey"
            value="departue"
            name={dataForm.journey}
            defaultChecked
            onClick={(evt) =>
              setDataForm({ ...dataForm, journey: evt.target.value })
            }
          />
          Madrid - Vigo<i></i>
        </label>
        <label className="radio-wrapper">
          <input
            type="radio"
            name="journey"
            value="return"
            name={dataForm.journey}
            onClick={(evt) =>
              setDataForm({ ...dataForm, journey: evt.target.value })
            }
          />
          Vigo - Madrid<i></i>
        </label>
      </div>
      <div>
        <legend>Elige un mes:</legend>
        <div
          className="select-wrapper"
          value={dataForm.month}
          onChange={(evt) =>
            setDataForm({ ...dataForm, month: evt.target.value })
          }
        >
          <select>
            {currentYearMonths.map(
              (month) =>
                month.key >= currentMonth && (
                  <option value={month.key}>
                    {month.label} {currentYear}
                  </option>
                )
            )}
          </select>
          <i></i>
        </div>
      </div>
      <input className="submit" type="submit" value="Buscar" />
    </form>
  );
};
