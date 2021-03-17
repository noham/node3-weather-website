console.log('client side javascript file is loaded')

const search = document.querySelector("#search-form")
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#weather-report')

search.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.innerHTML = 'Loading...'
    messageTwo.textContent = ''
    const location = e.target.elements.address.value

    fetch('/weather?address=' + location ).then((response)=>{
        response.json().then((data)=>{
            messageOne.innerHTML = ''
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
           
        })
    })


})
