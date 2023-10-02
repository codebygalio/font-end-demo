const express = require('express');
const router = express.Router()
const router_handler = require('./router_handler')
const expressJoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user')


//注册
router.post('/reguser',expressJoi(reg_login_schema),router_handler.reguser)
//登录
router.post('/login',expressJoi(reg_login_schema),router_handler.login)
// 更新密码
router.post('/update',expressJoi(reg_login_schema),router_handler.updateUserInfo)
module.exports = router