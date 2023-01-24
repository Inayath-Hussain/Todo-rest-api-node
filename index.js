const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const task = require('./routes/tasks');
const login = require('./routes/login');
const register = require('./routes/register');


mongoose.connect('mongodb://localhost/todo',).then(() => console.log('Connected to DataBase...'))

const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}...`))
app.use(cors())
app.use(express.json())

app.use('/api/tasks', task);
app.use('/api/login', login);
app.use('/api/register', register);
