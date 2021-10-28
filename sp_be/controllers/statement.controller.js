const { statements } = require('../config/db.config');
const db = require('../config/db.config');

const Statement = db.statements;

exports.countItems = async (req, res, next) => {
    try{
        var result = await statements.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    Statement.findAll().then(statements => {
        res.send(statements)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    Statement.findAll({ 
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(statements => {
        res.send(statements)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    Statement.create({
        year: req.body.year,
        month: req.body.month,
        kind: req.body.kind,
    }).then(statement => {
        res.send(statement);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    Statement.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(statement => {
        res.send(statement);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    Statement.update({
        year: req.body.year,
        month: req.body.month,
        kind: req.body.kind,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(statement => {
        res.send(statement);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    Statement.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(statement => {
        res.status(200).send(statement);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};