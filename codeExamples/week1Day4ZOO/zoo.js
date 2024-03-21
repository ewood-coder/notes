// *****************************************************************************************************************************
// SECTION: NOTES FOR NEW JS FUNCTIONS
// *****************************************************************************************************************************

const animals = [
	{
		name: 'George',
		emoji: '🦍',
		hunger: 100,
		status: '😄',
		foodQuality: 1
	},
	{
		name: 'Clarence',
		emoji: '🐅',
		hunger: 100,
		status: '😄',
		foodQuality: 1
	},
	{
		name: 'Oslo',
		emoji: '🦧',
		hunger: 100,
		status: '😄',
		foodQuality: 1
	},
	{
		name: 'Reggie',
		emoji: '🐘',
		hunger: 100,
		status: '😄',
		foodQuality: 1
	},
	{
		name: 'Peanut',
		emoji: '🐍',
		hunger: 100,
		status: '😄',
		foodQuality: 1
	},
	{
		name: 'Henry',
		emoji: '🦩',
		hunger: 100,
		status: '😄',
		foodQuality: 1
	},
]


// GLOBAL VARIABLES
let bank = 0
// let paycheck = 0 // paycheck should be calculated EACH time, 



function hungerDecay() {
	animals.forEach(animal => {
		animal.hunger -= 5
		if (animal.hunger <= 0) animal.hunger = 0
	})
	updateAnimals()
}



// REVIEW: to make code run on its own, on a repeating interval
// NOTE: do NOT include the () next to the hungerDecay() function. You want to pass the function as a set of instructions and not actually run the function.
setInterval(hungerDecay, 1000)



// REVIEW: how to get elements like document.getElementById without the getElementById
function updateAnimals() {
	updateAnimalStatuses()

	animals.forEach(animal => {

		let animalPenElm = document.getElementById(animal.name)

		// REVIEW: THERE ARE MULTIPLE OTHER WAYS TO GATHER ELEMENTS EX/ getElementsByTagName
		// let statsElm = animalPenElm.getElementsByTagName('h5')

		let statsElm = animalPenElm.querySelector('h5')

		statsElm.innerText = `${animal.name} | ${animal.status} | ${animal.hunger}`


		// STOP MARQUEES
		let marqueeX = animalPenElm.querySelector('.habitat>marquee')
		let marqueeY = animalPenElm.querySelector('.marquee>marquee')
		// NOTE: our code does not know these are marquee tags so it is upset at the stop, but we can ignore these
		// @ts-ignore
		marqueeX.stop()
		marqueeY.stop()
	})
}

function updateAnimalStatuses() {
	animals.forEach(animal => {
		if (animal.hunger > 80) {
			animal.status = '😄'
		}
		else if (animal.hunger > 50) {
			animal.status = '😐'
		}
		else if (animal.hunger > 25) {
			animal.status = '😟'
		}
		else if (animal.hunger > 15) {
			animal.status = '🥺'
		}
		else if (animal.hunger > 0) {
			animal.status = '😭'
		}
		else {
			animal.status = '💀'
		}
	})
}

function feed(animalName) {
	console.log('feeding', animalName)

	const animalToFeed = animals.find(animal => animal.name == animal.name) // find me the animal that has a name, that matches the animalName passed
	console.log('🍽️', animalToFeed); // 🧪 did your find return the whole animal

	if (animalToFeed.hunger <= 0) return // this will end our function early if the animal has died of hunger

	animalToFeed.hunger += 5 * animalToFeed.foodQuality // changes data. Adds hunger bar when animal is clicked
	if (animalToFeed.hunger > 100) animalToFeed.hunger = 100 // stops hunger from going below 0

	updateAnimals() // draw data
	drawPaycheck()
}

function upgradeFood(animalName) {
	console.log("upgrading", animalName);

	if (bank >= 50) {
		bank -= 50
		const animalToUpgrade = animals.find(animal => animal.name == animalName)
		console.log('✨', animalToUpgrade);
		animalToUpgrade.foodQuality++
		console.log('upgraded!', animalToUpgrade.foodQuality)

		drawBank()
	}

}

function getPaid() {

	// animals.forEach(animal => {
	// 	// REVIEW: checks animal status and pays you (paycheck) based on the current status of each animal
	// 	switch (animal.status) {
	// 		case '😄':
	// 			paycheck += 15
	// 			break
	// 		case '😐':
	// 			paycheck += 10
	// 			break
	// 		case '😟':
	// 			paycheck += 8
	// 			break
	// 		case '🥺':
	// 			paycheck += 6
	// 			break
	// 		case '😭':
	// 			paycheck += 3
	// 			break
	// 		case '💀':
	// 			paycheck -= 2
	// 			break
	// 	}

	// 	// TODO is the animal happy?
	// })
	let paycheck = calculatePayCheck()

	bank += paycheck
	// console.log('💰', paycheck)
	// console.log('🏦', bank)

	drawBank()
	// drawPaycheck() // passing through will tell me what I was last paid
}

setInterval(getPaid, 5000)


function drawBank() {
	let bankElm = document.getElementById('bank')
	bankElm.innerText = `$${bank}`
}

function drawPaycheck() {
	// animals.forEach(animal => {
	// 	// REVIEW: checks animal status and pays you (paycheck) based on the current status of each animal
	// 	switch (animal.status) {
	// 		case '😄':
	// 			paycheck += 15
	// 			break
	// 		case '😐':
	// 			paycheck += 10
	// 			break
	// 		case '😟':
	// 			paycheck += 8
	// 			break
	// 		case '🥺':
	// 			paycheck += 6
	// 			break
	// 		case '😭':
	// 			paycheck += 3
	// 			break
	// 		case '💀':
	// 			paycheck -= 2
	// 			break
	// 	}
	// })

	let paycheck = calculatePayCheck()
	let paycheckElm = document.getElementById('paycheck')
	// paycheckElm.innerText = `+ = $${paycheck}`
	paycheckElm.innerText = `+ $${calculatePayCheck()}`
}

function calculatePayCheck() {
	let paycheck = 0

	animals.forEach(animal => {
		// REVIEW: checks animal status and pays you (paycheck) based on the current status of each animal
		switch (animal.status) {
			case '😄':
				paycheck += 15
				break
			case '😐':
				paycheck += 10
				break
			case '😟':
				paycheck += 8
				break
			case '🥺':
				paycheck += 6
				break
			case '😭':
				paycheck += 3
				break
			case '💀':
				paycheck -= 2
				break
		}
	})
	return paycheck
}

function addNumber(x, y) {
	let sum = x + y
	console.log('👩‍⚕️', sum)

	// to gain access to our result in this function, we have to use return
	return sum
}







// *****************************************************************************************************************************