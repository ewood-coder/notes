import { AppState } from "../AppState"
import { TowerComment } from "../models/TowerComment"
import { api } from "./AxiosService"

class CommentsService {
    async postComment(formData) {
        const response = await api.post(`api/comments`, formData)
        AppState.activeEventComments.unshift(new TowerComment(response.data))
    }
    async getCommentsForEvent(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        response.data.reverse()
        AppState.activeEventComments = response.data.map(x => new TowerComment(x))
    }

    async deleteComment(comment) {
        const index = AppState.activeEventComments.findIndex(x => x.id == comment.id)
        if (index == -1) throw new Error('Cannot find comment.')

        await api.delete(`api/comments/${comment.id}`)

        AppState.activeEventComments.splice(index, 1)
    }
}

export const commentsService = new CommentsService()