const userProfilesServices = require('../services/userProfilesServices');
const uuid = require('uuid');
require('dotenv').config();
const { deleteFile } = require('../middleware/cloudinary_multer');

const createUserProfile = async (req, res) => {
  const user_id = req.user.id;
  const id = uuid.v4().slice(0, 6);
  const { educational_level, institution, degree, video_presentation, experience } = req.body;
  const public_id = req.file.filename;

  try {
    const userProfile = await userProfilesServices.findUserProfile(user_id);
    if (userProfile) {
      deleteFile(public_id);
      return res.status(400).json({
        status: 400,
        message: 'Ya existe un perfil de usuario con ese ID',
      });
    }

    const userProfileData = {
      id,
      user_id,
      educational_level,
      institution,
      degree,
      video_presentation,
      avatar: req.file.path,
      experience,
    }

    await userProfilesServices.createUserProfile(userProfileData);
    res.status(201).json({
      status: 201,
      message: "Perfil de usuario creado correctamente",
      data: userProfileData
    });

  } catch (error) {
    console.error(error);
    deleteFile(public_id);
    res.status(500).json({
      status: 500,
      message: "Error al crear el perfil de usuario",
    });
  }
};

const updateUserProfile = async (req, res) => {
  const user_id = req.user.id;
  const { educational_level, institution, degree, video_presentation, experience } = req.body;

  try {
    const userProfile = await userProfilesServices.findUserProfile(user_id);
    if (!userProfile) {
      return res.status(404).json({
        status: 404,
        message: 'No existe un perfil de usuario con ese ID'
      });
    }

    // Si no hay un perfil de usuario y se subió un archivo
    if (userProfile && req.file) {
      let avatarPath = req.file.path;
      await userProfilesServices.updateUserProfile(user_id, {
        educational_level,
        institution,
        degree,
        video_presentation,
        experience,
        avatarPath
      });

      res.status().json({
        message: 'Perfil de usuario actualizado exitosamente'
      });
    }
    await userProfilesServices.updateUserProfile(user_id, {
      educational_level,
      institution,
      degree,
      video_presentation,
      experience
    });
    res.json({
      message: 'Perfil de usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Ha ocurrido un error al actualizar el perfil de usuario'
    });
  }
};

module.exports = {
  createUserProfile,
  updateUserProfile

};
