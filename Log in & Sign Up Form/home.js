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

// Function to get URL parameters by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  console.log(getParameterByName('user'))
  // Get the username from the URL
  var userName = getParameterByName('users');
  
  // Display the username on the page
  document.getElementsByClassName('welcomeMessage').innerText = userName
  