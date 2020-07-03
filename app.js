const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config({path:__dirname + '/.env'});

// db connection
const db = require('./server/config/db.context');
db.connect();

// Set up the express app
const app = express();


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Requiring routes
 require('./server/routes')(app);

 // Requiring Swagger UI
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

 // global error handler
app.use(function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

 // Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
