import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {
    async destroyComment(commentId, userId) {
        const comment = await dbContext.TowerComment.findById(commentId)
        if (!comment) throw new Error('Could not find a comment by supplied ID.')
        if (comment.creatorId != userId) throw new Forbidden('You cannot delete a comment that you did not create.')
        await comment.deleteOne()
        return { status: 200, message: "Successfully deleted comment." }
    }
    async getCommentsForEvent(eventId) {
        const comments = await dbContext.TowerComment.find({ eventId: eventId }).populate('creator')
        return comments
    }
    async createComment(commentData) {
        const comment = await dbContext.TowerComment.create(commentData)
        await comment.populate('creator')
        return comment
    }
}

export const commentsService = new CommentsService()