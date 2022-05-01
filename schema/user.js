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

// 定义验证注册和登录表单数据的规则对象
export default reg_login_schema
