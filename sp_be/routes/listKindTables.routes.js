module.exports = (app) => {
    const listKindTables = require('../controllers/listKindTables.controller');

    app.get('/listKindTables/ListAll', listKindTables.list)
    app.post('/listKindTables/Create', listKindTables.create);
    app.delete('/listKindTables/Destroy/:Id', listKindTables.destroy);
    app.put('/listKindTables/Update/:Id', listKindTables.update);
    app.put('/listKindTables/LogicalDestroy/:Id', listKindTables.logicalDestroy);
    app.get('/listKindTables/List/:Offset/:Limit', listKindTables.listWithoutDestroy);
    app.get('/listKindTables/CountItems', listKindTables.countItems);
    // app.get('/listKindTables/List/:Id', listKindTables.listWithoutDestroy);
}