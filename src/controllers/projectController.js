const express = require('express')

const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')
const Tarefa = require('../models/Tarefas')


const router = express.Router()

router.use(authMiddleware)

router.get('/' , (req , res) => {
    res.send({ ok: true })
})

router.post('/create' , async(req , res) => {
    try {
        const tarefa = await Tarefa.create({ ...req.body , user: req.userId})

        User.tasks.push(tarefa)
        return res.send({ tarefa })
    } catch (error) {
        return res.send({ error: "Error to create task" })
    }
})

router.get('/list' , async(req , res) => {
    try {
        const users = await User.find()
        return res.send({ users })
    } catch (error) {
        return res.send({ error: "Error to find task" })
    }
})


module.exports = app => app.use('/projects' , router)