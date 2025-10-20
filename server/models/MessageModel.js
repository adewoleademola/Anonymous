const BaseModel = require('./BaseModel');

class Message extends BaseModel {
    constructor(student, category, subject, description, location, date) {
        super();
        this.student = student;
        this.category = category;
        this.subject = subject;
        this.description = description;
        this.location = location;
        this.date = date;
    }
}

module.exports = Message;