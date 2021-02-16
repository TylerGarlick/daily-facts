import { chromium } from 'playwright'

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const response = await page.goto(`https://nationaltoday.com/january-holidays/`)
  // await page.waitForSelector(``)
  const body = await response.text()
  console.log(body)

  await browser.close()
}

run().catch(console.error)
