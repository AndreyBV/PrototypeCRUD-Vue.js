const { trainingPrograms } = require('../config/db.config');
const db = require('../config/db.config');

const TrainingProgram = db.trainingPrograms;

exports.countItems = async (req, res, next) => {
    try{
        var result = await trainingPrograms.count({
                col: 'id'
            });
        res.json(result);
    } catch (err) {
        next(err);
    }   
};
exports.list = (req, res) => {
    TrainingProgram.findAll().then(trainingPrograms => {
        res.send(trainingPrograms)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.listWithoutDestroy = (req, res) => {
    TrainingProgram.findAll({
        where: {deletionFlag: false },
        offset: req.params.Offset,
        limit: req.params.Limit,
    }).then(trainingPrograms => {
        res.send(trainingPrograms)
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    })
};
exports.create = (req, res) => {
    TrainingProgram.create({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
    }).then(trainingProgram => {
        res.send(trainingProgram);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.destroy = (req, res) => {
    TrainingProgram.destroy({
        where: {
            id: req.params.Id,
        }
    }).then(trainingProgram => {
        res.send(trainingProgram);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.update = (req, res) => {
    TrainingProgram.update({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(trainingProgram => {
        res.send(trainingProgram);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};
exports.logicalDestroy = (req, res) => {
    TrainingProgram.update({
        deletionFlag: !req.body.deletionFlag,
        deletionDate: db.sequelize.fn('NOW'),
    },{
        where: {
            id: req.params.Id,
        }
    }
    ).then(trainingProgram => {
        res.status(200).send(trainingProgram);
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};