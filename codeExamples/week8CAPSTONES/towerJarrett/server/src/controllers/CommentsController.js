import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.destroyComment)
    }

    async destroyComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const result = await commentsService.destroyComment(commentId, userId)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }

    async createComment(request, response, next) {
        try {
            const userId = request.userInfo.id
            const commentData = request.body
            commentData.creatorId = userId
            const comment = await commentsService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}