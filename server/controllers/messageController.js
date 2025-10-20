const Message = require('../models/MessageModel');
const Student = require('../models/StudentModel');
const Admin = require('../models/AdminModel');

function sendMessage(req, res) { // api/mesages/send-message
    const { category, subject, description, location, date } = req.body;

    const student = new Student()
    const message = new Message(student.name, category, subject, description, location, date);
    message.save()

    return res.status(200).json({ status: 'success', message: 'Message Created Successfully'})
}

function getMessages(req, res) { // api/messages/all
    const { adminid } = req.headers;

    const key = `Admin.${adminid}`
    const admin = Admin.search("Admin", key)

    if (!admin) {
        return res.status(404).json({ status: 'error', message: 'Admin not found' });
    }

    const messages = Message.search("Message")
    const messagesList = Object.values(messages)
    return res.status(200).json({ status: 'success', data: messagesList.reverse() })
}

module.exports = {
    sendMessage,
    getMessages
}