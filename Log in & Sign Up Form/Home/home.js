const firstContainer = document.querySelector("#container1");
const thirdContainer = document.querySelector("#container3");
const profileNameHtml = document.querySelector("#loggedinuser");
const loggedout = document.querySelector("#logout");
const notification = document.querySelector("#notification");
let dropupdate = document.querySelector(".dropdown");
let drop = document.querySelector(".main-container");
let userName = document.querySelector(".name");
let createpostname = document.querySelector("#name");
let postname = document.querySelector(".username");
let useremail = document.querySelector("#email");
let usercontact = document.querySelector("#contact");
let usercity = document.querySelector("#city");
let updateimg = document.querySelector("#imagePreview");
let userimg = document.querySelector(".imagePreview");
let postinput = document.querySelector("textarea");

// Check the user if logged out then redirect to login page
let loggedInUser = JSON.parse(localStorage.getItem("LoggedInuser"));

if (!loggedInUser) window.location.href = "../Login/Login.html";
// Display the username on the page

// pop out the object form array
let loggedInUserDetails = loggedInUser.pop();

// destrurize the object
let { username, email, contactNo, city, id } = loggedInUserDetails;

// Capitalize name function
function capitalizeEveryFirstWord(prompt) {
  let words = prompt.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }
  return words.join(" ");
};

// Value showing in settings to update profile
userName.value = capitalizeEveryFirstWord(username)?capitalizeEveryFirstWord(username): "No username";
useremail.value = email ? email :"No email Update";
usercontact.value = contactNo ? contactNo :"No contact details updated";
usercity.value =city ? capitalizeEveryFirstWord(city) : "No city details updated";

// Profile and create post name
profileNameHtml.textContent = capitalizeEveryFirstWord(username);
createpostname.textContent = capitalizeEveryFirstWord(username);

// log Out Handler
function logout() {
  localStorage.removeItem("LoggedInuser");
  window.location.href = "../Login/Login.html";
}

// Update Profile Handler
function update() {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];

  // find current user in users
  let myUser = users.find((user)=>{
    return user.id == id
  })
  
  // create a object for logged in user
  let userobj={
    id : myUser.id,
    username : userName.value,
    email : useremail.value,
    contactNo : usercontact.value,
    city : usercity.value.toLowerCase(),
  }
  
  // update the value of existing user
    myUser.username = userName.value;
    myUser.email = useremail.value;
    myUser.contactNo = usercontact.value;
    myUser.city = usercity.value.toLowerCase();

  // push the objects in array
    let user=[];
    let login=[];
    user.push(myUser)
    login.push(userobj)

    // sent array of object to localstorage
    localStorage.setItem("users", JSON.stringify(user));
    localStorage.setItem("LoggedInuser", JSON.stringify(login));
    successToast("Profile has been updated!");
    setTimeout(dropup(), 2000);
}

// Image onclick function
let image = document.getElementById("profile");
image.onchange = function () {
  var imgurl = URL.createObjectURL(image.files[0]);
  document.querySelector(".imagePreview").src = imgurl;
  document.querySelector("#imagePreview").src = imgurl;
  document.querySelector(".post-img").src = imgurl;
};

// Open file while clicking on profile img
document.querySelector("#imagePreview").addEventListener("click", function () {
  document.getElementById("profile").click();
});

let createPost = document.querySelector(".create-button");
let createPostContainer = document.querySelector(".container");

function createdown() {
  createPostContainer.style.height = "70vh";
  createPost.setAttribute("onclick", "createup()");
}

function createup() {
  createPostContainer.style.height = 0;
  createPost.setAttribute("onclick", "createdown()");
}

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
  profileNameHtml.setAttribute("onclick", "dropup()");
  dropupdate.style.height = "69vh";
}

function dropdown() {
  drop.style.height = "31svh";
  profileNameHtml.setAttribute("onclick", "dropup()");
}

function dropup() {
  dropupdate.style.height = 0;
  drop.style.height = 0;
  profileNameHtml.setAttribute("onclick", "dropdown()");
}

let container = document.querySelector(".container");
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
  // postContentArea.innerHTML = "";
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
    //   <div class="" style="margin-top:2vh;z-index: -1;">
    //     <div class="" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:center;align-items:center;">
    //     <button class="" style="cursor: pointer !important;" type="button" onclick="deleteHandler()">Delete</button>
    //     ${element.username}
    //     </div>
    //     <div class=""style="padding: 7vh 2vw;font-size: 1.1em;">
    //         <h5 class="card-title">${element.text}</h5>
    //     </div>
    //     <div class="">
    //         ${hour ?? days}
    //     </div>
    // </div>
    const textHTML = `
      
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

let currentTime = new Date();

postDisplayHandler();

function deleteHandler() {
  console.log("chal rha ho delet");
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