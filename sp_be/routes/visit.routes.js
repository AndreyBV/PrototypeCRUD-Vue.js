module.exports = (app) => {
    const visits = require('../controllers/visit.controller');

    app.get('/visits/ListAll', visits.list)
    app.post('/visits/Create', visits.create);
    app.delete('/visits/Destroy/:Id', visits.destroy);
    app.put('/visits/Update/:Id', visits.update);
    app.put('/visits/LogicalDestroy/:Id', visits.logicalDestroy);
    app.get('/visits/List/:Offset/:Limit', visits.listWithoutDestroy);
    app.get('/visits/CountItems', visits.countItems);
}