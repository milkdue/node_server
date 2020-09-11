const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 使用第三方中间件 解析post请求请求体种所携带的
// urlencoded编码形式的参数为一个对象，挂载到request对象上
// app.use(bodyParser.urlencoded({extended : true}));
// 内置中间件 express 和挂载同理 
app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.send('ok');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('post');
});

app.listen(3000, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('服务器连接成功')
    }
});