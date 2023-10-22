const navBar = document.querySelector('#navbar')
const fourthContainer = document.querySelector('#container4')

function onHandler() {
    navBar.classList.remove('hidden')
    navBar.classList.add('visible')
}
function offHandler() {
navBar.classList.remove('visible')
navBar.classList.add('hidden')
}

function check(){
    if(navBar.classList.contains('visible')){
        offHandler()
    }else if(navBar.classList.contains('hidden')){
        onHandler()
    }
}



