import { AppState } from "../AppState.js";
import { Gachamon } from "../models/Gachamon.js";
import { gachamonsService } from "../services/GachamonsService.js";
import { setHTML, setText } from "../utils/Writer.js";




export class GachamonsController {
  constructor() {
    console.log("Gacha Gacha Gachamon! 🧧🎉");
    this.drawGachamonIcons() // draw when the page loads
    this.drawActiveGachamon()
    // NOTE register listeners (observer pattern). Listen to a piece of the AppState, and when it changes, run instructions
    AppState.on('money', () => console.log('Money has changed'))// example, listen to money, and when it changes, do the thing
    AppState.on('money', this.drawMoney)
    AppState.on('activeGachamon', this.drawActiveGachamon)
    AppState.on('myGachamons', this.drawMyGachamons)
    gachamonsService.loadMyGachamons() // load data after registering the listeners, then the load, will trigger them, so we can skip an extra draw
  }

  drawGachamonIcons() {
    const gachamons = AppState.gachamons
    let iconsContent = ''
    gachamons.forEach(gachamon => iconsContent += gachamon.iconTemplate)
    // const iconsElm = document.getElementById('gachamon-icons')
    // iconsElm.innerHTML = iconsContent
    setHTML('gachamon-icons', iconsContent) // this takes the place of getting the element and settings it's html
  }

  drawMyGachamons() {
    const myGachamons = AppState.myGachamons
    let myIconsContent = ''
    myGachamons.forEach(gachamon => myIconsContent += gachamon.iconTemplate)
    setHTML('my-gachamons', myIconsContent)
  }

  drawActiveGachamon() {
    const activeGachamon = AppState.activeGachamon
    if (activeGachamon != null) {
      setHTML('active-gachamon', activeGachamon.gachamonCard)
    } else {
      // debugger
      setHTML('active-gachamon', Gachamon.CardSilhouette)
    }
  }

  setActiveGachamon(gachamonId) {
    console.log('inspecting', gachamonId);
    gachamonsService.setActiveGachamon(gachamonId)
    // this.drawActiveGachamon()
  }

  buyRandomGachamon() {
    console.log('🎲');
    gachamonsService.buyRandomGachamon()
    // this.drawActiveGachamon()
    // this.drawMoney()
  }

  addQuarter() {
    gachamonsService.addQuarter()
    // this.drawMoney()
  }

  drawMoney() {
    const money = AppState.money
    setText('money', `$${money.toFixed(2)}`)
  }

  trashGachamon(gachamonId) {
    gachamonsService.trashGachamon(gachamonId)
  }


}