/**
 * 此模块用于创建模型对象,向外暴露模型对象
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersRule = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nick_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now()
    },
    enable_flag: {
        type: String,
        default: 'Y'
    }
});

module.exports = mongoose.model('users', usersRule);