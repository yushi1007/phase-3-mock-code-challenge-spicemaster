//write your code here
const updateForm = document.querySelector('form#update-form')
const ingredientFrom = document.querySelector('form#ingredient-form')
const spiceImages = document.querySelector('div#spice-images')

// 1
function displaySpiceBlend(spiceDetails) {

    const spiceBlendDetail = document.querySelector('div#spice-blend-detail')

    const img = spiceBlendDetail.querySelector('img')
    img.src = spiceDetails.image
    img.alt = spiceDetails.title

    const h2 = document.querySelector('h2.title')
    h2.textContent = spiceDetails.title

    updateForm.dataset.id = spiceDetails.id
    ingredientFrom.dataset.id = spiceDetails.id

    const ul = document.querySelector('ul.ingredients-list')
    ul.innerHTML = ''
    spiceDetails.ingredients.forEach(spiceIngredients => {
            const li = document.createElement('li')
            
            li.dataset.id = spiceIngredients.id
            li.textContent = spiceIngredients.name

            ul.append(li)
    })

}


fetch('http://localhost:3000/spiceblends/1')
    .then(response => response.json())
    .then(spiceObject => {
                displaySpiceBlend(spiceObject)
    })

// 2

updateForm.addEventListener('submit', e=> {
    e.preventDefault()

    const title = e.target.title.value

    fetch(`http://localhost:3000/spiceblends/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers:{       
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({title: title})
    })
        .then(response => response.json())
        .then(newTitle => {
            const h2 = document.querySelector('h2.title')
            h2.textContent = newTitle.title
        })
})

// 3 and 4
ingredientFrom.addEventListener('submit', e => {
        e.preventDefault()

        const name = e.target['ingredient-name'].value
        const li = document.createElement('li')
        li.textContent = name
        
        const ul = document.querySelector('ul.ingredients-list')
        console.log(ul)
        ul.append(li)

        ingredientFrom.reset()

        fetch('http://localhost:3000/ingredients', {
            method: 'POST',
            headers:{       
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name, 
                spiceBlendId: parseInt(e.target.dataset.id)
            })
        })
            .then(response => response.json())
            .then(newIngredient => console.log(newIngredient))
        
})

5
fetch('http://localhost:3000/spiceblends')
        .then(response => response.json())
        .then(spiceImage => {
            
        const spiceImages = document.querySelector('div#spice-images')

                spiceImage.forEach(spiceBlendImage => {

                    const img = document.createElement('img')

                    img.dataset.id = spiceBlendImage.id
                    img.src = spiceBlendImage.image
                    img.alt = spiceBlendImage.title

                    spiceImages.append(img)

        })
    })


// 6
spiceImages.addEventListener('click', e => {

    if (e.target.matches('img')) {

            const spiceId = e.target.dataset.id
        
        fetch(`http://localhost:3000/spiceblends/${spiceId}`)
            .then(response => response.json())
            .then(spiceInfo => {
                    displaySpiceBlend(spiceInfo)
        })
    }
})



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