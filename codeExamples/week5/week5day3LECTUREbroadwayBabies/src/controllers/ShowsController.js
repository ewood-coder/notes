import { Auth0Provider } from "@bcwdev/auth0provider";
import { showsService } from "../services/ShowsService.js";
import BaseController from "../utils/BaseController.js";


export class ShowsController extends BaseController {
  constructor() {
    super('api/shows')
    this.router
      .use((request, response, next) => { // .use is middleware. Requests must pass through the use
        console.log('🧶Middleware activated')
        next() // the knight moves on to the next door (the .get below this)
      })
      .get('', this.getShows) // moving this request above the use, keeps it "public"(no auth needed)
      .use(Auth0Provider.getAuthorizedUserInfo) // if a request passes through this use without a bearer token, the request is denied with a 401
      .post('', this.createShow)
  }

  async getShows(request, response, next) {
    try {
      const shows = await showsService.getShows() // we could add a query but we will do it a little different on this one
      response.send(shows)
    } catch (error) {
      next(error)
    }
  }

  async createShow(request, response, next) {
    try {
      const showData = request.body
      const show = await showsService.createShow(showData)
      response.send(show)
    } catch (error) {
      next(error)
    }
  }
}
