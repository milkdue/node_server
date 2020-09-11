const express = require('express');

// 创建服务对象
const app = express();
// 指定静态资源
app.use(express.static(__dirname + '/public'));
// 使用解析post请求urlencoded编码的中间件
app.use(express.urlencoded({ extended: true }));
const db = require('./connect/connect');
const uiRouter = require('./router/uiRouter');
const loginOrRegister = require('./router/loginOrRegisterRouter');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// 连接数据库
db(function (err) {
    if (err) {
        console.log('数据库连接失败！');
    } else {
        app.use(uiRouter());
        app.use(loginOrRegister());
        app.listen(3000, function (err) {
            if (err) {
                console.log('服务器启动失败！');
            } else {
                console.log('服务器启动成功！');
            }
        });
    }
})
