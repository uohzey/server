import db from "../db/index.js"

//获取用户基本信息的处理函数
export function getUserInfo(req, res) {
    //定义查询用户信息的SQL语句
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    //调用db.query()
    db.query(sql, req.auth.id, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        //执行sql语句成功,查询结果为空
        if (results.length !== 1) {
            return res.cc('获取用户信息失败!')
        }
        //用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0],
        })
    })
}