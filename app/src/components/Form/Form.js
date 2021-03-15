import React, { useState } from "react";
import "./Form.css";

export const Form = ({ onSubmit }) => {
  const locale = "es";
  const intlForMonths = new Intl.DateTimeFormat(locale, { month: "long" });
  const currentMonth = intlForMonths.format(new Date());
  const nextMonth = intlForMonths.format(
    new Date().setMonth(new Date().getMonth() + 1)
  );

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
            <option value={currentMonth}>{currentMonth}</option>
            <option value={nextMonth}>{nextMonth}</option>
          </select>
          <i></i>
        </div>
      </div>
      <input className="submit" type="submit" value="Buscar" />
    </form>
  );
};
