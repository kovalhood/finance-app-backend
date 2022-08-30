const {Category} = require('../models/categories');
const categories = require('../db_categories/categories.json');

const defaultUserCategories = async (_id) => {
    const data = categories.map(item => ({ ...item, owner: _id }));
    const userCategories = await Category.create(data);
    return userCategories;
}

module.exports = defaultUserCategories;