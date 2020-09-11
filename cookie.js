const express = require('express');


const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('未种cookie');
});
app.get('/demo1', (req, res) => {
    let obj = {name: 'zhangsan', age: 18};
    res.cookie('peiqi', JSON.stringify(obj));
    res.send('种下会话cookie');
});
app.get('/demo2', (req, res) => {
    res.cookie('peiqi', 'hello', {maxAge: 1000 * 60});
    res.send('种下持久cookie');
});
app.get('/demo3', (req, res) => {
    res.cookie('peiqi', '', {maxAge: 0});
    // res.clearCookie('peiqi');
    res.send('删除cookie');
});
app.get('/demo4', (req, res) => {
    console.log(req.cookies);
    // let {peiqi} = req.cookies;
    // peiqi = JSON.parse(peiqi);
    // console.log(peiqi.name);
    res.send('取出cookie');
})
app.listen(3000, function(err){
    if(!err){
        console.log('服务器启动成功！');
    }else{
        console.log('服务器启动失败!');
    }
});