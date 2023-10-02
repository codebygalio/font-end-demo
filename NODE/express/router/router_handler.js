const bcrypt = require('bcryptjs')
const db = require('../db/db')
const jwt = require('jsonwebtoken')
const config = require('../config')


// 注册
exports.reguser = (req,res)=>{
    const userinfo = req.body
    const sqlurl = 'SELECT * FROM user where user=?'
    db.query(sqlurl,userinfo.username,(err,result)=>{
        if(err)return res.cc(err)
        if(result.length > 0)return res.cc('用户名被占用,请更换其他用户名',2)

        userinfo.password = bcrypt.hashSync(userinfo.password,12)
        const sql = 'insert into user set ?' 
        db.query(sql,{user:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err)return res.cc(message)
            if(results.affectedRows !==1)return res.cc('注册失败',1)
           return res.cc('注册成功',0)
        })
    })
    }

    // 登录
    exports.login = (req,res)=>{
        const userinfo = req.body
        const sql_username = "SELECT * FROM user where user=?"
        db.query(sql_username,userinfo.username,(err,results)=>{
            if(err) return res.cc(err)
            if(results.length === 0)return res.cc('账号或密码有错误')
            const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
            if(!compareResult) return res.cc('账号或密码有错误')
            const userr = {...results[0],password:'',user_pic:''}
            const tokenStr = jwt.sign(userr,config.jwtSecretKey,{expiresIn: config.expiresIn})
            res.send({status:0,message:'登录成功',token: 'Bearer ' + tokenStr})
        })
    }

    // 更新密码
    exports.updateUserInfo = (req,res) => {
        const userinfo = req.body 
        const sql = 'update user set ? where ?'
        const password = bcrypt.hashSync(userinfo.password,12)
        db.query(sql,[{password:password},{user:userinfo.username}],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows < 1) return res.cc('更新密码失败',1)
            res.cc('更新密码成功',0)
        })
    }