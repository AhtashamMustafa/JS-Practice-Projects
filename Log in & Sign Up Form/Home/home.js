const firstContainer = document.querySelector('#container1')
const secondContainer = document.querySelector('#container2')
const thirdContainer = document.querySelector('#container3')
const fourthContainer = document.querySelector('#container4')
const loggedin = document.querySelector('#loggedinuser')
const loggedout = document.querySelector('#logout')

function classonHandler() {
    // secondContainer.classList.add('visible')
    // secondContainer.classList.remove('hidden')
    thirdContainer.classList.add('visible')
    thirdContainer.classList.remove('hidden')
    fourthContainer.classList.remove('visible')
    fourthContainer.classList.add('hidden')
}
function classoffHandler() {
    // secondContainer.classList.remove('visible')
    // secondContainer.classList.add('hidden')
    thirdContainer.classList.remove('visible')
    thirdContainer.classList.add('hidden')
    fourthContainer.classList.add('visible')
    fourthContainer.classList.remove('hidden')
}
function handleResize() {
    if (window.innerWidth <= 599) {
        console.log("off")
        classoffHandler()
    }else {
        classonHandler()
    }
}
// console.log(window.innerWidth)


// Add an event listener to handle window resizing
window.addEventListener('resize', handleResize);

const loggedInUser = JSON.parse(localStorage.getItem('LoggedInuser'))

if(!loggedInUser) window.location.href = '../Login/Login.html'
// Display the username on the page
loggedin.innerHTML =JSON.parse(localStorage.getItem('LoggedInuser'))[0].username

function logout (){
    localStorage.removeItem("LoggedInuser")
    window.location.href = '../Login/Login.html'
}
