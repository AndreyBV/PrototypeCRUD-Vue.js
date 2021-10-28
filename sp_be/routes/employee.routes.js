module.exports = (app) => {
    const employees = require('../controllers/employee.controller');

    app.get('/employees/ListAll', employees.list)
    app.post('/employees/Create', employees.create);
    app.delete('/employees/Destroy/:Id', employees.destroy);
    app.put('/employees/Update/:Id', employees.update);
    app.put('/employees/LogicalDestroy/:Id', employees.logicalDestroy);
    app.get('/employees/List/:Offset/:Limit', employees.listWithoutDestroy);
    app.get('/employees/CountItems', employees.countItems);
}