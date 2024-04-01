import { AppState } from "../AppState.js"
import { generateId } from "../utils/GenerateId.js"


export class Gachamon {
  /**
   * @param {{name, icon, picture, colorVariation, rarity, id?}} data 
   */
  constructor(data) {
    this.id = data.id || generateId()
    this.name = data.name
    this.icon = data.icon
    this.picture = data.picture
    this.colorVariation = data.colorVariation
    this.rarity = data.rarity
  }


  get iconTemplate() {
    return `
<div class="col-2">
  <button onclick="app.GachamonsController.setActiveGachamon('${this.id}')" class="w-100 btn btn-outline-light p-2">
    <span class="fs-3 variation-${this.colorVariation}">${this.icon}</span>
    <div class="fw-bold">${this.name}</div>
  </button>
</div>
`
  }


  get gachamonCard() {
    return `
 <div class="card bg-primary shadow px-4 pt-2 pb-4 gachamon-card">
   <div class="text-end pb-2 variation-${this.colorVariation}">${this.icon}</div>
   <img width="270" height="270" class="img-fluid border rounded variation-${this.colorVariation}" src="${this.picture}"
     alt="">
   <div class="card-body">
     <h2 class="text-center">${this.name}</h2>
     <hr />
   </div>
   <div class="card-footer d-flex justify-content-between">
     <div>${this.rarity}</div>
     <div title="${this.colorVariation}">${this.VariationStars}</div>

   </div>
 </div>

${this.CurrentCardCountCard}
  `
  }

  // NOTE static makes this getter available on the class definition, not the instance
  // Gachamon.CardSilhouette
  static get CardSilhouette() {
    return `
<div class="card bg-primary shadow px-4 pt-2 pb-4 gachamon-card">
<div class="text-end pb-2 ">❓</div>
  <img class="img-fluid border rounded "
    src="https://em-content.zobj.net/source/microsoft-teams/363/red-envelope_1f9e7.png" alt="">
  <div class="card-body">
    <h2 class="text-center">Undefined</h2>
    <hr />
  </div>
  <div class="card-footer d-flex justify-content-between">
    <div>common | rare | ultra-rare</div>
    <div ><i class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i></div>
  </div>
</div>
  `
  }

  get VariationStars() {
    if (this.colorVariation == 'normal') {
      return '⭐'
    } else if (this.colorVariation == 'special') {
      return '⭐⭐'
    } else {
      return '⭐⭐⭐'
    }
  }

  get CurrentCardCountCard() {
    let copies = AppState.myGachamons.filter(gachamon => gachamon.name == this.name && gachamon.rarity == this.rarity)
    console.log(copies);
    if (copies.length < 1) return ''

    return `
  <div>
    <div class="card text-dark p-3"> You own ${copies.length} copies of this card</div>
    <button class="btn btn-danger" onclick="app.GachamonsController.trashGachamon('${this.id}')">Trash Me</button>
  </div>
    `
  }
}