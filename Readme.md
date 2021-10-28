# Prototype CRUD Application with Vue.js

---

## Description

In this project, the client-side development was carried out using the JavaScript framework Vue.js, the server-side using the Node.js platform and the Express framework for Node.js, which provides a number of ready-made abstractions that simplify the creation of server-side logic. To connect the database with the Node.js framework, ORM technology was used using the Sequelize framework.

The system implements four basic functions used when working with persistent data stores: creating, reading, editing and deleting.

The peculiarity of the developed system is that it is not rigidly bound to the subject area. That is, the main interface of the application is generate on the basis of the structure of the database. **Thus, you can add additional tables with new attributes and not think about a strong redesign of the client side, because all the necessary components will automatically be pulled up and displayed in the user interface.**

---

## Architecture

### Full-stack

<img src="./_documentation/Full-stack-architecture.png?raw=true" alt="Page on mobile"  width=700px height="auto"/>

### Server

<img src="./_documentation/Server-architecture.png?raw=true" alt="Page on mobile"  width=600px height="auto"/>

### Client

<img src="./_documentation/Client-architecture.png?raw=true" alt="Page on mobile"  width=600px height="auto"/>

---

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

## Tools

|               |    Server     |    Client     |
| :------------ | :-----------: | :-----------: |
| **Framework** |    Node.js    |    Vue.js     |
| **Directory** |    /sp_be     |    /sp_fe     |
| **Run**       | npm run babel | npm run serve |

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

---

## Testing App Vue.js
