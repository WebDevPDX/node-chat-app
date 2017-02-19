var host = location.origin.replace(/^http/, 'ws')
console.log(host)
var ws = new WebSocket(host)

https://afternoon-basin-55069.herokuapp.com/)

ws.onopen = function(event) {
  initializeChatClient()
}

function initializeChatClient() {
  var conversationBox = document.querySelector('#conversationWindow')
  var chatbox = document.querySelector('.chatbox')
  var messageText = chatbox.querySelector('#messageInput')
  var sendButton = chatbox.querySelector('#sendMessage')
  var userName = chatbox.querySelector('#userName')
  var color = chatbox.querySelector('#color')


  ws.onmessage = function(event) {
    console.log(event.data)
    var receivedMsg = JSON.parse(event.data)
    var node = document.createElement('p')
    console.log(receivedMsg)
    node.style.color = receivedMsg.color
    node.innerText = receivedMsg.time + '  >  ' + receivedMsg.userName + ' says: ' + receivedMsg.messageText
    conversationBox.appendChild(node)
  }

  sendButton.addEventListener('click', function(){
    if (!messageText.value) {
      alert('Please enter a message before sending')
      return
    }
    if (!userName.value) {
      alert('Please enter a user name before sending')
      return
    }
    var timestamp = new Date().toLocaleTimeString()
    var message = JSON.stringify({
      userName: userName.value,
      messageText: messageText.value,
      time: timestamp,
      color: color.value || 'black'
    })
    console.log(message)
    ws.send(message)
    messageInput.value = ''
  })
}
