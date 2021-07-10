const findMinPrices = require("./findMinPrices");
const getTickets = require("./getTickets");

const checkPrice = async (page, journey, month) => {
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

  const data = await getTickets.getTickets(month, page);
  const minPricesTickets = findMinPrices.findMinPrices(data);

  return {
    tickets: data,
    minPricesTickets,
    month,
    journey: `${origin} - ${destination}`,
  };
};

module.exports = { checkPrice };
