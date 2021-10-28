module.exports = (app) => {
    const trainingPrograms = require('../controllers/trainingProgram.controller');

    app.get('/trainingPrograms/ListAll', trainingPrograms.list)
    app.post('/trainingPrograms/Create', trainingPrograms.create);
    app.delete('/trainingPrograms/Destroy/:Id', trainingPrograms.destroy);
    app.put('/trainingPrograms/Update/:Id', trainingPrograms.update);
    app.put('/trainingPrograms/LogicalDestroy/:Id', trainingPrograms.logicalDestroy);
    app.get('/trainingPrograms/List/:Offset/:Limit', trainingPrograms.listWithoutDestroy);
    app.get('/trainingPrograms/CountItems', trainingPrograms.countItems);
}