import { Schema } from "mongoose";



export const ImageSchema = new Schema({
  image: { type: String, required: true, maxLength: 500 },
  authorId: { type: Schema.ObjectId, required: true, ref: "Account" }
}, { timestamps: true, toJSON: { virtuals: true } })

ImageSchema.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
