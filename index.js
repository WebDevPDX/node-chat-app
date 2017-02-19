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
var received = ''

wss.on("connection", function(ws) {
  console.log('websocket connected')

  clients.push(ws);
  ws.on('message', function(message) {
      console.log('received: %s', message);
      sendAll(message);
  });
  // ws.send("NEW USER JOINED");
});

function sendAll(message) {
  console.log(message)
  clients.forEach(function(client) {
    client.send(message)
  })
}
