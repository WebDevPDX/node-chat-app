var express = require('express')
var app = express()

var expressWs = require('express-ws')(app)

var nextId = 1
var clients = {}

app.ws('/chat', function(ws, req) {
  var clientId = nextId
  clients[clientId] = {ws : ws}
  nextId++
  ws.on('message', function(msgString) {
    var msg = JSON.parse(msgString)
    var msgToSend = JSON.stringify({
      clientId: clientId,
      message: msg.messageText
    })
    Object.keys(clients).forEach(function(client) {
      clients[client].ws.send(msgToSend)
    })
  })
})

app.use(express.static('public'))

app.listen(3000)
