// 引入express模块
const express = require('express');
// 创建app服务对象
const app = express();
// 禁止服务器返回X-Powered-By
app.disable('x-powered-by');
// 配置路由
// 路由 对请求的url进行分类，
// Node.js都是后端路由 路由：一组组key+uri路径 : value(回调)的组合
/**
 * app.get()
 * 1. get请求
 * 2. 请求的URI必须为‘/’
 */
// 一级get路由
app.get('/meishi', function(request, response){
    response.send('我是美食页面1');
});
// 这个不生效 数组 匹配成功不在往后匹配一次请求一次响应
app.get('/meishi', function(request, response){
    response.send('我是美食页面2');
});
// 根路由
app.get('/', function(request, response){
    response.send('我是主页');
    // express内置的query自动解析url
    console.log(request.query);
    console.log(request.url);
});
app.post('/', function(request, response){
    response.send('你发的是个啥');
})
// 指定服务器运行的端口
app.listen(4000, function(err){
    if(!err){
        console.log('服务器启动成功');
    }else{
        console.log(err);
    }
})