var http=require("http");  
var querystring=require("querystring");  
var fs=require("fs");
var url="http://210.44.176.227:88";  
  
var contents=querystring.stringify({  
    '__EVENTTARGET':'',
    '__EVENTARGUMENT':'',
    '__VIEWSTATE':'/wEPDwUKLTg4OTA4MDE2MBBkZBYCAgMPZBYGAgMPFCsAAhQrAAMPFggeFUVuYWJsZUVtYmVkZGVkU2NyaXB0c2ceF0VuYWJsZUFqYXhTa2luUmVuZGVyaW5naB4cRW5hYmxlRW1iZWRkZWRCYXNlU3R5bGVzaGVldGceElJlc29sdmVkUmVuZGVyTW9kZQspZlRlbGVyaWsuV2ViLlVJLlJlbmRlck1vZGUsIFRlbGVyaWsuV2ViLlVJLCBWZXJzaW9uPTIwMTQuMi43MjQuMzUsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49bnVsbAFkZGQQFgFmFgEUKwADDxYIHwBnHwFoHwJnHwMLKwQBZGRkDxYBZhYBBWVUZWxlcmlrLldlYi5VSS5SYWRXaW5kb3csIFRlbGVyaWsuV2ViLlVJLCBWZXJzaW9uPTIwMTQuMi43MjQuMzUsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49bnVsbBYCZg8UKwADDxYIHwBnHwFoHwJnHwMLKwQBZGRkZAIFDxQrAAIUKwACDxYIHwBnHwJnHwMLKwQBHwFoZBAWAWYWARQrAAIPFgIeEkltcGxpY2l0UGFnZVZpZXdJRAUMUmFkUGFnZVZpZXcxZGQPFgFmFgEFYlRlbGVyaWsuV2ViLlVJLlJhZFRhYiwgVGVsZXJpay5XZWIuVUksIFZlcnNpb249MjAxNC4yLjcyNC4zNSwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1udWxsZBYCZg8PFgIfBAUMUmFkUGFnZVZpZXcxZGQCBw8UKwACDxYIHwBnHwJnHwMLKwQBHwFoZBUBDFJhZFBhZ2VWaWV3MRYCZg9kFgQCAQ8UKwAIDxYKHwBnHwJnHwMLKwQBHwFoHg1MYWJlbENzc0NsYXNzBQdyaUxhYmVsZBYIHgVXaWR0aBsAAAAAAABkQAEAAAAeClJlc2l6ZU1vZGULKWZUZWxlcmlrLldlYi5VSS5SZXNpemVNb2RlLCBUZWxlcmlrLldlYi5VSSwgVmVyc2lvbj0yMDE0LjIuNzI0LjM1LCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGwAHghDc3NDbGFzcwURcmlUZXh0Qm94IHJpSG92ZXIeBF8hU0ICggIWCB8GGwAAAAAAAGRAAQAAAB8HCysFAB8IBRFyaVRleHRCb3ggcmlFcnJvch8JAoICFggfBhsAAAAAAABkQAEAAAAfBwsrBQAfCAUTcmlUZXh0Qm94IHJpRm9jdXNlZB8JAoICFggfBwsrBQAfBhsAAAAAAABkQAEAAAAfCAUTcmlUZXh0Qm94IHJpRW5hYmxlZB8JAoICFggfBhsAAAAAAABkQAEAAAAfBwsrBQAfCAUUcmlUZXh0Qm94IHJpRGlzYWJsZWQfCQKCAhYIHwYbAAAAAAAAZEABAAAAHwcLKwUAHwgFEXJpVGV4dEJveCByaUVtcHR5HwkCggIWCB8GGwAAAAAAAGRAAQAAAB8HCysFAB8IBRByaVRleHRCb3ggcmlSZWFkHwkCggJkAgMPFCsACA8WCh8AZx8CZx8DCysEAR8BaB8FBQdyaUxhYmVsZBYIHwYbAAAAAAAAZEABAAAAHwcLKwUAHwgFEXJpVGV4dEJveCByaUhvdmVyHwkCggIWCB8GGwAAAAAAAGRAAQAAAB8HCysFAB8IBRFyaVRleHRCb3ggcmlFcnJvch8JAoICFggfBhsAAAAAAABkQAEAAAAfBwsrBQAfCAUTcmlUZXh0Qm94IHJpRm9jdXNlZB8JAoICFggfBwsrBQAfBhsAAAAAAABkQAEAAAAfCAUTcmlUZXh0Qm94IHJpRW5hYmxlZB8JAoICFggfBhsAAAAAAABkQAEAAAAfBwsrBQAfCAUUcmlUZXh0Qm94IHJpRGlzYWJsZWQfCQKCAhYIHwYbAAAAAAAAZEABAAAAHwcLKwUAHwgFEXJpVGV4dEJveCByaUVtcHR5HwkCggIWCB8GGwAAAAAAAGRAAQAAAB8HCysFAB8IBRByaVRleHRCb3ggcmlSZWFkHwkCggJkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYEBRFSYWRXaW5kb3dNYW5hZ2VyMQUKUmFkV2luZG93MQUMUmFkVGFiU3RyaXAxBQ1SYWRNdWx0aVBhZ2UxBGhnYvW13kw2oUC3gElV68k0Pzm9j4qj5k8dQN0y5hw=',
    '__EVENTVALIDATION':'/wEWBAKHgfzlAQLmurILAoGk0KAKAoznisYGnUilKg/mVHBr5n7RVve5oCTmsoRHAHyY+aE3Xu9y55g=',
    'RadWindow1_ClientState':'',
    'RadWindowManager1_ClientState':'',
    'RadTabStrip1_ClientState':'{"selectedIndexes":["0"],"logEntries":[],"scrollState":{}}',
    'RadTextBox1':'13110502142',
    'RadTextBox1_ClientState':'{"enabled":true,"emptyMessage":"","validationText":"","valueAsString":"","lastSetTextBoxValue":""}',
    'RadTextBox2':'222010',
    'RadTextBox2_ClientState':'{"enabled":true,"emptyMessage":"","validationText":"","valueAsString":"","lastSetTextBoxValue":""}',
    'Button1': '登录',
    'RadMultiPage1_ClientState':''
});

 
var options={  
    host:"210.44.176.227",  
    port:"88",
    path:"/Default.aspx",  
    method:"post",  
    headers:{     
        
        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate",
        "Accept-Language":"zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4",
        "Cache-Control":"max-age=0",
        "Connection":"keep-alive",
        "Content-Length":contents.length,
        "Content-Type":"application/x-www-form-urlencoded",
        "Host":"210.44.176.227:88",
        "Origin":"http://210.44.176.227:88",
        "Referer":"http://210.44.176.227:88/Default.aspx",
        "Upgrade-Insecure-Requests":"1",
        "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2587.3 Safari/537.36"
    }  
};  
  
var req=http.request(options,function(res){      
 
    var headers=res.headers;  
    console.log(headers);  
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
     
   //这里的话，response就会包含返回的cookie，但是我不知道如果这里有重定向该怎么做
   var option2={
      method:"GET",
      host:"210.44.176.227",
      port:"88",
      path:"/Desk",//目标页面
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
    //也可以监听data事件
   //response2.on("data",function(data){});
   //response2.on("end",function(){..})
 })
})
