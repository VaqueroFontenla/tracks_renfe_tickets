const configureBrowser = require("./configureBrowser");
const findMinPrices = require("./findMinPrices");
const fs = require("fs");

async function checkPrice(page, journey, month) {
  await page.waitForTimeout(1000);
  const origin = journey === "departure" ? "MADRID (TODAS)" : "VIGO (TODAS)";
  const destination =
    journey === "departure" ? "VIGO (TODAS)" : "MADRID (TODAS)";

  //Elegir origen y destino
  await page.waitForSelector("#origin  > div > div > input");
  await page.focus("#origin > div > div > input");
  await page.keyboard.type(origin);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.focus("#destination > div > div > input");
  await page.keyboard.type(destination);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  // Elegir trayecto ida
  await page.click("#tripType");
  await page.waitForSelector("#tripType > div > div", {
    visible: true,
  });
  await page.click("#tripType > div > div > ul > li:nth-child(1) > button");
  await page.click("#tripType");

  //Seleccionar fecha de mañana
  await page.click(
    "#contentPage > div > div > div:nth-child(1) > div > div > div > div > div > div > rf-header > rf-header-top > div.rf-header__wrap-search.grid > rf-search > div > div.rf-search__filters.rf-search__filters--open > div.rf-search__wrapper-calendar > div.rf-search__calendar"
  );

  await page.click(
    "#contentPage > div > div > div:nth-child(1) > div > div > div > div > div > div > rf-header > rf-header-top > div.rf-header__wrap-search.grid > rf-search > div > div.rf-search__filters.rf-search__filters--open > div.rf-search__wrapper-button > div.rf-search__button > form > rf-button"
  );
  await page.waitForNavigation();

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
        ? tickets.forEach((ticket) => {
            let ticketJSON = {};
            try {
              ticketJSON.date = document.querySelector(
                "#fechaSeleccionada0"
              ).value;
              ticketJSON.departure = ticket
                .querySelector(
                  ".trayectoRow > td:nth-child(2) > div:nth-child(1)"
                )
                .innerText.trim();
              ticketJSON.duration = ticket
                .querySelector(
                  ".trayectoRow > td:nth-child(2) > div:nth-child(2)"
                )
                .innerText.trim();
              ticketJSON.price = ticket.querySelector(
                ".trayectoRow > td:nth-child(5) > button > div:nth-child(2)"
              ).innerText;
            } catch (exception) {
              console.log(exception);
            }
            ticketsData.push(ticketJSON);
          })
        : ticketsData.push({
            date: document.querySelector("#fechaSeleccionada0").value,
            noTickets:
              "El trayecto consultado no se encuentra disponible para la venta",
          });
      return ticketsData;
    }, ticketsData);

    counter++;
  }

  const minPricesTickets = findMinPrices.findMinPrices(data);
  const monthForCalendar = (tickets) => {
    const months = tickets.map((data) =>
      new Date(new Date(data.date).toLocaleDateString("es-ES")).getMonth()
    );

    return [...new Set(months)][0];
  };

  fs.writeFile(
    "src/data/tickets.json",
    JSON.stringify({
      tickets: data,
      minPricesTickets,
      month: monthForCalendar(tickets),
    }),
    (err) => {
      if (err) console.log(err);
      console.log("Tickets: Successfully Written to File.");
    }
  );
}

async function startTracking(journey, month) {
  const { page, browser } = await configureBrowser.configureBrowser();
  const tickets = await checkPrice(page, journey, month);
  await browser.close();
  return tickets;
}

module.exports = { startTracking };
