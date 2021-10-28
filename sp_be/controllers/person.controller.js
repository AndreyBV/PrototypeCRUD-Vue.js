const { persons } = require('../config/db.config');
const db = require('../config/db.config');

const Person = db.persons;

exports.countItems = async (req, res, next) => {
    try {
        var result = await persons.count({
            col: 'id'
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
};
exports.list = (req, res) => {
    Person.findAll().then(persons => {
        res.send(persons)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    if (req.params.Limit == -1) {
        Person.findAll({
            where: { deletionFlag: false },
        }).then(persons => {
            res.send(persons)
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        })
    } else {
        Person.findAll({
            where: { deletionFlag: false },
            offset: req.params.Offset,
            limit: req.params.Limit,
        }).then(persons => {
            res.send(persons)
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        })
    }
};
exports.create = (req, res) => {
    Person.create({
        surname: req.body.surname,
        name: req.body.name,
        secondname: req.body.secondname,
        birthday: req.body.birthday,
        sex: req.body.sex,
        numberPhone: req.body.numberPhone,
        seriesNumberPassport: req.body.seriesNumberPassport,
        infoField: req.body.surname + " " + req.body.name + " " + req.body.secondname
    }).then(person => {
        res.send(person);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    Person.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(person => {
        res.send(person);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    Person.update({
        surname: req.body.surname,
        name: req.body.name,
        secondname: req.body.secondname,
        birthday: req.body.birthday,
        sex: req.body.sex,
        numberPhone: req.body.numberPhone,
        seriesNumberPassport: req.body.seriesNumberPassport,
        infoField: req.body.surname + " " + req.body.name + " " + req.body.secondname
    }, {
        where: {
            id: req.params.Id,
        }
    }
    ).then(person => {
        res.send(person);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    Person.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    }, {
        where: {
            id: req.params.Id,
        }
    }
    ).then(person => {
        res.status(200).send(person);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};