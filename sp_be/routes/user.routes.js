
module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/user', admins.create);
}