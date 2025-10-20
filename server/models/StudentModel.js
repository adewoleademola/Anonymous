const BaseModel = require('./BaseModel')

class Student extends BaseModel {
    constructor() {
        super();
        this.name = `Anonymous${this.id.slice(1, 7)}`;
    }
}

module.exports = Student;