import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Event } from "../models/Event"


class EventsService {

  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('getting events from service', response.data)
    AppState.events = response.data.map(event => new Event(event))
  }

  async createEvent(eventData) {
    AppState.activeEvent = null
    const response = await api.post(`api/events`, eventData)
    logger.log('creating event', response.data)
    const newEvent = new Event(response.data)
    AppState.myEvents.push(newEvent)
    return newEvent
  }
  async getEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log('getting event by Id', response.data)
    AppState.activeEvent = new Event(response.data)
  }

  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    console.log('canceling event', response.data)
    const indexToRemove = AppState.myEvents.findIndex(event => event.id == eventId)
  }

  // async getMyEvents(){
  //   const response = await api.get()
  // }

}

export const eventsService = new EventsService()