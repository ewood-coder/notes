import { Schema } from "mongoose";

export const EventSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    description: { type: String, required: true, minlength: 3, maxlength: 1000 },
    coverImg: { type: String, required: true, minlength: 3, maxlength: 500 },
    location: { type: String, required: true, minlength: 3, maxlength: 50 },
    capacity: { type: Number, required: true, min: 3, max: 2000 },
    startDate: { type: Date, required: true, maxlength: 30 },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
});


EventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true,
}
)