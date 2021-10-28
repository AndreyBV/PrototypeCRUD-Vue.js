const {sequalize, Sequelize}  = require('../config/db.config');

module.exports = (sequalize, Sequelize) => {
    const Person = sequalize.define('person', {
        surname: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        secondname: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.DATE
        },
        sex: {
            type: Sequelize.STRING
        },
        numberPhone: {
            type: Sequelize.STRING
        },
        seriesNumberPassport: {
            type: Sequelize.STRING
        },
        infoField: {
            type: Sequelize.STRING,
            // defaultValue: Person.surname + " " + Person.name + " " + Person.secondname
        },
        deletionFlag: {
            type: Sequelize.BOOLEAN,
            defaultValue: false 
        },
        deletionDate: {
            type: Sequelize.DATE
        },
    });
    return Person;
    // , {
    //     freezeTableName: true
    // }
}