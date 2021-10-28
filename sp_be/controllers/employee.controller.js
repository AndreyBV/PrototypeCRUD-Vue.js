const { employees } = require('../config/db.config');
const db = require('../config/db.config');

const Employee = db.employees;

exports.countItems = async (req, res, next) => {
    try{
        var result = await employees.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    Employee.findAll().then(employees => {
        res.send(employees)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    Employee.findAll({
        include: [db.persons, db.employeePosts],
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(employees => {
        res.send(employees)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    console.log(req.body)
    Employee.create({   
        idPerson: req.body.person,
        idEmployeePost: req.body.employeePost,
        addres: req.body.addres,
        salary: req.body.salary,
    }).then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    Employee.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    console.log(req.body)
    Employee.update({
        idPerson: req.body.person,
        idEmployeePost: req.body.employeePost,
        addres: req.body.addres,
        salary: req.body.salary,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    Employee.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(employee => {
        res.status(200).send(employee);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};