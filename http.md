# http

## http协议

- 计算机之间通信所必须公共遵守的规定或规则
- HTTP超文本传输协议，一种基于TCP/IP应用层通信协议
![image](https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=609314491,395251623&fm=26&gp=0.jpg)
- 客户端和服务器之间传输的内容叫作报文
- http协议规定了报文的格式，客户端发给服务端的报文叫作请求报文，服务端发给客户端的报文叫作响应报文

## 报文

### 请求报文

- 请求头
- 请求体

### 响应报文

- 响应头
- 响应体

## 特点

- 无状态，现在cookie解决了无状态的问题(早期网页开发时，用cookie解决，现在是cookie和session配合使用)

## 版本

- http 1.0(老版本) ------------ 不支持长连接
- http 1.1(主流版本) ---------- 支持长连接，但同时发送资源的数量过小
- http 2.0(最新版) ------------ 同时发送资源的数量提升了

## 报文组成

- 报文首行
- 报文头
- 空行
- 报文体

## GET请求报文（给服务器看的）-- 通过form表单发送的GET请求

    GET http://localhost:3000/?name=kobe&password=123 HTTP/1.1
    Host: localhost:3000
    Connection: keep-alive
    Pragma: no-cache
    Cache-Control: no-cache
    Upgrade-Insecure-Requests: 1
    DNT: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://localhost:63347/0719_node/demo.html?_ijt=tphpp47dag8jevtqrnq44blv6p
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    空行
    空行

### GET请求报文首行

    GET http://localhost:3000/?name=kobe&password=123 HTTP/1.1
    请求方式 协议名://主机地址:端口号/？urlencoded编码形式的参数 协议名/版本

## GET请求报文头

    Host: localhost:3000
    发送请求的目标主机：主机名:端口号
    Connection: keep-alive
    浏览器告诉服务器，浏览器支持长连接。
    Pragma: no-cache
    不走缓存
    Cache-Control: no-cache
    不走缓存(强缓存)
    Upgrade-Insecure-Requests: 1
    浏览器告诉服务器可以使用 https或http1.1
    DNT: 1
    浏览器告诉服务器：禁止跟踪。最终是否跟踪，还得看服务器是否配合。
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
    用户代理：之前该字段用于判断用户的浏览器品牌以及版本，但是现在不好用了。
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    浏览器能够接收资源的类型及优先级，优先级不写默认是1,1的优先级是最高的。
    Referer: http://localhost:63347/0719_node/demo.html?_ijt=tphpp47dag8jevtqrnq44blv6p
    本次请求是“站”在哪里发出去的。 1.防盗链。 2.广告计费
    Accept-Encoding: gzip, deflate, br
    浏览器告诉服务器，浏览器所能接受的压缩文件类型。
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    浏览器告诉服务器，浏览器所能支持的语言种类，及权重。
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    Webstorm给你种下的cookie

### GET空行

### GET请求报文体

    GET请求没有报文体

## POST请求报文（给服务器看的）-- 通过form表单发送的POST请求

    POST http://localhost:3000/ HTTP/1.1
    Host: localhost:3000
    Connection: keep-alive
    Content-Length: 22
    Pragma: no-cache
    Cache-Control: no-cache
    Origin: http://localhost:63347
    Upgrade-Insecure-Requests: 1
    DNT: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://localhost:63347/0719_node/day04/5.http%E6%8A%A5%E6%96%87&%E7%8A%B6%E6%80%81%E7%A0%81/%E6%BC%94%E7%A4%BA%E9%98%B2%E7%9B%97%E9%93%BE.html?_ijt=v73gogoe0uaatcie38ma6l7gso
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    空行
    name=kobe&password=123

### POST请求报文首行

     POST http://localhost:3000/ HTTP/1.1

### POST请求报文头

    Host: localhost:3000
    Connection: keep-alive
    【Content-Length: 22】
    返回数据的长度
    Pragma: no-cache
    Cache-Control: no-cache
    【Origin: http://localhost:63347】
    精简版的Referer  1.防盗链。 2.广告计费
    Upgrade-Insecure-Requests: 1
    DNT: 1
    【Content-Type: application/x-www-form-urlencoded】
    浏览器告诉服务器，发送数据的类型
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://localhost:63347/0719_node/demo.html?_ijt=r08g7l67qsmghv05cf7mphidka
    “站”在哪里发出去的请求(源站)  1.防盗链。 2.广告计费
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a

### POST空行

    空行

### POST请求报文体

    name=kobe&password=123

### 备注

- form表单的 post请求和get请求 参数均已urlencoded形式进行编码
- get请求将urlencoded编码的参数放入请求地址携带给服务器，所以称之为：查询字符串参数。
- post请求将urlencoded编码的参数放入请求体，所以称之为：请求体参数。

## 响应报文(给浏览器看的)

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: text/html; charset=utf-8
    Content-Length: 2
    ETag: W/"2-eoX0dku9ba8cNUXvu/DyeabcC+s"
    Date: Fri, 01 Nov 2019 08:24:19 GMT
    Connection: keep-alive
    空行
    ok

### 响应报文首行

     HTTP/1.1 200 OK
       --协议名/协议版本 状态码 

### 响应报文头

    X-Powered-By: Express 
    服务器所采用的框架（尽量不要让用户知道服务器具体采用的技术）
    Content-Type: text/html; charset=utf-8
    告诉浏览器返回资源的类型及编码格式
    Content-Length: 2
    返回数据的长度
    ETag: W/"2-eoX0dku9ba8cNUXvu/DyeabcC+s"
    协商缓存必要字段
    Date: Fri, 01 Nov 2019 08:24:19 GMT
    响应的日期+时间
    Connection: keep-alive
    服务器告诉浏览器，下次请求时，或许会采用长连接。

### 响应空行

### 响应报文体

    ok

## http状态码

### 作用

- 告诉客户端，当前服务器处理请求的结果

### http状态码的分类

- 1xx : 服务器已经收到了本次请求，但是还需要进一步的处理才可以
- 2xx : 服务器已经收到了本次请求，且已经分析、处理等......最终处理完毕
- 3xx : 服务器已经收到了请求，还需要其他的资源，或者重定向到其他位置，甚至交给其他服务器处理
- 4xx : 一般指请求的参数或者地址有错误，出现了服务器无法理解的请求(一般是前端)
- 5xx : 服务器内部错误，无法响应用户请求

### 常见状态码

- 200 : 成功
- 301 : 重定向，被请求的旧资源永久移除了(不可访问)，将会跳转到一个新的资源，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址
- 302 : 重定向，被请求的旧资源还在(可以访问)，但会临时跳转一个新资源，搜索引擎会抓取新的内容而保存旧的网址
- 304 : 请求资源重定向到缓存中(命中了协商缓存)
- 404 : 资源未找到，一般是客户端请求了不存在的资源
- 500 : 服务器收到了请求，但是服务器内部产生了错误
- 502 : 连接服务器失败(服务器在处理一个请求的时候，或许需要其他的服务器配合，但是联系不上其他的服务器了)

## 跳转

### 服务端跳转

- 一次请求，一次响应(302)

### 客户端跳转

- 两次请求，两次响应(301)
