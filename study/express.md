
### 中间件
#### 中间件注意事项
1. 在路由之前注册中间件(except:错误级别中间件)
2. 客户端发送过来的请求可以连续调用多个中间件
3. 执行完中间件的业务代码之后,不要忘记调用next()函数
4. 为了防止代码逻辑混乱,next()函数之后不要添加额外的代码
5. 连续调用多个中间件.共享req和res对象

#### 中间件分类
1. 应用级别
   1. app.use(), app.get(), app.post()绑定到app实例上的中间件
2. 路由级别
   1. 绑定到express.router()实例上的中间件
3. 错误级别
   1. 捕获整个项目中发生的异常错误,防止项目崩溃
   2. function有四个形参,(err,req,res,next)
   3. 错误级别中间件必须注册在所有路由之后
4. Express内置
   1. express.static()托管静态资源的中间件
   2. express.json快速托管静态资源的内置中间件
   3. express.urlencoded解析URL-encoded格式的请求体数据
5. 第三方 
   1. express@4.16.0之前经常使用body-parser这个中间件,来解析请求体数据
   2. Express内置的express.urlencoded中间件就是基于body-parser这个第三方中间件进一步封装出来的
   3. 

#### 自定义中间件
   1. 自定义中间件
   2. 监听req的data事件
      1. 在中间件中,需要监听req对象的data事件,来获取客户端发送到服务器的数据.
      2. 如果数据量较大,无法一次发送完毕,则客户端会把数据切割后,分批发送服务器,所以data事件可能会被触发多次,每一次触发data事件,获取到的数据只是完整数据的一部分,需要手动对接收到的数据进行拼接
      
         ```js
         //自定义解析表单数据中间件
         app.use(function (req, res, next) {
             //定义业务的逻辑
             //1.定义一个str字符串,专门存储客户端发送过来的请求体数据
             let str = ''
             //2.监听req的data事件(拼接)
             req.on('data', (chunk) => {
                 str += chunk
             })
         })
         ```
   3. 监听res的end
   4. 使用querystring模块解析请求体数据
   5. 将解析出来的数据对象挂载为req.body
   6. 将自定义中间件封装为模块

