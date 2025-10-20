const Admin = require('../models/AdminModel')

function createAdmin(req, res) { // api/admin/signup
    const { firstName, lastName, password, email, mobile } = req.body;

    const admin = new Admin(email, firstName, lastName, mobile, password)
    const key = `Admin.${email}`
    admin.save(key)

    return res.status(200).json({ status: 'success', message: 'admin Created, proceed to login' })
}

function adminLogin(req, res) { // api/admin/signin
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'email or password cant be empty'});
    }

    const key = `Admin.${email}`;
    const admin = Admin.search("Admin", key);
    if (!admin) {
        return res.status(404).json({status: 'error', message: 'admin deos not exist'});
    }

    if (admin.password !== password) {
        return res.status(400).json({status: 'error', message: 'password incorrect'});
    }

    return res.status(200).json({ status: 'success', data: admin });
}

module.exports = { createAdmin, adminLogin }