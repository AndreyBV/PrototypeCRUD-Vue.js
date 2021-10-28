module.exports = (app) => {
    const persons = require('../controllers/person.controller');

    app.get('/persons/ListAll', persons.list)
    app.post('/persons/Create', persons.create);
    app.delete('/persons/Destroy/:Id', persons.destroy);
    app.put('/persons/Update/:Id', persons.update);
    app.put('/persons/LogicalDestroy/:Id', persons.logicalDestroy);
    app.get('/persons/List/:Offset/:Limit', persons.listWithoutDestroy);
    app.get('/persons/CountItems', persons.countItems);
}