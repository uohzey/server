import db from "../db/index.js"
import bcrypt from "bcryptjs"
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

export function updateUserInfo(req, res) {
    //定义待执行的SQL语句
    const sql = `update ev_users set ? where id=?`
    //调用db.query()执行SQL语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        //执行SQL语句失败
        if (err) {
            return res.cc(err)
        }
        //执行SQL语句成功,影响行数不等于1
        if (results.affectedRows !== 1) {
            return res.cc('更新用户的基本信息失败!')
        }
        //success
        res.cc('更新用户信息成功', 0)
    })
}

export function updatePassword(req, res) {
    //根据id查询用户信息
    const sql = `select * from ev_users where id=?`
    //执行根据id查询用户的信息的SQL语句
    db.query(sql, req.auth.id, (err, results) => {
        //执行SQL失败
        if (err) {
            return res.cc(err)
        }
        //判断结果是否存在
        if (results.length !== 1) {
            return res.cc('用户不存在')
        }
        //判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.cc('旧密码错误')
        }
        //更新数据库中的密码
        const sql = `update ev_users set password=? where id =?`
        //对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        //db.query()执行SQL语句
        db.query(sql, [newPwd, req.auth.id], (err, results) => {
            //执行sql失败
            if (err) {
                return res.cc(err)
            }
            //判断影响的行数
            if (results.affectedRows !== 1) {
                return res.cc('更新密码失败!')
            }
            //成功
            res.cc('更新密码成功', 0)
        })
    })
}

export function updateAvatar(req, res) {
    //定义更新头像的sql语句
    const sql = `update ev_users set user_pic=? where id=?`
    //调用db.query()执行sql语句
    db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        //影响行数
        if (results.affectedRows !== 1) {
            return res.cc('更换头像失败')
        }
        //success
        res.cc('更换头像成功', 0)
    })
}