module.exports = (app) => {
    const typeAddPayments = require('../controllers/typeAddPayment.controller');

    app.get('/typeAddPayments/ListAll', typeAddPayments.list)
    app.post('/typeAddPayments/Create', typeAddPayments.create);
    app.delete('/typeAddPayments/Destroy/:Id', typeAddPayments.destroy);
    app.put('/typeAddPayments/Update/:Id', typeAddPayments.update);
    app.put('/typeAddPayments/LogicalDestroy/:Id', typeAddPayments.logicalDestroy);
    app.get('/typeAddPayments/List/:Offset/:Limit', typeAddPayments.listWithoutDestroy);
    app.get('/typeAddPayments/CountItems', typeAddPayments.countItems);
}