let string="";
let buttons=document.querySelectorAll('.button')
Array.from(buttons).forEach(function(button){
    button.addEventListener('click',function(check){
        if(check.target.textContent == '='){
            string=eval(string);
            document.querySelector('.screen').textContent=string;
        }else if(check.target.innerHTML == 'C'){
            string=""
            document.querySelector('.screen').textContent=string;
        }
        else{
            string = string + check.target.innerHTML;
            document.querySelector('.screen').textContent=string
        }
    })
})