require('dotenv').config();
const bunyan = require('bunyan');
const path = require('path');

const loggers ={
    'development' : () => bunyan.createLogger({name : 'development',level: 'debug'}),
    'production' : () => bunyan.createLogger({name : 'production',level: 'info'}),
    'test' : () => bunyan.createLogger({name : 'test',level: 'fatal'}), 
  }

  module.exports = {
    development: {
      sitename: 'Process Control Manager [Development]',
      log: loggers.development,
      database: {
        dsn: process.env.DEVELOPMENT_DB_DSN,
      },
    },
    production: {
      sitename: 'Process Control Manager',
      log: loggers.production,
      database: {
        dsn: process.env.PRODUCTION_DB_DSN,
      },
    },
    test: {
      sitename: 'Process Control Manager [Test]',
      log: loggers.test,
      database: {
        dsn: process.env.Test_DB_DSN,
      },
    },
  };