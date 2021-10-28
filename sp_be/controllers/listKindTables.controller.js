const { sequelize, listKindTables } = require('../config/db.config');
const db = require('../config/db.config')

const ListKindTables = db.listKindTables;

exports.countItems = async (req, res, next) => {
    try{
        var result = await listKindTables.count({
                col: 'name'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    ListKindTables.findAll({
        include: [{ 
                model: db.listTables, 
                include: [db.listAttributes] 
            }]
    }).then(listKindTables => {
        res.send(listKindTables)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
// {
//     include:
//         [{ model: db.listTables, include: [db.listAttributes] }],
//     where: { deletionFlag: false }
// }
exports.listWithoutDestroy = (req, res) => {
    ListKindTables.findAll({
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }
        ).then(listKindTables => {
        res.send(listKindTables)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    ListKindTables.create({
        name: req.body.name,
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }).then(listKindTables => {
        res.send(listKindTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    ListKindTables.destroy({
        where: {
            id: req.body.id,
        }
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }).then(listKindTables => {
        res.send(listKindTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    ListKindTables.update({
        name: req.body.name,
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }, {
        where: {
            id: req.body.id,
        }
    }
    ).then(listKindTables => {
        res.send(listKindTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    ListKindTables.update({
        // name: req.body.name,
        deletionFlag: req.body.deletionFlag,
        deletionDate: req.body.deletionDate
    }, {
        where: {
            id: req.body.id,
        }
    }
    ).then(listKindTables => {
        res.send(listKindTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};