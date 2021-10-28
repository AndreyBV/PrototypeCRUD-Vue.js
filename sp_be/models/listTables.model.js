const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const ListTables = sequelize.define('listTables', {
        idKindTable: {
            type: Sequelize.STRING,
            allowNull: false
        },
        engNameTable: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        rusNameTable: {
            type: Sequelize.STRING,
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return ListTables;
}