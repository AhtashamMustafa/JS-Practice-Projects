var input = document.querySelectorAll("input");
var submit = document.querySelector("#loginbtn");
var cancel = document.querySelector("#cancelbtn");
var form = document.querySelector("form");

const loggedInUser = JSON.parse(localStorage.getItem('LoggedInuser'))

if(loggedInUser) window.location.href = '../Home/Home.html'

function login() {
  var users = JSON.parse(localStorage.getItem("users")) || [];

  if (input[0].value == "" || input[1].value == "") {
    alert("Please fill all the fields");
    return;
  }
  if (input[1].value.length < 8) return alert('password length should be atleast 8 characters')
  if (!users) return alert("Sorry no user found")
  var userfound = false;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email == input[0].value &&
      users[i].password == input[1].value
    ) {
      userfound = true;
      break;
    }
  }
  if (userfound) {
    alert("Login Successful.")
      window.location.href = '../Login/loader.html';
    setTimeout(() => {
      window.location.href = '../Home/Home.html'
  }, 2000)
    localStorage.setItem('LoggedInuser',JSON.stringify(users))
  } else {
    alert("Invalid credentials.Please try again.");
  }
}

