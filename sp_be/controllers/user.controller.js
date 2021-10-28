const db = require('../config/db.config');

const Admin = db.admins;

exports.create = (req, res) => {
    Admin.create({
        name: req.body.name,
        password: req.body.password,
        active: req.body.active
    }).then(admin => {
        res.send(admin);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};


// module.exports = professor;
