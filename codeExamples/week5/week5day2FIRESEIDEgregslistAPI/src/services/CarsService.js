import { dbContext } from "../db/DbContext.js"



class CarsService {

  async getCars() {
    const cars = await dbContext.Cars.find()
    return cars
  }
  async searchCars(searchQuery) {
    // if (searchQuery.yearNewer) {
    //   searchQuery.year = { $gte: searchQuery.yearNewer } // Mongo Filter syntax for year >= 2005
    //   delete searchQuery.yearNewer
    // }
    // if (searchQuery.yearOlder) {
    //   searchQuery.year = { $lte: searchQuery.yearOlder }
    //   delete searchQuery.yearOlder
    // }
    _queryBuilder(searchQuery) // formats the query in a nicer way
    // const cars = await dbContext.Cars.find({ color: 'red' })
    const cars = await dbContext.Cars.find(searchQuery)
    return cars
  }

  async getCarById(carId) {
    const car = await dbContext.Cars.findById(carId)
    if (!car) throw new Error(`No car with id: ${carId}`)
    return car
  }

  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async destroyCar(carId) {
    const carToDelete = await this.getCarById(carId)

    await carToDelete.deleteOne()

    return `${carToDelete.make} ${carToDelete.model} has been deleted!`
  }

  async updateCar(carId, carData) {
    const carToUpdate = await this.getCarById(carId)

    carToUpdate.price = carData.price ?? carToUpdate.price
    carToUpdate.imgUrl = carData.imgUrl ?? carToUpdate.imgUrl
    carToUpdate.color = carData.color ?? carToUpdate.color
    carToUpdate.engineType = carData.engineType ?? carToUpdate.engineType

    await carToUpdate.save()

    return carToUpdate
  }



}

// NOTE the _ one _queryBuilder, denotes that this is a "private" function. It cannot be invoked, outside of this file
function _queryBuilder(searchQuery) {
  // NOTE this code is definitely just a 'what if' scenario, each api might need it's own unique functionality to it and this is where some of that could take place.
  if (searchQuery.yearNewer) {
    searchQuery.year = { $gte: searchQuery.yearNewer } // Mongo Filter syntax for year >= 2005
    delete searchQuery.yearNewer
  }
  if (searchQuery.yearOlder) {
    if (!searchQuery.year) searchQuery.year = {}
    searchQuery.year.$lte = searchQuery.yearOlder
    delete searchQuery.yearOlder
  }

  if (searchQuery.like) {
    let regex = new RegExp(searchQuery.like, 'i')
    searchQuery.description = { $regex: regex }
    // searchQuery.tags = { $regex: regex }
    delete searchQuery.like
  }

  // NOTE searches through descriptions
}

export const carsService = new CarsService()
