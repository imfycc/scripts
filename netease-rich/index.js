const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const download = require('./download');
const koaJson2xlsx = require('koa-json2xlsx');

const app = new Koa();

const main = async (ctx) => {
  if (ctx.request.path === '/result' && ctx.method === 'POST') {
    const postData = ctx.request.body;
    const { email, password } = postData || {};
    const data = await download(email, password);
    ctx.xlsx(`netease-rich-${Date.now()}.xlsx`, data);
  } else {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
  };
}


app.use(bodyParser());
app.use(koaJson2xlsx());
app.use(main);

app.listen(3000);