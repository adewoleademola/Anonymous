const express = require('express')

const { sendMessage, getMessages } = require('../controllers/messageController');
const { createAdmin, adminLogin } = require('../controllers/adminController');

const test = express.Router()
const messageRouter = express.Router();
const adminRouter = express.Router();

messageRouter.post('/send-message', sendMessage);
messageRouter.get('/all', getMessages);

adminRouter.post('/signup', createAdmin);
adminRouter.post('/login', adminLogin)

test.get('/verify', (req, res) => {
    return res.json({ db: 'true' })
})

module.exports = { messageRouter, adminRouter, test }