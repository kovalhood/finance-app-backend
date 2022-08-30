const { Category } = require('../../models/categories');

const getAllCategories = async (req, res) => {
    const { _id } = req.user;
    console.log(_id)

    const categories = await Category.find({ owner: _id }, '_id title type owner');

    res.json({
        status: "success",
        code: 200,
        categories
    });

}

module.exports = getAllCategories;