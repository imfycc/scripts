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
    await page.waitForResponse('https://dl.reg.163.com/dl/l', { timeout: 5000 });
  } catch(e) {
    console.log(`debug:login_${e.name}`);
    await page.close();
    return { error: '登录超时，请重试~' }
  }

  let userInfoRes = null, errorText = null;

  try {
    userInfoRes = await page.waitForResponse(
      res => res.url().startsWith('https://qian.163.com/pc/xhr/user/getUserInfo.do'),
      { timeout: 3000 }
    );
  } catch(e) {
    const errorElm = await frame.$('.ferrorhead');
    const errorElm2 = await frame.$('.ferrorhead2');
    const errorElm3 = await frame.$('.ferrorhead3');
    if (errorElm || errorElm2 || errorElm3) {
      errorText = await (errorElm || errorElm2 || errorElm3).evaluate(node => node.innerText);
    }
    console.log(`debug:userInfo_${e.name}_${errorText}`);
    await page.close();
    return { error: errorText || '登录超时，请重试~' }
  }

  if (userInfoRes && userInfoRes.ok && userInfoRes.ok()) {
    const cookies = await page.cookies();
    const token = getToken(cookies);
    const cookiesStr = transformCookies(cookies);
    await page.close();
    console.log('debug:success_login');
    return { token, cookiesStr };
  }
  console.log('debug:login_last_error');
  return { error: '未知错误~' };
}

function getToken(cookies) {
  const target = (cookies || []).filter(cookie => cookie.name === 'TOKEN');
  return (target && target[0].value) || '';
}

function transformCookies(cookies) {
  return (cookies || []).map(cookie => `${cookie.name}=${cookie.value}`).join(';');
}

module.exports = login;