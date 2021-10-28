module.exports = (app) => {
    const statements = require('../controllers/statement.controller');

    app.get('/statements/ListAll', statements.list)
    app.post('/statements/Create', statements.create);
    app.delete('/statements/Destroy/:Id', statements.destroy);
    app.put('/statements/Update/:Id', statements.update);
    app.put('/statements/LogicalDestroy/:Id', statements.logicalDestroy);
    app.get('/statements/List/:Offset/:Limit', statements.listWithoutDestroy);
    app.get('/statements/CountItems', statements.countItems);
}