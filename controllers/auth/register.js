const bcrypt = require('bcryptjs');
// const gravatar = require('gravatar');
// const { v4 } = require("uuid");
// const { basedir } = global;
const { User, schemas } = require(`../../models/user`);
const { createError } = require(`../../helpers`);
const  defaultUserCategories  = require('../../services/defaultUserCategories');

const register = async (req, res) => {
    const { error } = schemas.register.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({ ...req.body, password: hashPassword });
        
    await defaultUserCategories(newUser._id);

    res.status(201).json({
        user: {
            email: newUser.email,
            balance: newUser.balance,
            
        },
    });
}

module.exports = register;