const { listTables } = require('../config/db.config');
const db = require('../config/db.config');

const ListTables = db.listTables;

exports.countItems = async (req, res, next) => {
    try{
        var result = await listTables.count({
                col: 'engNameTable'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    ListTables.findAll({ 
        include: [db.listAttributes]
    }).then(listTables => {
        res.send(listTables)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    ListTables.findAll({
        include: [db.listAttributes], 
        where: {deletionFlag: false},
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(listTables => {
        res.send(listTables)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    ListTables.create({
        name: req.body.name,
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }).then(listTables => {
        res.send(listTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    ListTables.destroy({
        where: {
            id: req.body.id,
        }
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    }).then(listTables => {
        res.send(listTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    ListTables.update({
        name: req.body.name,
        // deletionFlag: req.body.deletionFlag,
        // deletionDate: req.body.deletionDate
    },{
        where: {
            id: req.body.id,
        }
    }
    ).then(listTables => {
        res.send(listTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    ListTables.update({
        // name: req.body.name,
        deletionFlag: req.body.deletionFlag,
        deletionDate: req.body.deletionDate
    },{
        where: {
            id: req.body.id,
        }
    }
    ).then(listTables => {
        res.send(listTables);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};