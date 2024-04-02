



export class Monster {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.image = data.image
    this.locations = data.common_locations || []
    // Example of a Ternary statement:    Bool or comparison ? value if true : value if false 
    this.itemsDropped = data.drops?.length ? data.drops.join('<br/>') : 'no known drops'
    // this.itemsDropped = data.drops ? data.drops.join('<br/>') : 'no known drops'
    this.description = data.description
  }

  get MonsterCard() {
    return `
<div class="col-6 col-md-4">
  <div class="card">
    <img src="${this.image}" alt="a pretty picture of ${this.name}" />
    <div class=" card-body">
      <h4 class="card-title text-center">${this.name} <hr/></h4>
      <p class="text-center card-text d-flex flex-wrap">${this.LocationBubbles}</p>
      <details><summary class="text-secondary">more about ${this.name}...</summary>${this.description} <hr/>
      <small>commonly drops: <br/> ${this.itemsDropped}</small>
      </details>
    </div>
  </div>
</div>
`
  }

  get LocationBubbles() {
    let bubbles = ''
    this.locations.forEach(loc => bubbles += `<span class="border border-primary rounded-pill px-2 py-1">${loc}</span>`)
    return bubbles
  }
}

/** data from console
 * {
    "category": "monsters",
    "common_locations": null,
    "description": "The Malice has given these Bokoblin skulls a sort of life. Devoid of any intelligence the Bokoblin it once belonged to may have had, these pitiful things now exist only to attack anything that gets too close.",
    "dlc": false,
    "drops": [],
    "id": 156,
    "image": "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/cursed_bokoblin/image",
    "name": "cursed bokoblin"
}
 */