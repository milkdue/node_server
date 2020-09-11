/**
 * 连接数据库
 * 1. 成功：搭建服务器,绑定端口监听，ui路由，业务路由
 * 2. 失败：结束
 * 
 */

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./connect/connect');
const uiRouter = require('./router/uiRouter');
const loginOrRegister = require('./router/loginOrRegister');
app.use(session({
    name: 'userid',   //设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否在存储内容之前创建会话
    resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
    store: new MongoStore({
      url: 'mongodb://localhost:27017/sessions_container',
      touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
    }),
    cookie: {
      httpOnly: true, // 开启后前端无法通过 JS 操作cookie
      maxAge: 1000 * 60 * 3 // 设置cookie的过期时间
    }
}));


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