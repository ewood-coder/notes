import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";



export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .get('/search', this.searchCars) // this route must be above, the :carId route, otherwise 'search' will be mistaken for an id
      .get('/:carId', this.getCarById)
      // .get('color/:color', this.getCarByColor) THIS IS NOT RESTFUL
      .post('', this.createCar)
      .delete('/:carId', this.destroyCar)
      .put('/:carId', this.updateCar)
  }

  async getCars(request, response, next) {
    try {
      const cars = await carsService.getCars()
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async searchCars(request, response, next) {
    try {
      const searchQuery = request.query
      const cars = await carsService.searchCars(searchQuery)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCarById(request, response, next) {
    try {
      const carId = request.params.carId
      const car = await carsService.getCarById(carId)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }

  async createCar(request, response, next) {
    try {
      const carData = request.body
      const car = await carsService.createCar(carData)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }

  async destroyCar(request, response, next) {
    try {
      const carId = request.params.carId
      const message = await carsService.destroyCar(carId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async updateCar(request, response, next) {
    try {
      const carId = request.params.carId
      const carData = request.body
      const car = await carsService.updateCar(carId, carData)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }
}
