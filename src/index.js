
document.addEventListener('DOMContentLoaded', function() {



  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  // YOUR CODE HERE


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
  let allToys = []
  const toyCollection = document.querySelector("#toy-collection")
  const toyURL = "http://localhost:3000/toys"


  fetch(`${toyURL}`)
    .then( response => response.json())
    .then( toysData =>toysData.forEach(
      function(toys) {
        toyCollection.innerHTML += `
        <div class="card">
          <h2>${toys.name}</h2>
          <img src="${toys.image}" class="toy-avatar" />
          <p>${toys.likes}<p>
          <button class="like-btn">Like</button>
        </div>`
        //console.log(toys)
      }))

  const newToyForm = document.querySelector('.add-toy-form')

  newToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log(e.target)
    const newToyName = document.getElementById('name').value
    const newToyImage = document.getElementById('image').value
    console.log(newToyName, newToyImage)
    fetch(`${toyURL}`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
        name: newToyName


    })
    })
  })


}) //end of DOMContentLoaded
