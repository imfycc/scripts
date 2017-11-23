const fs     = require('fs');
const http   = require('http');
const Config = require('./config.js');
const qs     = require('querystring');
const c      = require('child_process');

//Promise.all = undefined;

console.log(Promise.all);

require('promise-all-simple');

function judgeOrder(){
  //根据节假日接口判断是否符合订餐日期，符合--->订餐

    let { today, day } = getTodayDate();

    let url = Config.dateUrl + '?day='+ today + '&showapi_appid=不告诉你&showapi_sign=想知道没门';
    http.get(url,(res)=>{

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        let parsedData = JSON.parse(rawData);
        //console.log(parsedData);

        if(isWorkingDay(parsedData,day)){
          ordering();
          return;
        }
        operateResult(['今','天','不','订','餐']);
    });
  });
}

function getTodayDate(){

  let dateTime = new Date();
  let year     = dateTime.getFullYear();
  let mouth    = dateTime.getMonth()+1;
	let day      = dateTime.getDate();
	let todayMouth = mouth > 9 ?  mouth : '0' + mouth;
	let todayDay = day > 10 ? day : '0' + day;
  let today = year +''+ todayMouth+''+todayDay;

  return {today,day};
}

function isWorkingDay(data,day){
  if(data.showapi_res_body.type === '3'){//节假日
      //console.log('节假日');
      return;
    }

    if(day < 8 && data.showapi_res_body.weekDay === 2){//无福利日
      //console.log('无福利日');
      return;
    }

    //调休的周末，是工作日，接口已经包括在内了
    if(data.showapi_res_body.type === '2'){//周末
      //console.log('周末');
      return;
    }

    return true;
}

function ordering(){
  if(Config.orderMemberList.length > 0){
    Promise.all(
        Config.orderMemberList.map((o)=>{
          return requestOrderAPI(o.name,o.floor);
        })
      ).then((responses)=>{
        operateResult(responses);
      });
  }
}

function requestOrderAPI(name,floor){

    let re = '';
    //let url = 'http://www.baidu.com';
    let url = 'http://不告诉你/reservations/plus1?name=' + qs.escape(name) +'&location='+floor;
    return new Promise((resolve, reject)=> {
        return http.get(url,(res)=>{
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                re = rawData;
                resolve(name + ':' + re);
            });
        });
    });
};

function operateResult(arr){
	//新建result.html文件，写入结果+当前的时间
	let time =  new Date().toLocaleString() + '<br />';
	let content = time + '<br />' + arr.join('<br /><br />');

	fs.writeFile('./result.html', content, (err)=> {
		   if (err) {
		       return console.error(err);
		   }
		   //console.log("数据写入成功！");
		   //console.log("--------我是分割线-------------");
		   //process.exit();
		});

		c.exec('open result.html');
}

judgeOrder();


