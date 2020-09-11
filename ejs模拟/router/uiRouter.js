/**
 * 
 * 此模块用于使用router中间件
 */

// const express = require('express');
// const router = express.Router;
const {Router} = require('express');
const path = require('path');
let router = new Router();

router.get('/register', function (req, res) {
    res.render('register', {errMsg: {}});
});
router.get('/login', function (req, res) {
    let {email} = req.query;
    res.render('login', {errMsg: {email}});
});

module.exports = function(){
    return router;
}