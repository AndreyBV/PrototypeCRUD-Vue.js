const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define('visit', {
        idClient: {
            type: Sequelize.INTEGER
        },
        dateVisit: {
            type: Sequelize.DATE
        },
    });

    return Visit;
}