// Contain Express application, framework that provides an API tat allows to build requests 
//plugin middleware such as view engines, configure things like ports and file locations
//import express and name as app
const express = require("express");
const app = express();

//export init method for both main-config and route-config
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

// call init to use app and express
appConfig.init(app, express);
// call init to use express inside of routeConfig file
routeConfig.init(app);
module.exports = app;

