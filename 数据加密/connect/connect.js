/**
 * 此模块用于连接数据库(向外暴露一个函数)
 * 1. 连接成功，执行无参回调
 * 2. 连接失败，执行有参回调
 */
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

module.exports = function(callback){
    mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('open', function(err){
        if(!err){
            callback();
            console.log('数据库连接成功！');
        }else{
            callback(err);
        }
    });
}