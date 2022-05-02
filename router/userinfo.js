import { Router } from "express";
const router = Router()
//导入路由处理函数模块
import * as userinfo_handler from '../router_handler/userinfo.js'

//挂载路由
router.get('/userinfo', userinfo_handler.getUserInfo)


export default router