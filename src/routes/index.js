const  routes = require('express').Router();

routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/employees', require('./employees.routes'));

module.exports = routes;