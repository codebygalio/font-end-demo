
const Vue = require('vue')
const server = require('express')()

// 引入vue服务端渲染插件 把vue组件渲染成字符串
const renderer = require('vue-server-renderer').createRenderer()



server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `
     <div>
        访问的 URL 是：{{ url }}
        <button @click="alert(123)">click me!</button>
     </div>`,
  })
  renderer.renderToString(app, (err, html) => {
    if (err) throw err
    res.send(html)
  })
})


server.listen(8888,() => console.log(`Example app listening on port 8888!`))
