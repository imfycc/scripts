const puppeteer = require('puppeteer');
const process = require('process');

async function login() {
  const browser = await puppeteer.launch({
    headless: true
  });
  page = await browser.newPage();
  await page.goto('https://qian.163.com/pc/login.html');
  const frame = await page.frames()[1];
  const email = await frame.waitForSelector('input[data-type="email"]');
  await email.click();
  await email.type(process.argv[2]); // 第二个参数：用户名
  const pass = await frame.$('input[class="j-inputtext dlpwd"]');
  await pass.click();
  await pass.type(process.argv[3]); // 第三个参数：密码
  const loginBtn = await frame.$('#dologin');
  loginBtn.click();

  await page.waitForNavigation();
  const cookies = await page.cookies();
  const token = getToken(cookies);
  const cookiesStr = transformCookies(cookies);

  return { token, cookiesStr };
}

function getToken(cookies) {
  const target = (cookies || []).filter(cookie => cookie.name === 'TOKEN');
  return (target && target[0].value) || '';
}

function transformCookies(cookies) {
  return (cookies || []).map(cookie => `${cookie.name}=${cookie.value}`).join(';');
}

module.exports = login;