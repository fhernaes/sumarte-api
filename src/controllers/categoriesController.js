const categoriesServices = require('../services/categoriesServices');

const getCategories = async (req, res) => {
    try {
        const categories = await categoriesServices.getCategories();
        if (!categories) {
            res.status(404).json({
            code: 404,
            message: "No hay categorías registradas",
            error: error.message
        });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener las categorías');
    }
}


module.exports = {
    getCategories
}
