/**
 * 
 * 服务器给客户端响应
 * 
 * 服务器给浏览器一段文字
 * 服务器给浏览器一个图片
 * 服务器给一个视频
 * 。。。
 * 一次请求，一次响应
 * 多个响应以send为主
 */

let express = require('express');
// 创建服务对象
let app = express();
// 配置根路由
app.get('/', function(req, res){
    res.send('我是根路由 -- get');
    // 请求头中的参数
    console.log(req.get('Host'));
});
app.get('/download', function(req, res){
    res.download('./yarn.lock');
});
app.get('/demo', function(req, res){
    res.send('我是一级路由');
});
// 配置根路由
app.post('/', function(req, res){
    console.log(req.body);
    res.send('我是根路由 -- post');
});
// 参数路由
app.get('/meishi/:id', function(req,res){
    console.log(req.params);
    console.log(req.params.id);
    res.send(`商家${req.params.id}`);
});
app.get('/source', function(req,res){
    // 设置响应头必须在响应前面 不能随便写头，查手册
    res.set('Demo', '119');
    // 基本不需要配置 浏览器自己配置
    res.status(200);
    res.sendFile(__dirname + '/img/vue.png');
    // 必须在响应后拿响应头中的参数 用的很少
    console.log(res.get('Demo'));
});
app.get('/redirect', function(req, res){
    // res.redirect('https://baidu.com');
    // 往自己的跳
    res.redirect('/source');
})
// 绑定端口监听
app.listen(3000, function(err){
    if(!err){
        console.log('服务器搭建成功！');
    }else{
        console.log(err);
    }
})