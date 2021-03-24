// write your code here

function allSpiceBlends() {
    fetch('http://localhost:3000/spiceblends')
        .then(response => response.json())
        .then(spiceBlends => {
                spiceBlends.forEach(spiceBlend => {
                    spiceBlendImage(spiceBlend)
            })
        })
}
allSpiceBlends()

function spiceBlendImage(spiceBlendInfo) {
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('image')
    outerDiv.dataset.id = spiceBlendInfo.id

    outerDiv.innerHTML = `<img class="detail-image" src="${spiceBlendInfo.image}" alt="${spiceBlendInfo.title}" />`

    const collection = document.querySelector('div#spice-images')
    collection.append(outerDiv)

}

function spiceBlendLoad(firstSpiceBlend) {
        const spiceBlendDetail = document.querySelector('div#spice-blend-detail')
        spiceBlendDetail.dataset.id = firstSpiceBlend.id
        
        spiceBlendDetail.innerHTML = `
        <img class="detail-image" src="${firstSpiceBlend.image}" alt="${firstSpiceBlend.title}" />
        <h2 class="title">${firstSpiceBlend.title}</h2>`

        

}

function firstSpiceBlend() {
    fetch('http://localhost:3000/spiceblends')
    .then(response => response.json())
    .then(SpiceBlend => {
        
        spiceBlendLoad(SpiceBlend[0])
        })
    }
firstSpiceBlend()

const spiceImage = document.querySelector('div#spice-images')

spiceImage.addEventListener('click', e => {
        if (e.target.matches('img')){
                const spice = e.target.closest('div.image')

                fetch(`http://localhost:3000/spiceblends/${spice.dataset.id}`)
                .then(response => response.json())
                .then(spiceInfo => {
                    spiceBlendLoad(spiceInfo)
                })
        }
})

const form = document.querySelector('form#update-form')

// form.addEventListener('submit', e=> {
//         e.preventDefault()

//         const id = e.target.dataset.id
//         const title = e.target.title.value
        
//         const newTitle = {
//             title
//         }
//         fetch(`http://localhost:3000/spiceblends/${id}`, {
//             method: 'PATCH',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//               },
//               body: JSON.stringify(newTitle)
//         })
//         .then(response => response.json())
//         .then(title => (title))

// })

// function spiceIngredients() {

//     fetch('http://localhost:3000/ingredients')
//         .then(response => response.json())
//         .then(ingredients => {
//             ingredients.forEach(ingredient => {
//                 const li = document.createElement('li')

//                 li.dataset.id = ingredient.id

//                 li.innerHTML = `<a>${ingredient.name}</a>`

//                 const ul = document.querySelector('ul.ingredients-list')

//                 ul.append(li)
//             })
//         })
// }
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