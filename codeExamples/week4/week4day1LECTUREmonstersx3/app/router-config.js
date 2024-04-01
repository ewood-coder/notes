import { ExamplesController } from "./controllers/ExamplesController.js";
import { HomeController } from "./controllers/HomeController.js";
import { MonstersController } from "./controllers/MonstersController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [MonstersController],
    view: /*html*/`
    <div class="bg-white p-3">
      <div class="card-body">
        <p>Welcome to Monsters Monsters Monsters</p>
      </div>
    </div>
    <section class="container">
      <section class="row g-2" id="monster-cards">

      </section>
    </section>
    `
  },
  {
    path: '#/about',
    view: 'app/views/AboutView.html'
  }
])