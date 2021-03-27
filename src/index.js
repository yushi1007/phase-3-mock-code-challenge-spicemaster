//write your code here
//hello world
const updateForm = document.querySelector('#update-form')
const ingredientForm = document.querySelector('#ingredient-form')
// See the first spice blend (the spice blend with an ID of 1), including its title, image, and list of ingredients, when the page loads.

function firstSpiceBlend(spiceInfo){
    // 1.Find the div where the spice info at
    const spiceDetails = document.querySelector('div#spice-blend-detail')
    // 2.Find the element(title and image) inside the 'div#spice-blend-detail' first
    const img = spiceDetails.querySelector('img')
    img.src = spiceInfo.image
    img.alt = spiceInfo.title
  
    const spiceTitle = spiceDetails.querySelector('h2.title')
    spiceTitle.textContent = spiceInfo.title
    
    updateForm.dataset.id = spiceInfo.id
    ingredientForm.dataset.id = spiceInfo.id
    //console.log(updateForm)
    // 3.Find list ingredients inside the 'div#spice-blend-detail'
    const ul = spiceDetails.querySelector('ul.ingredients-list')
        console.log(spiceInfo)
        spiceInfo.ingredients.forEach(ingredient => {
            const li = document.createElement('li')
            li.textContent = ingredient.name
            li.dataset.id = ingredient.id
            //console.log(li)
            ul.append(li)
        })

}

function spiceBlendInfo(){
    fetch('http://localhost:3000/spiceblends/1')
        .then(response => response.json())
        .then(firstSpice => {
            firstSpiceBlend(firstSpice)
        })
}

//Update the title of the spice blend on the page when the #update-form is submitted, and still see that change when reloading the page (the new title should be persisted on the server).

// 1.Find update form for the title --> in the top global scope

