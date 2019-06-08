const socket = io()

const message = document.getElementById('message')
const username = document.getElementById('username')
const btn = document.getElementById('send')
const output = document.getElementById('output')
const actions = document.getElementById('actions')

btn.addEventListener('click', () => {
  const obj = {
    username: username.value,
    message: message.value
  }

  socket.emit('chat:message', obj)
})

message.addEventListener('keypress', () => {
  socket.emit('chat:typing', username.value)
})

socket.on('chat:message', data => {
  actions.innerHTML = ''
  output.innerHTML += `
  <p>
    <strong>${data.username}</strong>: ${data.message}
  </p>
  `
})

socket.on('chat:typing', data => {
  actions.innerHTML = `
  <p>
    <em>${data} is typing a message</em>
  </p>
  `
})
