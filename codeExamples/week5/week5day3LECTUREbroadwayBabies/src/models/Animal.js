import { Schema } from "mongoose";



export const AnimalSchema = new Schema({
  name: { type: String, minLength: 5, maxLength: 100, required: true },
  emoji: { type: String, minLength: 1, maxLength: 25, required: true },
  talent: { type: String, minLength: 1, maxLength: 100, required: true, default: 'Mauling' }
}, { toJSON: { virtuals: true } })


AnimalSchema.virtual('advertisement').get(() => {
  return `Come see ${this.name} the fantastic ${this.talent} ✨${this.emoji}`
})
