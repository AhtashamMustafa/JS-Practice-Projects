const firstContainer = document.querySelector('#container1')
const secondContainer = document.querySelector('#container2')
const thirdContainer = document.querySelector('#container3')
const fourthContainer = document.querySelector('#container4')

function classonHandler() {
    secondContainer.classList.add('visible')
    secondContainer.classList.remove('hidden')
    thirdContainer.classList.add('visible')
    thirdContainer.classList.remove('hidden')
    fourthContainer.classList.remove('visible')
    fourthContainer.classList.add('hidden')
}
function classoffHandler() {
    secondContainer.classList.remove('visible')
    secondContainer.classList.add('hidden')
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
window.addEventListener('resize', handleResize)
// if (window.innerWidth <= '425' && window.innerHeight <= '540') {
//     classoffHandler()
// } else {
//     classonHandler()
// }
// console.log(secondContainer.classList.contains('visible'))
// console.log(screen.height)

// console.log(secondContainer.classList.add("hidden"))

&& screen.innerHeight <= 581




