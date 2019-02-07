const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", ()=>{
const toyContainer = document.querySelector("#toy-collection")
const newToyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })//end add Btn given
  // OR HERE!

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => {
    let toyHTML = toys.map(toy =>{
      return `
      <div class ="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p>${toy.likes} Likes</p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
      <button data-id=${toy.id} class="delete-btn">Delete</button>
      </div>
      `
    })//end of map
    toyContainer.innerHTML += toyHTML.join('')
  })//end of fetch

//add a new toys
toyForm.addEventListener("submit", (e)=> {
  e.preventDefault()
  //console.log(e.target);
  const newToyName = e.target.name.value
  const newToyImage = e.target.image.value
  //console.log(newToyName, newToyImage);
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify({
       name: newToyName,
       image: newToyImage,
       likes: 0
    })
  })//end of fetch
  .then(r => r.json())
  .then(newToy => {
    let newToyHTML =  `
      <div class ="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar"/>
      <p>Likes: ${newToy.likes}</p>
      <button data-id="${newToy.id}"class="like-btn">Like <3</button>
      <button data-id=${toy.id} class="delete-btn">Delete</button>
      </div>
      `
    toyContainer.innerHTML += newToyHTML
    e.target.reset()
  })//end of then
})//end of toyform event listener

//increase Likes
//add event addEventListener
toyContainer.addEventListener("click", (e)=>{
  if(e.target.className === "like-btn"){
      //console.log(e.target)
  //identify likes container
  let currLikes = parseInt(e.target.previousElementSibling.innerText)
  let newLikes= currLikes+1
  //console.log(newLikes);
  e.target.previousElementSibling.innerText = newLikes + " likes"

//console.log(e.target.dataset.id);
  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes

    })

  })//end fetch


  }//end of if
  if(e.target.className === "delete-btn"){
      //console.log(e.target)
  //identify full parseInt
  fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
    method: "DELETE"
  })
    .then(r => {
      e.target.parentElement.remove()
    })

  // })//end fetch


  }//end of if

})//end of toy container event listener

})//end DOMContentLoaded
