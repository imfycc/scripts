

/*
 * Description:身份证后六位，密码字典生成器(末位X)
 * Author；Youthink
 * Blog:http://hufangyun.com
 */


var fs = require("fs");

//补零
function PrefixInteger(num, n) {
	return (Array(n).join(0) + num).slice(-n);
}

var ws = fs.createWriteStream('./dict.txt');
for(var i=10000;i<=319999;i++)
{
	var num = PrefixInteger(i,6);
	var re = ws.write(num + '\n');
	console.log("正在写入："+num);
	//fs.appendFile('num.txt',num+'\n',function(err){
	//if(err) console.log(err);
	//fs.appendFileSync('num.txt',num+'\n')
}


/*末位为x*/
for(var i=1000;i<=31999;i++)
{

	var num = PrefixInteger(i,5);
	var re = Array(2).join(num) + "x";
	var res = ws.write(re + '\n');
	console.log("正在写入："+ re);
}

console.log("\n\n报告运爷，小猿任务完成，请验收！\n");
console.log(':)\n\n');

