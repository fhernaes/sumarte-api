const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const { upload } = require('../middleware/cloudinary_multer'); 
const { verifyToken } = require('../middleware/auth'); 

/**
 * @swagger
 * components:
 *   securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       oneOf:
 *         - $ref: '#/components/schemas/UserForService'
 *         - $ref: '#/components/schemas/UserForRegister'
 *         - $ref: '#/components/schemas/UserForProfile'
 *         - $ref: '#/components/schemas/UserForLogin'
 *         - $ref: '#/components/schemas/UserForProfile'
 *     UserForService:
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *           example: 38dbd4
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: name
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: email@examplemail.com
 *         phone_number:
 *           type: string
 *           description: Número de teléfono del usuario
 *           example: S/N
 *     UserForRegister:
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: name
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: email@examplemail.com
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: mypassword123
 *     UserForResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario registrado
 *           example: name
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario registrado
 *           example: email@examplemail.com
 *     UserForLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: usuario@mailexample.com
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: mypassword123
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la ciudad
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre de la ciudad
 *           example: Santiago
 *     Service:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título del servicio
 *           example: Clases de guitarra 
 *           required: true
 *         description:
 *           type: string
 *           description: Descripción del servicio
 *           example: Online o presencial, clases de guitarra rítmica para principiantes 
 *           required: true
 *         photo:
 *           type: string
 *           format: binary
 *           description: Foto del servicio (ruta o enlace a la imagen)
 *           example: https://example.com/service1.jpg
 *           required: true
 *         category:
 *           type: string
 *           description: Categoría del servicio a publicar
 *           example: Clases de instrumentos musicales
 *           required: true
 *         price:
 *           type: integer
 *           description: Precio del servicio
 *           example: 12000
 *           required: true
 *         city:
 *           type: string
 *           description: Ciudad del servicio
 *           example: Santiago
 *           required: true
 *         available_for_offers:
 *           type: boolean
 *           description: Disponibilidad para ofertas
 *           required: true
 */

/**
 * @swagger
 * /api/v1/alpha/services:
 *   get:
 *     summary: Devuelve la lista con todos los servicios.
 *     description: Devuelve la lista de todos los servicios disponibles.
 *     tags: [Services]  
 *     responses:
 *       '200':
 *         description: Servicios obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/Service'
 *                   - $ref: '#/components/schemas/City'
 *       '500':
 *         description: Error al obtener los servicios.
 *       '404':
 *         description: No se encontraron servicios registrados.
 */


router.get('/services', servicesController.getServices);

/**
 * @swagger
 * /api/v1/alpha/services:
 *   post:
 *     summary: Crear un nuevo servicio
 *     description: Crea un nuevo servicio y devuelve información sobre el servicio creado
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       '200':
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *       '401':
 *         description: Debe proporcionar un token válido
 *       '403':
 *         description: No se ha proporcionado un token
 *       '500':
 *         description: Error al crear el servicio
 * components:
 *   schemas:
 *     ServiceResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del servicio creado
 *           example: abc123
 *         title:
 *           type: string
 *           description: Título del servicio creado
 *           example: Clases de guitarra
 *         description:
 *           type: string
 *           description: Descripción del servicio creado
 *           example: En línea desde Liverpool
 *         photo:
 *           type: string
 *           format: binary
 *           description: Foto del servicio creado (ruta o enlace a la imagen)
 *           example: https://example.com/service1.jpg
 *         category:
 *           type: string
 *           description: Categoría del servicio creado
 *           enum:
 *             - categoria_1
 *             - categoria_2
 *           example: categoria_1
 *         price:
 *           type: integer
 *           description: Precio del servicio creado
 *           example: 12000
 *         city:
 *           type: string
 *           description: Ciudad del servicio creado
 *           enum:
 *             - ciudad_1
 *             - ciudad_2
 *           example: ciudad_1
 *         available_for_offers:
 *           type: boolean
 *           description: Disponibilidad para ofertas
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del servicio creado (formato ISO 8601)
 *           example: '2023-08-07T20:15:06.384Z'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del servicio creado (formato ISO 8601)
 *           example: '2023-08-07T20:15:06.384Z'
 */



router.post('/services', verifyToken, upload.single('photo'), servicesController.createService);

/**
 * @swagger
 * /api/v1/alpha/services/user:
 *   get:
 *     summary: Obtener la lista de servicios por usuario
 *     description: Devuelve la lista de servicios pertenecientes al usuario.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Servicios obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       '500':
 *         description: Error al obtener los servicios
 *       '404':
 *         description: No se encontraron servicios registrados para el usuario
 */

router.get('/services/user', verifyToken, servicesController.getServiceByUser);

module.exports = router;
