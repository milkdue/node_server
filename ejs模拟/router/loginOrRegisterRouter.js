/**
 * 
 * 此模块用于处理业务逻辑
 */
const { Router } = require('express');
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
    let errMsg = {};

    if (!emailReg.test(email)) {
        errMsg.emailErr = '邮箱格式错误，用户名必须4-20位，主机名必须2-10位！'
        // res.send('邮箱格式错误！');
    }
    if (!nick_nameReg.test(nick_name)) {
        errMsg.nickErr = '昵称格式错误，必须为中文！';
        // res.send('昵称格式错误！');
    }
    if (!passwordReg.test(password)) {
        errMsg.passwordErr = '密码格式错误，必须6-20！';
        // res.send('密码格式错误！')
    }
    if (password != re_password) {
        errMsg.rePasswordErr = '前后密码不一致！';
        // res.send('前后密码不一致！');
    }
    if (JSON.stringify(errMsg) === '{}') {
        usersModel.findOne({ email }, function (err, data) {
            if (data) {
                errMsg.emailErr = '该邮箱已被注册！';
                res.render('register', { errMsg });
            } else {
                if (!err) {
                    usersModel.create({ email, nick_name, password }, function (err, data) {
                        if (!err) {
                            res.redirect(`/login/?email=${email}`);
                            // 创建可写流
                            let ws = fs.createWriteStream(__dirname + 'userInfo.txt', { flags: 'a' });
                            // 写入流
                            ws.write(`邮箱为${email}在${new Date()}注册了！\n`);
                            // 关闭可写流
                            ws.close();

                        } else {
                            console.log(err);
                            errMsg.networkErr = '网络异常，请稍后重试！';
                            res.render('register', { errMsg });
                        }
                    })
                }
            }
        })
    } else {
        res.render('register', { errMsg });
    }

});
router.post('/login', function (req, res) {
    const { email, password } = req.body;
    let errMsg = {};
    if (!emailReg.test(email)) {
        errMsg.emailErr = '邮箱格式错误，用户名必须4-20位，主机名必须2-10位！'
        // res.send('邮箱格式错误！');
    }
    if (!passwordReg.test(password)) {
        errMsg.passwordErr = '密码格式错误，必须6-20！';
        // res.send('密码格式错误！');
    }
    if(JSON.stringify(errMsg) == '{}'){
        usersModel.findOne({ email, password }, function (err, data) {
            if (data) {
                res.redirect('https://baidu.com');
                let ws = fs.createWriteStream(__dirname + 'userInfo.txt', { flags: 'a' });
                ws.write(`邮箱为${email}在${new Date()}登录了！\n`)
                ws.close();
            } else {
                console.log(data);
                errMsg.emailOrPasswordErr = '邮箱或密码错误！';
                res.render('login', {errMsg});
            }
        });
    }else{
        res.render('login', {errMsg});
    }

});

module.exports = function () {
    return router;
}