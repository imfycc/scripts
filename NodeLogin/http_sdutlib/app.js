/*
 *Description: http模块模拟登陆
 *Author:Youthink
 *Blog:http://hufangyun.com
 *Time:2016.2.23 
 */


var http=require("http");  
var querystring=require("querystring");  
var fs=require("fs"); 

var url="http://222.206.65.12/reader/redr_verify.php";  
 
/*Post提交的数据*/
var contents=querystring.stringify({  
    number:"13110581136",
    passwd:"qwer789",
    select:"cert_no",
    returnUrl:""
});

/*header*/  
var options={  
    host:"222.206.65.12",  
    path:"/reader/redr_verify.php",  
    method:"post",  
    headers:{     
        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate",
        "Accept-Language":"zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4",
        "Cache-Control":"max-age=0",
        "Connection":"keep-alive",
        "Content-Length":"59",
        "Content-Type":"application/x-www-form-urlencoded",
        "Host":"222.206.65.12",
        "Origin":"http://222.206.65.12",
        "Referer":"http://222.206.65.12/reader/login.php",
        "Upgrade-Insecure-Requests":"1",
        "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2587.3 Safari/537.36" 
    }  
};  
 
/*cookie*/
var req=http.request(options,function(res){      
    res.setEncoding("utf8");  
    var headers=res.headers;  
    //console.log(headers);  
    var cookies=headers["set-cookie"];  
    cookies.forEach(function(cookie){  
        console.log(cookie);  
    });  
    res.on("data",function(data){  
        console.log(data);  
    });  
    
    
});  
  
req.write(contents);  
req.end(); 
req.on("error",function(err){
    console.log(err);
});
req.on("response",function(response){
   var option2={
      method:"GET",
      host:"222.206.65.12",
      port:"80",
	  path:"/reader/redr_cust_result.php",//目标页面
      headers:{
     "cookie":response.headers["set-cookie"].toString()//这个就是cookie,可以用util解析一下response.headers，看看里面到底有什么
    }
   }
   var request2=http.request(option2);
   request2.end();
   request2.on("error",function(err){console.log(err);});
   request2.on("response",function(response2){
     var wr=fs.createWriteStream("./output.txt");
     response2.pipe(wr);//这样output.txt里面就是目标页面的html文档了
 })
})

