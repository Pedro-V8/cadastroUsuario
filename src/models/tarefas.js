const mongoose = require('../database')


const TarefaSchema = new mongoose.Schema({
    titulo: {
        type: String,
    },
    descricao: {
        type: String,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})




const Tarefa = mongoose.model('Tarefa' , TarefaSchema)

module.exports = Tarefa