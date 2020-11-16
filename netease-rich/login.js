async function login(browser, email, password) {
  page = await browser.newPage();
  await page.goto('https://qian.163.com/pc/login.html');
  const frame = await page.frames()[1];
  const emailElement = await frame.waitForSelector('input[data-type="email"]');
  await emailElement.click();
  await emailElement.type(email);
  const passwdElement = await frame.$('input[class="j-inputtext dlpwd"]');
  await passwdElement.click();
  await passwdElement.type(password);
  const loginBtn = await frame.$('#dologin');
  loginBtn.click();

  try {
    await page.waitForNavigation({timeout: 6000});
  } catch(e) {
    console.log('error login:', e);
    return { error: 'login fail'}
  }

  const cookies = await page.cookies();
  const token = getToken(cookies);
  const cookiesStr = transformCookies(cookies);
  await page.close();
  console.log('debug:success_login');
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