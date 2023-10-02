const Koa = require('koa')
const serve = require('koa-static')
const app = new Koa()
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const proxy = require('koa2-proxy-middleware')
const myHost = require('./.my_settings.js')
app.use(proxy({
    targets: {
        '/prod-api/(.*)':{
            target: myHost.myUrl + '/api/',
            changeOrigin: true,
            pathRewrite: {
                '/prod-api': ''
              }
        }
    }
}))
app.use(historyApiFallback({
    whiteList: ['/prod-api']
}))
app.use(serve(__dirname + "/public"))

app.listen(3333,function(){
    console.log('启动,访问地址 http://localhost:3333')
})