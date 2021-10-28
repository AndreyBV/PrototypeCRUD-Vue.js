var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(cors());

const db = require('./config/db.config');
// Метод синхронизации базы данных, т.е. происходит синхронизация базы данных (если таблицы нету, то она создается)
// Параметр forse: true указывает на то, что в случае наличия в бд подобных таблицы, происходит их пересоздание
db.sequelize
	.sync({ force: true })
	.then(() => {
		console.log('Drop and Resync with {force: true}');
		require('./config/init.db')(db);
		// initial()
	})
	.catch(err => console.log(err));

// const Role = db.role;
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }

// require('./routes/admin.routes')(app);
require('./routes/visit.routes')(app);
require('./routes/employeePost.routes')(app);
require('./routes/paymentOption.routes')(app);
require('./routes/person.routes')(app);
require('./routes/service.routes')(app);
require('./routes/statement.routes')(app);
require('./routes/typeAddPayment.routes')(app);
require('./routes/subscription.routes')(app);
require('./routes/trainingProgram.routes')(app);

require('./routes/employee.routes')(app);

require('./routes/listKindTables.routes')(app);
require('./routes/listTables.routes')(app);
require('./routes/listAttributes.routes')(app);

// Настройки
app.set('port', process.env.PORT || 3000);

// Настройка прослушивания портов
var server = app.listen(app.get('port'), () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
