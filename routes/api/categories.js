const express = require('express');

const ctrl = require(`../../controllers/categories`);

const { ctrlWrapper } = require(`../../helpers`);

const { auth } = require(`../../middlewares`);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAllCategories));

module.exports = router;