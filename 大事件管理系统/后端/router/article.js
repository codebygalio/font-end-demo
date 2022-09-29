const express = require('express')
const router = express.Router()
const router_handler = require('../router_handler/article')
const expressJoi = require('@escook/express-joi')
const {add_active_schema, delete_active_schema} = require('../schema/article')



const multer = require('multer')
const path = require('path')
// 增加文章数据带文件上传
const uploads = multer({dest: path.join(__dirname, '../uploads')})
router.get('/list',router_handler.getList)
router.post('/add',uploads.single('cover_img'),expressJoi(add_active_schema),router_handler.add)
router.post('/delete/:Id',expressJoi(delete_active_schema),router_handler.delete)

module.exports = router
