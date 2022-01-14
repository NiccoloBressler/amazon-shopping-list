const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [name] = await page.$x('//*[@id="productTitle"]');
    const title = await name.getProperty('textContent');
    const rawTitle = await title.jsonValue();

    const [cost] = await page.$x('//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[1]');
    const price = await cost.getProperty('textContent');
    const rawPrice = await price.jsonValue();

    const [status] = await page.$x('//*[@id="availability"]/span');
    const availability = await status.getProperty('textContent');
    const rawAvailability = await availability.jsonValue();

    
    console.log({rawTitle, rawPrice, rawAvailability});
    
    browser.close();
}

scrapeProduct('https://www.amazon.com/Herman-Miller-Aeron-Chair-Graphite/dp/B01N0ZUN15/ref=sr_1_5?crid=1Z22SH5G20BCN&keywords=herman%2Bmiller&qid=1642149689&sprefix=herman%2Bmille%2Caps%2C103&sr=8-5&th=1');