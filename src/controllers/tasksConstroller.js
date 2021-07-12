const express = require('express')

const User = require('../models/User')
const Tarefa = require('../models/tarefas')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

const router = express.Router()



router.get('/' , async (req , res) => {
    const tarefa = await Tarefa.find()
    return res.send(tarefa)
})

module.exports = app => app.use('/task' , router)