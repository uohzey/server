import { Router } from 'express'
import * as dataRead_hanlder from '../router_handler/dataread.js'

const router = Router()

router.post('/acl', dataRead_hanlder.getDataFromAcl)

//暴露路由
export default router