import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";



class MonstersService {

  async getMonsters() {
    console.log('👹📡');
    const response = await fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
    console.log('👹🛰️', response);
    // const text = await response.text()
    // console.log('👹Text', JSON.parse(text));
    const pojos = await response.json() // converts the readable stream from text, to json, then to pojos
    console.log('👹POJOs', pojos);
    const monsters = pojos.data.map(pojo => new Monster(pojo)) // map performs the function on each item in the array, returning results. The results in this case is each pojo transformed into a "new Monster"
    console.log('👹Monsters', monsters);
    AppState.monsters = monsters // take the result of the map, and put it in the appstate
    // AppState.monsters = AppState.monsters
  }

}

export const monstersService = new MonstersService()