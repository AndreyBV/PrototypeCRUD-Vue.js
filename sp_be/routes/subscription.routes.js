module.exports = (app) => {
    const subscriptions = require('../controllers/subscription.controller');

    app.get('/subscriptions/ListAll', subscriptions.list)
    app.post('/subscriptions/Create', subscriptions.create);
    app.delete('/subscriptions/Destroy/:Id', subscriptions.destroy);
    app.put('/subscriptions/Update/:Id', subscriptions.update);
    app.put('/subscriptions/LogicalDestroy/:Id', subscriptions.logicalDestroy);
    app.get('/subscriptions/List/:Offset/:Limit', subscriptions.listWithoutDestroy);
    app.get('/subscriptions/CountItems', subscriptions.countItems);
}