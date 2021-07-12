const express = require('express')

const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')
const Tarefa = require('../models/Tarefas')


const router = express.Router()

//router.use(authMiddleware)

router.get('/' , (req , res) => {
    res.send({ ok: true })
})

router.get('/allTasks' , async(req , res) => {
    try {
        const tarefas = await Tarefa.find()
        return res.status(200).send(tarefas)
    } catch (error) {
        
    }
})

router.post('/createTask' , async (req , res) => {
    try {
        const { titulo , descricao, assignedTo } = req.body
        const tarefa = await Tarefa.create({ titulo , descricao, assignedTo })
        return res.send({ tarefa })
    } catch (error) {
        return res.send({error: 'Failed to create task'})
    }
})



module.exports = app => app.use('/tasks' , router)