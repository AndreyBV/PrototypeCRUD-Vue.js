const db = require('../config/db.config');

const Visit = db.visits;

exports.countItems = async (req, res, next) => {
    try{
        var result = await visits.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    Visit.findAll().then(visits => {
        res.send(visits)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    Visit.findAll({
        where: {deletionFlag: false},
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(visits => {
        res.send(visits)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    Visit.create({
        dateVisit: req.body.dateVisit,
    }).then(visit => {
        res.send(visit);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    Visit.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(visit => {
        res.send(visit);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    Visit.update({
        dateVisit: req.body.dateVisit,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(visit => {
        res.send(visit);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    Visit.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(visit => {
        res.send(visit);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};