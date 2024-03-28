import { Gachamon } from './models/Gachamon.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { loadState, saveState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {

  /** @type {number} This is the money i have accrued by pilfering mom's purse*/
  money = 0

  gachamons = [
    new Gachamon({
      name: 'Colbald',
      icon: '🦎',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/lizard_1f98e.png',
      colorVariation: 'normal',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Jaxy',
      icon: '🦃',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/turkey_1f983.png',
      colorVariation: 'normal',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Jaxy',
      icon: '🦃',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/turkey_1f983.png',
      colorVariation: 'special',
      rarity: 'rare'
    }),
    new Gachamon({
      name: 'Oslo',
      icon: '🦧',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png',
      colorVariation: 'normal',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Elvis',
      icon: '🐢',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/turtle_1f422.png',
      colorVariation: 'normal',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Bobby',
      icon: '🐖',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/pig_1f416.png',
      colorVariation: 'normal',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Bobby',
      icon: '🐖',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/pig_1f416.png',
      colorVariation: 'exclusive',
      rarity: 'ultra-rare'
    }),
    new Gachamon({
      name: 'Oslo',
      icon: '🦧',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png',
      colorVariation: 'exclusive',
      rarity: 'ultra-rare'
    })
  ]
  // NOTE this line tells vscode, to treat this like it was a gachamon
  /** @type {Gachamon}*/
  activeGachamon = null

  /** @type {Gachamon[]} */
  myGachamons = []

  // NOTE this is probably not necessary for you, but my application is so special i need this. you can blame me for not thinking ahead this time
  initialize() {
    let gachamons = loadState('state-gachamons', [Gachamon])
    if (gachamons.length && AppState.gachamons.every(gachamon => gachamons.find(g => g.name + g.rarity == gachamon.name + gachamon.rarity))) {
      AppState.gachamons = gachamons
    } else {
      saveState('my-gachamons', null)
      saveState('state-gachamons', AppState.gachamons)
    }
  }

}

export const AppState = createObservableProxy(new ObservableAppState())

AppState.initialize() // REMEMBER YOU DON"T NEED THIS