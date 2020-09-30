'use strict';

const puppeteer = require('puppeteer');
const prompts = require('./prompts');
var page;

async function main() {

  let answers = await prompts();

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  });
  page = await browser.newPage();

  await page.goto('https://facebook.com/');

  await page.$eval('input[id=email]', (el, user) => el.value = user, answers.username);
  await page.$eval('input[id=pass]', (el, pass) => el.value = pass, answers.password);
  await page.$eval('button[name=login]', button => button.click());
  await goToPhotos();

  await scrollThroughPhotos(answers.direction);
}

async function goToPhotos() {
  await page.goto('https://facebook.com/profile');
  let profile = await page.evaluate(() => {
    return window.location.pathname;
  });
  await page.goto('https://facebook.com' + profile + 'photos_of');
  await page.evaluate('window.scrollBy(0, 500)');
  await page.waitForSelector('a[href*="facebook.com/photo.php"]');
  await page.$eval('a[href*="facebook.com/photo.php"]', photo => photo.click());
}

async function doAfter(milliseconds, func) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(func());
      } catch(err) {
        reject(err);
      }
    }, milliseconds);
  });
}

async function getUrl() {
  var url = await page.evaluate(() => {
    return window.location.href;
  })
  return url;
}

async function clickNextButton() {
  await page.waitForSelector('div[aria-label="Next photo"]');
  await page.evaluate(() => {
    document.querySelector('div[aria-label="Next photo"]').click();
  });
}

async function clickOptionsButton() {
  await page.waitForSelector('div[aria-label="Actions for this post"]');
  await page.evaluate(() => {
    document.querySelector('div[aria-label="Actions for this post"]').click();
  });
}

async function clickDownloadButton() {
  await page.waitForSelector('a[download]');
  await page.evaluate(() => {
    var list = document.querySelector('a[download]').click();
  });
}

async function scrollThroughPhotos(direction) {
  // get initial photo url
  var initialUrl = await doAfter(500, getUrl);
  console.log(initialUrl);
  for (let i = 0; true; i++) {
    // try catch for video links
    try {
      await clickNextButton();
      await clickOptionsButton();
      await clickDownloadButton();
    } catch(err) {
      console.log(err);
    }
    let currentUrl = await getUrl();
    if (i > 5 && currentUrl === initialUrl) {
      break;
    }
    if (i > 0 && i % 100 === 0) {
      console.log(`downloaded ${i} photos`);
    }
  }
  await page.close();
  console.log("Done!");
  process.exit();
}

main();
