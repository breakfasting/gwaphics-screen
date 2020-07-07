const puppeteer = require('puppeteer');
const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get('/screenshot', async (req, res) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    console.log(req.query)
    await page.setViewport({
        width: parseInt(req.query.width),
        height: parseInt(req.query.height),
    })
    await page.goto(`https://gwaphics.herokuapp.com/#/view/${req.query.id}`,{ waitUntil: 'networkidle0' }); // URL is given by the "user" (your client-side application)
    const screenshotBuffer = await page.screenshot();

    // Respond with the image
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length
    });
    res.end(screenshotBuffer);

    await browser.close();
})

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`app running on port: ${ PORT }`)
});