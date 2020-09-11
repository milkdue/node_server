const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true) //使用一个新的索引创建器

// 绑定监听
module.exports = function (callback) {
    mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('open', err => {
        if (!err) {
            console.log('数据库启动成功！');
            callback();
        } else {
            callback('失败！');
        }
    })
}