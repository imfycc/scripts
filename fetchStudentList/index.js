
const http        = require('http');
const querystring = require('querystring');
const mysql       = require('mysql');

const sdutNumPre = ['151','152','141','142','131','132'];

for (let j=0;j< sdutNumPre.length;j++){

let postData = querystring.stringify({
  'post_xingming' : '',
  'post_xuehao'   : sdutNumPre[j],
  'Submit'        : '提交'

});

let options = {
  hostname: '这里写地址哈ru:www.baidu.com',
  port: 80,
  path: '/cjcx/xhcx_list.php',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

function array_chunk(array){
	let arr= array||[];
	let result = [];
	for(let i=0;i < arr.length;i=i+14){
		result.push(arr.slice(i,i+13));
	}
	result = result.map((o)=>{
		return [
			o[1].slice(58,-5),//学号
			o[2].slice(58,-5),//姓名
			o[3].slice(60,-5),//性别
			o[4].slice(60,-5),//年级
			o[6].slice(58,-5),//专业
			o[7].slice(58,-5),//班级
			o[9].slice(60,-5),//层次
			o[10].slice(60,-5)//学制
			];
	});
	return result;
}

let pageData = '';

let req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    //console.log(`BODY: ${chunk}`);
    pageData += chunk; //不能在这里直接正则，数据可能没加载完
  });
  res.on('end', () => {
  	const re  = /<td scope="col" align=.*<\/td>/g;
    let reStr = pageData.match(re);
    let res = array_chunk(reStr);
    let count = reStr.length/14;
    console.log('共有数据'+count+'条');

	const connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'SDUT',
	  port     : '8889' 
	});
	 
	connection.connect();
	 
	res.map((o)=>{

		//console.log(o[0],o[1],o[2],o[3],o[4],o[5],o[6],o[7]);

		let post  = {sdut_num:o[0],really_name:o[1],sex:o[2],grade:o[3],major:o[4],class:o[5]};

		var query = connection.query('INSERT IGNORE INTO user SET ?', post, function(err, result) { });
	
		
	});

	connection.end();

	console.log('数据插入成功,共'+count);
	
    console.log('阳爷，任务完成，请您指示！');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
}
