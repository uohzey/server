import Joi from "joi";

//定义用户名和密码的验证规则
const username = Joi.string().alphanum().min(1).max(10).required()
//^开头,$结尾
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()

const reg_login_schema = {
    body: {
        username,
        password,
    },
}

//定义id,nickname,email的验证规则
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()

const update_userinfo_schema = {
    //需要对req.body里面的数据进行验证
    body: {
        //es6简写 id:id
        id,
        nickname,
        email,
    }
}

// 定义验证注册和登录表单数据的规则对象
export { reg_login_schema, update_userinfo_schema }