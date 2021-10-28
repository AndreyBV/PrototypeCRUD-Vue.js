const env = require('./env');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    define: {
        timestamp: env.timestamp,
        freezeTableName: true
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// // Сложные структуры
// db.payments = require('../models/ ')(sequelize, Sequelize);
// db.addPyments = require('../models/')(sequelize, Sequelize);
// db.services = require('../models/')(sequelize, Sequelize);
// db.lessons = require('../models/')(sequelize, Sequelize);

// // Персонал
// db.persons = require('../models/')(sequelize, Sequelize);
// db.clients = require('../models/')(sequelize, Sequelize);
// db.employees = require('../models/')(sequelize, Sequelize);
// db.trainers = require('../models/')(sequelize, Sequelize);
// db.dataAuthorizations = require('../models/')(sequelize, Sequelize);
// db.accruals = require('../models/')(sequelize, Sequelize);

// Авторизация и регистрация
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];

// Справочники
db.visits = require('../models/visit.model')(sequelize, Sequelize);
db.employeePosts = require('../models/employeePost.model')(sequelize, Sequelize);
db.paymentOptions = require('../models/paymentOption.model')(sequelize, Sequelize);
db.persons = require('../models/person.model')(sequelize, Sequelize);
db.services = require('../models/service.model')(sequelize, Sequelize);
db.statements = require('../models/statement.model')(sequelize, Sequelize);
db.typeAddPayments = require('../models/typeAddPayment.model')(sequelize, Sequelize);
db.subscriptions = require('../models/subscription.model')(sequelize, Sequelize);
db.trainingPrograms = require('../models/trainingProgram.model')(sequelize, Sequelize);

db.employees = require('../models/employee.model')(sequelize, Sequelize);

db.listTables = require('../models/listTables.model')(sequelize, Sequelize);
db.listAttributes = require('../models/listAttributes.model')(sequelize, Sequelize);
db.listKindTables = require('../models/listKindTables.model')(sequelize, Sequelize);


// Установка связей между таблицами
db.persons.hasOne(db.employees, {foreignKey: 'idPerson'});
db.employees.belongsTo(db.persons, {foreignKey: 'idPerson'});
db.employeePosts.hasOne(db.employees, {foreignKey: 'idEmployeePost'});
db.employees.belongsTo(db.employeePosts, {foreignKey: 'idEmployeePost'});

db.listTables.hasMany(db.listAttributes, {foreignKey: 'idNameTable'});
db.listAttributes.belongsTo(db.listTables, {foreignKey: 'idNameTable'});

db.listKindTables.hasMany(db.listTables, {foreignKey: 'idKindTable'});
db.listTables.belongsTo(db.listKindTables, {foreignKey: 'idKindTable'});

// db.admins = require('../models/admin.model')(sequelize, Sequelize);

module.exports = db;