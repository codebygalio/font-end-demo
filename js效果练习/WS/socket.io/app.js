const express = require("express");
const app = express();
let {Message} = require('./db')
app.use("/", express.static(__dirname));
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let sockets = {};
io.of('/').on("connection",async function (socket) {
  let username;
  let rooms = []
  socket.on("message", async function (content) {
    if (!username) {
      if (sockets[content]) {
        socket.emit('message',getMsg("用户名已存在"));
        return;
      }
      username = content;
      socket.send(getMsg(`用户名设置 ${username} 成功`));
      socket.broadcast.emit("message", getMsg(`${username} 加入聊天室`));
      sockets[content] = socket;
      return;
    }
    let result = content.match(/@([^ ]+) (.+)/);
    if (result) {
      let toUser = result[1];
      let toSocket = sockets[toUser];
      toSocket && socket.emit('message',getMsg(content, username)) && toSocket.emit('message',getMsg(content, username)); 
      return
    }
    let savedMessage =await Message.create(getMsg(content, username))
    // console.log('savedMessage=',savedMessage)

    // console.log(content);
    if(rooms.length > 0){
      rooms.forEach(room =>{
        io.in(room).emit('message',savedMessage)
      })
      return
    }
    
    io.emit("message", savedMessage);
  });
  socket.on('getAllMessages',async function(){
    let messages =await Message.find().sort({createAt: -1}).limit(10)
    // let messages =await Message.find().sort({create: -1}).limit(10)
    messages.reverse()
    socket.emit('allMessages',messages)
  })
  socket.on('join',function(roomName){
    let index = rooms.indexOf(roomName)
    if(index == -1){
      rooms.push(roomName)
      socket.join(roomName)
      socket.emit('joined',roomName)
    }
  })
  socket.on('leave',function(roomName) {
    let index = rooms.indexOf(roomName)
    if(index != -1){
      rooms.splice(index,1)
      socket.leave(roomName)
      socket.emit('leaved',roomName)
    }
  })
  // console.log("服务器接收到");

});
server.listen(4000);
function getMsg(content, username = "系统") {
  return { username, content, createAt: new Date() };
}
