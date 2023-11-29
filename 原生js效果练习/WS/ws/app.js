const express = require('express')
const app = express()
app.use('/',express.static(__dirname))
app.listen(5000,()=>{
    console.log('http://localhost:5000')
})
let websocketServer= require('ws').Server;
let server = new websocketServer({port:8888})
server.on('connection',function(socket){
    console.log('服务端监听到了')
    socket.on('message',function(message){
        console.log('message=',message)
        socket.send('服务器发送')
    })
})