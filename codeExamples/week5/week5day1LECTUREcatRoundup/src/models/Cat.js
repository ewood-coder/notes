import { Schema } from "mongoose";

// NOTE the schema is how our data in the database will be stored
// a lot like a model for our appstate
export const CatSchema = new Schema({
  // id is implied, since everything in the database requires one to be stored
  name: String,
  color: { type: String, required: true },
  age: { type: Number, required: true, min: 0, max: 30 },
  isFeisty: { type: Boolean, required: true, default: false }
})
