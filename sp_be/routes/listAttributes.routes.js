module.exports = (app) => {
    const listAttributes = require('../controllers/listAttributes.controller');

    app.get('/listAttributes/ListAll', listAttributes.list)
    app.post('/listAttributes/Create', listAttributes.create);
    app.delete('/listAttributes/Destroy/:Id', listAttributes.destroy);
    app.put('/listAttributes/Update/:Id', listAttributes.update);
    app.put('/listAttributes/LogicalDestroy/:Id', listAttributes.logicalDestroy);
    app.get('/listAttributes/List/:Offset/:Limit', listAttributes.listWithoutDestroy);
    app.get('/listAttributes/CountItems', listAttributes.countItems);
}