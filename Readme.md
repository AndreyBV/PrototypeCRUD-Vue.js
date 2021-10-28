# Prototype CRUD Application with Vue.js

---

## Description

In this project, the client-side development was carried out using the JavaScript framework Vue.js, the server-side using the Node.js platform and the Express framework for Node.js, which provides a number of ready-made abstractions that simplify the creation of server-side logic. To connect the database with the Node.js framework, ORM technology was used using the Sequelize framework.

The system implements four basic functions used when working with persistent data stores: creating, reading, editing and deleting.

The peculiarity of the developed system is that it is not rigidly bound to the subject area. That is, the main interface of the application is generate on the basis of the structure of the database. **Thus, you can add additional tables with new attributes and not think about a strong redesign of the client side, because all the necessary components will automatically be pulled up and displayed in the user interface.**

---

## Initialization

1. [Download this repository](https://github.com/AndreyBV/PrototypeCRUD-Vue.js/archive/refs/heads/master.zip);
1. [Download and install **Node.js**](https://nodejs.org/en/) (during installation you can use [this manual](https://winitpro.ru/index.php/2019/10/25/ustanovka-nastrojka-postgresql-v-windows/));
1. [Download and install **PostgreSQL**](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads);
1. After installing **Node.js** and **PostgreSQL** restart your computer;
1. Open the file **"env.js"** of the downloaded project in the following path **"PrototypeCRUD-Vue.js-master\sp_be\config\env.js"**;
1. Change the contents of the **"env.js"** file according to your PostgreSQL settings;
1. Create an empty PostgreSQL database with the name **"crudvue** (if you did not change the **"database"** field in the **"env.js"** file) or write the name you specified in the step above;
1. Open the **"sp_be"** directory of the downloaded project through the console;
1. In the console that opens, execute the command: `node server.js`;
1. As a result, the server part of the system should start (the result of the ORM Sequelize operation will also be displayed in the console, the previously created database should be automatically filled with data in accordance with the designed model);
1. In a new console open the **"sp_fe"** directory of the downloaded project;
1. In the console that opens, run the command: `npm run serve`;
1. As a result, the client part of the system should start;
1. Run the project at [http://localhost:8080/](http://localhost:8080/);

---

## Architecture

### Full-stack

<img src="./_documentation/Full-stack-architecture.png?raw=true" alt="Page on mobile"  width=700px height="auto"/>

### Server

<img src="./_documentation/Server-architecture.png?raw=true" alt="Page on mobile"  width=600px height="auto"/>

### Client

<img src="./_documentation/Client-architecture.png?raw=true" alt="Page on mobile"  width=600px height="auto"/>

### Database

<img src="./_documentation/database.png?raw=true" alt="Page on mobile"  width=100% height="auto"/>

## Structure project

### Server

- **env.js** - defines the parameters for connecting to the PostgreSQL DBMS;
- **db.config.js** - defines the initialization of objects that are comparable to tables from the database;
- **init.db.js** - a script for the initial filling of the database (the tables "listKindTables", "listTables", "listAttributes" containing information about the database structure are filled in);
- **package.json** contains information about plug-in packages (dependencies) that allow you to extend the functionality of the project under development.
- **"Model" folder** - contains JavaScript files that describe the structure (attributes) of database objects (entities);
- **"Controllers" folder** - contains JavaScript files that describe the main CRUD logic;
- **"Routes" folder** - contains JavaScript files that describe routes for processing CRUD operations;
- **server.js** - contains the Express web server configuration, which specifies CORS (Cross-origin resource sharing) parameters, initializes and starts the Express REST API.

### Client

- **package.json** contains information about plug-in packages (dependent components) that extend the functionality of the project under development.
- **Babel** is a transcompiler that rewrites modern Javascript code to a later one.
- **main.js** is the entry point file into the Vue application, i.e. determine the main place to launch the application;
- **http-common.js** - initializes Axios with base HTTP url and headers.
- **Vue files** - files components application that contain the main javascript logic, html markup and component styles. Files of this format are mainly divided into "Components" and "Views". The Components folder contains the files that are most likely to use routing, and the Views folder contains the files that will contain at least one of the routes, which are usually located in the Routes.js file.
- **router.js** - Contains information about mapping paths to routes and their components.
- **"Plugins" folder** - contains information about plug-in plugins and extensions. This project uses the Vuetify library, which allows you to implement a presentable interface with a minimum of effort.

---

## Work example

### Login page

<img src="./_documentation/Login-page.png?raw=true" alt="Page on mobile"  width=600px height="auto"/>

### Home page

<img src="./_documentation/Home-page.png?raw=true" alt="Page on mobile"  width=700px height="auto"/>

### Admin page

<img src="./_documentation/Admin-page.png?raw=true" alt="Page on mobile"  width=700px height="auto"/>

### Modal window

## <img src="./_documentation/Edit-note-modal-window.png?raw=true" alt="Page on mobile"  width=400px height="auto"/>
