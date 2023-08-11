const userServices = require('../services/userServices');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const getUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers();
        if (!users) {
            res.status(404).send("No hay usuarios registrados");
        }
        res.status(200).json({
            status: 200,
            message: "Usuarios obtenidos exitosamente",
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener los usuarios",
            error: error.message
        });
    }
}
// login
const loginUser = async (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Inicio de sesión exitoso.",
        token: req.token,
    });

};
const getUser = async (req, res) => {
    const user_id = req.user.id;
    try {
        const user = await userServices.getUserById(user_id);
        if (user === null) {
            res.status(404).json({
                status: 404,
                message: "No existe el usuario en la base de datos",
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Usuario encontrado en la base de datos",
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener la información del usuario",
            error: error.message
        });
    }
}
const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userServices.getUserByEmail(email);

        if (user === null) {
            res.status(404).json({
                code: 404,
                message: "No existe un usuario registrado con ese email en la base de datos",
            });
            return;
        }

        res.status(200).json({
            code: 200,
            message: "Usuario encontrado por email en la base de datos",
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener la información del usuario",
            error: error.message
        });
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (user !== null) {
        res.status(409).json({
            status: 409,
            message: "Ya existe un usuario registrado con ese email",
        });
        return;
    }
    try {
        const id = uuid.v4().slice(0, 6);
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = {
            id,
            name,
            email,
            password: hashedPassword
        };

        const user = await userServices.createUser(userData);

        res.status(201).json({
            status: 201,
            message: "Usuario registrado exitosamente",
            data: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Error al crear el usuario",
            error: error.message
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userServices.deleteUser(id);
        res.status(204).json({
            message: "Usuario eliminado exitosamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar al usuario",
            error: error.message
        });
    }
};

module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
    deleteUser,
    getUser,
    loginUser
};
