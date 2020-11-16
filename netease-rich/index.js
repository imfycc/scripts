const fs = require('fs');
const path =require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJson2xlsx = require('koa-json2xlsx');
const render = require('koa-ejs');
const download = require('./download');
const login = require('./login');

const app = new Koa();

render(app, {
  root: path.join(__dirname),
  layout: false
});

const main = async (ctx) => {
  if (ctx.request.path === '/login' && ctx.method === 'POST') {
    const postData = ctx.request.body;
    const { email, password } = postData || {};
    const { token, cookiesStr, error } = await login(email, password);
    if (error) {
      ctx.render('index', {error: '登录失败，请检查邮箱和密码是否正确~'});
    } else {
      const data = await download(token, cookiesStr);
      console.log('debug: success_export_data');
      ctx.xlsx(`netease-rich-${Date.now()}.xlsx`, data);
    }
  } else {
    ctx.render('index', { error: '' });
  }
}


app.use(bodyParser());
app.use(koaJson2xlsx());
app.use(main);

app.listen(3000);