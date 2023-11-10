var userone=prompt("Player 1 Name?")
var usertwo=prompt("Player 2 Name?")
var player1 = document.querySelector('.player1')
var player2 = document.querySelector('.player2')
var current_score1 = document.querySelector('.current-score1')
var current_score2 = document.querySelector('.current-score2')
var score1 = document.querySelector('.score1')
var score2 = document.querySelector('.score2')
var scoreone = 0
var scoretwo = 0
var current_scoreone=0
var current_scoretwo=0
var container1 = document.querySelector('.container1')
var container2 = document.querySelector('.container2')
player1.textContent = userone
player2.textContent = usertwo
var playerone = true
var playertwo = false
var rolldice = document.querySelector('.rolldice')
var diceimg = document.querySelector('.diceimg')
var holdturn=document.querySelector('.hold')
var new1=document.querySelector('.newgame')
new1.addEventListener('click',newgame)
holdturn.addEventListener('click',hold)
rolldice.addEventListener('click', diceroll)

function diceroll() {
    var random = Math.ceil(Math.random() * 6)
    diceimg.src = `./Assets/${random}.png`
    if (random == 1) {
        if (playerone) {
            current_score1.textContent = 0
            score1.textContent = 0
            scoreone=0
            current_scoreone=0
            playerone = false
            playertwo = true
            alert(`${usertwo}'s turn`)
        } else if (playertwo) {
            current_score2.textContent = 0
            score2.textContent = 0
            scoretwo=0
            current_scoretwo=0
            playerone = true
            playertwo = false
            alert(`${userone}'s turn`)
        }
    } else if (playerone) {
        current_score1.textContent = current_scoreone += random
        winner()
    } else if (playertwo) {
        current_score2.textContent = current_scoretwo += random
        winner()
    }
}

function hold() {
    if (playerone) {
        playerone = false
        playertwo = true
        score1.textContent = scoreone+=current_scoreone
        current_score1.textContent = 0
        current_scoreone=0
        alert(`${usertwo}'s turn`)
    } else if (playertwo) {
        playerone = true
        playertwo = false
        score2.textContent = scoretwo +=current_scoretwo
        current_score2.textContent =0
        current_scoretwo=0
        alert(`${userone}'s turn`)
    }
}

function newgame(){
    location.reload()
}
function winner(){
    if(scoreone >= 100 || scoretwo >=100){
        rolldice.setAttribute('disabled',true)
        holdturn.setAttribute('disabled',true)
        if(playerone){
            alert(`Congratulations ${userone} you have one`)
        }else{
            alert(`Congratulations ${usertwo} you have one`)
        }
    }
}