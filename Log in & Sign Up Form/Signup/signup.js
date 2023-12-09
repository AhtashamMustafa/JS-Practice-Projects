var input = document.querySelectorAll("input");
var submitButton = document.querySelector(".signupbtn");
var form = document.querySelector(".form");
var loader = document.querySelector(".loader");

const loggedInUser = JSON.parse(localStorage.getItem('LoggedInuser'))

if(loggedInUser) window.location.href = '../Home/Home.html'

function signup() {
  if (
    input[0].value == "" ||
    input[1].value == "" ||
    input[2].value == "" ||
    input[3].value == ""
  ) {
    warningToast("Please fill all the fields!")
    // alert("please fill all the fields");
    return;

  } else {
    var userNameCheck=false;
    var userEmailCheck=false;

    var users = JSON.parse(localStorage.getItem("users")) || [];

    let userName=users.find((user)=>{
       if(user.username == input[0].value.toLowerCase()){
        userNameCheck=true;
       };
    });

    if (userNameCheck) {
      warningToast("username is already exist");
      return;
    }else{
    
      let userEmail=users.find((user)=>{
       if(user.email == input[1].value){
        userEmailCheck=true
       }
      });

      if (userEmailCheck) {
      warningToast("Email is already registered. Please use a different one");
      return;
      }}

    if (input[2].value.length < 8) {
      warningToast("Password must be characters long");
      return;
    } else if (input[2].value != input[3].value) {
      return warningToast("Password is not matched with confirmed Password");
    } else {
      
      let userObj={
      id:Date.now(),
      username: input[0].value.toLowerCase(),
      email: input[1].value,
      password: input[2].value,
    };

    users.push(userObj)

    localStorage.setItem(`users`, JSON.stringify(users));

    // alert("Signup Successful");
    successToast("Signup Successful") 

    form.style.display='none'

    setInterval(() => {
      loader.style.display='block'
    }, 500);

    setTimeout(() => {
      window.location.href = '../Login/Login.html'
    }, 3000)
      return;
    }
  }
}
function successToast(text) {
  var success = document.getElementById("success");
  var successimg = document.getElementById("check");
  success.innerHTML=`${text}<span ><img id="check" src="../Assests/Check.png" alt=""></span>`
  success.className = "show";
  setTimeout(function(){ success.className = success.className.replace("show", "");}, 3000);
}
function warningToast(text) {
  var warning = document.getElementById("warning");
  var cancelimg = document.getElementById("cancel");
  warning.innerHTML=`${text}<span ><img id="cancel" src="../Assests/cancel.png" alt=""></span>`
  warning.className = "show";
  setTimeout(function(){ warning.className = warning.className.replace("show", "");}, 3000);
}

submitButton.addEventListener("click", signup);

  