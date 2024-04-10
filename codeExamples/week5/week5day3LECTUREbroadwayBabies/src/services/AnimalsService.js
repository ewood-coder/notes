import { dbContext } from "../db/DbContext.js"

class AnimalsService {
  async updateAnimal(animalId, updateData) {
    const animalToUpdate = await dbContext.Animals.findById(animalId)

    if (!animalToUpdate) throw new Error(`Not animal with id: ${animalId}`)

    // const updatedAnimal = await dbContext.Animals.findByIdAndUpdate(animalId, updateData, { new: true, runValidators: true })
    // not the best way cause we don't have as much control over the update taking place

    // animalToUpdate.name = updateData.name if you don't want them to edit it. Don't include it
    animalToUpdate.talent = updateData.talent != undefined ? updateData.talent : animalToUpdate.talent
    animalToUpdate.emoji = updateData.emoji ?? animalToUpdate.emoji // same function as line above, just shorthanded
    await animalToUpdate.save() // after we change the properties and needed, tell the database of the changes with .save()

    return animalToUpdate
  }


  async getAnimals(searchQuery) {
    const animals = await dbContext.Animals.find(searchQuery)
    return animals
  }

}

export const animalsService = new AnimalsService()
