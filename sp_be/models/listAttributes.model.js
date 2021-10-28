const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const ListAttributes = sequelize.define('listAttributes', {
        idNameTable: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        engNameAttribute: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        rusNameAttribute: {
            type: Sequelize.STRING,
        },
        typeAttribute: {
            type: Sequelize.STRING,
        },
        regularExp: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
        },
        regularExpMessage: {
            type:  Sequelize.ARRAY(Sequelize.TEXT),
        },
        // Sequelize.ARRAY(Sequelize.TEXT)
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return ListAttributes;
}