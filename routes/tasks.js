const router = require('express').Router();
const { Task, validate } = require('../models/tasks')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user_id: req.user })

    res.status(200).send(tasks)
})


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body.detail);
    if (error) return res.status(400).send(error.details[0].message)

    const task = new Task({
        title: req.body.detail.title,
        description: req.body.detail.description || null,
        due_date: req.body.detail.due_date,
        status: req.body.detail.status,
        user_id: req.user
    })
    await task.save()
    res.status(200).send({ message: 'success' })
})


router.patch('/', auth, async (req, res) => {
    const { detail } = req.body
    console.log(detail.title)
    const task = await Task.findById(detail._id)
    task.title = detail.title || task.title
    task.due_date = detail.due_date || task.due_date
    task.status = detail.status || task.status
    task.description = detail.description || task.description

    await task.save()
    res.status(200).send({ message: 'success' })
})


router.delete('/:id', auth, async (req, res) => {
    await Task.findOneAndRemove({ _id: req.params.id })

    res.status(200).send({ message: 'success' })
})

module.exports = router