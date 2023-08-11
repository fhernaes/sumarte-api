const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const userProfilesController = require('../controllers/userProfilesController');
const { upload } = require('../middleware/cloudinary_multer');
/**
 * @swagger
 * /api/v1/alpha/profiles:
 *   post:
 *     summary: Crea un perfil de usuario
 *     description: Crea un perfil de usuario despues de iniciada la sesión
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               educational_level:
 *                 type: string
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               video_presentation:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *               experience:
 *                 type: string
 *     responses:
 *       201:
 *         description: Perfil de usuario creado exitosamente
 *       401:
 *         description: No se ha proporcionado un token de acceso válido
 *       500:
 *         description: Error al crear perfil de usuario
 */
router.post('/profiles', verifyToken, upload.single('avatar'), userProfilesController.createUserProfile);


/* No implementadas */
//router.get('/profiles', userProfilesController.getUserProfiles);
//router.put('/profiles', verifyToken, upload.single('avatar'), userProfilesController.updateUserProfile);


module.exports = router;

