const readline  = require('readline');
const request   = require('request');
const { URL }   = require('url');
const download  = require('image-downloader');
const mkdirp    = require('mkdirp');
const fs        = require('fs');

mkdirp('./images', function (err) {
    if (err) console.error(err)
    else console.log('图片目录已准备！')
});

//按行读取文件内容
const rl = readline.createInterface({
  input: fs.createReadStream('./id.txt')
});

//作品详情接口
const productAPI = 'https://不告诉你'

let count = 1;

console.log('开始下载图片');
rl.on('line', (productId) => {
  let url = new URL(productAPI + productId);
  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    let imgUrl = 'https://图片地址' + body.data.largePics[0];
    const options = {
      url: imgUrl,
      dest: `./images/${productId}.jpg`
    };
    downloadIMG(options);
  });
});

//下载图片
async function downloadIMG(options) {
  try {
    const { filename, image } = await download.image(options);
    console.log('第' + count + '张图片:' + filename);
    count ++;
  } catch (e) {
    throw e
  }
}







