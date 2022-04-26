import express from 'express';
// 导入路由模块
import router from './router.js'

const app = express()
// 注册路由模块
app.use(router)


// // 最简单的中间件
// const mw = function (req, res, next) {
//     console.log('这是最简单的中间件函数');
//     // 把流转关系转交给下一个中间件或路由
//     next()
// }

// // 全局生效的中间件
// app.use(mw)

// 全局中间件简化形式
app.use(function (req, res, next) {
    console.log('这是一个最简单的中间件');
    // 获取请求到达服务器的时间
    const time = Date.now()
    // 为req对象挂载自定义属性,从而把时间共享给后面的所有路由
    req.startTime = time
    next()
})
/** 
 * 中间件注意事项
 *      1. 在路由之前注册中间件(except:错误级别中间件)
 *      2. 客户端发送过来的请求可以连续调用多个中间件
 *      3. 执行完中间件的业务代码之后,不要忘记调用next()函数
 *      4. 为了防止代码逻辑混乱,next()函数之后不要添加额外的代码
 *      5. 连续调用多个中间件.共享req和res对象
 * 中间件分类
 *      1. 应用级别
 *          1. app.use(),app.get(), app.post()绑定到app实例上的中间件
 *      2. 路由级别
 *          1. 绑定到express.router()实例上的中间件
 *      3. 错误级别
 *          1. 捕获整个项目中发生的异常错误,防止项目崩溃
 *          2. function有四个形参,(err,req,res,next)
 *          3. 错误级别中间件必须注册在所有路由之后
 *      4. Express内置
 *      5. 第三方
*/
// 局部生效的中间件
const mw1 = function (req, res, next) {
    console.log('这是局部中间件函数');
    next()
}
app.use(function (req, res, next) {
    console.log('调用了第二个中间件');
    next()
})

// 局部生效的中间件

// 多个中间件之间,共享同一份req和res,我们可以在上游的中间件中,统一为req和res对象添加自定义的属性或方法,供下游的中间件或路由进行使用

// app.get('/user/:ids/:name', function (req, res) {
//     // req.params是动态匹配到的
//     console.log(req.params);
//     res.send(req.params);
// })

app.get('/', mw1, function (req, res) {
    res.send('Hello World' + req.startTime)
})

app.get('/user', function (req, res) {
    res.send('Hello World' + req.startTime)
})

//捕获项目异常
app.use(function (err, req, res, next) {
    console.log('发生了错误' + err.message)
    res.send('Error: ' + err.message)
})

app.listen(80, () => {
    console.log('server running at http://127.0.0.1/');
})

// app.use(express.static('public')) 