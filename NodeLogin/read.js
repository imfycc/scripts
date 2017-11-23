var fs = require("fs");
var http = require('http');
var querystring = require('querystring');

// 同步读取 密码字典
var data  = fs.readFileSync('dict.txt');
var array = data.toString().split('\n');

for (var i=0;i<310000;i++)
{
console.log("密码"+array[i]+'\n');
}

//模拟登陆

// 接下来就是创建http请求
var req=http.request(options,function(res){
    res.setEncoding("utf8"); // 设置编码, 如果目标网址的编码是gbk/gbk2312神码的, 就别设置了, 下面就专门讲解
    var result = "";
    var resData = "";
    var headers = res.headers; // 像上面所说的, 获取响应的头信息
    var cookies = headers["set-cookie"]; 

    cookies.forEach(function(cookie) {
		console.log(cookie);
    });


    res.on("data",function(data){
        resData += data;
    });
	
    // 在数据发送完毕后触发
    res.on("end", function() {
        // querystring.parse功能: 就是解析...比如一个object会把它解析成object
        console.log(querystring.parse(resData));
    });

	req.on('error', function(err) {
		console.log(err.message);
	});

});
req.write(contents); // xhr.send(). 感觉跟这个差不多
req.end(); // 这个必须有, 不然就一直等待结束


