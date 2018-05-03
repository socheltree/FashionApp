// base setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fashion');

// call packages we need
const express = require('express');
// require('express-async-errors')
const app = express();
const bodyParser = require('body-parser');
const mw = require('./middleware');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// set port
const port = process.env.PORT || 8080;

const index = require('./routes/index');
const users = require('./routes/user');

// register our routes
app.use('/', index);
app.use('/users', users);

app.use(mw.util.formatResponse);
app.use(mw.error.errorHandler);

// start the server
app.listen(port);
console.log('Server started on port ' + port);
