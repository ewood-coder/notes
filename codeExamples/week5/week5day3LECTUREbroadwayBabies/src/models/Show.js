import { Schema } from "mongoose";


export const ShowSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 50 },
  handlerId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  animalId: { type: Schema.ObjectId, required: true, ref: 'Animal' }
}, { toJSON: { virtuals: true } })


//
ShowSchema.virtual('animal', { // this virtual does nothing on it's own, because it is another call to the DB, that needs to be filled in.
  localField: 'animalId', // I have an animal Id
  ref: 'Animal', // go to this collection
  foreignField: '_id', // what does that other collection have in common with localField
  justOne: true // there is just one animal, i am attaching
})

ShowSchema.virtual('handler', {
  localField: 'handlerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
