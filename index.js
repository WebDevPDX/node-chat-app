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
    console.log('message received', msgString)
    var msg = JSON.parse(msgString)
    var msgToSend = JSON.stringify({
      clientId: clientId,
      message: msg.messageText
    })
    Object.keys(clients).forEach(function(client) {
      console.log('sending message from server', msgToSend)
      clients[client].ws.send(msgToSend)
    })
  })
})

app.use(express.static('public'))

app.listen(process.env.PORT || 3000, function() {
  console.log('express server started')
})
