const { sequelize, Sequelize } = require("../config/db.config");

module.exports = (sequelize, Sequelize) => {
    const EmployeePost = sequelize.define('employeePost', {
        name: {
            type: Sequelize.STRING
        },
        infoField: {
            type: Sequelize.STRING,
            // defaultValue: EmployeePost.name
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });

    return EmployeePost;
}