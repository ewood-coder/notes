import { AppState } from "../AppState.js"
import { Gachamon } from "../models/Gachamon.js";
import { loadState, saveState } from "../utils/Store.js";




class GachamonsService {
  setActiveGachamon(gachamonId) {
    const selectedGachamon = AppState.gachamons.find(gachamon => gachamon.id == gachamonId)
    console.log(selectedGachamon, '🕺🧧🎉"I SELECT YOU"');
    AppState.activeGachamon = selectedGachamon
  }

  addQuarter() {
    AppState.money += .25
  }

  buyRandomGachamon() {
    if (AppState.money >= .75) {
      let randomGachamon = AppState.gachamons[Math.floor(Math.random() * AppState.gachamons.length)] // selects out one random gachamon
      AppState.money -= .75
      AppState.myGachamons.unshift(randomGachamon)
      AppState.activeGachamon = randomGachamon
      this.saveMyGachamons()
    }
  }

  trashGachamon(gachamonId) {
    const indexToTrash = AppState.myGachamons.findIndex(gachamon => gachamon.id == gachamonId)
    AppState.myGachamons.splice(indexToTrash, 1)
    AppState.activeGachamon = null
    this.saveMyGachamons()
  }

  saveMyGachamons() {
    saveState('my-gachamons', AppState.myGachamons)
  }

  loadMyGachamons() {
    const myGachamons = loadState('my-gachamons', [Gachamon])
    AppState.myGachamons = myGachamons
  }
}


export const gachamonsService = new GachamonsService()