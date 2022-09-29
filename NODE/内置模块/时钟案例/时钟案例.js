const fs = require('fs')
const path = require('path')

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, './clock/index.html'), 'utf8', function(err, dataStr) {
  if (err) return console.log('读取HTML文件失败！' + err.message)
  //  读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})

// 处理 css 脚本的方法
function resolveCSS(htmlStr) {
  const r1 = regStyle.exec(htmlStr)
  if(!r1)return 
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  fs.writeFile(path.join(__dirname, './clock/css/index.css'), newCSS, function(err) {
    if (err) return console.log('写入 CSS 样式失败！' + err.message)
    console.log('写入样式文件成功！')
  })
}

//处理 js 脚本的方法
function resolveJS(htmlStr) {
  const r2 = regScript.exec(htmlStr)
  if(!r2)return
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, function(err) {
    if (err) return console.log('写入 JavaScript 脚本失败！' + err.message)
    console.log('写入 JS 脚本成功！')
  })
}

//  定义处理 HTML 结构的方法
function resolveHTML(htmlStr) {
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
  fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err) {
    if (err) return console.log('写入 HTML 文件失败！' + err.message)
    console.log('写入 HTML 页面成功！')
  })
}
