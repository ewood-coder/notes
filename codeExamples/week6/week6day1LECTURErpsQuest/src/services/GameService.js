import { AppState } from "../AppState.js"

const rpsMap = {
  '🪨': '📄',
  '📄': '✂️',
  '✂️': '🪨'
}


class GameService {
  attackHeroes() {
    console.log('attacking our heroes');
    const heroes = AppState.heroes
    const monster = AppState.monster
    heroes.forEach(hero => {
      if (rpsMap[hero.type] == monster.type) {
        hero.health -= monster.level * 2
      }
      if (hero.type == monster.type) {
        hero.health -= monster.level
      }
      if (hero.health < 0) hero.health = 0
    })
  }
  attackMonster() {
    const monster = AppState.monster
    let damage = 0
    AppState.heroes.forEach(hero => {
      damage += hero.level
    })
    monster.health -= damage
    if (monster.health <= 0) monster.health = 0

    if (monster.health == 0) {
      AppState.gold += monster.gold
    }
  }

  resetMonster() {
    const monster = AppState.monster
    const monsterList = AppState.monsters
    monster.level++
    monster.maxHealth = monster.maxHealth * monster.level
    monster.health = monster.maxHealth
    monster.gold = monster.gold * monster.level
    monsterList.push(monster) // push them back at the end of the list
    AppState.monster = AppState.monsters.shift() // pull the next one off the end
  }

}


export const gameService = new GameService()
