const mongoose = require('../database')
const bcrypt = require('bcryptjs')
const { mongo } = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    classTyoe: {
        type: String,
        require: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarefa'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save' , async function(next){
    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash;
    next()
})

const User = mongoose.model('User' , UserSchema)

module.exports = User