import { dbContext } from "../db/DbContext.js"

// PRETEND FOR RIGHT NOW
const fakeDbCats = [
  { name: 'Pickle', color: 'orange', age: 3, isFeisty: true },
  { name: 'Spunky', color: 'calico', age: 5, isFeisty: false },
  { name: 'Brody', color: 'orange', age: 10, isFeisty: false },
  { name: 'Beano', color: 'brown', age: 8, isFeisty: true },
]

// NOTE the services job is to interact with the database, getting items, or posting them, or updating/ deleting all the fun stuff
class CatsService {

  async getCats() {
    // const cats = AppState.cats
    // const cats = fakeDbCats // changed to db method
    const cats = await dbContext.Cats.find() // find will retrieve all documents, that match the filter argument.
    //if no filter argument is passed, it returns all documents
    return cats
  }
  async createCat(catData) {
    // fakeDbCats.push(catData) replaced with db create
    const cat = await dbContext.Cats.create(catData) // adds data to the Database, and returns the "created" version. The created version includes things like _id, and __v (which is useless)
    return cat
  }

  async adoptCat(catId) {
    // await dbContext.Cats.deleteOne({name : 'sparkles'}) deletes the first cat named sparkles
    // const catToAdopt = await dbContext.Cats.findOne({ _id: catId })
    const catToAdopt = await dbContext.Cats.findById(catId)

    if (!catToAdopt) throw new Error(`Sorry that cat was already adopted${catId}`)

    await dbContext.Cats.deleteOne({ _id: catId }) // deletes the first cat with an _id = to the catId passed as a parameter from the controller
  }

}

export const catsService = new CatsService()
