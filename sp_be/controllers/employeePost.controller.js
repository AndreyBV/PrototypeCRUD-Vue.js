const { employeePosts } = require('../config/db.config');
const db = require('../config/db.config');

const EmployeePost = db.employeePosts;

exports.countItems = async (req, res, next) => {
    try{
        var result = await employeePosts.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    EmployeePost.findAll().then(employeePosts => {
        res.send(employeePosts)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    if (req.params.Limit == -1) {
        EmployeePost.findAll({
            where: {deletionFlag: false },
        }).then(employeePosts => {
            res.send(employeePosts)
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        })
    } else {
        EmployeePost.findAll({
            where: {deletionFlag: false },
            offset: req.params.Offset,
            limit: req.params.Limit,
        }).then(employeePosts => {
            res.send(employeePosts)
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        })
    }
};
exports.create = (req, res) => {
    EmployeePost.create({
        name: req.body.name,
        infoField: req.body.name
    }).then(employeePost => {
        res.send(employeePost);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    EmployeePost.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(employeePost => {
        res.send(employeePost);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    EmployeePost.update({
        name: req.body.name,
        infoField: req.body.name
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(employeePost => {
        res.send(employeePost);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    EmployeePost.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(employeePost => {
        res.status(200).send(employeePost);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};