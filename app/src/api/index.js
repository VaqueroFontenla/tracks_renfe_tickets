const puppeteer = require("puppeteer");
const fs = require("fs");
const _ = require("lodash");
const url = "https://www.renfe.com/es/es";

const findMinPrice = (tickets) => {
  var minPrices = _(tickets)
    .groupBy("date")
    .map((tickets, date) => {
      const minPrice = _.min(tickets.map((tickets) => tickets.price));
      const day = new Date(date.split("/").reverse()).getDate();
      return { day, minPrice };
    })
    .value();
  return minPrices;
};

async function configureBrowser() {
  const browser = await puppeteer.launch({ headless: false }); //Crear el navegar
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage(); // Instancia de la paǵina
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url),
    {
      waitUntil: "networkidle0",
      timeout: 3000,
    };
  return page;
}

async function checkPrice(page, journey, month) {
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

  // Elegir trayecto de ida
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
  for (let i = 0; i < 5; i++) {
    let selectDay = (new Date().getDate() + counter).toString().padStart(2, 0);
    let selectMonth = (parseInt(month) + 1).toString().padStart(2, 0);
    let selectYear = new Date().getFullYear();

    await page.waitForSelector("#fechaSeleccionada0");
    await page.focus("#fechaSeleccionada0");
    await page.keyboard.type(`${selectDay}/${selectMonth}/${selectYear}`, {
      delay: 200,
    });
    await page.keyboard.press("Enter");

    ticketsData === undefined ? (ticketsData = []) : (ticketsData = [...data]);
    await page.waitForSelector(".trayectoRow");
    data = await page.evaluate((ticketsData) => {
      let tickets = [...document.querySelectorAll(".trayectoRow")];

      tickets.forEach((ticket) => {
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
      });
      return ticketsData;
    }, ticketsData);

    counter++;
  }

  const minPricesTickets = findMinPrice(data);

  return { data, minPricesTickets };
}

async function startTracking(journey, month) {
  const page = await configureBrowser();
  const tickets = await checkPrice(page, journey, month);
  return tickets;
}

module.exports = { startTracking: startTracking };
