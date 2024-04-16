import axios from "axios"
import { Movie } from "../models/Movie.js";
import { AppState } from "../AppState.js";

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '545c6ef058e65396849dfbbf381cbca3',
    'certification.gte': 'G',
    'certification.lte': 'PG-13',
    certification_country: 'US',
    include_adult: false
  }
})


class MoviesService {
  async getMovieById(movieId) {
    AppState.activeMovie = null // clear the appstate before you send the network request to erase old data
    const response = await movieApi.get(`movie/${movieId}`)
    console.log('🍿🎞️', response.data);
    AppState.activeMovie = new Movie(response.data)
  }

  async clearSearch() {
    AppState.searchTerm = ''
    await this.discoverMovies() // after the search is cleared, go back and get the initial movies
  }

  async searchMovies(searchQuery) {
    const response = await movieApi.get(`search/movie?query=${searchQuery}`)
    console.log('🔎🎞️', response.data);
    const movies = response.data.results.map(movieData => new Movie(movieData))
    AppState.searchTerm = searchQuery
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
  }

  async changePage(pageNumber) {
    const response = await movieApi.get(`discover/movie?page=${pageNumber}`)
    console.log('📃🎞️', response.data)
    const movies = response.data.results.map(movieData => new Movie(movieData))
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
  }

  async discoverMovies() {
    const response = await movieApi.get('discover/movie')
    console.log('🎞️', response.data);
    const movies = response.data.results.map(movieData => new Movie(movieData))
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
  }

  async getMoviesV2(url) { // only called it v2 cause it is replacing the other functions and i don't want to erase them. They are still useful references
    const response = await movieApi.get(url)
    console.log('🎞️🎞️', response.data);
    const movies = response.data.results.map(movieData => new Movie(movieData))
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
  }

}

export const moviesService = new MoviesService()
