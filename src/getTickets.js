const getTickets = async (month, page) => {
  let ticketsData;
  let data;
  let counter = 1;
  let firstDayOfTheMonth = 0;
  let firstDay =
    month == new Date().getMonth() ? new Date().getDate() : firstDayOfTheMonth;
  let lastDayOfMonth = new Date(
    new Date().getFullYear(),
    month + 1,
    0
  ).getDate();

  for (let i = 1; i < lastDayOfMonth - firstDay + 1; i++) {
    let selectDay = (firstDay + counter).toString().padStart(2, 0);
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
      const createCustomTicket = (ticket) => {
        let ticketJSON = {};
        try {
          ticketJSON.date = document.querySelector("#fechaSeleccionada0").value;
          ticketJSON.departure = ticket
            .querySelector(".trayectoRow > td:nth-child(2) > div:nth-child(1)")
            .innerText.trim();
          ticketJSON.duration = ticket
            .querySelector(".trayectoRow > td:nth-child(2) > div:nth-child(2)")
            .innerText.trim();
          ticketJSON.price = ticket.querySelector(
            ".trayectoRow > td:nth-child(5) > button > div:nth-child(2)"
          ).innerText;
        } catch (exception) {
          console.log(exception);
        }
        ticketsData.push(ticketJSON);
      };
      let tickets = [...document.querySelectorAll(".trayectoRow")];

      tickets.length > 0
        ? tickets.forEach((ticket) => createCustomTicket(ticket))
        : ticketsData.push({
            date: document.querySelector("#fechaSeleccionada0").value,
            noTickets:
              "El trayecto consultado no se encuentra disponible para la venta",
          });
      return ticketsData;
    }, ticketsData);

    counter++;
  }
  return data;
};

module.exports = { getTickets };
