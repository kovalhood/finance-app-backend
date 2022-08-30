const { Category } = require('../../models/categories');

const getAllCategories = async (req, res, next) => {
    const { _id } = req.user;

    const categories = await Category.find({ owner: _id }, '_id title type owner');

    res.json({
        status: "success",
        code: 200,
        categories
    });

}

module.exports = getAllCategories;