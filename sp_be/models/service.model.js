const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define('service', {
        name: {
            type: Sequelize.STRING
        },
        numberVisits: {
            type: Sequelize.INTEGER
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return Service;
}