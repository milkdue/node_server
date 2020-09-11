let express = require('express');
let app = express();

// 全局中间件 所有请求的第一扇门 如果放在最后就是最后一扇门
app.use((req, res, next) => {
    // res.send('中间件响应');
    // 过滤不合法的请求
    req.demo = 'zhangsan';
    res.demo = 'lisi';

    if(req.get('Referer') !== 'undefined'){
        // 放行
        next();
    }else{
        res.send('禁止非法请求！');ang
    }
    // console.log(req.query);
    // // 放行
    // next();
});

// 第二种使用中间件  更加灵活 不是第一扇门，在任何时候使用
function demo(req, res, next){
    if(req.get('Referer') == 'undefined'){
        // 放行
        next();
    }else{
        res.send('禁止非法请求！');
    }
}

app.get('/', (req, res) => {
    res.send('ok');
    console.log(req.query);
});

app.get('/vue', demo, (req, res) => {
    res.sendFile(__dirname + '/img/vue.png');
})

app.listen(3000, function(err){
    if(!err){
        console.log('服务器启动成功');
    }
})