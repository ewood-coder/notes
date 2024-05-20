import { Account } from "./Account"
import { TowerEvent } from "./TowerEvent"

export class Ticket {
    constructor(data) {
        this.id = data.id
        this.accountId = data.accountId
        this.profile = new Account(data.profile)
        this.event = new TowerEvent(data.event)
        this.eventId = data.eventId
    }
}