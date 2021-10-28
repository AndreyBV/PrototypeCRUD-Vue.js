module.exports = (app) => {
    const listTables = require('../controllers/listTables.controller');

    app.get('/listTables/ListAll', listTables.list)
    app.post('/listTables/Create', listTables.create);
    app.delete('/listTables/Destroy/:Id', listTables.destroy);
    app.put('/listTables/Update/:Id', listTables.update);
    app.put('/listTables/LogicalDestroy/:Id', listTables.logicalDestroy);
    app.get('/listTables/List/:Offset/:Limit', listTables.listWithoutDestroy);
    app.get('/listTables/CountItems', listTables.countItems);
}