//given
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  const newtoyForm = document.querySelector(".add-toy-form")
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
//end given
const toyContainer = document.querySelector('#toy-collection')
const toyURL = 'http://localhost:3000/toys'
//fetch and show all toys
fetch(`${toyURL}`)
    .then( response => response.json() )
    .then( toyData => toyData.forEach(function(toy){
      toyContainer.innerHTML +=`
      <div class="card">
      <h2>${toy["name"]}</h2>
      <img class="toy-avatar" src= ${toy["image"]}
      <p>${toy["likes"]} Likes </p>
      <button class="like-btn"data-id=${toy["id"]}>Like</button>
      </div>`
    }))
//add a new toy
 newtoyForm.addEventListener('submit', (e) => {
   e.preventDefault()
   //console.log(e.target)
   const name = e.target.name.value
   const image = e.target.image.value

   fetch(`${toyURL}`, {
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
   }).then(response => response.json())
   .then(toy => {
     allToys.push(toy)
     //console.log(toy)
     toyContainer.innerHTML += `
     <div class="card">
     <<h2>${toy["name"]}</h2>
     <img class="toy-avatar" src= ${toy["image"]}
     <p>${toy["likes"]} Likes </p>
     <button class="like-btn"data-id=${toy["id"]}>Like</button>
     </div>`
   })
})
   //likes?
   toyContainer.addEventListener('click', e => {
     if(e.target.classList.contains('like-btn')) {
       const dataId = e.target.parentNode.getAttribute('data-id')

       const p = e.target.parentNode.querySelector('p')
       const pValue = p.innerText
       const numOfLikes = parseInt(pValue)

     fetch(`http://localhost:3000/toys/${dataId}`, {
       method: 'PATCH',
       body: JSON.stringify({
         likes: numOfLikes + 1
       }),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then(res => res.json())
     .then(toy => p.innerText = toy.likes)

     }

   })



})//end of DOMContentLoaded
