const { typeAddPayments } = require('../config/db.config');
const db = require('../config/db.config');

const TypeAddPayment = db.typeAddPayments;

exports.countItems = async (req, res, next) => {
    try{
        var result = await typeAddPayments.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    TypeAddPayment.findAll().then(typeAddPayments => {
        res.send(typeAddPayments)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    TypeAddPayment.findAll({
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(typeAddPayments => {
        res.send(typeAddPayments)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    TypeAddPayment.create({
        name: req.body.name,
        cost: req.body.cost,
    }).then(typeAddPayment => {
        res.send(typeAddPayment);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    TypeAddPayment.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(typeAddPayment => {
        res.send(typeAddPayment);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    TypeAddPayment.update({
        name: req.body.name,
        cost: req.body.cost,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(typeAddPayment => {
        res.send(typeAddPayment);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    TypeAddPayment.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(typeAddPayment => {
        res.status(200).send(typeAddPayment);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};