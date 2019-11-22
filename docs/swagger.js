const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'people and team API',
      title: 'Express Routing & Connected API!',
      version: '1.0.1'
    },
    host: 'localhost:3000',
    basePath: '',
    produces: ['application/json'],
    schemes: ['http'],
    securityDefinitions: {
      basicAuth: {
        type: 'basic'
      }
    }
  },
  basedir: __lab-08, //app absolute path
  files: ['../lib/*.js'] //Path to the API handle folder
};
expressSwagger(options);
// start up a specific standalone swagger server on a specific port
app.listen(3100);