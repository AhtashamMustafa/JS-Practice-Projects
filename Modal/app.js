let modal = document.querySelector('#modalcontainer')
let clk = document.querySelector('#click')
let button = document.querySelector('#btn')
let cncl = document.querySelector('#cancel')
let background = document.querySelector('#bg')
let backgroundPic = document.querySelector('#bgpic')
let containers = document.querySelector('#container')


function onHandler(){
    document.body.style.backgroundColor = "rgb(181, 171, 161)";
    clk.classList.add("hidden")
    button.classList.add("visible")
    clk.classList.remove("visible")
    button.classList.remove("hidden")
    modal.textContent = "Modal Content"
}
function offkHandler(){
    document.body.style.backgroundColor = "white";
    clk.classList.add("visible")
    button.classList.add("hidden")
    clk.classList.remove("hidden")
    button.classList.remove("visible")
    modal.textContent = "Modal Project"
}
function checkHandler(){
    if(clk.classList.contains('visible')){
        onHandler()
    }else{
        offkHandler()
    }
}