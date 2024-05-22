import { Profile } from "./Profile.js";

export class Cultist extends Profile {
  constructor(data) {
    super(data)
    this.cultId = data.cultId
    this.cultMemberId = data.cultMemberId
  }
}