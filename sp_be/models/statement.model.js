const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const Statement = sequelize.define('statement', {
        year: {
            type: Sequelize.INTEGER
        },
        month: {
            type: Sequelize.INTEGER
        },
        kind: {
            type: Sequelize.STRING
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return Statement;
}