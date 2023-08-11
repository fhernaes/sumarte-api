const regionService = require('../services/regionServices');

const getRegions = async (req, res) => {
    try {
        const regions = await regionService.getRegions();
        if (!regions) {
            res.status(404).json({
                code: 404,
                message: "No hay regiones registradas",
                error: error.message
            });
        }
        res.status(200).json({
            status: 200,
            message: "Regiones obtenidas exitosamente",
            data: regions
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener las regiones",
            error: error.message
        });
    }
}

module.exports = {
    getRegions
}
