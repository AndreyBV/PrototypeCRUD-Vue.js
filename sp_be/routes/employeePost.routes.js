module.exports = (app) => {
    const employeePosts = require('../controllers/employeePost.controller');

    app.get('/employeePosts/ListAll', employeePosts.list)
    app.post('/employeePosts/Create', employeePosts.create);
    app.delete('/employeePosts/Destroy/:Id', employeePosts.destroy);
    app.put('/employeePosts/Update/:Id', employeePosts.update);
    app.put('/employeePosts/LogicalDestroy/:Id', employeePosts.logicalDestroy);
    app.get('/employeePosts/List/:Offset/:Limit', employeePosts.listWithoutDestroy);
    app.get('/employeePosts/CountItems', employeePosts.countItems);
}