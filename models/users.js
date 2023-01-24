const mongoose = require('mongoose');
const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ user_id: this._id, username: this.username }, process.env.SECRET_KEY)
    return token
}

const User = mongoose.model('user', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(user)
}

module.exports.User = User;
module.exports.validate = validateUser
