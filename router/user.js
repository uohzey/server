import { Router } from "express";
import * as useHandler from '../router_handler/user.js'
//用户的路由模块

const router = Router()

//注册新用户
router.post('/reguser', useHandler.regUser)

//登录
router.post('/login', useHandler.login)

//暴露路由
export default router
