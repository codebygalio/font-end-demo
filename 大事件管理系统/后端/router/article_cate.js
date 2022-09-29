const express = require('express')
const router = express.Router()
const router_handler = require('../router_handler/article_cate')
const expressJoi = require('@escook/express-joi')

const {article_schema, id_schema, update_schema} = require('../schema/article_cate')

//获得所有未删除文章分类数据
router.get('/cates',router_handler.getArtCates)
//新增文章分类数据
router.post('/addcates',expressJoi(article_schema),router_handler.addcates)
//删除文章分类数据
router.get('/deletecate/:id',expressJoi(id_schema),router_handler.deletecates)
//获得指定文章分类数据
router.get('/cate/:id',expressJoi(id_schema),router_handler.artcate)
//更新文章分类数据
router.post('/updatecate',expressJoi(update_schema),router_handler.updateCateById)

module.exports = router 