# 关于cookie

## 是什么

- 本质就是一个【字符串】，里面包含着浏览器和服务器沟通的信息（交互时产生的存储的形式以：【key-value】的形式存储。
- 浏览器会自动携带该网站的cookie，只要是该网站下的cookie，全部携带。

## 分类

- 会话cookie（关闭浏览器后，会话cookie会自动消失，会话cookie存储在浏览器运行的那块【内存】上）。
- 持久化cookie：（看过期时间，一旦到了过期时间，自动销毁，存储在用户的硬盘上,备注：如果没有到过期时间，同时用户清理了浏览器的缓存，持久化cookie也会消失）。

## 工作原理

- 当浏览器第一次请求服务器的时候，服务器可能返回一个或多个cookie给浏览器
- 浏览器判断cookie种类
- 会话cookie：存储在浏览器运行的那块内存上
- 持久化cookie：存储在用户的硬盘上
- 以后请求该网站的时候，自动携带上该网站的所有cookie（无法进行干预）
- 服务器拿到之前自己“种”下cookie，分析里面的内容，校验cookie的合法性，根据cookie里保存的内容，进行具体的业务逻辑。

## 应用

- 解决http无状态的问题（例子：7天免登录，一般来说不会单独使用cookie，一般配合后台的session存储使用）
- 不同的语言、不同的后端架构cookie的具体语法是不一样的，但是cookie原理和工作过程是不变的。
- 备注：cookie不一定只由服务器生成，前端同样可以生成cookie，但是前端生成的cookie几乎没有意义