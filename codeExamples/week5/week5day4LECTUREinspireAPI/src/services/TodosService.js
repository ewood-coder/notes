import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class TodosService {

	async createTodo(todoData) {
		const todo = await dbContext.Todos.create(todoData)
		return todo
	}

	async getUserTodos(userId) {
		// --------------------------------------{ creatorId: '634844a08c9d1ba02348913d' }
		const todos = await dbContext.Todos.find({ creatorId: userId }) // returns only todos where we are the creator
		return todos
	}

	async getTodoById(todoId) {
		const todo = await dbContext.Todos.findById(todoId)
		if (!todo) throw new Error(`Not Todo with id: ${todoId}`)
		return todo
	}

	async updateTodo(todoId, updateData) { // updateData, doesn't usually have a creatorId, we added it in the controller
		const todoToUpdate = await this.getTodoById(todoId) // we can re-use this get by id, and we get the added benefit of the null check in it too.
		// NOTE is the creator of the original, the creator of the update
		if (todoToUpdate.creatorId != updateData.creatorId) throw new Forbidden(`Cannot update, that which is not yours`)

		//------------if they provided and update, use it ?? if they did not, use the original
		todoToUpdate.description = updateData.description ?? todoToUpdate.description
		todoToUpdate.completed = updateData.completed ?? todoToUpdate.completed
		await todoToUpdate.save()
		return todoToUpdate
	}

	async deleteTodo(todoId, userId) { // don't forget to add the parameter here, AND MAKE SURE THEY ARE IN THE RIGHT ORDER
		const todoToDelete = await this.getTodoById(todoId)
		// NOTE making a check to make sure you cannot delete something you don't own
		if (todoToDelete.creatorId != userId) throw new Forbidden("That's my purse I don't know you!")


		await todoToDelete.deleteOne()
		return `${todoToDelete.description} was removed` // even though we deleted it on the line above, we still have reference to it in our code, and can used that to make a custom success message
	}
}

export const todosService = new TodosService()
