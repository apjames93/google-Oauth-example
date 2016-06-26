var enviroment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[enviroment];
var knex = require('knex')(config);

module.exports = knex;
