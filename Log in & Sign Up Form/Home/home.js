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
let userimg = document.querySelector(".choose1");
let updateimg = document.querySelector(".updateimg");

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
function update() {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var loggedInUseremail = JSON.parse(
      localStorage.getItem("LoggedInuser")
    ).email; 
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
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('LoggedInuser', JSON.stringify(users));
    }

}
// function previewImage() {
//   // Get the file input element
//   var fileInput = document.getElementById('profile');

//   // Get the image preview element
//   var imagePreview = document.getElementById('imagePreview');
//   var userPreview = document.getElementById('userPreview');

//   // Check if a file is selected
//   if (fileInput.files && fileInput.files[0]) {
//     // Create a FileReader object
//     var reader = new FileReader();

//     // Set the callback function to run when the file is loaded
//     reader.onload = function (e) {
//       // Set the image source to the result of the FileReader
//       imagePreview.src = e.target.result;
//       userPreview.src = e.target.result;
//     };

//     // Read the selected file as a Data URL
//     reader.readAsDataURL(fileInput.files[0]);
//   }
// }