updateForm.addEventListener('submit', e => {

    e.preventDefault()

    const title = e.target.title.value

    fetch(`http://localhost:3000/spiceblends/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({title})
    })
        .then(response => response.json())
        .then(newTitle => {
    // show the new title without reload the page
            const h2 = document.querySelector('h2.title')
            h2.textContent = newTitle.title
        })
        updateForm.reset()
})

spiceBlendInfo()


//Add a new ingredient to the spice blend when the #ingredient-form is submitted. The new ingredient should be displayed on the page (no persistence needed for now).

// 1.Find the ingredient form --> on top global scope

ingredientForm.addEventListener('submit', e => {
    e.preventDefault()

console.log(ingredientForm)
    const name = e.target['ingredient-name'].value
    
            const li = document.createElement('li')
            li.textContent = name
            li.dataset.id = e.id
            //console.log(li)
            const ul = document.querySelector('ul.ingredients-list')
            ul.append(li)
            console.log(ul)
            ingredientForm.reset()

    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({name,
        spiceBlendId: parseInt(e.target.dataset.id)})
    })
        .then(response => response.json())
        .then(newIngredient => (newIngredient))
        ingredientForm.reset()
})
// const updateForm = document.querySelector('form#update-form')
// const ingredientFrom = document.querySelector('form#ingredient-form')
// const spiceImages = document.querySelector('div#spice-images')
// // 1


// function displaySpiceBlend(spiceDetails) {

//     const spiceBlendDetail = document.querySelector('div#spice-blend-detail')

//     const img = spiceBlendDetail.querySelector('img')
//     img.src = spiceDetails.image
//     img.alt = spiceDetails.title

//     const h2 = document.querySelector('h2.title')
//     h2.textContent = spiceDetails.title

//     updateForm.dataset.id = spiceDetails.id
//     ingredientFrom.dataset.id = spiceDetails.id

//     const ul = document.querySelector('ul.ingredients-list')
//     ul.innerHTML = ''
//     spiceDetails.ingredients.forEach(spiceIngredients => {
//             const li = document.createElement('li')
            
//             li.dataset.id = spiceIngredients.id
//             li.textContent = spiceIngredients.name

//             ul.append(li)
//     })

// }


// fetch('http://localhost:3000/spiceblends/1')
//     .then(response => response.json())
//     .then(spiceObject => {
//                 displaySpiceBlend(spiceObject)
//     })

// // 2

// updateForm.addEventListener('submit', e=> {
//     e.preventDefault()

//     const title = e.target.title.value

//     fetch(`http://localhost:3000/spiceblends/${e.target.dataset.id}`, {
//         method: 'PATCH',
//         headers:{       
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({title: title})
//     })
//         .then(response => response.json())
//         .then(newTitle => {
//             const h2 = document.querySelector('h2.title')
//             h2.textContent = newTitle.title
//         })
// })

// // 3 and 4
// ingredientFrom.addEventListener('submit', e => {
//         e.preventDefault()

//         const name = e.target['ingredient-name'].value
//         const li = document.createElement('li')
//         li.textContent = name

//         const ul = document.querySelector('ul.ingredients-list')
//         ul.append(li)

//         ingredientFrom.reset()

//         fetch('http://localhost:3000/ingredients', {
//             method: 'POST',
//             headers:{       
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: name, 
//                 spiceBlendId: parseInt(e.target.dataset.id)
//             })
//         })
//             .then(response => response.json())
//             .then(newIngredient => console.log(newIngredient))
        
// })

// // 5
// fetch('http://localhost:3000/spiceblends')
//         .then(response => response.json())
//         .then(spiceImage => {
            
//         const spiceImages = document.querySelector('div#spice-images')

//                 spiceImage.forEach(spiceBlendImage => {

//                     const img = document.createElement('img')

//                     img.dataset.id = spiceBlendImage.id
//                     img.src = spiceBlendImage.image
//                     img.alt = spiceBlendImage.title

//                     spiceImages.append(img)

//         })
//     })


// // 6
// spiceImages.addEventListener('click', e => {

//     if (e.target.matches('img')) {

//             const spiceId = e.target.dataset.id
        
//         fetch(`http://localhost:3000/spiceblends/${spiceId}`)
//             .then(response => response.json())
//             .then(spiceInfo => {
//                     displaySpiceBlend(spiceInfo)
//         })
//     }
// })



// FIRST TRY

// function allSpiceBlends() {
//     fetch('http://localhost:3000/spiceblends')
//         .then(response => response.json())
//         .then(spiceBlends => {
//                 spiceBlends.forEach(spiceBlend => {
//                     spiceBlendImage(spiceBlend)
//             })
//         })
// }
// allSpiceBlends()

// function spiceBlendImage(spiceBlendInfo) {
//     const outerDiv = document.createElement('div')
//     outerDiv.classList.add('image')
//     outerDiv.dataset.id = spiceBlendInfo.id

//     outerDiv.innerHTML = `<img class="detail-image" src="${spiceBlendInfo.image}" alt="${spiceBlendInfo.title}" />`

//     const collection = document.querySelector('div#spice-images')
//     collection.append(outerDiv)

// }

// function spiceBlendLoad(firstSpiceBlend) {
//         const spiceBlendDetail = document.querySelector('div#spice-blend-detail')
//         const spiceTitle = document.querySelector('#update-form')
//         spiceBlendDetail.dataset.id = firstSpiceBlend.id
        
//         spiceBlendDetail.innerHTML = `
//         <img class="detail-image" src="${firstSpiceBlend.image}" alt="${firstSpiceBlend.title}" />
//         <h2 class="title">${firstSpiceBlend.title}</h2>`

//         spiceTitle.dataset.id = firstSpiceBlend.id
//         spiceTitle.title.value = firstSpiceBlend.title

// }

// function firstSpiceBlend() {
//     fetch('http://localhost:3000/spiceblends')
//     .then(response => response.json())
//     .then(SpiceBlend => {
        
//         spiceBlendLoad(SpiceBlend[0])
//         })
//     }
    
// firstSpiceBlend()

// const spiceImage = document.querySelector('div#spice-images')

// spiceImage.addEventListener('click', e => {
//         if (e.target.matches('img')){
//                 const spice = e.target.closest('div.image')

//                 fetch(`http://localhost:3000/spiceblends/${spice.dataset.id}`)
//                 .then(response => response.json())
//                 .then(spiceInfo => {
//                     spiceBlendLoad(spiceInfo)
//                 })
//         }
// })

// const form = document.querySelector('form#update-form')

// form.addEventListener('submit', e=> {
//         e.preventDefault()

//         const id = e.target.dataset.id
//         const title = e.target.title.value

//         fetch(`http://localhost:3000/spiceblends/${id}`, {
//             method: 'PATCH',
//             headers:{
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({title})
//         })
//         .then(response => response.json())
//         .then(titleObject => {
//             const h2 = document.querySelector('h2.title')
//             h2.textContent = titleObject.title
//         })

// })


// spiceIngredients()
// function ingredientsInfo(ingredients) {
//     const ingredientContainer = document.querySelector('div.ingredients-container')
//     ingredientContainer.dataset.id = ingredients.id
    
//     ingredientContainer.innerHTML = `
//             <h4>Ingredients:</h4>
//             <ul class="ingredients-list">
//             <li class="ingredients-name">${ingredients.name}</li>
//             </ul>`
    
//     const container = document.querySelector('div#spice-blend-detail')
//     container.dataset.id = ingredients.id
//     container.append(ingredientContainer)

// }

// function spiceBlendIngredients() {
//     fetch('http://localhost:3000/ingredients')
//         .then(response => response.json())
//         .then(ingredient => {
//             ingredient.forEach(blendIngredients => {
//                 ingredientsInfo(blendIngredients)
//             })
//         })
// }
// spiceBlendIngredients()