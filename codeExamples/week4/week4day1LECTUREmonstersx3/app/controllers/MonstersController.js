import { AppState } from "../AppState.js";
import { monstersService } from "../services/MonstersService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class MonstersController {
  constructor() {
    console.log('👹 Ready to monster');
    this.getMonsters()
    // this.promiseExample()
    this.drawMonsters() // why wont this draw them? because the network request takes time for the monsters to come back
    AppState.on('monsters', this.drawMonsters) // this DOES draw them, because it's not linked to a specific time when to call, but is waiting for the appstate to change, then call. Our service gets the response, then changes the appstate
  }

  drawMonsters() {
    console.log('🖊️👹');
    const monsters = AppState.monsters
    let monsterCards = ''
    monsters.forEach(monster => monsterCards += monster.MonsterCard)
    setHTML('monster-cards', monsterCards)
  }

  getMonsters() {
    monstersService.getMonsters()
    this.drawMonsters() // ? why doesn't this one draw the monsters?
  }

  async promiseExample() {
    console.log('before promise');
    const result = await Pop.confirm("Are your really sure?") // we want our code to PAUSE, awaiting the resolution of this promise before moving on.
    console.log(result);
    console.log('after promise', result);
  }
}