import { reactive } from 'vue'
import { Movie } from './models/Movie.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Movie[]} */
  movies: [],

  currentPage: 1,

  totalPages: Infinity,

  searchTerm: '', // once something has been searched, we can save it here

  /** @type {Movie} */
  activeMovie: null
})
