import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/TowerEvent.js';
import { TicketSchema } from '../models/Ticket.js';
import { CommentSchema } from '../models/TowerComment.js';

class DbContext {
    Account = mongoose.model('Account', AccountSchema)
    TowerEvent = mongoose.model('TowerEvent', EventSchema)
    Ticket = mongoose.model('Ticket', TicketSchema)
    TowerComment = mongoose.model('TowerComment', CommentSchema)
}

export const dbContext = new DbContext()
