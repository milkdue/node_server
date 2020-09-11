# ejs

- 一个后端模板

## ejs语法

1. ```<%任意js代码%>```
2. ```<%-可以写数据，html等%>```
3. ```<%=可以写数据，不会渲染%>```

## 使用方法

1. npm install ejs

```js
app.set('view engine', 'ejs');
// 路径必须是绝对路径
app.set('views', __dirname + '/public');
```
