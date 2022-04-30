//导入数据库操作模块
import db from "../db/index.js";


export function regUser(req, res) {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body;
    //对表单中的数据进行合法性校验
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不合法!' })
    }


    //定义SQL语句,查询用户名是否被使用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        //执行SQL语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '用户名被占用,请更换其他用户名!' })
        }

        //TODO:用户名可以使用
    })
}

export function login(req, res) {
    res.send('login OK')
}