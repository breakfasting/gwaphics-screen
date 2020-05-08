const puppeteer = require('puppeteer');

takeScreenshot()
    .then(() => {
        console.log("Screenshot taken");
    })
    .catch((err) => {
        console.log("Error occured!");
        console.dir(err);
    });

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    await page.goto("http://localhost:3000/#/design/9", {waitUntil: 'networkidle2'});

    const buffer = await page.screenshot({
		path: './screenshot.png'
    });

    await page.close();
    await browser.close();
}