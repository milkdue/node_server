/**
 * 此模块用于实现ui路由
 */

const { Router } = require('express');
const router = new Router();
const fs = require('fs');
const usersModel = require('../model/usersModel');


router.get('/login', (req, res) => {
    const { email } = req.query;
    res.render('login', { errMsg: { email } });
});
router.get('/register', (req, res) => {
    res.render('register', { errMsg: {} });
});
router.get('/center', (req, res) => {
    const _id = req.cookies;
    usersModel.findOne({ _id }, (err, data) => {
        if (data && !err) {
            let ws = fs.createWriteStream(__dirname + '/log.txt', { flags: 'a' });
            ws.write(`邮箱为${data.email}的用户在${new Date()}登录了 \n`);
            ws.close();
            res.render('center', { person: data.nick_name });
        } else {
            res.render('login', { errMsg: {} });
        }
    });

});

module.exports = () => { return router; };