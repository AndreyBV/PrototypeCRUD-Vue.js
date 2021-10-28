module.exports = (app) => {
    const paymentOptions = require('../controllers/paymentOption.controller');

    app.get('/paymentOptions/ListAll', paymentOptions.list)
    app.post('/paymentOptions/Create', paymentOptions.create);
    app.delete('/paymentOptions/Destroy/:Id', paymentOptions.destroy);
    app.put('/paymentOptions/Update/:Id', paymentOptions.update);
    app.put('/paymentOptions/LogicalDestroy/:Id', paymentOptions.logicalDestroy);
    app.get('/paymentOptions/List/:Offset/:Limit', paymentOptions.listWithoutDestroy);
    app.get('/paymentOptions/CountItems', paymentOptions.countItems);
}