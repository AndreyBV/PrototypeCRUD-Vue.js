const {sequelize, Sequelize} = require('../config/db.config')

module.exports = (sequelize, Sequelize) => {
    const ListKindTables = sequelize.define('listKindTables', {
        name: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });
    return ListKindTables;
}