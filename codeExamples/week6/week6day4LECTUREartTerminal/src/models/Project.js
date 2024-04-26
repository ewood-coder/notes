import { Account } from "./Account.js"


export class Project {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.projectImgs = data.projectImgs
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}

/**
 * title: String, required
coverImg: String,
creatorId: SchemaObjectId, required
*creator: Object (Virtual Added by Database)
projectImgs: undefined,
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 *
 */
