import puppeteer from "puppeteer";

describe("Page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test("Popover should be render when clicked", async () => {
    const text =
      "А здесь размещается какой-то текстовый контент к выбранному элементу";
    await page.goto("http://localhost:9000/");

    await page.waitForSelector(".form-example");

    const button = await page.$(".btn");
    await button.click();
    const popover = await page.waitForSelector(".popover");
    const popoverTextContent = await popover.evaluate((popover) => {
      const popoverBody = popover.querySelector(".popover-body");
      return popoverBody.textContent;
    });
    expect(popoverTextContent).toEqual(text);
  });

  test("Change popover text content", async () => {
    await page.goto("http://localhost:9000/");

    await page.waitForSelector(".form-example");

    const button = await page.$(".btn");
    await button.evaluate((button) => {
      button.dataset.text = "Изменили содержимое";
    });
    await button.click();
    const popover = await page.$(".popover");
    const popoverTextContent = await popover.evaluate((popover) => {
      const popoverBody = popover.querySelector(".popover-body");
      return popoverBody.textContent;
    });
    expect(popoverTextContent).toEqual("Изменили содержимое");
  });

  afterEach(async () => {
    await browser.close();
  });
});
