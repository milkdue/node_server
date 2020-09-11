const express = require('express');
// 引入文件操作
const fs = require('fs');
// 创建服务对象
const app = express();
// 指定静态资源
app.use(express.static(__dirname + '/public'));
// 使用解析post请求urlencoded编码的中间件
app.use(express.urlencoded({ extended: true }));
const db = require('./connect/connect');
const usersModel = require('./model/model');
// 正则校验
let emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/;
let nick_nameReg = /[\u4e00-\u9fa5]/gm;
let passwordReg = /[0-9a-zA-Z]{2,11}/;

// 连接数据库
db(function (err) {
    if (err) {
        console.log('数据库连接失败！');
    } else {
        app.get('/register', function (req, res) {
            res.sendFile(__dirname + '/public/register.html');
        });
        app.get('/login', function (req, res) {
            res.sendFile(__dirname + '/public/login.html');
        });
        app.post('/register', function (req, res) {
            const { email, nick_name, password, re_password } = req.body;

            if (!emailReg.test(email)) {
                res.send('邮箱格式错误！');
            } else if (!nick_nameReg.test(nick_name)) {
                res.send('昵称格式错误！');
            } else if (!passwordReg.test(password)) {
                res.send('密码格式错误！')
            } else if (password != re_password) {
                res.send('前后密码不一致！');
            } else {
                usersModel.findOne({ email }, function (err, data) {
                    if (data) {
                        res.send('该邮箱已被注册！');
                    } else {
                        if (!err) {
                            usersModel.create({ email, nick_name, password }, function (err, data) {
                                if (!err) {
                                    res.send('注册成功！');
                                    // 创建可写流
                                    let ws = fs.createWriteStream(__dirname + 'userInfo.txt', {flags: 'a'});
                                    // 写入流
                                    ws.write(`邮箱为${email}在${new Date()}注册了！\n`);
                                    // 关闭可写流
                                    ws.close();

                                } else {
                                    console.log(err);
                                    res.send('网络异常，请稍后重试！');
                                }
                            })
                        }
                    }
                })
            }
        });
        app.post('/login', function (req, res) {
            const {email, password} = req.body;
            if(!emailReg.test(email)){
                res.send('邮箱格式错误！');
            }else if(!passwordReg.test(password)){
                res.send('密码格式错误！');
            }else{
                usersModel.findOne({email, password}, function(err,data){
                    if(data){
                        res.send('登录成功！');
                        let ws = fs.createWriteStream(__dirname + 'userInfo.txt', {flags: 'a'});
                        ws.write(`邮箱为${email}在${new Date()}登录了！\n`)
                        ws.close();
                    }else{
                        res.send('邮箱或密码错误！');
                    }
                });
            }
        });
        app.listen(3000, function (err) {
            if (err) {
                console.log('服务器启动失败！');
            } else {
                console.log('服务器启动成功！');
            }
        });
    }
})
