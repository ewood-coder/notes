import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class EventsService {
    async getEvents() {
        const events = await dbContext.TowerEvent.find().populate('ticketCount').populate('creator')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.TowerEvent.findById(eventId)
        if (!event) throw new Error('Could not find an event by that ID.')

        await event.populate('creator')
        await event.populate('ticketCount')
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('ticketCount')
        await event.populate('creator')
        return event
    }

    async editEvent(eventId, eventData, userId) {
        const event = await this.getEventById(eventId)

        if (event.creatorId != userId) throw new Forbidden('You cannot edit an event that you did not create.')
        if (event.isCanceled) throw new Error('You cannot edit an event that has been canceled.')

        event.name = eventData.name ?? event.name
        event.description = eventData.description ?? event.description
        event.coverImg = eventData.coverImg ?? event.coverImg
        event.location = eventData.location ?? event.location
        event.capacity = eventData.capacity ?? event.capacity
        event.startDate = eventData.startDate ?? event.startDate
        event.type = eventData.type ?? event.type

        await event.save()
        return event
    }

    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)

        if (event.creatorId != userId) throw new Forbidden('You cannot cancel an event that you did not create.')

        event.isCanceled = true
        await event.save()
        return event
    }
}

export const eventsService = new EventsService()