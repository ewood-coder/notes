import { AppState } from "../AppState.js"
import { Artwork } from "../models/Artwork.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ArtworksService {
  async getArtworksV2(page = '1') {
    const res = await api.get(`api/artworks?page=${page}`)
    logger.log('GOT ARTWORKS', res.data)
    AppState.artworks = res.data.artworks.map(pojo => new Artwork(pojo))
    AppState.page = res.data.page
    AppState.totalPages = res.data.pages
  }
  async changePage(page) {
    const res = await api.get(`api/artworks?page=${page}`)
    logger.log('GOT ARTWORKS', res.data)
    AppState.artworks = res.data.artworks.map(pojo => new Artwork(pojo))
    AppState.page = res.data.page
    AppState.totalPages = res.data.pages
  }
  async getArtworks() {
    const res = await api.get('api/artworks')
    logger.log('GOT ARTWORKS', res.data)
    AppState.artworks = res.data.artworks.map(pojo => new Artwork(pojo))
    AppState.page = res.data.page
    AppState.totalPages = res.data.pages
  }
}

export const artworksService = new ArtworksService()