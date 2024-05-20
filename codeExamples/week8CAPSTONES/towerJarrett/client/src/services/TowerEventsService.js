import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
    async getMyEvents() {
        if (AppState.towerEvents.length != 0) return
        const response = await api.get('api/events')
        AppState.towerEvents = response.data.map(x => new TowerEvent(x))
    }
    async cancelEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)
        AppState.activeEvent = new TowerEvent(response.data)
    }
    async createEvent(formData) {
        const response = await api.post('api/events', formData)
        return new TowerEvent(response.data)
    }
    async getEventById(eventId) {
        AppState.activeEvent = null
        const response = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = new TowerEvent(response.data)
    }
    async getEvents() {
        AppState.towerEvents = null
        const events = await api.get('api/events')
        AppState.towerEvents = events.data.map(x => new TowerEvent(x))
    }
}

export const eventsService = new TowerEventsService()