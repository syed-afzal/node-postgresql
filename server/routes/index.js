const express = require('express');
const userRoutes = require('./users.routes');

const routes = (app) => {
    const router = express.Router();

    // router.get('/', (req, res) => {
    //     res.json({
    //         success: true,
    //         message: 'Api Working',
    //     });
    // });

    // user routes
    router.use('/user', userRoutes);

    // global prefix for routes api
    app.use('/api', router);
};


module.exports = routes;
