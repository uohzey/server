import expressJoi from '@escook/express-joi'
import { Router } from 'express'
import * as artCate_hanlder from '../router_handler/artcate.js'
import { add_cate_schema, delete_cate_schema, get_cate_schema } from '../schema/artcate.js'

const router = Router()

router.get('/cates', artCate_hanlder.getArticleCates)
router.post('/addcates', expressJoi(add_cate_schema), artCate_hanlder.addArticleCates)
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_hanlder.deleteCateById)
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_hanlder.getArtCateById)

export default router