// 引入http模块
let http = require('http');
// 创建服务对象
let server = http.createServer(function(request, response){
    // 获取客户端携带的urlencoded编码形式的参数
    let params = request.url.split('?')[1];
    // 引入一个内置模块 用于解析key = value&key = value解析字符串 又叫查询字符串
    // 请求地址里携带urlencoded编码形式的参数，叫作：查询字符串参数
    // 引入的是一个对象，该对象有很多方法，最具代表性的：parse()
    let querystring = require('querystring');
    let objPerson = querystring.parse(params);
    // 响应头
    response.setHeader('content-type', 'text/html;charset=utf8');
    // 响应
    if(request.method.toUpperCase() === 'POST'){
        console.log('发送post请求');
    }else if(request.method.toUpperCase() === 'GET'){
        console.log('发送get请求');
    }
    response.end(`<h1>你好${objPerson.name}，你的年龄是${objPerson.age}</h1>`);
});
// 设置端口监听
server.listen(4000, function(err){
    if(!err){
        console.log('服务器启动成功！');
    }else{
        console.log(err);
    }
})