
import { GachamonsController } from "./controllers/GachamonsController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [GachamonsController],
    view: '/app/views/HomeView.html'
  }
])