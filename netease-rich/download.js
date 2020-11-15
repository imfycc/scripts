const fs = require('fs');
const fetch = require('node-fetch');
const dayjs = require('dayjs');
const login = require('./login');

const tradeTypeArr = ['INCOME', 'OUTGO', 'TRANSFER'];
const tradeTypeZHArr = ['收入', '支出', '转帐'];

const commonParams = {
  "startTime": 1420041600000,
  "endTime": 1606665600000,
  "size": 20
}

const getParams = (page = 0, tradeType = 'OUTGO') => {
  const obj = Object.assign(commonParams, { page, tradeType });
  return JSON.stringify(obj);
}

const loadData = (page, tradeType, token, cookiesStr) => {
  const params = getParams(page, tradeType);
  return fetch(`https://qian.163.com/pc/xhr/data/bill/list.do?token=${token}`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6",
      "cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": cookiesStr
    },
    "referrer": "https://qian.163.com/pc/index.html",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": params,
    "method": "POST",
    "mode": "cors"
  })
}

const tranformResponse = async (res) => {
  const text = await res.text();
  const { data = {} } = JSON.parse(text || {});
  return data;
}

const sleep = delay => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const getBillData = async (currPage, tradeType, token, cookiesStr) => {
  await sleep(currPage * 500);
  const res = await loadData(currPage, tradeType, token, cookiesStr);
  const data = await tranformResponse(res);
  const { result = []} = data;
  return result;
} 

const formatData = arr => {
  return arr.map(o => {
    return {
      '时间': dayjs(o.date).format('YYYY-MM-DD HH:mm'),
      '分类': o && o.category && o.category.categoryName,
      '类型': tradeTypeZHArr[o.tradeType - 1],
      '金额': (o.outMoney || o.inMoney).slice(1),
      '账户1': (o.outFund || o.inFund),
      '账户2': (o.outFund && o.inFund),
      '备注': o.remark
    }
  })
}

const allWithProgress = (requests, callback) => {
   let index = 0;
   requests.forEach(item => {
     item.then(() => {
       index ++;
       const progress = (index * 100 / requests.length).toFixed(2);
       callback(progress);
     })
   });
   return Promise.all(requests);
}

const getRequestQueues = async (token, cookiesStr) => {
  const requestQueues = [];

  for(let num = 0; num < tradeTypeArr.length; num++) {
    const res = await loadData(0, tradeTypeArr[num], token, cookiesStr);
    const data = await tranformResponse(res);
    const { pagination = {}, result = []} = data;
    const { totalPage = 1 } = pagination;

    for(let page = 0; page < totalPage; page++) {
      requestQueues.push(getBillData(page, tradeTypeArr[num], token, cookiesStr));
    }
  }

  return requestQueues;
}

const load = async (email, passwd) => {
  const { token, cookiesStr } = await login(email, passwd);
  const requestQueues = await getRequestQueues(token, cookiesStr);
  const all = await allWithProgress(requestQueues, progress => console.log(progress));
  const resultArr = all.reduce((acc, item) => {
    acc.push(...item)
    return acc;
  });

  return formatData(resultArr);
}

module.exports = load;