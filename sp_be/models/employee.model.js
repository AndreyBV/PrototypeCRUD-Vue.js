const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee', {
        idPerson: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idEmployeePost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        addres: {
            type: Sequelize.STRING,
        },
        salary: {
            type: Sequelize.DOUBLE(8,3),
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return Employee;
}