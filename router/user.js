import { Router } from "express";
import * as useHandler from '../router_handler/user.js'
//导入验证数据的中间件
import expressJoi from "@escook/express-joi";
//导入需要的验证对象
import reg_login_schema from "../schema/user.js"
//用户的路由模块
const router = Router()

//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), useHandler.regUser)

//登录
router.post('/login', expressJoi(reg_login_schema), useHandler.login)

//暴露路由
export default router
