import { Auth0Provider } from "@bcwdev/auth0provider";
import { animalsService } from "../services/AnimalsService.js";
import { showsService } from "../services/ShowsService.js";
import BaseController from "../utils/BaseController.js";

export class AnimalsController extends BaseController {
  constructor() {
    super('api/animals')
    this.router
      .get('', this.getAnimals)
      .get('/:animalId/shows', this.getAnimalShows)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:animalId', this.updateAnimal)
  }

  async getAnimals(request, response, next) {
    try {
      const searchQuery = request.query // why not just enable query searching here?
      const animals = await animalsService.getAnimals(searchQuery)
      response.send(animals)
    } catch (error) {
      next(error)
    }
  }

  async getAnimalShows(request, response, next) {
    try {
      const animalId = request.params.animalId
      const shows = await showsService.getAnimalShows(animalId)
      response.send(shows)
    } catch (error) {
      next(error)
    }
  }

  async updateAnimal(request, response, next) {
    try {
      const animalId = request.params.animalId
      const updateData = request.body
      const updatedAnimal = await animalsService.updateAnimal(animalId, updateData)
      response.send(updatedAnimal)
    } catch (error) {
      next(error)
    }
  }
}
