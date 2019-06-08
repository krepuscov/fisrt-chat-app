const express = require('express')
const path = require('path')
const app = express()

// config
app.set('port', process.env.PORT || 3000)

// middlewares

// routes

// static files
app.use(express.static(path.join(__dirname, '/public')))

// server listen
const server = app.listen(app.get('port'), () => {
  console.log(`listen on port ${app.get('port')}`)
})

// Websockets
const SocketIO = require('socket.io')
const io = SocketIO(server)
io.on('connection', socketClient => {
  console.log('new connection', socketClient.id)
  socketClient.on('chat:message', data => {
    io.sockets.emit('chat:message', data)
  })

  socketClient.on('chat:typing', user => {
    socketClient.broadcast.emit('chat:typing', user)
  })
})
