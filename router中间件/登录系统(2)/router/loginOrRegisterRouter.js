/**
 * 
 * 此模块用于处理业务逻辑
 */
const {Router} = require('express');
const router = new Router();
const usersModel = require('../model/model');
// 引入文件操作
const fs = require('fs');

// 正则校验
let emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/;
let nick_nameReg = /[\u4e00-\u9fa5]/gm;
let passwordReg = /[0-9a-zA-Z]{2,11}/;

router.post('/register', function (req, res) {
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
router.post('/login', function (req, res) {
    const {email, password} = req.body;
    if(!emailReg.test(email)){
        res.send('邮箱格式错误！');
    }else if(!passwordReg.test(password)){
        res.send('密码格式错误！');
    }else{
        usersModel.findOne({email, password}, function(err,data){
            if(err){
                res.send('邮箱或密码错误！');
            }else{
                res.send('登录成功！');
                let ws = fs.createWriteStream(__dirname + 'userInfo.txt', {flags: 'a'});
                ws.write(`邮箱为${email}在${new Date()}登录了！\n`)
                ws.close();
            }
        });
    }
});

module.exports = function(){
    return router;
}