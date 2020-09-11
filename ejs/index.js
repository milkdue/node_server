const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

let personArr = [
    {name: '张三', age: 18},
    {name: '李四', age: 19},
    {name: '王五', age: 20}
];

app.get('/show', function(req, res){
    
    res.render('person.ejs', {persons: personArr});
})

app.listen(3000, function(err){
    if(!err){
        console.log('服务器启动成功！');
    }
})