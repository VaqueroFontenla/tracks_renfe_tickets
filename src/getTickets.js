const getTicket = require("./getTicket");

const getTickets = async (month, page) => {
  let ticketsData;
  let data;
  let counter = 1;
  let firstDay = new Date().getDate();
  let lastDayOfMonth = new Date(
    new Date().getFullYear(),
    month + 1,
    0
  ).getDate();

  for (let i = 1; i < lastDayOfMonth - firstDay; i++) {
    let firstDayOfTheMonth = 0;
    let selectDay = (
      (month === new Date().getMonth()
        ? new Date().getDate()
        : firstDayOfTheMonth) + counter
    )
      .toString()
      .padStart(2, 0);
    let selectMonth = (parseInt(month) + 1).toString().padStart(2, 0);
    let selectYear = new Date().getFullYear();
    let selectedDate = `${selectDay}/${selectMonth}/${selectYear}`;

    await page.waitForSelector("#fechaSeleccionada0");
    await page.focus("#fechaSeleccionada0");
    await page.keyboard.type(selectedDate, {
      delay: 200,
    });
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    ticketsData === undefined ? (ticketsData = []) : (ticketsData = [...data]);
    await page.waitForSelector(".trayectoRow, #tab-mensaje_contenido");

    data = await page.evaluate((ticketsData) => {
      let tickets = [...document.querySelectorAll(".trayectoRow")];

      tickets.length > 0
        ? tickets.forEach((ticket) => getTicket.getTicket(ticket))
        : ticketsData.push({
            date: document.querySelector("#fechaSeleccionada0").value,
            noTickets:
              "El trayecto consultado no se encuentra disponible para la venta",
          });
      return ticketsData;
    }, ticketsData);

    counter++;
  }
};

module.exports = { getTickets };
