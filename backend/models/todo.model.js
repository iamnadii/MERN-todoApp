const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name must be required']
    },
    checked: {
        type: Boolean,
        default: false
    }
})

const todo = mongoose.model('todo', todoSchema)

module.exports = todo;