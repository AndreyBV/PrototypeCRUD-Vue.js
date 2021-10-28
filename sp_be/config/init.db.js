
module.exports = (db) => {
    const Role = db.role;
    const ListKindTables = db.listKindTables;
    const ListTables = db.listTables;
    const ListAttributes = db.listAttributes;



    initialDB();

    function initialDB() {
        
        Role.create({
            // id: 1,
            name: "user"
        });  
        Role.create({
            // id: 2,
            name: "moderator"
        });
        Role.create({
            // id: 3,
            name: "admin"
        });



        // ListKindTables.create({
        //     name: "Платежи",
        // });
        ListKindTables.create({
            name: "Справочники",
        });
        ListKindTables.create({
            name: "Администрирование",
        });



        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "employees",
            rusNameTable: "Сотрудники",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "persons",
            rusNameTable: "Персоны",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "employeePosts",
            rusNameTable: "Должности сотрудников",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "trainingPrograms",
            rusNameTable: "Программы тренировок",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "typeAddPayments",
            rusNameTable: "Виды дополнительных платежей",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "paymentOptions",
            rusNameTable: "Варианты оплаты",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "services",
            rusNameTable: "Услуги",
        });
        ListTables.create({
            idKindTable: "Справочники",
            engNameTable: "statements",
            rusNameTable: "Ведомости",
        });
        ListTables.create({
            idKindTable: "Администрирование",
            engNameTable: "listKindTables",
            rusNameTable: "Виды таблиц",
        });
        ListTables.create({
            idKindTable: "Администрирование",
            engNameTable: "listTables",
            rusNameTable: "Таблицы",
        });
        ListTables.create({
            idKindTable: "Администрирование",
            engNameTable: "listAttributes",
            rusNameTable: "Атрибуты таблиц",
        });



        ListAttributes.create({
            idNameTable: "employees",
            engNameAttribute: "person",
            rusNameAttribute: "ФИО",
            typeAttribute: "object",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "employees",
            engNameAttribute: "employeePost",
            rusNameAttribute: "Должность",
            typeAttribute: "object",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "employees",
            engNameAttribute: "addres",
            rusNameAttribute: "Адрес",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "employees",
            engNameAttribute: "salary",
            rusNameAttribute: "Зарплата",
            typeAttribute: "number",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "surname",
            rusNameAttribute: "Фамилия",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "name",
            rusNameAttribute: "Имя",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "secondname",
            rusNameAttribute: "Отчество",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "birthday",
            rusNameAttribute: "Дата рождения",
            typeAttribute: "date",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "sex",
            rusNameAttribute: "Пол",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "numberPhone",
            rusNameAttribute: "Номер телефона",
            typeAttribute: "string",
            regularExp: ["^[^$]", "^\\d{11}$"],
            regularExpMessage: ["Строка не должна быть пустой", "Не верный формат номер телефона"],
        });
        ListAttributes.create({
            idNameTable: "persons",
            engNameAttribute: "seriesNumberPassport",
            rusNameAttribute: "Серия/Номер паспорта",
            typeAttribute: "string",
            regularExp: ["^[^$]", "^([0-9]{4}\\s{1}[0-9]{6})?$"],
            regularExpMessage: ["Строка не должна быть пустой", "Серия и номер паспорта задаются через пробел"],
        });
        ListAttributes.create({
            idNameTable: "employeePosts",
            engNameAttribute: "name",
            rusNameAttribute: "Наименование",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "paymentOptions",
            engNameAttribute: "name",
            rusNameAttribute: "Наименование",
            typeAttribute: "string",
            regularExp: ["^[^$]", "\\w"],
            regularExpMessage: ["Строка не должна быть пустой", "Ну надо быть полегче"],
        });
        ListAttributes.create({
            idNameTable: "services",
            engNameAttribute: "name",
            rusNameAttribute: "Наименование",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "services",
            engNameAttribute: "numberVisits",
            rusNameAttribute: "Количество посещений",
            typeAttribute: "number",
            regularExp: ["^[^$]", "^\\d{1,}$"],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "statements",
            engNameAttribute: "year",
            rusNameAttribute: "Год",
            typeAttribute: "number",
            regularExp: ["^[^$]", "^\\d{4}$"],
            regularExpMessage: ["Строка не должна быть пустой", "Не верный формат года"],
        });
        ListAttributes.create({
            idNameTable: "statements",
            engNameAttribute: "month",
            rusNameAttribute: "Месяц",
            typeAttribute: "number",
            regularExp: ["^[^$]", "^0?[1-9]$|^1[012]$"],
            regularExpMessage: ["Строка не должна быть пустой", "Не верный формат месяца"],
        });
        ListAttributes.create({
            idNameTable: "statements",
            engNameAttribute: "kind",
            rusNameAttribute: "Вид",
            typeAttribute: "string",
            regularExp: ["^[^$]", "^[^\\s]+$"],
            regularExpMessage: ["Строка не должна быть пустой", "Строка должна соедражать текст"],
        });
        ListAttributes.create({
            idNameTable: "trainingPrograms",
            engNameAttribute: "name",
            rusNameAttribute: "Наименование",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "trainingPrograms",
            engNameAttribute: "description",
            rusNameAttribute: "Описание",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "trainingPrograms",
            engNameAttribute: "cost",
            rusNameAttribute: "Стоимость",
            typeAttribute: "number",
            regularExp: ["^[^$]", "[0-9,]+(\\.[0-9]{2})?"],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "typeAddPayments",
            engNameAttribute: "name",
            rusNameAttribute: "Наименование",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "typeAddPayments",
            engNameAttribute: "cost",
            rusNameAttribute: "Стоимость",
            typeAttribute: "number",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listKindTables",
            engNameAttribute: "name",
            rusNameAttribute: "Наименование",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listTables",
            engNameAttribute: "idKindTable",
            rusNameAttribute: "Вид таблицы",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listTables",
            engNameAttribute: "engNameTable",
            rusNameAttribute: "Наименование таблицы в БД",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listTables",
            engNameAttribute: "rusNameTable",
            rusNameAttribute: "Наименование таблицы для отображения",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listAttributes",
            engNameAttribute: "idNameTable",
            rusNameAttribute: "Наименование таблицы",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listAttributes",
            engNameAttribute: "engNameAttribute",
            rusNameAttribute: "Наименование атрибута - англ.",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listAttributes",
            engNameAttribute: "rusNameAttribute",
            rusNameAttribute: "Наименование атрибута - рус.",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listAttributes",
            engNameAttribute: "typeAttribute",
            rusNameAttribute: "Тип атрибута",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listAttributes",
            engNameAttribute: "regularExp",
            rusNameAttribute: "Регулярное выражение",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });
        ListAttributes.create({
            idNameTable: "listAttributes",
            engNameAttribute: "regularExpMessage",
            rusNameAttribute: "Сообщение не соответвия рег. выр.",
            typeAttribute: "string",
            regularExp: ["^[^$]", ""],
            regularExpMessage: ["Строка не должна быть пустой", ""],
        });




        // const Persons = db.persons;
        // const EmployeePosts = db.employeePosts;
        // const Employees = db.employees;

        // Persons.create({
        //     surname: "Иван",
        //     name: "Иван",
        //     secondname: "Иван",
        //     birthday: new Date(2011, 0, 1),
        //     sex: "мужской",
        //     numberPhone: "888888888888",
        //     seriesNumberPassport: "5555111111",
        //     infoField: "Иван" + " " +  "Иван" + " " +  "Иван" 
        // });
        // EmployeePosts.create({
        //     name: "Кассир",
        //     infoField: "Кассир"
        // });
        // Employees.create({
        //     idPerson: 1,
        //     idPostEmployee: 1,
        //     addres: "г. Пермь, ул. Уральская 10",
        //     salary: 10000,
        // });
        // Persons.create({
        //     surname: "Иван",
        //     name: "Иван",
        //     secondname: "Иван",
        //     birthday: new Date(2011, 0, 1),
        //     sex: "мужской",
        //     numberPhone: "888888888888",
        //     seriesNumberPassport: "5555111111",
        //     infoField: "Иван" + " " +  "Иван" + " " +  "Иван" 
        // });
        // EmployeePosts.create({
        //     name: "Кассир111",
        //     infoField: "Кассир111"
        // });
        // Employees.create({
        //     idPerson: 2,
        //     idPostEmployee: 2,
        //     addres: "г. Пермь, ул. Уральская 10",
        //     salary: 10000,
        // });

        // EmployeePosts.create({
        //     name: "Кассир2",
        //     infoField: "Кассир2"
        // });




    }
}



