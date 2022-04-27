
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
         //1.定义一个str字符串,专门存储客户端发送过来的请求体数据
         let str = ''
         //2.监听req的data事件
         req.on('data', (chunk) => {
             str += chunk
         })
         ```
   3. 监听res的end

      ```js
      //3.监听req的end事件
      req.on('end', () => {
          console.log(str);
      })
      ```
   4. 使用querystring模块解析请求体数据

         1. nodejs内置querystring模块专门用来查询字符串,通过这个模块提供的parse()函数,可以轻松把查询字符串,解析成对象的格式.

   5. 将解析出来的数据对象挂载为req.body

         1. 供下游使用(上游中间件和下游中间件及路由之间共享一份req和res)

   6. 将自定义中间件封装为模块

#### CORS跨域资源共享

- CORS(跨域资源共享)由一系列HTTP响应头组成,这些HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源.

- 浏览器的同源安全策略默认会阻止网页"跨域"获取资源,但如果接口服务器配置了CORS相关的HTTP响应头,就可以解除浏览器端的跨域访问限制(默认响应结果会被浏览器拦截)

- 注意事项:

  - 主要在服务端进行配置,客户端浏览器无需做额外的配置
  - 有兼容性

- CORS响应头部

  - Access-Control-Allow-Origin

    ```js
    Access-Control-Allow-Origin: <origin> | *
    ```

    其中,origin参数的值指定了允许访问该资源的外域URL

    下面字段值将只允许来自http://www.baidu.com的请求:

    ```js
    res.setHeader('Access-Control-Allow-Origin', 'http://www.baidu.com')
    ```

    如果指定字段的值为通配符*,表示允许来自任何域的请求

    ```js
    res.setHeader('Access-Control-Allow-Origin', '*')
    ```

  - Access-Control-Allow-Headers

    默认情况下仅支持以下9个请求头
  
    - Accept
    - Accept-Language
    - Content-Language
    - DPR
    - Downlink
    - Save-Data
    - Viewport-Width
    - Width
    - Content-Type
  
    如果发送了额外的请求头信息,需要在服务器端通过Access-Control-Headers对额外的请求头进行声明
  
    ```js
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Cunstom-Header')
    ```
  
  
  - Access-Control-Allow-Methods
  
    默认情况下.CORS仅支持客户端发起GET,POST,HEAD请求
  
    如果客户端虚妄通过PUT,DELETE等方式请求服务器的资源,则需要在服务器端,通过Access-Control-Allow-Methods来指明实际所请求的HTTP方法
  
    ```js
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
    //允许所有HTTP
    res.setHeader('Access-Control-Allow-Methods', '*')
    ```
  
  - 简单请求(满足以下两大要求)
  
    - 请求方式:GET,POST,HEAD三者之一
    - HTTP头部信息不超过以下几种字段:五自定义头部字段,Accept,Accept-Language,Content-Language,DPR,Downlink,Save-Data,Viewport-Width,Width,Content-Type(只有三个值application/x-www.fprm-urlencoded,multipart/form-data,text/plain)
  
  - 预检请求(满足任何一个条件)
  
    - 请求方式为GET,POST,HEAD之外的请求Method类型
    - 请求头包含自定义头部字段
    - 向服务器发送了application/json格式的数据
  
    在浏览器与服务器正式通信之前,浏览器会先发送OPTION请求进行预检,以获取服务器是否允许该实际请求,服务器成功响应后,才会发送真正的请求,并且携带真实数据
  
  - 简单请求与预检请求区别

- 实现JSONP接口
  - 获取客户端发送过来的回调函数的名字
  - 得到要通过JSONP形式发送给客户端的数据
  - 根据前两步得到的数据,拼接出一个函数调用的字符串
  - 把上一步拼接到的字符串,相应给客户端的<script>标签进行解析执行

