const db = require('../db/db')
const bcrypt = require('bcryptjs')

// 查询用户基本信息
exports.getUserInfo = (req,res) =>{
const sql = 'select id, user, nickname, email, user_pic from user where id=?'
db.query(sql, req.user.id, (err,results) => {
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('获取用户信息失败!')
    res.send({
        status: 0,
        message: '获取用户信息成功!',
        data: results[0]
    })
})
}
// 更新用户基本信息
exports.updateUserInfo = (req,res) => {
    const sql = 'update user set ? where id=?'
    db.query(sql,[req.body, req.user.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('更新用户的基本信息失败')
        res.cc('更新用户数据成功',0)
    })
}

// 更新用户密码
exports.updatepwd = (req,res) => {
    const sql = 'select password from user where ?'
    db.query(sql,{id:req.user.id},(err,results)=>{
        if(err) return res.cc(err)
        if(results.length < 1) return res.cc('获取用户信息失败')
        const compare_password = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compare_password) return res.cc('密码输入错误,请输入正确的密码')
        req.body.newPwd = bcrypt.hashSync(req.body.newPwd,12)
        const sql_update_password = 'update user set ?  where ?'
        db.query(sql_update_password,[{password: req.body.newPwd},{id: req.user.id}],(err,results) => {
            if (err) return res.cc(err)
            if(results.affectedRows !==1) return res.cc('更新用户的基本信息失败')
            res.cc('更新用户密码成功',0)
        })
    })
}

// 更新用户头像
exports.updateAvatar = (req,res)=>{
    const sql = 'update user set ? where ?'
    db.query(sql,[{user_pic:req.body.avatar},{id:req.user.id}],(err,results)=>{
        if (err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('更新用户头像失败')
        res.cc('更新用户头像成功',0)
    })
}