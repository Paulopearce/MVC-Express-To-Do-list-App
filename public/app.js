//Click event listener for add item button
document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()
  //Send item to back end
  axios.post('api/items', {
    text: document.getElementById('text').value,
    isDone: false
  })
    //Make item element and post on page
    .then(({ data: item }) => {
      const itemElem = document.createElement('div')
      //Delete button is given data-id attribute of the text to determine which one to delete
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="delete" data-id="${item.id}">X</button>
        <button class="isDone" data-id="${item.id}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <hr>
        `
      document.getElementById('items').append(itemElem)
      
      document.getElementById('text').value = ''
    })
    .catch(err => console.error(err))
})

//Add event listener to entire page
document.addEventListener('click', event => {
  //When clicking on delete button
  if (event.target.className === 'delete'){
    const id = event.target.dataset.id
    axios.delete(`api/items/${id}`)
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

//Add another event listener to toggle isdone to done and vise versa
document.addEventListener('click', event => {
  if (event.target.className === 'isDone') {
    const id = event.target.dataset.id
    
    axios.put(`api/items/${id}`)
      .then(() => {
        if (event.target.textContent === 'Done') {
          event.target.textContent = 'Not Done'   
        } else { 
          event.target.textContent = 'Done'
        } 
      })
  }    
})

//get data using axios from users page and display to page
axios.get('api/items')
  .then(({ data:items }) => {
    items.forEach(item => {
      const itemElem = document.createElement('div')
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <button class="delete" data-id="${item.id}">X</button>
        <button class="isDone" data-id="${item.id}">${item.isDone ? 'Done' : 'Not Done'}</button>
        <hr>
      `
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => console.error(err))

//loop over items array of object make a div, set and append to div
  




