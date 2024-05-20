import { reactive } from 'vue'
import { Ticket } from './models/Ticket.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Event[]} */
  events: [],

  /** @type {Event} */
  activeEvent: null,

  /**@type {Event[]} */
  myEvents: [],

  /**@type {Comment[]} */
  comments: [],

  /**@type {Ticket[]} */
  tickets: [],

  /**@type {Ticket[]} */
  myTickets: []


})
