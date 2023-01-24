const mongoose = require('mongoose');
const Joi = require('Joi');

const Task = mongoose.model('Task', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    due_date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}))

function validateTask(task) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(''),
        due_date: Joi.date().iso().required(),
        status: Joi.string().required()
    });
    return schema.validate(task)
}

module.exports.Task = Task
module.exports.validate = validateTask