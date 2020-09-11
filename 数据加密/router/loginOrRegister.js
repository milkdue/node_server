/**
 * 此模块用于登录和注册路由
 */
const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const md5 = require('md5');
const sha1 = require('sha1');
// xiaozhupeiqi@qq.com
const emailReg = /[a-zA-Z0-9_]{5,20}@[a-zA-Z0-9_]{2,10}\.com/;
const nickNameReg = /[\u4e00-\u9fa5]/gm;
const passwordReg = /[a-zA-Z0-9_]{6,20}/;
const usersModel = require('../model/usersModel');


router.post('/register', (req, res) => {
    /**
     * 创建错误消息对象
     * 1. 邮箱无法匹配
     * 2. 昵称无法匹配
     * 3. 密码无法匹配
     * 4. 前后密码不一致
     * 判断消息对象是否为空
     * 1. 空：数据库查询
     *      1. 查到 
     *          1. 邮箱已被注册
     *          2. 打回重新注册
     *      2. 未查到
     *          1. 写入数据库
     *              1. 成功注册成功，跳转登录界面,并将该用户的id利用session模块种入cookie，写入日志
     *              2. 失败，网络
     * 2. 非空： 重新注册
     */
    const { email, nick_name, password, re_password } = req.body;
    let errMsg = {};
    if (!emailReg.test(email)) {
        errMsg.emailErr = '邮箱格式错误，用户名必须4-20位，主机名必须2-10位！';
    }
    if (!nickNameReg.test(nick_name)) {
        errMsg.nickErr = '昵称格式错误，必须为中文！';
    }
    if (!passwordReg.test(password)) {
        errMsg.passwordErr = '密码格式错误必须6-20位!';
    }
    if (password != re_password) {
        errMsg.reErr = '前后密码不一致!';
    }

    if (JSON.stringify(errMsg) == '{}') {
        usersModel.findOne({ email }, (err, data) => {
            if (data) {
                errMsg.emailErr = `邮箱${email}已被注册！`
                res.render('register', { errMsg });
            } else {
                if (!err) {
                    usersModel.create({ email, nick_name, password:sha1(md5(password)) }, err => {
                        if (err) {
                            errMsg.networkErr = '网络异常，请稍后重试！';
                            res.render('register', { errMsg });
                        } else {
                            let ws = fs.createWriteStream(__dirname + '/log.txt', { flags: 'a' });
                            ws.write(`邮箱为${email}的用户在${new Date()}注册了 \n`);
                            ws.close();
                            res.redirect(`http://localhost:3000/login/?email=${email}`);
                        }
                    });
                } else {
                    errMsg.networkErr = '网络异常，请稍后重试！';
                    res.render('register', { errMsg });
                }
            }

        })
    } else {
        res.render('register', { errMsg });
    }

});

router.post('/login', (req, res) => {
    /**
     * 创建错误消息对象
     * 1. 邮箱无法匹配
     * 2. 密码无法匹配
     * 判断消息对象是否为空
     * 1. 空：数据库查询
     *      1. 查到 
     *          1. !err
     *                  1. 登录成功 种下idcookie，写入日志
     *                  2. 跳转个人中心
     *          2. err
     *                  1. 网络错误
     *                  2. 重新登录
     *
     *      2. 未查到
     *          1. 邮箱或密码错误
     *          2. 重新登录
     * 2. 非空： 重新注册
     */
    const { email, password } = req.body;
    let errMsg = {};
    if (!emailReg.test(email)) {
        errMsg.emailErr = '邮箱格式错误，用户名必须4-20位，主机名必须2-10位！';
    }
    if (!passwordReg.test(password)) {
        errMsg.passwordErr = '密码格式错误必须6-20位!';
    }
    if (JSON.stringify(errMsg) == '{}') {
        usersModel.findOne({ email, password:sha1(md5(password)) }, (err, data) => {
            if (data) {
                if (err) {
                    errMsg.networkErr = '网络异常，请稍后重试！';
                    res.render('login', { errMsg });
                } else {
                    // res.cookie('_id', data._id, { maxAge: 1000 * 60 * 5 });
                    req.session._id = data._id.toString();
                    let ws = fs.createWriteStream(__dirname + '/log.txt', { flags: 'a' });
                    ws.write(`邮箱为${email}的用户在${new Date()}登录了 \n`);
                    ws.close();
                    res.redirect('http://localhost:3000/center');
                }
            } else {
                errMsg.emailOrpasswordErr = '邮箱或密码错误，请重新登录！';
                res.render('login', { errMsg });
            }
        })
    } else {
        res.render('login', { errMsg });
    }
});

module.exports = () => { return router; };