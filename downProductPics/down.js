'use strict'
const fs = require('fs');
const axios = require('axios');
const mkdirp = require('mkdirp');

mkdirp('./images', function (err) {
    if (err) console.error(err)
    else console.log('图片目录已准备！')
});

const lines = [];

fs.readFileSync('./id.txt').toString().split('\n').map(function (line) {
  lines.push(line);
});

const productAPI = 'https://不告诉你';

async function run() {
    for (let n = 0; n < lines.length; n++) {
        let productId = lines[n];
        try {
          let r = await axios.get(productAPI + productId);
          let imgUrl = 'https://图片地址' + r.data.data.largePics[0];
            await axios({
                method: 'get',
                url: imgUrl,
                responseType: 'stream'
            })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream(`./images/${productId}.jpg`));
            })
            console.log('第' + (n + 1) + '张图片:' + productId);
        } catch (e) {
          //console.error(e);
        }
    }
}
run();
