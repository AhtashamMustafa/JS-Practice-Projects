const firstContainer = document.querySelector("#container1");
const secondContainer = document.querySelector("#container2");
const thirdContainer = document.querySelector("#container3");
const fourthContainer = document.querySelector("#container4");
const loggedin = document.querySelector("#loggedinuser");
const loggedout = document.querySelector("#logout");
const notification = document.querySelector("#notification");
let dropupdate = document.querySelector(".dropdown");
let drop = document.querySelector(".main-container");
let username = document.querySelector(".name");
let createpostname = document.querySelector("#name");
let postname = document.querySelector(".username");
let useremail = document.querySelector("#email");
let usercontact = document.querySelector("#contact");
let usercity = document.querySelector("#city");
let updateimg = document.querySelector("#imagePreview");
let userimg = document.querySelector(".imagePreview");
let postinput = document.querySelector("textarea");
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
loggedin.innerHTML = JSON.parse(localStorage.getItem("LoggedInuser")).username;
createpostname.innerHTML = JSON.parse(
  localStorage.getItem("LoggedInuser")
).username;

function logout() {
  localStorage.removeItem("LoggedInuser");
  window.location.href = "../Login/Login.html";
}

username.value = JSON.parse(localStorage.getItem("LoggedInuser")).username;
useremail.value = JSON.parse(localStorage.getItem("LoggedInuser")).email;
usercontact.value = JSON.parse(localStorage.getItem("LoggedInuser")).contactNo;
usercity.value = JSON.parse(localStorage.getItem("LoggedInuser")).city;
function update() {
  var users = JSON.parse(localStorage.getItem("users")) ?? [];
  var loggedInUseremail = JSON.parse(
    localStorage.getItem("LoggedInuser")
  ).email;
  document
    .querySelector("#imagePreview")
    .addEventListener("click", function () {
      document.getElementById("profile").click();
    });
  var index = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == useremail.value) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    users[index].username = username.value;
    users[index].email = useremail.value;
    users[index].contactNo = usercontact.value;
    users[index].city = usercity.value;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("LoggedInuser", JSON.stringify(users));
    alert("Profile has been updated!");
    setTimeout(dropup(), 2000);
  }
}
var image = document.getElementById("profile");
image.onchange = function () {
  var imgurl = URL.createObjectURL(image.files[0]);
  document.querySelector(".imagePreview").src = imgurl;
  document.querySelector("#imagePreview").src = imgurl;
  document.querySelector(".post-img").src = imgurl;
};

document.querySelector("#imagePreview").addEventListener("click", function () {
  document.getElementById("profile").click();
});
var createPost = document.querySelector(".create-button");
var createPostContainer = document.querySelector(".container");
function createdown() {
  createPostContainer.style.height = "70vh";
  createPost.setAttribute("onclick", "createup()");
}
function createup() {
  createPostContainer.style.height = 0;
  createPost.setAttribute("onclick", "createdown()");
}
// if(window.addEventListener('click', ()=>{
//   if(loggedin.getAttribute("onclick")=="dropup()")
//   {
//     if(window.addEventListener('click',()=>dropup()))}
//   }))

function logouthover() {
  loggedout.src = "../Assests/Log out green.png";
  loggedout.setAttribute("onmouseout", "logoutout()");
}
function logoutout() {
  loggedout.src = "../Assests/Log out.png";
}
function notificationout() {
  notification.src = "../Assests/notification.png";
}
function notificationhover() {
  notification.src = "../Assests/notification green.png";
  notification.setAttribute("onmouseout", "notificationout()");
}

function setting() {
  drop.style.height = 0;
  loggedin.setAttribute("onclick", "dropup()");
  dropupdate.style.height = "69vh";
}

function dropdown() {
  drop.style.height = "31svh";
  loggedin.setAttribute("onclick", "dropup()");
}
function dropup() {
  dropupdate.style.height = 0;
  drop.style.height = 0;
  loggedin.setAttribute("onclick", "dropdown()");
}
const container = document.querySelector(".container");
let privacy = container.querySelector(".post .privacy");
let arrowBack = container.querySelector(".audience .arrow-back");

privacy.addEventListener("click", () => {
  container.classList.add("active");
});

arrowBack.addEventListener("click", () => {
  container.classList.remove("active");
});

