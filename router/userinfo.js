import { Router } from "express";
const router = Router()
//导入路由处理函数模块
import * as userinfo_handler from '../router_handler/userinfo.js'
//导入验证数据中间件
import expressJoi from '@escook/express-joi'
//导入需要的验证规则对象
import { update_userinfo_schema, update_password_schema, update_avatar_schema } from '../schema/user.js'

//挂载路由
//获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)
//更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
//更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
//更换头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

export default router