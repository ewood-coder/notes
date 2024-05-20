

export class Event {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator
    this.ticketCount = data.ticketCount
  }
}

// let data = {
//   creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
//   name: { type: String, required: true, maxlength: 30 },
//   description: { type: String, required: true, maxlength: 1000 },
//   coverImg: { type: String, required: true, maxlength: 500 },
//   location: { type: String, required: true, maxlength: 50 },
//   capacity: { type: Number, required: true, minlength: 3, maxlength: 2000 },
//   startDate: { type: String, required: true, maxlength: 20 },
//   isCanceled: { type: Boolean, required: true, default: true },
//   type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
// }