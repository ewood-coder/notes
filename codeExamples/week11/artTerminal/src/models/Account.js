export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.coverImg = data.coverImg
    this.linkedin = data.linkedin
    this.bio = data.bio
  }
}
