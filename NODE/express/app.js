const express = require('express')
const app = express()
// 跨域
const cors = require('cors')
app.use(cors())
// 解析表单
app.use(express.urlencoded({extended: false}))
//开放文件夹访问
app.use('/uploads',express.static('./uploads'))
//封装send返回JSON
app.use((req,res,next)=>{
    res.cc = function(err, status=1) {
        res.send({
            status,
        message:err instanceof Error ? err.message : err,
        })
    }
    next()
})
//设置JWT表单验证
const config = require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api/]}))


//路由
const router = require('./router/user')
app.use('/api',router)
const userinfo = require('./router/userinfo')
app.use('/my',userinfo)
const artcate = require('./router/article_cate')
app.use('/my/artcate',artcate)
const article = require('./router/article')
app.use('/my/article',article)




//处理错误的中间件
const joi = require('joi')
app.use((err, req, res, next)=>{
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    res.cc(err)
})


app.listen(3007,()=>{console.log('我的服务器')})