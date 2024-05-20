import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { Forbidden } from "../utils/Errors.js"


class EventsService {

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    await event.populate('ticketCount')
    return event
  }

  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator', 'name picture').populate('ticketCount')
    return events
  }

  async getEventById(eventId) {
    const event = await (await dbContext.Events.findById(eventId).populate('creator', 'name picture')).populate('ticketCount')
    if (!event) {
      throw new BadRequest(`Invalid id: ${eventId}`)
    }
    return event
  }

  async editEventById(eventId, eventData, userId) {

    const originalEvent = await this.getEventById(eventId)

    if (!originalEvent) {
      throw new Error('This event does not exist')
    }
    if (originalEvent.creatorId != userId) {
      throw new BadRequest('You cannot edit an event you did not create')
    }
    if (originalEvent.isCanceled)
      throw new BadRequest('A canceled event cannot be edited')

    originalEvent.name = eventData.name ? eventData.name : originalEvent.name
    originalEvent.description = eventData.description ? eventData.description : originalEvent.description
    originalEvent.coverImg = eventData.coverImg ? eventData.coverImg : originalEvent.coverImg
    originalEvent.location = eventData.location ? eventData.location : originalEvent.location
    originalEvent.capacity = eventData.capacity ? eventData.capacity : originalEvent.capacity
    originalEvent.startDate = eventData.startDate ? eventData.startDate : originalEvent.startDate

    originalEvent.type = eventData.type ? eventData.type : originalEvent.type

    await originalEvent.save()
    return originalEvent
  }



  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)
    if (eventToCancel.creatorId != userId) {
      throw new Forbidden("This is not your event to cancel")
    }

    eventToCancel.isCanceled = !eventToCancel.isCanceled

    await eventToCancel.save()
    return eventToCancel
  }


}




export const eventsService = new EventsService()