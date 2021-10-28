const { sequelize } = require('../config/db.config');
const db = require('../config/db.config');

const PaymentOption = db.paymentOptions;


// function requ() {
//     return PaymentOption.count({
//         col: 'id'
//     });
// }

exports.countItems = async (req, res, next) => {
    try{
        var result = await PaymentOption.count({
                col: 'id',
                where: {deletionFlag: false },
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    PaymentOption.findAll().then(paymentOptions => {
        res.send(paymentOptions)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    PaymentOption.findAll({
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(paymentOptions => {
        res.send(paymentOptions)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    PaymentOption.create({
        name: req.body.name,
    }).then(paymentOption => {
        res.send(paymentOption);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    PaymentOption.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(paymentOption => {
        res.send(paymentOption);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    PaymentOption.update({
        name: req.body.name,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(paymentOption => {
        res.send(paymentOption);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    PaymentOption.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then((paymentOption) => {
        res.status(200).send(paymentOption);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};