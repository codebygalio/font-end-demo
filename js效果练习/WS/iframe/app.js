const express = require('express')
const app = express()
app.use('/',express.static(__dirname))

app.get('/mytest',(req,res)=>{
    res.setHeader('Content-Type','text/html')
    setInterval(()=>{
        res.write(`<script>
        parent.setTime(new Date().toLocaleString())
    </script>`)
    },1000)
})
app.listen(8000,()=>{
    console.log('http://localhost:8000')
})