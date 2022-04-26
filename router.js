import { Router } from "express";

// 创建路由对象
const router = Router()
// 挂载具体的路由
router.get('/user/list', function (req, res) {
    res.send('Get user list.');
})

router.get('/user/add', function (req, res) {
    res.send('Add success')
})
// 向外导出路由
export default router