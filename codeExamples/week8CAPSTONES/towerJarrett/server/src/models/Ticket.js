import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' }
}, { toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'TowerEvent',
    justOne: true
})