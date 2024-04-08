import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";




// NOTE extends BaseController is how we attach our controller, to the "main hallway" of our api
export class CatsController extends BaseController {
  constructor() {
    // NOTE the super is responsible for the "sign on the door". How network requests are directed to this controller
    super('api/cats') // the super calls the constructor of the extended class
    this.router.get('/test', this.testCats)
    this.router.get('', this.getCats)
    this.router.post('', this.createCat)
    this.router.delete('/:catId', this.adoptCat) // the : creates a parameter. and a value can be passes in on the request
  }

  // NOTE each express "door" has available to it 3 parameters, all regarding, the different "hallways" or "pipelines" of each request
  // they ALWAYS come in this order, no matter what you name them
  // Request is incoming information, Response is outgoing information
  testCats(request, response, next) {
    console.log('🐈🐈😽🐈‍⬛😼')
    response.send('Yeah i got some cats for you 😼😼🐈‍⬛🐈‍⬛😽😽🐈🐈🐈')
  }


  /**
 * Sends all values back to the client
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async getCats(request, response, next) {
    try {
      const cats = await catsService.getCats() // we ask the service for info
      // response.statusCode = 202 very rarely will we modify the response
      response.send(cats) // then send that info back to the client
    } catch (error) {
      next(error) // next pushes then onto the next door, then the hall, until they are out of "next" options, which sends them home (usually with an error)
      console.error(error)
    }
  }

  async createCat(request, response, next) {
    try {
      // debugger does not work, but we can use "breakpoints", click on the left side of a numbered line, to include one. then respin, and try to run that code.
      const catData = request.body
      const cat = await catsService.createCat(catData)
      response.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async adoptCat(request, response, next) {
    try {
      const catId = request.params.catId
      await catsService.adoptCat(catId)
      response.send("Cat was adopted")
    } catch (error) {
      next(error)
    }
  }
}
