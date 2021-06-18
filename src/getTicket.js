const getTicket = (ticket) => {
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

module.exports = { getTicket };
