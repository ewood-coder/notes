import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { showsService } from '../services/ShowsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo) // Middleware, blocks the routes, under it
      .get('', this.getUserAccount)
      .get('/shows', this.getUserShows)
      .put('', this.editUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserShows(request, response, next) {
    try {
      const userId = request.userInfo.id // userInfo becomes available to the request, once a request has passed through the AuthProvider middleware. This includes info from the users Auth0 info and token
      const shows = await showsService.getUserShows(userId)
      response.send(shows)
    } catch (error) {
      next(error)
    }
  }

}
