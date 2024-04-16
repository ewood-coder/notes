import { dbContext } from "../db/DbContext.js"



class QuotesService {
  async getRandomQuote() {
    // const quotes = await dbContext.Quotes.find().populate('author', 'name picture')
    const quotes = await dbContext.Quotes.find()
    // quotes.populate() this doesn't work because quotes is just a plain old array at this point
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    await randomQuote.populate('author', 'name picture') // little optimization, we don't all the authors on all the other quotes, just the one we wanted
    return randomQuote
  }
  async createQuote(quoteData) {
    const quote = await dbContext.Quotes.create(quoteData)
    await quote.populate('author', 'name picture')
    return quote
  }

}

export const quotesService = new QuotesService()
