import qs from 'querystring'

const bodyParser = function bodyParser(req, res, next) {
    //定义业务的逻辑
    //1.定义一个str字符串,专门存储客户端发送过来的请求体数据
    let str = ''
    //2.监听req的data事件
    req.on('data', (chunk) => {
        str += chunk
    })
    //3.监听req的end事件
    //TODO:把字符串格式请求体数据解析成对象格式
    req.on('end', () => {
        const body = qs.parse(str)
        req.body = body
        next()
    })
}

export default bodyParser