const express = require('express')
const todoController = require('../controllers/todo.controller')
const router = express.Router()

router.route('/todo').get(todoController.readTodos);
router.route('/todo').post(todoController.createTodo);
router.route('/todo/:id').delete(todoController.deleteTodo);
router.route('/todo/:id').patch(todoController.updateTodo);
router.route('/todo/:code').put(todoController.filterTodo);

module.exports = router