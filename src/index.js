document.addEventListener("DOMContentLoaded", ()=>{

const toyCollection = document.querySelector("#toy-collection")
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
  })//end add Btn given
  // OR HERE!
fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toyData =>{
    let toyHTML = toyData.map(toy =>{
      return `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-id=${toy.id}>${toy.likes} Likes </p>
      <button class="like-btn" data-id=${toy.id}>Like <3</button>
      </div>`
    })//end map
    toyCollection.innerHTML = toyHTML.join('')
  })//end then

toyForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  //console.log(e.target);
  const newToyName = e.target.name.value
  const newToyImage = e.target.image.value
  //console.log(newToyName, newToyImage);
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImage,
      likes: 0
    })
  })//end fetch
  .then(r => r.json())//forgot
  .then(newToy => {//forgot
    let newToyHTML = `
    <div class="card">
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class="toy-avatar" />
    <p data-id=${newToy.id}>${newToy.likes} Likes </p>
    <button class="like-btn" data-id=${newToy.id}>Like <3</button>
    </div>
    `
    toyCollection.innerHTML += newToyHTML

})

})//end of addEventListener

toyCollection.addEventListener("click", (e) =>{
//console.log(e.target);
  if(e.target.className === "like-btn"){
  //console.log(e.target.className);
    let likesNum = parseInt(e.target.previousElementSibling.innerText)
    //console.log(likesNum)
    let newLikesNum = likesNum+1
    e.target.previousElementSibling.innerText = `${newLikesNum} Likes`
    let currToyId = e.target.dataset.id
    console.log(currToyId);

    fetch(`http://localhost:3000/toys/${currToyId}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikesNum
      })
    })//end fetch

  }//end if

})//end of addEventListener






})//end dom DOMContentLoaded
