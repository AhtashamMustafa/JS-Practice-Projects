var input = document.querySelectorAll("input");
var submit = document.querySelector(".signupbtn");
var cancel = document.querySelector(".cancelbtn");
var form = document.querySelector("form");
const loggedInUser = JSON.parse(localStorage.getItem('LoggedInuser'))

if(loggedInUser) window.location.href = '../Home/Home.html'

function signup() {
  if (
    input[0].value == "" ||
    input[1].value == "" ||
    input[2].value == "" ||
    input[3].value == ""
  ) {
    alert("please fill all the fields");
    return;
  } else {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    for (let i = 0; i < users.length; i++) {
      if(users[i].userName === input[0].value) return alert("username is already exist")
      if (users[i].email == input[1].value) {
        return alert("Email already registered. Please use a different email.");
      }
    }
    if (input[2].value.length < 8) {
        alert("Password must be characters long");
    } else if (input[2].value != input[3].value) {
      alert("Password is not matched with confirmed Password");
      return;
    } else {
      users.push({
        username: input[0].value,
        email: input[1].value,
        password: input[2].value,
      });
      localStorage.setItem(`users`, JSON.stringify(users));
      alert("Signup Successful");
      setTimeout(() => {
        window.location.href = '../Login/Login.html'
    }, 2000)
      return;
    }
  }
}
submit.addEventListener("click", signup);

  