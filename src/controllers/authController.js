  
const express = require('express')

const User = require('../models/User')
const Tarefa = require('../models/Tarefas')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
const router = express.Router()



function generateToken(params = {}){
    return jwt.sign(params , authConfig.secret , {
        expiresIn: 86400
    })
}


router.get('/users' , async (req , res) => {
    try {
        const users = await User.find()
        return res.status(200).send(users)
    } catch (error) {
        res.status(400).send({ error: "Not found"})
    }
})


router.post('/register' , async (req , res) => {
    const { email } = req.body
    try {
        if(await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists' })
        }

        const user = await User.create(req.body) 

        user.password = undefined
        return res.send({ 
            user,
            token: generateToken({ id: user.id })
        })
    } catch (error) {
        return res.status(400).send({ error: 'Registration Failed'})
    }
})

router.post('/authenticate' , async (req , res) => {
    const { email , password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return res.status(400).send({ error: 'User not found'} )
    }

    if(!await bcrypt.compare(password , user.password)){
        return res.status(400).send({ error: 'Invalid Password' })       
    }

    user.password = undefined


    res.send({
        user,
        token: generateToken({ id: user.id })
    })
    

})

router.delete('/delete' , async(req , res) => {
    try {
        const { email } = req.body

        await User.deleteOne({ email })
        res.status(200).send({ ok: "true" })
    } catch (error) {
        res.status(400).send({ error: "Can not delete" })
    }
})



module.exports = app => app.use('/auth' , router)