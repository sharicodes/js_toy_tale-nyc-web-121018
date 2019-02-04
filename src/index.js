//given
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
//added for making sure page loaded
document.addEventListener("DOMContentLoaded", function (event){
//add constanst for use in eventslisteners, etc
const toyContainer = document.getElementById('toy-collection')
const toysURL = "http://localhost:3000/toys"
const newToyForm = document.querySelector(".add-toy-form")
//to hold all of the toys
let allToys = []

//given for add new toy button
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


// OR HERE!
//fetch to add the toys to page
fetch(`${toysURL}`)
.then( response => response.json())
.then(  toyData => toyData.forEach(function(toy){
  allToys = toyData
  toyContainer.innerHTML +=`
  <div class="card">
    <h2>${toy["name"]}</h2>
    <img src="${toy["image"]}"class="toy-avatar" />
    <p>${toy["likes"]} Likes</p>
    <button class="like-btn" data-id ="${toy["id"]}" >Like </button>
  </div> `
}))//end of for each

//add new toy to DOM and Db
newToyForm.addEventListener("submit", (e) => {
  e.preventDefault()
  //console.log(e.target)
const name = e.target.name.value
const image = e.target.image.value
fetch(`${toysURL}`, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: name,
    image: image,
    likes: 0
  })
})//end of fetch
.then( response => response.json())
.then(  toy => {
    toyContainer.innerHTML += `
    <div class="card">
      <h2>${toy["name"]}</h2>
      <img src="${toy["image"]}"class="toy-avatar" />
      <p>${toy["likes"]}</p>
      <button class="like-btn" data-id ="${toy["id"]}" >Like </button>
    </div> `
  })
})//end of newToyForm event listener

//update the likes by clicking on button
toyContainer.addEventListener('click', (e) => {
  console.log(e.target) //works and gives id
let currentLikes = parseInt(e.target.previousElementSibling.innerText)
// console.log(currentLikes);
let newLikes = currentLikes + 1;
// console.log(newLikes)
e.target.previousElementSibling.innerText = newLikes + " Likes"

// when i click the likes should ++

// from e.target get to "likes"
// we can use previousSibling()
// FOR THIS EXAMPLE ONLY BECAUSE HTML will be different every time
// Find the relation to e.target || use another querySelector

//we need to update the DOM and Update the database

//how do we pull the exact button for the right card
//how do we update the likes on that particular card?

  fetch(`${toysURL}/${e.target.dataset.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    //})
  })//end of fetch
  // .then( response => response.json())
  // .then(  toy => {
  //     // updateDOM
    })

})//end toy container listener

}) //end of DOMContentLoaded
