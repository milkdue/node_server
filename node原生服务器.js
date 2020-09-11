/**
 * Node不借助任何第三方库搭建服务器
 */


// 引入node内置http模块
let http = require('http');
//  1. 创造服务员 --- 创建服务对象
let server = http.createServer(function(request, response){
    //  2. 服务员干活
    // request：请求对象 里面包含着客户端给服务器发送的请求
    // response: 响应对象 包含服务器给客户端返回的响应
    // 响应头
    response.setHeader('content-type', 'text/html;charset=utf8');
    // 响应
    response.end('<h1>哈哈哈</h1>');
});

//  3. 绑定端口监听 指定服务器运行的端口
server.listen(3000, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('服务器启动成功');
    }
})