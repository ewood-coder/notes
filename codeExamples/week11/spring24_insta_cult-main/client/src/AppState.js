import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,

  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/Cult.js').Cult[]} cults from the database*/
  cults: [],

  /** @type {import('./models/Cult.js').Cult} single cult from the database*/
  activeCult: null,

  /** @type {import('./models/Cultist.js').Cultist[]} cultists from the database*/
  cultists: []
})