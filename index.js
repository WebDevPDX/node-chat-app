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

var clients = []

wss.on("connection", function(ws) {
  console.log('websocket connected')
  clients.push(ws)
  console.log(clients)

  ws.onmessage = function(event) {
    var receivedMsg = JSON.parse(event.data)
    console.log('message reeived ', receivedMsg.messageText)
    // var messageToSend = {
    //   clientId = clientId
    //   messageText: receivedMsg.messageText
    // }

    ws.send(JSON.stringify(receivedMsg))
  }





  // ws.on("close", function() {
  //   console.log("websocket connection close")
  //   clearInterval(id)
  // })
})
