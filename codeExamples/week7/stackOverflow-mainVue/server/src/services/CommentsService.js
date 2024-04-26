import { dbContext } from "../db/DbContext.js"
import { eventsService } from "./EventsService.js"
import { BadRequest } from "../utils/Errors.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
    return comments
  }

  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId).populate('creator')
    if (!commentToDelete) {
      throw new Error('Wait, there is no comment to delete')
    }

    if (commentToDelete.creatorId != userId) {
      throw new Forbidden('oops, you are not authorized to delete this')
    }

    await commentToDelete.deleteOne()
    return 'comment was removed'
  }




}

export const commentsService = new CommentsService()