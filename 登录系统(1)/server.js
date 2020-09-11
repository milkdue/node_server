const express = require('express');
const app = express();
// 或者静态资源
app.use(express.static(__dirname + '/public'));
// 获取post请求中的参数
app.use(express.urlencoded({ extended: true }));
// 引入数据库连接模块
let db = require('./connect/connect');
// 引入模型对象
let userModel = require('./model/model');

db(function (err) {
    if (err) {
        console.log('数据库连接失败！')
    } else {
        // 数据库连接成功
        app.get('/register', function (req, res) {
            res.sendFile(__dirname + '/public/register.html');
        });
        app.get('/login', function (req, res) {
            res.sendFile(__dirname + '/public/login.html');
        });
        app.post('/register', function(req, res){
            let {email, nick_name, password, re_password} = req.body;
            // 以开头4到20个字符
            let emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/;
            // 汉字
            let nick_nameReg = /[\u4e00-\u9fa5]/gm;
            // 6到20个
            let passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/;
            if(!emailReg.test(email)){
                res.send('邮箱格式错误！');
            }else if(!nick_nameReg.test(nick_name)){
                res.send('昵称格式错误！');
            }else if(!passwordReg.test(password)){
                res.send('密码格式错误！')
            }else if(password != re_password){
                res.send('前后密码不一致！');
            }else{
                // 去数据库查找是否有这个邮箱
                userModel.findOne({email}, function(err, date){
                    if(date){
                        res.send('该邮箱已经被注册，请更换邮箱！');
                    }else{
                        if(!err){
                            let date = new Date();
                            userModel.create({email, nick_name, password});
                            console.log(`邮箱${email}在${date}注册了！`);
                            res.send('注册成功！');
                        }else{
                            console.log('您的网络异常，请稍后重试！');
                        }
                    }
                })
            }
        });
        app.post('/login', function(req, res){
            let emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/;
            let passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/;
            let {email, password} = req.body;
            if(!emailReg.test(email)){
                res.send('邮箱格式错误！');
            }else if(!passwordReg.test(password)){
                res.send('密码格式错误！');
            }else{
                userModel.findOne({email, password}, function(err, data){
                    if(err){
                        console.log(err);
                        res.send('网络异常，请稍后重试！');
                    }else if(data){
                        let date = new Date();
                        console.log(`邮箱${email}在${date}登录了！`);
                        res.redirect('http://www.baidu.com');
                    }else{
                        res.send('用户名或密码错误！');
                    }
                })
            }
        });
        app.listen(3000, function (err) {
            if (!err) {
                console.log('服务器启动成功');
            } else {
                console.log(err);
            }
        })
    }
});