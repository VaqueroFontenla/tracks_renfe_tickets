const puppeteer = require("puppeteer");

const url = "https://www.renfe.com/es/es";

async function configureBrowser() {
  const browser = await puppeteer.launch({ headless: false }); //Crear el navegar
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage(); // Instancia de la paǵina
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url),
    {
      waitUntil: "networkidle0",
      timeout: 3000,
    };
  return page;
}

async function checkPrice(page) {
  await page.waitForTimeout(3000);
  await page.focus("#origin > div > div > input");
  await page.keyboard.type("VIGO (TODAS", { delay: 200 });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.focus("#destination > div > div > input");
  await page.keyboard.type("MADRID (TODAS)", { delay: 200 });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.click(
    "#contentPage > div > div > div:nth-child(1) > div > div > div > div > div > div > rf-header > rf-header-top > div.rf-header__wrap-search.grid > rf-search > div > div.rf-search__filters.rf-search__filters--open > div.rf-search__wrapper-button > div.rf-search__button > form > rf-button > div > button > div.mdc-button__ripple"
  );
}

async function startTracking() {
  const page = await configureBrowser();

  await checkPrice(page);
}

startTracking();
