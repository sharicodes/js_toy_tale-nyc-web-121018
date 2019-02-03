//given
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
let allToys = []

//given
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  // submit listener here
  } else {
  toyForm.style.display = 'none'
  }
})
//OR HERE!
document.addEventListener("DOMContentLoaded", function(event) {
  //set variables from DOM
const toyCollection = document.getElementById("toy-collection")
const newToyForm = document.querySelector(".add-toy-form")
const allToyCards = document.querySelectorAll(".card")


//fetch toys and show on page- step 2
function fetchToys() {
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then( data => {
allToys = data
//call showAllToys helper
showAllToys(allToys)
})
}
fetchToys()//call fetchToys helper


//showAllToys helper function itterates through the HTML of all the toys abd maps that to a new toy
function showAllToys(toys) {
toyCollection.innerHTML = toys.map(makeNew).join("")
}

newToyForm.addEventListener('submit', e => {
e.preventDefault()
const name = e.target.name.value
const image = e.target.image.value

fetch("http://localhost:3000/toys", {
method: "post",
headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},
body: JSON.stringify({
name: name,
image: image,
likes: 0
})
}).then(response => response.json())
.then(toy => {
allToys.push(toy)
//console.log(toy);
toyCollection.innerHTML += makeNew(toy)
})
})

toyCollection.addEventListener('click', e => {
//1. find in array
const toyObject = allToys.find(toy => toy.id === parseInt(e.target.dataset.id))
const indexOfToy = allToys.indexOf(toyObject)
let currentLikes = toyObject["likes"]
currentLikes++
//console.log(currentLikes);
//console.log(indexOfToy);

fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
method: 'PATCH',
headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},
body: JSON.stringify({
likes: currentLikes
})
})

allToys[indexOfToy]['likes'] = currentLikes
showAllToys(allToys)
})

}); // end of DOM Content Loaded


function makeNew(toy) {
return `<div class="card">
<h2>${toy["name"]}</h2>
<img src=${toy["image"]} class="toy-avatar" />
<p>${toy["likes"]} Likes </p>
<button class="like-btn" data-id="${toy["id"]}">Like </button>
</div>`
}
