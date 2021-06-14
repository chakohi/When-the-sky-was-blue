// create express web server
const express = require('express'); 
const app = express();
const path = require("path");
//choose port
const port = 3000;
const server = app.listen(process.env.PORT || port);
var socket = require('socket.io');
var io = socket(server, {'transports': ['websocket', 'polling']});


app.use(express.static(path.join(__dirname, "public/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "index.html"));
});


var userCount = 0;
io.sockets.on('connection', function (socket) {
  console.log('new connection: ' + socket.id);
  userCount++;
  console.log("Current user count",userCount);

  socket.on('usersConnected',() =>{
    socket.emit("clientreceiveusersconnected",(userCount));
  })

  socket.on('disconnect',function(){
    console.log(' the following user just left :( ->' + socket.id);
    userCount--;
    console.log('User Count: ',userCount)
    //update the user count for all users on every disconnect event;
    socket.emit('clientreceiveusersconnected', userCount);
  })
  

});

console.log('Server Running in Port: ',port);
