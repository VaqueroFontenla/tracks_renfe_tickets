const configureBrowser = require("./configureBrowser");
const checkPrice = require("./checkPrice");

const startTracking = async (journey, month) => {
  const { page, browser } = await configureBrowser.configureBrowser();
  const tickets = await checkPrice.checkPrice(page, journey, month);
  await browser.close();
  return tickets;
};

module.exports = { startTracking };
