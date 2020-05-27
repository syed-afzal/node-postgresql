const express = require('express');
const userRoutes = require('./users.routes');

const routes = (app) => {
    const router = express.Router();

    // user routes
    router.use('/user', userRoutes);

    // global prefix for routes api
    app.use('/api', router);
};


module.exports = routes;
