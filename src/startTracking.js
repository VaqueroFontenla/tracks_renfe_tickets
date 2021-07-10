const configureBrowser = require("./configureBrowser");
const checkPrice = require("./checkPrice");

async function startTracking(journey, month) {
  const { page, browser } = await configureBrowser.configureBrowser();
  const tickets = await checkPrice.checkPrice(page, journey, month);
  await browser.close();
  return tickets;
}

module.exports = { startTracking };
