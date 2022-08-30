const { Schema, model } = require("mongoose");
const Joi = require('joi');

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: "expenses"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
    title: Joi.string().min(2).max(15),
    type: Joi.string(),
  })

const Category = model('categories', categorySchema);

module.exports = {
    Category,
    joiSchema,
};