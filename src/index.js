const updateForm = document.querySelector('form#update-form')
const ingredientForm = document.querySelector('form#ingredient-form')

function spiceInfo(spiceDetails) {
    const spiceBlend = document.querySelector('div#spice-blend-detail')

    const img = spiceBlend.querySelector('img')
    img.src = spiceDetails.image
    img.alt = spiceDetails.title

    const h2 = spiceBlend.querySelector('h2')
    h2.textContent = spiceDetails.title

    const ul = document.querySelector('ul.ingredients-list')
    ul.innerHTML = ''
    spiceDetails.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.textContent = ingredient.name
        li.dataset.id = ingredient.id

        ul.append(li)
    })
}

function fetchFirstSpice(){
    fetch('http://localhost:3000/spiceblends/1')
        .then(response => response.json())
        .then(spiceOneInfo => {
            spiceInfo(spiceOneInfo)
        })
}

updateForm.addEventListener('submit', e => {
    e.preventDefault()
    // console.log('clicked')
    const title = e.target.title.value

    fetch('http://localhost:3000/spiceblends/1', {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
        body: JSON.stringify({title})
    })
    .then(response => response.json())
    .then(newTitle => {
        const h2 = document.querySelector('h2')
        h2.textContent = newTitle.title
    })
})


ingredientForm.addEventListener('submit', e => {
    e.preventDefault()
        const name = e.target.name.value
        // console.log(name)
    
        fetch('http://localhost:3000/ingredients', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({name: name,
            spiceblendId: 1})
    })
    .then(response => response.json())
    .then(newIngredient => {
        const ul = document.querySelector('ul.ingredients-list')
        const li = document.createElement('li')
        li.textContent = newIngredient.name
        li.dataset.id = newIngredient.id
        ul.append(li)
    })

        
})

function allSpice(spiceImage){
    const imgDiv = document.querySelector('div#spice-images')
    // console.log(imgDiv)
    const img = document.createElement('img')
    img.src = spiceImage.image
    img.dataset.id = spiceImage.id
    imgDiv.append(img)

}



function spiceImage(){
    fetch('http://localhost:3000/spiceblends')
        .then(response => response.json())
        .then(spiceImg => {
            spiceImg.forEach(image => {
                allSpice(image)
            })
        })
}

const imgDiv = document.querySelector('div#spice-images')

imgDiv.addEventListener('click', e => {
    
    if(e.target.matches('img')){
        console.log(e.target)
        fetch(`http://localhost:3000/spiceblends/${e.target.dataset.id}`)
            .then(response => response.json())
            .then(spiceDetail => {
                spiceInfo(spiceDetail)
            })
    }
})

spiceImage()
fetchFirstSpice()
























