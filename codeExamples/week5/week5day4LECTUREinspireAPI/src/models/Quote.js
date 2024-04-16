import { Schema } from "mongoose";



export const QuoteSchema = new Schema({
  body: { type: String, required: true, minLength: 5, maxLength: 250 },
  authorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

QuoteSchema.virtual('author', { // don't forget to populate!
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
