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
        //es6简写 id:id => id
        id,
        nickname,
        email,
    }
}

//验证规则对象 - 重置密码
const update_password_schema = {
    body: {
        //验证旧密码
        oldPwd: password,
        //Joi.ref('oldPwd')表示newPwd的值必须和oldPwd保持一致
        //Joi.not(Joi.ref('oldPwd'))表示newPwd的值不能等于oldPwd的值
        //.concat()用于合并Joi.not(Joi.ref('oldPwd))和password这两条验证规则
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
    }
}

//定义avatar头像验证规则
const avatar = Joi.string().dataUri().required()
const update_avatar_schema = {
    body: {
        avatar
    }
}

// 定义验证注册和登录表单数据的规则对象
export { reg_login_schema, update_userinfo_schema, update_password_schema, update_avatar_schema }