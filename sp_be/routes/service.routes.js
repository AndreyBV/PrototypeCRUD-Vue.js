module.exports = (app) => {
    const services = require('../controllers/service.controller');

    app.get('/services/ListAll', services.list)
    app.post('/services/Create', services.create);
    app.delete('/services/Destroy/:Id', services.destroy);
    app.put('/services/Update/:Id', services.update);
    app.put('/services/LogicalDestroy/:Id', services.logicalDestroy);
    app.get('/services/List/:Offset/:Limit', services.listWithoutDestroy);
    app.get('/services/CountItems', services.countItems);
}