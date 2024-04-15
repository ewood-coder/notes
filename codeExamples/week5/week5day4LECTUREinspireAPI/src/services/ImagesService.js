import { dbContext } from "../db/DbContext.js"




class ImagesService {
  async getRandomImage() {
    const images = await dbContext.Images.find()
    const randomImage = images[Math.floor(Math.random() * images.length)]
    await randomImage.populate('author', 'name picture')
    return randomImage
  }
  async createImage(imageData) {
    const image = await dbContext.Images.create(imageData)
    await image.populate('author')
    return image
  }

}

export const imagesService = new ImagesService()
