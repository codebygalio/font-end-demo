const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo.js')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 查询用户基本信息
router.get('/userinfo',userinfo_handler.getUserInfo)
// 更新用户基本信息
router.post('/updateinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
// 更新用户密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatepwd)
// 更新用户头像
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)
module.exports = router