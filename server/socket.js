let io = null;

function initSocket(socketInstance) {
  io = socketInstance;
  io.on('connection', (socket) => {
    socket.on('send_message', (details) => {
      io.emit('new_message', details);
    });

  });
}

module.exports = { initSocket }