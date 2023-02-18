const todo = require('../models/todo.model')

exports.readTodos = async (req, res) => {
    try {
        const allTodos = await todo.find()
        res.status(200).json({
            status: 'success',
            count: allTodos.length,
            data: {
                allTodos
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.createTodo = async (req, res) => {
    try {
        const body = req.body;
        const newTodo = await todo.create(body)
        res.status(200).json({
            status: 'success',
            data: {
                newTodo
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await todo.findByIdAndDelete(id)
        res.status(200).json({
            status: 'success',
            message: "Deleted successfully!"
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body
        const updatedTodo = await todo.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'success',
            data: {
                updatedTodo
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

// todo filters
exports.filterTodo = async (req, res) => {
    try {
        const code = req.params.code;
        let filteredData;
        if (code == 1) {
            filteredData = await todo.find();
        } else if (code == 2) {
            filteredData = await todo.find({ checked: false })
        } else if (code == 3) {
            filteredData = await todo.find({ checked: true })
        } else if (code == 4) {
            await todo.deleteMany({ checked: true })
            return res.status(200).json({
                status: 'success',
                message: 'Clear completed successfully!'
            })
        }
        res.status(200).json({
            statu: 'success',
            data: {
                filteredData
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}