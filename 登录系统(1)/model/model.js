const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let userRule = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nick_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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

// 生成模型对象
module.exports = mongoose.model('users', userRule);