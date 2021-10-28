const db = require('../config/db.config');

const Subscription = db.subscriptions;

exports.countItems = async (req, res, next) => {
    try{
        var result = await subscriptionObj.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    Subscription.findAll().then(subscriptionObj => {
        res.send(subscriptionObj)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    Subscription.findAll({ 
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit
    }).then(subscriptions => {
        res.send(subscriptions)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    Subscription.create({
        name: req.body.name,
        numberVisits: req.body.numberVisits,
        cost: req.body.cost,
    }).then(subscription => {
        res.send(subscription);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    Subscription.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(subscription => {
        res.send(subscription);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    Subscription.update({
        name: req.body.name,
        numberVisits: req.body.numberVisits,
        cost: req.body.cost,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(subscription => {
        res.send(subscription);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    Subscription.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(subscription => {
        res.status(200).send(subscription);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};