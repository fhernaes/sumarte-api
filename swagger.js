const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de la API',
            description: 'API para publicación de servicios orientados a profesionales de la música',
        },
    },
    apis: [path.join(__dirname, './src/routes/*.js')]
};

const customTitle = 'Documentación'
const customOptions = {
    customSiteTitle: customTitle
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const swaggerSetup = (app, port) => {

    app.use('/api/v1/alpha/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, customOptions));
    app.get('/api/v1/aplha/docs', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
}
console.log('Swagger is running on http://localhost:3001/api/v1/alpha/docs');
module.exports = swaggerSetup;


