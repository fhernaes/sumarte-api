const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { emitToken, verifyToken, validateAdmin } = require("../middleware/auth");

router.post('/users', usersController.createUser);
/**
 * @swagger
 * /api/v1/alpha/users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     description: Crea un nuevo usuario y devuelve información sobre el usuario creado.
 *     tags: [Users]  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserForRegister'
 *     responses:
 *       '201':
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserForResponse'
 *         example:
 *           status: 201
 *           message: Usuario registrado exitosamente
 *           data:
 *             $ref: '#/components/schemas/UserForResponse'
 *       '409':
 *         description: Ya existe un usuario registrado con ese email.
 *       '500':
 *         description: Error al crear el usuario.
 */


router.post('/login', emitToken, usersController.loginUser);
/**
 * @swagger
 * /api/v1/alpha/login:
 *   post:
 *     summary: Inicia sesión en la aplicación
 *     description: Inicia sesión en la aplicación y devuelve un token de autenticación.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserForLogin'
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Inicio de sesión exitoso
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1MjQ1ODEsImRhdGEiOiI2ZGZmNjMiLCJpYXQiOjE2OTE1MjA5ODF9.hEzp_MKS5nk908kVxNPxEuSQV0y32Keo7-aoYQUutc8"
 *       '400':
 *         description: Error de autenticación
 *       '401':
 *         description: Credenciales no válidas
 *       '500':
 *         description: Error al iniciar sesión
 * 
 */

router.get('/user', verifyToken, usersController.getUser);

//* No implementadas */
//router.get('/users/:email', usersController.getUserByEmail);
//router.delete('/users/:id', usersController.deleteUser);
//router.get('/users', verifyToken, validateAdmin ,usersController.getUsers);

module.exports = router;
