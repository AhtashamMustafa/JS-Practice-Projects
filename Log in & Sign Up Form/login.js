var input = document.querySelectorAll("input");
var submit = document.querySelector("#loginbtn");
var cancel = document.querySelector("#cancelbtn");
var form = document.querySelector("form");
function login() {
  var users = JSON.parse(localStorage.getItem("users")) || [];

  if (input[0].value == "" || input[1].value == "") {
    alert("Please fill all the fields");
    console.log(1);
    return;
  }
  var userfound = false;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email == input[0].value &&
      users[i].password == input[1].value
    ) {
      userfound = true;
      var userName = users[i].username;
      break;
    }
  }
  console.log(encodeURIComponent(userName))
  if (userfound) {
    form.setAttribute("action","./Home.html");
    window.location.href ='home.html?user=' + encodeURIComponent(userName)
  } else {
    alert("Incorrect email or password. Please try again.");
  }
}
document.getElementsByClassName('welcomeMessage').textcontent = "abc"