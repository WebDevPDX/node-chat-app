var ws = new WebSocket('ws://localhost:3000/chat')

ws.onopen = function(event) {
  initializeChatClient()
}

function initializeChatClient() {
  var conversationBox = document.querySelector('#conversationWindow')
  var chatbox = document.querySelector('.chatbox')
  var message = chatbox.querySelector('#messageInput')
  var sendButton = chatbox.querySelector('#sendMessage')

  ws.onmessage = function(event) {
    var node = document.createElement('p')
    var receivedString = JSON.parse(event.data)
    node.innerText = receivedString.clientId + 'says: ' + receivedString.message
    conversationBox.appendChild(node)
  }

  sendButton.addEventListener('click', function(){
    var messageText = message.value
    if (!messageText) {
      alert('Please enter a message before sending')
      return
    }
    ws.send(JSON.stringify({messageText: messageText}))
    messageInput.value = ''
  })

}
