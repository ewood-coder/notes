import { Auth0Provider } from "@bcwdev/auth0provider"
import { todosService } from "../services/TodosService.js"
import BaseController from "../utils/BaseController.js"




export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo) // if this is on top of all our requests, then no request here can be made without being logged in
      .post('', this.createTodo)
      .get('', this.getUserTodos)
      .get('/:todoId', this.getTodoById)
      .put('/:todoId', this.updateTodo)
      .delete('/:todoId', this.deleteTodo)
  }

  async createTodo(request, response, next) {
    try {
      const todoData = request.body
      const userInfo = request.userInfo
      todoData.creatorId = userInfo.id
      const todo = await todosService.createTodo(todoData)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async getUserTodos(request, response, next) {
    try {
      const userInfo = request.userInfo
      const todos = await todosService.getUserTodos(userInfo.id)
      response.send(todos)
    } catch (error) {
      next(error)
    }
  }

  async getTodoById(request, response, next) {
    try {
      const todoId = request.params.todoId
      const todo = await todosService.getTodoById(todoId)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  async updateTodo(request, response, next) {
    try {
      const todoId = request.params.todoId
      const updateData = request.body
      const userInfo = request.userInfo
      updateData.creatorId = userInfo.id // adding the users id onto the updateData so we can use it in the service
      // TODO who is trying to do this
      const updatedTodo = await todosService.updateTodo(todoId, updateData)
      response.send(updatedTodo)
    } catch (error) {
      next(error)
    }
  }

  async deleteTodo(request, response, next) {
    try {
      const todoId = request.params.todoId
      const userInfo = request.userInfo
      const message = await todosService.deleteTodo(todoId, userInfo.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
