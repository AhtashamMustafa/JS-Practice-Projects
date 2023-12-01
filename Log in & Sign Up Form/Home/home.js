const firstContainer = document.querySelector("#container1");
const secondContainer = document.querySelector("#container2");
const thirdContainer = document.querySelector("#container3");
const fourthContainer = document.querySelector("#container4");
const loggedin = document.querySelector("#loggedinuser");
const loggedout = document.querySelector("#logout");
let drop = document.querySelector(".dropdown");
let username = document.querySelector("#name");
let useremail = document.querySelector("#email");
let usercontact = document.querySelector("#contact");
let usercity = document.querySelector("#city");
let updateimg = document.querySelector("#imagePreview");
let userimg = document.querySelector(".imagePreview");


function dropdown() {
  drop.style.height = "67vh";
  loggedin.setAttribute("onclick", "dropup()");
}
function dropup() {
  drop.style.height = 0;
  loggedin.setAttribute("onclick", "dropdown()");
}
function classonHandler() {
  // secondContainer.classList.add('visible')
  // secondContainer.classList.remove('hidden')
  thirdContainer.classList.add("visible");
  thirdContainer.classList.remove("hidden");
  fourthContainer.classList.remove("visible");
  fourthContainer.classList.add("hidden");
}
function classoffHandler() {
  // secondContainer.classList.remove('visible')
  // secondContainer.classList.add('hidden')
  thirdContainer.classList.remove("visible");
  thirdContainer.classList.add("hidden");
  fourthContainer.classList.add("visible");
  fourthContainer.classList.remove("hidden");
}
function handleResize() {
  if (window.innerWidth <= 599) {
    console.log("off");
    classoffHandler();
  } else {
    classonHandler();
  }
}
// console.log(window.innerWidth)

// Add an event listener to handle window resizing
window.addEventListener("resize", handleResize);

const loggedInUser = JSON.parse(localStorage.getItem("LoggedInuser"));

if (!loggedInUser) window.location.href = "../Login/Login.html";
// Display the username on the page
loggedin.innerHTML = JSON.parse(
  localStorage.getItem("LoggedInuser")
)[0].username;

function logout() {
  localStorage.removeItem("LoggedInuser");
  window.location.href = "../Login/Login.html";
}

username.value = JSON.parse(localStorage.getItem("LoggedInuser"))[0].username;
useremail.value = JSON.parse(localStorage.getItem("LoggedInuser"))[0].email;
usercontact.value = JSON.parse(localStorage.getItem("LoggedInuser"))[0].contactNo;
usercity.value = JSON.parse(localStorage.getItem("LoggedInuser"))[0].city;
userimg.src = JSON.parse(localStorage.getItem("LoggedInuser"))[0].imzageURL;
updateimg.src = JSON.parse(localStorage.getItem("LoggedInuser"))[0].imgageURL;
function update() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var loggedInUseremail = JSON.parse( 
      localStorage.getItem("LoggedInuser")
    ).email; 
    var image = document.getElementById('profile');


  var imgurl=URL.createObjectURL(image.files[0])
 document.querySelector('.imagePreview').src = imgurl
 document.querySelector('#imagePreview').src = imgurl

    var index = -1
    for (let i = 0; i<users.length;i++){
      if (users[i].email == useremail.value) {
        index = i;
        break
      }
    }
    if (index !== -1) {
      users[index].username = username.value;
      users[index].email = useremail.value;
      users[index].contactNo = usercontact.value;
      users[index].city = usercity.value;
      users[index].imgageURL = imgurl
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('LoggedInuser', JSON.stringify(users));
      alert("Profile has been updated!")
      setTimeout(dropup(),2000)
    }

}
var image = document.getElementById('profile');
image.onchange = function(){

  var imgurl=URL.createObjectURL(image.files[0])
 document.querySelector('.imagePreview').src = imgurl
 document.querySelector('#imagePreview').src = imgurl
}
  
document.querySelector('#imagePreview').addEventListener("click",function(){
    document.getElementById('profile').click()})