// GET ws://localhost:8888/ HTTP/1.1
// Connection: Upgrade
// Upgrade: websocket
// Sec-WebSocket-Version: 13
// Sec-WebSocket-Key: vYj+qHwdZqxW6AUTbIFIPw==

const mytest = `aaaaa
bbbb
cccc
ddd
eeee
`
let net = require('net');
let server = net.createServer(function(socket){
    socket.once('data',function(data){
        data = data.toString()
        console.log('data',data)
        if(data.match(/Connection: Upgrade/)){
            let rows = data.split('\r\n')
            // console.log('rowbefore=',rows)
            rows = rows.slice(1,-2)
            // console.log('rowsafter=',rows)
            let headers = {}
            rows.reduce((memo,item)=>{
                let [key,value] = item.split(': ')
                memo[key] = value
                return memo
            },headers)
            console.log(headers)
        }
    })
})
server.listen(9999)