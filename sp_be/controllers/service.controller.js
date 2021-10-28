const { services } = require('../config/db.config');
const db = require('../config/db.config');

const Service = db.services;

exports.countItems = async (req, res, next) => {
    try{
        var result = await services.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    Service.findAll().then(services => {
        res.send(services)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    Service.findAll({
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(services => {
        res.send(services)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    Service.create({
        name: req.body.name,
        numberVisits: req.body.numberVisits,
    }).then(service => {
        res.send(service);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    Service.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(service => {
        res.send(service);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    Service.update({
        name: req.body.name,
        numberVisits: req.body.numberVisits,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(service => {
        res.send(service);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    Service.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(service => {
        res.status(200).send(service);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};