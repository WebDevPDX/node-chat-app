var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {

  console.log('message received', msgString)

  // ws.on("close", function() {
  //   console.log("websocket connection close")
  //   clearInterval(id)
  // })
})



// var express = require('express')
// var app = express()
//
// var expressWs = require('express-ws')(app)
//
// var nextId = 1
// var clients = {}
//
// app.ws('/chat', function(ws, req) {
//   var clientId = nextId
//   clients[clientId] = {ws : ws}
//   nextId++
//   ws.on('message', function(msgString) {
//     console.log('message received', msgString)
//     var msg = JSON.parse(msgString)
//     var msgToSend = JSON.stringify({
//       clientId: clientId,
//       message: msg.messageText
//     })
//     Object.keys(clients).forEach(function(client) {
//       console.log('sending message from server', msgToSend)
//       clients[client].ws.send(msgToSend)
//     })
//   })
// })
//
// app.use(express.static('public'))
