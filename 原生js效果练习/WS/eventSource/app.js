const express = require('express')
const app = express()
app.use('/',express.static(__dirname))
let count = 0 
app.get('/mytest',(req,res)=>{
    res.setHeader('Content-Type','text/event-stream')
    let $timer=setInterval(()=>{
        res.write(`id:${count++}\nevent:message\ndata:${new Date().toLocaleString()}\n\n`)
    },1000)
    res.on('close',()=>{
        console.log('进入close')
        clearInterval($timer)
    })
})
app.listen(8000,()=>{
    console.log('http://localhost:8000')
})