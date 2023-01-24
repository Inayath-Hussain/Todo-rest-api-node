const router = require('express').Router()
const Joi = require('joi');
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/users')


router.post('/', async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    try {
        await user.save()
    }
    catch (e) {
        res.status(500).send({ error: 'Something went wrong' })
    }

    const token = user.generateAuthToken()
    res.header('x-auth-token', token)
    res.status(200).send()
})


module.exports = router