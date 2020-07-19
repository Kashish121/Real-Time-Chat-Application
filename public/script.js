const socket = io('http://localhost:3000', { transports: ['websocket'] })
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
    const name = prompt('What should we call you?')
    appendMessage(`${name} you joined`)
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e => {
        e.preventDefault()
            // prevents refreshing the page every time, *avoids losing conversation history*
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', roomName, message)
        messageInput.value = ''
            // empties message input box after the message is sent
    })
}

socket.on('room-created', room => {
    // <div><% =room %></div>
    // <a href="/<%= room %></div>"
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

// function addingMessage() {
//     messageForm.onsubmit.preventDefault()
//         // prevents refreshing the page every time, *avoids losing conversation history*
//     const message = messageInput.value
//     appendMessage(`You: ${message}`)
//     socket.emit('send-chat-message', message)
//     messageInput.value = ''
//         // empties message input box after the message is sent
// }

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}