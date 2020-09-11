/**
 * 
 * 此模块用于使用router中间件
 */

// const express = require('express');
// const router = express.Router;
const {Router} = require('express');
const path = require('path');
let router = new Router();
let urlRegister = path.resolve(__dirname, '../public/register.html');
let urlLogin = path.resolve(__dirname, '..//public/login.html');

router.get('/register', function (req, res) {
    res.sendFile(urlRegister);
});
router.get('/login', function (req, res) {
    res.sendFile(urlLogin);
});

module.exports = function(){
    return router;
}