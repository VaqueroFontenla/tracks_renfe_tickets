const puppeteer = require("puppeteer");

const url = "https://www.renfe.com/es/es";

// Funcion que crea un número aleatorio
const MIN_WAIT = 1000;
const MAX_WAIT = 000;
const randomWait = () => {
  return Math.floor(Math.random() * (MAX_WAIT - MIN_WAIT + 1) + MIN_WAIT);
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

async function checkPrice(page) {
  await page.waitForTimeout(1000);
  await page.focus("#origin > div > div > input");
  await page.keyboard.type("VIGO (TODAS", { delay: 200 });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.focus("#destination > div > div > input");
  await page.keyboard.type("MADRID (TODAS)", { delay: 200 });
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

  // Fecha de mañana
  let today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0
  ).getTime();
  let MILLISECoNDS_DAY = 24 * 60 * 60 * 1000;
  let tomorrow = today + MILLISECoNDS_DAY;

  await page.waitForSelector("#datepicker > section");
  await page.click(`div[data-time="${tomorrow}"]`);
  await page.click(
    "#contentPage > div > div > div:nth-child(1) > div > div > div > div > div > div > rf-header > rf-header-top > div.rf-header__wrap-search.grid > rf-search > div > div.rf-search__filters.rf-search__filters--open > div.rf-search__wrapper-calendar > div.rf-search__calendar"
  );
  await page.click(
    "#datepicker > section > div.lightpick__footer-buttons > button.lightpick__apply-action-sub"
  );
  await page.click(
    "#contentPage > div > div > div:nth-child(1) > div > div > div > div > div > div > rf-header > rf-header-top > div.rf-header__wrap-search.grid > rf-search > div > div.rf-search__filters.rf-search__filters--open > div.rf-search__wrapper-button > div.rf-search__button > form > rf-button"
  );

  await page.waitForNavigation();

  let ticketsData;
  let data;
  let counter = 2;
  for (let i = 0; i < 5; i++) {
    let today = (new Date().getDate() + counter).toString().padStart(2, 0);
    let month = (new Date().getMonth() + 1).toString().padStart(2, 0);
    let year = new Date().getFullYear();

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
        console.log(ticketsData);
        ticketsData.push(ticketJSON);
      });
      return ticketsData;
    }, ticketsData);
    await page.waitForTimeout(randomWait());
    await page.focus("#fechaSeleccionada0");
    await page.keyboard.type(`${today}/${month}/${year}`, {
      delay: 200,
    });
    await page.keyboard.press("Enter");
    counter++;
  }
  console.log(data);
}

async function startTracking() {
  const page = await configureBrowser();

  await checkPrice(page);
}

startTracking();
