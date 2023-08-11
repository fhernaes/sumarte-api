const express = require('express');
const app = express();
const morgan = require('morgan');
const userRoutes = require('./src/routes/userRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const categoriesRoutes = require('./src/routes/categoryRoutes');
const regionRoutes = require('./src/routes/regionRoutes');
const viewRoutes = require('./src/routes/viewRoutes');
const { errorMiddleware } = require('./src/middleware/cloudinary_multer');
const db = require('./models/index');
const swaggerSetup = require('./swagger');
const routeVersion = '/api/v1/alpha'

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/', viewRoutes);
app.use(routeVersion, userRoutes);
app.use(routeVersion, serviceRoutes);
app.use(routeVersion, userProfileRoutes);
app.use(routeVersion, categoriesRoutes);
app.use(routeVersion, regionRoutes);
app.use(errorMiddleware);

db.sequelize.sync();

const { host } = db.sequelize.options;

if (host === 'localhost' || host === '127.0.0.1') {
  console.log('Conectado a la base de datos local');
} else {
  console.log('Conectado a la base de datos remota');
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  swaggerSetup(app, PORT);
});

module.exports = app;
