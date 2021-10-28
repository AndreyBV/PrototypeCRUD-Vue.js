const { listAttributes } = require('../config/db.config');
const db = require('../config/db.config');

const ListAttributes = db.listAttributes;

exports.countItems = async (req, res, next) => {
    try{
        var result = await listAttributes.count({
                col: 'idNameTable'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    ListAttributes.findAll().then(listAttributes => {
        res.send(listAttributes)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
// {where: {deletionFlag: false }}).then(listAttributes => {
//     res.send(listAttributes)
// }
exports.listWithoutDestroy = (req, res) => {
    ListAttributes.findAll({
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(listAttributes => {
        res.send(listAttributes)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    ListAttributes.create({
        name: req.body.name,
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }).then(listAttributes => {
        res.send(listAttributes);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    ListAttributes.destroy({
        where: {
            id: req.body.id,
        }
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }).then(listAttributes => {
        res.send(listAttributes);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    ListAttributes.update({
        name: req.body.name,
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    },{
        where: {
            id: req.body.id,
        }
    }
    ).then(listAttributes => {
        res.send(listAttributes);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    ListAttributes.update({
        // name: req.body.name,
        deletionFlag: req.body.deletionFlag,
        deletionDate: req.body.deletionDate
    },{
        where: {
            id: req.body.id,
        }
    }
    ).then(listAttributes => {
        res.send(listAttributes);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};