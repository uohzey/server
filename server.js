import express from 'express';
// 导入路由模块
import router from './router.js'

import bodyParser from './uohzey-body-parser.js'

// import parser from 'body-parser';

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

//时间戳转换为真实事件
function TimeExample(timeexample) {
    var date = new Date(timeexample);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}
//配置解析application/json格式数据的内置中间件
// app.use(express.json())

//配置解析 application/x-www-form-urlencoded格式数据的内置中间件
// app.use(express.urlencoded({ extended: false }))

//解析表单数据的中间件
// app.use(parser.urlencoded({ extended: false }))

//自定义解析表单数据中间件
app.use(bodyParser)

// 全局中间件简化形式
app.use(function (req, res, next) {
    console.log('这是一个最简单的中间件');
    // 获取请求到达服务器的时间
    const time = TimeExample(Date.now())
    // 为req对象挂载自定义属性,从而把时间共享给后面的所有路由
    req.startTime = time
    next()
})

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

//请求体数据放到body面板中
app.post('/test', (req, res) => {
    //在服务器可以使用req.body来接收客户端发送过来的请求体数据
    //默认情况下如果不配置表单数据的中间件,则req.body默认等于undefined
    console.log(req.body);
    res.send('ok')
})

app.post('/post', (req, res) => {
    //在服务器可以使用req.body来接收客户端发送过来的请求体数据
    //url-encoded
    console.log(req.body);
    res.send('ok')
})

app.get('/', mw1, function (req, res) {
    res.send('Hello World ' + req.startTime)
})

app.get('/user', function (req, res) {
    res.send('Hello World' + req.startTime)
})

app.post('/user', function (req, res) {
    res.send(req.body)
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