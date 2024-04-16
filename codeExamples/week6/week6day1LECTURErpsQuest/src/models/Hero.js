


export class Hero {
  constructor(data) {
    this.name = data.name
    this.type = data.type
    this.health = data.health
    this.maxHealth = this.health
    this.picture = data.picture
    this.level = data.level
  }
}
