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
  var message = chatbox.querySelector('#messageInput')
  var sendButton = chatbox.querySelector('#sendMessage')

  ws.onmessage = function(event) {
    var node = document.createElement('p')
    var receivedMsg = JSON.parse(event.data)
    // console.log(receivedMsg)
    node.innerText = 'says: ' + receivedMsg.messageText
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
