import { dbContext } from "../db/DbContext.js"



class ShowsService {
  async getUserShows(userId) {
    const userShows = await dbContext.Shows.find({ handlerId: userId }).populate('animal')
    return userShows
  }
  async getAnimalShows(animalId) {/// -------------{ animalId: '6615c244e91b1eea55eeb171'}
    const animalShows = await dbContext.Shows.find({ animalId: animalId }).populate('handler', '-email')
    // no need to populate the animal, we are making the assumption you already know that information based on the fact you have their id.
    return animalShows
  }
  async getShows() {
    // const shows = await dbContext.Shows.find().populate('animal').populate('handler', 'name picture')
    const shows = await dbContext.Shows.find().populate('animal').populate('handler', '-email')
    return shows
  }
  async createShow(showData) {
    const show = await dbContext.Shows.create(showData)// populate on create works differently.
    await show.populate('animal') // it has to happen after the create
    await show.populate('handler', '-email')
    return show
  }

}


export const showsService = new ShowsService()
