# session

## session是什么

- 标准来说session指会话
  - 前端通过浏览器查看cookie的时候，会发现有些cookie的过期时间是:session，意味着该cookie是会话cookie
  - 后端人员常把session会话存储简称session存储,或者简单叫session
- 特点
  - 存在服务器
  - 存储的是浏览器和服务器之间沟通产生的一些信息
- 默认的session的存储在服务器的内存中，每当一个新客户端发来请求，服务器会开辟一块空间，供session会话存储使用
- 工作流程
  - 第一次浏览器请求服务器时，服务器开辟新的内存空间，供session会话使用
  - 返回响应时，会自动返回一个cookie(有时会返回多个，为了安全)，cookie里包含着，上一步产生会话存储容器的编号(id)
  - 以后请求的时候，会自动带上这个cookie,给服务器
  - 服务器从该cookie中拿到对应的session的id，去服务器匹配
  - 服务器从根据匹配的信息决定下一步
- 备注
  - 一般来说cookie一定会配合session使用
  - 服务端一般会做session的持久化，防止服务器重启，session丢失
