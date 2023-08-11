const { Category } = require('../../models');

const getCategories = async () => {
    return Category.findAll();
}

module.exports = {
    getCategories
}