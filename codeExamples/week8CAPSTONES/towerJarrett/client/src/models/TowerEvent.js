export class TowerEvent {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creator = data.creator
        this.ticketCount = data.ticketCount
    }

    get status() {
        return this.isCanceled ? 'Canceled' : this.ticketCount >= this.capacity ? 'Sold Out' : this.startDate < new Date() ? 'Ended' : 'Active'
    }
}