function post() {
  var post = JSON.parse(localStorage.getItem("post")) ?? [];
  var currentDate = new Date();
  var timestamp = currentDate.getTime();
  post.push({
    text: postinput.value,
    email: JSON.parse(localStorage.getItem("LoggedInuser")).email,
    username: JSON.parse(localStorage.getItem("LoggedInuser")).username,
    time: timestamp,
  });

  localStorage.setItem("post", JSON.stringify(post));
  postinput.value = "";
  alert("Your post has been posted");
  createPostContainer.style.height = 0;
  createPost.setAttribute("onclick", "createdown()");
  postDisplayHandler();
}
let postContentArea = document.querySelector("#postContentArea");
const postDisplayHandler = () => {
  postContentArea.innerHTML = "";
  var post = JSON.parse(localStorage.getItem("post")) ?? [];
  post.reverse().forEach((element) => {
    var storedTimestamp = element.time;
    var currentTime = new Date();
    var timeDifference = currentTime.getTime() - storedTimestamp;

    var hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    var daysAgo = Math.floor(hoursAgo / 24);
    var hour;
    var days;
    if (hoursAgo >= 24) {
      if (daysAgo > 1) {
        days = `${daysAgo} days ago`;
      } else {
        days = `${daysAgo} day ago`;
      }
    } else {
      if (hoursAgo > 1) {
        hour = `${hoursAgo} hours ago`;
      } else {
        hour = `${hoursAgo} hour ago`;
      }
    }
    const textHTML = `
      <div class="card text-center" style="margin-top:2vh;z-index: -1;">
      <div class="card-header" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:center;align-items:center;">
      <button class="btn btn-primary" style="cursor: pointer !important;" type="button" onclick="deleteHandler()">Delete</button>
      ${element.username}
      </div>
      <div class="card-body"style="padding: 7vh 2vw;font-size: 1.1em;">
          <h5 class="card-title">${element.text}</h5>
      </div>
      <div class="card-footer text-body-secondary">
          ${hour ?? days}
      </div>
  </div>
      `;

    postContentArea.innerHTML += textHTML;
  });
};
  /* <div class=" gap-2 d-md-flex justify-content-md-end border border-0 position-absolute" style="gap:21vw !important;width:35vw; ">
      <button class="btn btn-primary" style="cursor:pointer !important;display:flex; gap:1vw; background-color:transparent;color:black;border:none;z-index:1;" type="button" onclick="deleteHandler()"><img class="svg-icon" src="../Assests/trash-can-regular.svg" alt="">Delete</button>
      <button class="btn btn-primary" type="button" style="display:flex; gap:1vw;background-color:transparent;color:black;border:none" type="button"><img class="svg-icon" src="../Assests/pen-solid.svg" alt="">Edit</button>
      </div>  */
const myPostDisplayHandler = () => {
  postContentArea.innerHTML = "";
  let logginEmail = JSON.parse(localStorage.getItem("LoggedInuser")).email;

  // console.log(logginEmail);
  var post = JSON.parse(localStorage.getItem("post")) || [];

  // var filter= post.reverse().filter((ele) => {ele.details[0].email == logginEmail})

  let filter = post.filter((filteredpost) => {
    return filteredpost.email == logginEmail;
  });
  console.log(filter);
  filter.forEach((element) => {
    console.log("me aa rha");
    var storedTimestamp = element.time;
    var currentTime = new Date();
    var timeDifference = currentTime.getTime() - storedTimestamp;

    var hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    var daysAgo = Math.floor(hoursAgo / 24);
    var hour;
    var days;
    if (hoursAgo >= 24) {
      if (daysAgo > 1) {
        days = `${daysAgo} days ago`;
      } else {
        days = `${daysAgo} day ago`;
      }
    } else {
      if (hoursAgo > 1) {
        hour = `${hoursAgo} hours ago`;
      } else {
        hour = `${hoursAgo} hour ago`;
      }
    }
    const textHTML = `
      <div class="card text-center" style="margin-top:2vh;z-index: -1;">
      <div class="card-header button" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;">
      <div class="home" style="position: absolute;right: 0;cursor:pointer;top: 0;display:flex !important;justify-content: center !important;width:8vw;align-items: center !important;margin-left:0"><button class="button">
      <img style="margin-left:3vw;" class="svg-icon" src="../Assests/pen-solid.svg" alt="">
      <span class="lable">Edit</span>
    </button></div>
    <div class="my-profile"style="position:absolute;cursor:pointer;display:flex !important;justify-content: center !important;align-items: center !important;top: 0;left: 0;"><button class="button"onclick="myPostDisplayHandler()">
      <img class="svg-icon" src="../Assests/trash-can-regular.svg" alt="">
      <span class="lable">Delete</span>
    </button></div>
      ${element.username}
      </div>
      <div class="card-body"style="padding: 7vh 2vw;font-size: 1.1em;">
          <h5 class="card-title">${element.text}</h5>
      </div>
      <div class="card-footer text-body-secondary">
      ${hour ?? days}
      </div>
  </div>
      `;

    postContentArea.innerHTML += textHTML;
  });
};
var currentTime = new Date();
postDisplayHandler();
function deleteHandler(){
  console.log("chal rha ho delet")
}
