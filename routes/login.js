const router = require('express').Router()
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const { User } = require('../models/users');

dotenv.config()

function validateUser(cred) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(cred)
}

router.post('/', async (req, res) => {
    console.log(req.body)
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send({ error: "Invalid email or password" })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({ error: "Invalid email or password" })

    // const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY)

    const token = user.generateAuthToken()
    res.header('Access-Control-Expose-Headers', 'x-auth-token')
    res.header('x-auth-token', token)
    res.status(200).send()
})

module.exports = router