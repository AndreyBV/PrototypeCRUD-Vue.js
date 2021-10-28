const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const TypeAddPayment = sequelize.define('typeAddPayment', {
        name: {
            type: Sequelize.STRING
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

    return TypeAddPayment;
}