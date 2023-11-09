var inputfield=document.querySelector('.input')
var box=document.querySelector('.box')
var container=document.querySelector('.container')
var remarks=document.querySelector('#gues')
var scor=document.querySelector('.score')
var highscor=document.querySelector('.highscore')
var check1=document.querySelectorAll('button')

var random=Math.ceil(Math.random()*20)
var life=20
scor.innerHTML=life
function again(){
    location.reload()
}
function check(){
    value = inputfield.value
    if(value!=""){
        box.innerHTML=value
        if (value == random) {
            remarks.textContent="Congratulations You has Won"
            document.body.style.backgroundColor="green"
            highscor.textContent=value
            check1[1].setAttribute('disabled','true')
        }else if(value > random){
            remarks.textContent="Too High"
        }else{
            remarks.textContent="Too Low"
        }
        life--
        scor.innerHTML=life
        if(life==0){
            check1[1].setAttribute('disabled','true')
        }

    }
}