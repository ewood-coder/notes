import { reactive } from 'vue'
import { Hero } from './models/Hero.js'
import { Monster } from './models/Monster.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  gold: 0,

  heroes: [
    new Hero({
      name: 'Slate Slabrock',
      type: '🪨',
      health: 50,
      picture: 'https://em-content.zobj.net/source/microsoft/379/angry-face_1f620.png',
      level: 1
    }),
    new Hero({
      name: 'Paper Mairo',
      type: '📄',
      health: 20,
      picture: 'https://em-content.zobj.net/source/microsoft/379/disguised-face_1f978.png',
      level: 1
    }),
    new Hero({
      name: 'Flint Ironstag',
      type: '✂️',
      health: 30,
      picture: 'https://em-content.zobj.net/source/microsoft/379/pleading-face_1f97a.png',
      level: 1
    })
  ],

  monster: new Monster({
    name: 'Balasantarax',
    type: '🪨',
    health: 12,
    maxHealth: 12,
    picture: 'https://em-content.zobj.net/source/twitter/348/orangutan_1f9a7.png',
    level: 1,
    gold: 50
  }),

  monsters: [
    new Monster({
      name: 'Quorsekef',
      type: '📄',
      health: '25',
      picture: 'https://em-content.zobj.net/source/twitter/348/two-hump-camel_1f42b.png'
    }),
    new Monster({
      name: 'Clavicus Vile Jr.',
      type: '✂️',
      health: '27',
      picture: 'https://em-content.zobj.net/source/twitter/348/lobster_1f99e.png'
    }),
    new Monster({
      name: 'Jeff',
      type: '✂️',
      health: '5',
      picture: 'https://em-content.zobj.net/source/twitter/348/man-pouting_1f64e-200d-2642-fe0f.png'
    })
  ]


})
