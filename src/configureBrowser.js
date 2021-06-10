const url = "https://www.renfe.com/es/es";
const puppeteer = require("puppeteer");

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
  return {page, browser};
}

module.exports = { configureBrowser };
