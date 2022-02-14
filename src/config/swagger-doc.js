const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Movie API',
    version: '1.0.0',
    description: 'Simple movie API',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['*/swagger-doc/*.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
