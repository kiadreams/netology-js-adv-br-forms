import puppeteer from 'puppeteer'
import { fork } from 'child_process'


jest.setTimeout(30000);

describe('Page start', () => {
  let server
  let browser
  let page

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`)
    await new Promise((resolve, reject) => {
      server.on('error', reject)
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve()
        }
      })
    })
  })

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'shell',
      slowMo: 100,
      devtools: true,
    })

    page = await browser.newPage()
  })

  test('Popover should be render when clicked', async () => {
    const text =
      'А здесь размещается какой-то текстовый контент к выбранному элементу'
    await page.goto('http://localhost:9000/')

    await page.waitForSelector('.form-example')

    const button = await page.$('.btn')
    await button.click()
    const popover = await page.waitForSelector('.popover')
    const popoverTextContent = await popover.evaluate((popover) => {
      const popoverBody = popover.querySelector('.popover-body')
      return popoverBody.textContent
    })
    expect(popoverTextContent).toEqual(text)
  })

  test('Change popover text content', async () => {
    await page.goto('http://localhost:9000/')

    await page.waitForSelector('.form-example')

    const button = await page.$('.btn')
    await button.evaluate((button) => {
      button.dataset.text = 'Изменили содержимое'
    })
    await button.click()
    const popover = await page.$('.popover')
    const popoverTextContent = await popover.evaluate((popover) => {
      const popoverBody = popover.querySelector('.popover-body')
      return popoverBody.textContent
    })
    expect(popoverTextContent).toEqual('Изменили содержимое')
  })

  afterEach(async () => {
    await browser.close()
  })

  afterAll(async () => {
    await browser.close()
    server.kill()
  })
})
