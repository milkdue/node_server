/**
 * 连接数据库
 * 1. 成功：搭建服务器,绑定端口监听，ui路由，业务路由
 * 2. 失败：结束
 * 
 */

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const db = require('./connect/connect');
const uiRouter = require('./router/uiRouter');
const loginOrRegister = require('./router/loginOrRegister');


db(function (err) {
    if (err) {
        console.log('数据库连接失败！', err);
    } else {
        app.use(uiRouter());
        app.use(loginOrRegister());
        app.listen(3000, err => {
            if (err) {
                console.log('服务器连接失败！', err);
            } else {
                console.log('服务器连接成功！');
            }
        })
    }
})