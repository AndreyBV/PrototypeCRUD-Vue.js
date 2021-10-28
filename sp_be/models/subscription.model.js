const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define('subscription', {
        idService: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        numberVisits: {
            type: Sequelize.INTEGER
        },
        cost: {
            type: Sequelize.DOUBLE(8,3)
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return Subscription;
}