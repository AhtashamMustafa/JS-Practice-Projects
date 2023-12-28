import { auth, createUserWithEmailAndPassword, onAuthStateChanged  } from "../Utils/config.js";

let email = document.querySelector("#email");
let input = document.querySelectorAll("input")
let password = document.querySelector("#password");
let submitButton = document.querySelector(".signupbtn");
let form = document.querySelector(".form");
let loader = document.querySelector(".loader");

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     window.location.href = '../Home/home.html'
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

// const loggedInUser = JSON.parse(localStorage.getItem('LoggedInuser'))

// if(loggedInUser) window.location.href = '../Home/Home.html'

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

  } else if (input[2,3].value.length < 8 ) {
    warningToast("Password must be characters long");
    return;
  } else if (input[2].value != input[3].value) {
    return warningToast("Password is not matched with confirmed Password");
  }else{
    // let userNameCheck=false;
    // let userEmailCheck=false;

    // let users = JSON.parse(localStorage.getItem("users")) || [];

    // let userName=users.find((user)=>{
      //  if(user.username == input[0].value.toLowerCase()){
        // userNameCheck=true;
      //  };
    // });
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    successToast("Signup Successful") 

    form.style.display='none'

    setInterval(() => {
      loader.style.display='block'
    }, 500);

    setTimeout(() => {
      window.location.href = '../Login/Login.html'
    }, 3000)
      return;

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  })};

    // if (userNameCheck) {
    //   warningToast("username is already exist");
    //   return;
    // }else{
    
    //   let userEmail=users.find((user)=>{
    //    if(user.email == input[1].value){
    //     userEmailCheck=true
    //    }
    //   });

      // if (userEmailCheck) {
      // warningToast("Email is already registered. Please use a different one");
      // return;
      // }}

    
    // } else {
      
    //   let userObj={
    //   UserId:Date.now(),
    //   username: input[0].value.toLowerCase(),
    //   email: input[1].value,
    //   password: input[2].value,
    // };

    // users.push(userObj)

    // localStorage.setItem(`users`, JSON.stringify(users));

    // alert("Signup Successful");
    
  }

function successToast(text) {
  let success = document.getElementById("success");
  let successimg = document.getElementById("check");
  success.innerHTML=`${text}<span ><img id="check" src="../Assests/Check.png" alt=""></span>`
  success.className = "show";
  setTimeout(function(){ success.className = success.className.replace("show", "");}, 3000);
}
function warningToast(text) {
  let warning = document.getElementById("warning");
  let cancelimg = document.getElementById("cancel");
  warning.innerHTML=`${text}<span ><img id="cancel" src="../Assests/cancel.png" alt=""></span>`
  warning.className = "show";
  setTimeout(function(){ warning.className = warning.className.replace("show", "");}, 3000);
}

submitButton.addEventListener("click", signup);

  