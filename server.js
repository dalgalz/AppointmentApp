// require express and path
const express = require('express');
const path = require('path');

const bosdyParser = require('body-parser');
const port = process.env.PORT || 8000;

const app = express();

app.use(bosdyParser.json());
app.use(bosdyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve('dist')));

require('./server/config/database');
// store the function in a variable
const routes_setter = require('./server/config/routes');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);
//app.use(require('./server/config/routes/catchall-routes'));


app.listen(port, () => console.log(`express listening on port ${ port }`));