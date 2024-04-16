


export class Movie {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.overview = data.overview
    this.poster = `https://image.tmdb.org/t/p/original${data.poster_path}`
    this.backdrop = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    this.popularity = data.popularity
    this.releaseDate = new Date(data.release_date.replaceAll('-', '/'))
    this.voteAverage = data.vote_average

    // data from the detailed movie
    this.budget = data.budget
    this.revenue = data.revenue
    this.runtime = data.runtime
    this.tagline = data.tagline
    this.genres = data.genres?.map(g => g.name)
    this.productionCompanies = data.production_companies?.map(c => c.name)
  }
}

/**{
    "adult": false,
    "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    "genre_ids": [
        878,
        12
    ],
    "id": 693134,
    "original_language": "en",
    "original_title": "Dune: Part Two",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    "popularity": 4004.451,
    "poster_path": "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    "release_date": "2024-02-27",
    "title": "Dune: Part Two",
    "video": false,
    "vote_average": 8.306,
    "vote_count": 2873
} */
