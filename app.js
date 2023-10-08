const onbutton = document.getElementById('on');
const offbutton = document.getElementById('off')
const bulb = document.getElementById('bulb')
const Lamp = document.getElementById('lamp')

function onHandler(){
    onbutton.style.display ='none'
    offbutton.style.display = 'block'
    bulb.src = './assests/bulbon.jpg'
    Lamp.style.color = 'yellow'

}
function offHandler(){
    offbutton.style.display ='none'
    onbutton.style.display = 'block'
    bulb.src = './assests/bulboff.jpg'
    Lamp.style.color = 'white'
}
