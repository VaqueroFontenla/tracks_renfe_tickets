const url = "https://www.renfe.com/es/es";
const puppeteer = require("puppeteer");

const configureBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.goto(url),
    {
      waitUntil: "networkidle0",
      timeout: 3000,
    };
  return { page, browser };
};

module.exports = { configureBrowser };
