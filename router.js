import { Router } from "express";

//创建路由对象
const router = Router()


router.get('/get', (req, res) => {
    //通过req.query获取客户端查询字符串,发送到服务器的数据
    const query = req.query
    //调用res.send()方法, 向客户端响应处理的结果
    res.send({
        status: 0,//状态码
        msg: 'GET 请求成功',//状态描述
        data: query//需要相应给客户端的数据
    })
})

router.post('/post', (req, res) => {
    const body = req.body
    res.send({
        status: 0,
        msg: 'POST 请求成功',
        data: body
    })
})
router.delete('/delete', (req, res) => {
    res.send({
        status: 0,
        msg: 'DELETE 请求成功'
    })
})
export default router