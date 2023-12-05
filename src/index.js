console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById("dog-image-container")
    const breedListElement = document.getElementById('dog-breeds')
    const breedFilter = document.getElementById('breed-dropdown')
    const imageUrl = 'https://dog.ceo/api/breeds/image/random/4'
    const breedsUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(imageUrl)
    .then(res => res.json())
    .then(data=> {
        const messageImages = data.message
        messageImages.forEach(imageUrl => {
            const imageElement = document.createElement('img')
            imageElement.src = imageUrl
            image.appendChild(imageElement)
        })
        
       
       
    })
    .catch(error => {
        console.error('Error fetching image:', error)
    })

    fetch (breedsUrl)
    .then(res => res.json())
    .then(data =>{
        const dogBreeds = Object.keys(data.message)

        function filterBreeds(selectedLetter) {
            breedListElement.innerHTML = ''
            const filteredBreeds = dogBreeds.filter(breed => {
                const firstLetter = breed.charAt(0).toLowerCase()
                return selectedLetter === 'all' || firstLetter === selectedLetter
            })

            filteredBreeds.forEach(breed => {
                let listItem = document.createElement('li')
                listItem.textContent = breed
                breedListElement.appendChild(listItem)
                listItem.addEventListener('click', function () {
                    listItem.style.color = 'red'
                })
            })
       
        }
         breedFilter.addEventListener('change', function(){
            filterBreeds(breedFilter.value)
         })
         filterBreeds('all')
        
        
    })
 
    
    .catch(error => {
        console.error('Error fetching breed:', error)
    })
})
