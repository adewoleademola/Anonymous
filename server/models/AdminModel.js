const BaseModel = require('./BaseModel');

class Admin extends BaseModel {
    constructor (email, firstName, lastName, mobile, password) {
        super();
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.password = password;
    }
}

module.exports = Admin;