const http = require('http');
const cors = require("cors");
const { test, messageRouter, adminRouter } = require('./routes/index')
const express = require('express');
const socketIo = require('socket.io');
const { initSocket } = require('./socket')

const app = express()

//middleware
app.use(express.json());
app.use(cors());

app.use('/api', test);
app.use('/api/messages', messageRouter);
app.use('/api/admin', adminRouter);

const port = '5000';
const hostname = '0.0.0.0';

// Socket server
const socketConfig = {
    cors: {
      origin: "*",
    },
  };
  
const server = http.createServer(app);
const io = socketIo(server, socketConfig);
initSocket(io);

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});
