const serviceServices = require('../services/serviceServices');
const uuid = require('uuid');
require('dotenv').config();
const { deleteFile } = require('../middleware/cloudinary_multer');

const getServices = async (req, res) => {
  try {
    const services = await serviceServices.getServices();
    if (services.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No hay servicios registrados"
      });
    }
    res.status(200).json({
      status: 200,
      message: "Servicios obtenidos exitosamente",
      data: services
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Error al obtener los servicios",
      error: error.message
    });
  }
};

const getServiceByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const services = await serviceServices.getServicesByUser(user_id);
    if (services.length === 0) {
      res.status(404).json({
        code: 404,
        message: "El usuario no tiene servicios registrados"
      });
    } else {
      res.status(200).json({
        code: 200,
        message: "Servicios obtenidos exitosamente para el usuario",
        data: services
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Error al obtener los servicios del usuario",
      error: error.message
    });
  }
};


const createService = async (req, res) => {
  const user_id = req.user.id;
  const id = uuid.v4().slice(0, 6);
  const { title, description, category_id, price, city_id, available_for_offers } = req.body;

  const public_id = req.file.filename;

  try {
    const serviceData = {
      id,
      user_id,
      title,
      description,
      photo: req.file.path,
      category_id,
      price,
      city_id,
      available_for_offers,
    };
    const service = await serviceServices.createService(serviceData);

    res.status(201).json({
      code: 201,
      message: "Servicio creado exitosamente",
      data: service
    });

  } catch (error) {
    console.error(error);
    deleteFile(public_id);
    res.status(500).json({
      code: 500,
      message: "Error al crear el servicio",
      error: error.message
    });
  }
};

module.exports = {
  getServices, createService, getServiceByUser
};