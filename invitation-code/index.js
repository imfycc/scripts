/*
 * 生成不重复的邀请码1000枚
 * 包含数字、大小写字母、@#&*等符号
 * 一共12位，最后四位是0001到1000
 * 
 */

var fs = require('fs');
var numberArr = [1,2,3,4,5,6,7,8,9,0];
var lowerArr = [];
var upperArr = []; 
var otherCharArr = ['@','#','&'];

for(var i=65;i<91;i++)
{
  upperArr.push(String.fromCharCode(i));
}

for(var i=97;i<123;i++){
  lowerArr.push(String.fromCharCode(i));
}

var finalArray = numberArr.concat(lowerArr).concat(upperArr).concat(otherCharArr);



var invitationCode = '';
var str1 = '';
var str2 = '';

function randomOne(arr,i,str){
   for(var j=0;j<i;j++){
	   str += arr[Math.floor(Math.random() * arr.length)];
   }
   return str;
}

//补零
function PrefixInteger(num, n) {
	return (Array(n).join(0) + num).slice(-n);
}

var ws = fs.createWriteStream('./code.txt');
for(var j=1;j<=1000;j++){
	   str1 = '';
	   str2 = '';
	   str1 = randomOne(finalArray,11,str1);
       str2 = randomOne(otherCharArr,1,str2);
       invitationCode = str2 + str1;
	   invitationCode += PrefixInteger(j,4);
	   var re = ws.write(invitationCode + '\n');
	   console.log("正在写入："+invitationCode);
    }
console.log('任务完成，请查看code.txt文件');
