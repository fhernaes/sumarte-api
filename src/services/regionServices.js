const { Region, City } = require('../../models');

const getRegions = async () => {
    return Region.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: City,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'region_id']
                }
            }
        ]
    });
}

module.exports = {
    getRegions
}
