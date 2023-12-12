let input = document.querySelectorAll("input");
let form = document.querySelector(".form");
let loader = document.querySelector(".loader");

let loggedInUser = JSON.parse(localStorage.getItem('LoggedInuser'))

if(loggedInUser) window.location.href = '../Home/Home.html'

function login() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (input[0].value == "" || input[1].value == "") {
    warningToast("Please fill all the fields");
    return;
  }

  if (input[1].value.length < 8) return warningToast('password length should be atleast 8 characters')

  if (!users) return warningToast("Sorry no user found")

  let find = users.find((el)=>{
    return el.email == input[0].value && el.password == input[1].value
  })

  if (find) {
    successToast("Login Successful.")

    form.style.display='none'

    setInterval(() => {
      loader.style.display='block'
    }, 500);

    setTimeout(() => {
      window.location.href = '../Home/home.html'}, 3000)
    let obj=[]
    obj.push(find)
    localStorage.setItem('LoggedInuser',JSON.stringify(obj))
  } else {
    warningToast("Invalid credentials.Please try again.");
  }
}

// Toast functions
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
