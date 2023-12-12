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
let postinput = document.querySelector("#textArea").value;
let createPost = document.querySelector(".create-button");
let createPostContainer = document.querySelector(".container");
let image = document.getElementById("profile");
let container = document.querySelector(".container");
let privacy = container.querySelector(".post .privacy");
let arrowBack = container.querySelector(".audience .arrow-back");
let postArea = document.querySelector("#post-area");
let elipsis = document.querySelector("#elipsis");
let select = document.querySelector("#editDelete")
let edit = document.querySelector("#edit")
let delet = document.querySelector("#delete")
let imgUrl;

// Getting data from localstorage

let users = JSON.parse(localStorage.getItem("users")) ?? [];

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
image.onchange = function () {
  let imgurl = URL.createObjectURL(image.files[0]);
  document.querySelector(".imagePreview").src = imgurl;
  document.querySelector("#imagePreview").src = imgurl;
  document.querySelector(".post-img").src = imgurl;
};

// Open file while clicking on profile img
document.querySelector("#imagePreview").addEventListener("click", function () {
  document.getElementById("profile").click();
});

// Create post down transition
function createdown() {
  createPostContainer.style.height = "70vh";
  createPost.setAttribute("onclick", "createup()");
}

// Create post up transition
function createup() {
  createPostContainer.style.height = 0;
  createPost.setAttribute("onclick", "createdown()");
}

// on mouse Hover logout image replaces with green image
function logouthover() {
  loggedout.src = "../Assests/Log out green.png";
  loggedout.setAttribute("onmouseout", "logoutout()");
}

// on mouse out logout image replaces with black image
function logoutout() {
  loggedout.src = "../Assests/Log out.png";
}

// on mouse hover Notification image replaces with green image
function notificationhover() {
  notification.src = "../Assests/notification green.png";
  notification.setAttribute("onmouseout", "notificationout()");
}

// on mouse out Notification image replaces with black image
function notificationout() {
  notification.src = "../Assests/notification.png";
}

// profile update drop down
function profileUpdatedrop() {
  drop.style.height = 0;
  profileNameHtml.setAttribute("onclick", "dropup()");
  dropupdate.style.height = "69vh";
}

// Drop down on clicking name
function dropdown() {
  drop.style.height = "31svh";
  profileNameHtml.setAttribute("onclick", "dropup()");
}

// Drop up on clicking name if it is open
function dropup() {
  drop.style.height = 0+"px";
  dropupdate.style.height = 0;
  profileNameHtml.setAttribute("onclick", "dropdown()");
}

// Create post privacy section active
privacy.addEventListener("click", () => {
  container.classList.add("active");
});

// Create post privation section inactive
arrowBack.addEventListener("click", () => {
  container.classList.remove("active");
});

// Getting image url if any
const imagePrompt = ()=>{
   let imgUrl=prompt("Enter image URL");
};

// Creating post function
function post() {
  
  // Getting data form localstorage post
  let post = JSON.parse(localStorage.getItem("post")) ?? [];

  // Getting current date and time
  let currentDate = new Date();
  let timestamp = currentDate.getTime();


  // creating a post object in which all data go to localstorage
  let postObj = {
    postId: Date.now() ,
    username: username,
    email: email,
    postText: postinput,
    time: timestamp,
    imageUrl:imgUrl
  }
  console.log
  // pushing data in array
  post.push(postObj)

  // Setting post in localstorage
  localStorage.setItem("post", JSON.stringify(post));

  // Display Success message
  successToast("Your post has been posted");

  // Closing the post container and setting function
  createPostContainer.style.height = 0;
  createPost.setAttribute("onclick", "createdown()");

  // Post display handler is calling
  postDisplayHandler();

  // Clearing the text input
  setTimeout(()=> postinput = "",2000);
}

// Displaying post
const postDisplayHandler = () => {

  // Clearing data from post content area
  postArea.innerHTML = "";

  // Getting data from localstorage
  let post = JSON.parse(localStorage.getItem("post")) ?? [];

  // finding the post and display them in content area
  post.reverse().forEach((element) => {
    // Getting stored time of each post
    let storedTimestamp = element.time;

    // Getting current date and calculate the time difference
    let currentTime = new Date();
    let timeDifference = currentTime.getTime() - storedTimestamp;
    let hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    let daysAgo = Math.floor(hoursAgo / 24);
    let hour;
    let days;

    // applying the conditional rendering to get the time of post
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
    
    let textHTML = `<div id='${element.postId}' class="postContentArea" style="width: 100%; margin: auto; height: 100% ;z-index: -1;">
    <div class="postCard" style="margin-top:2vh; z-index: -1;border: 3px solid rgba(124, 119, 119, 0.416);border-radius: 7px;">
      <div class="" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:flex-start;align-items:center;">
        <div style="width: 100%;display:flex ;justify-content:space-between;align-items:center;"><div style="width: 100%;display: flex;justify-content:flex-start;align-items:center;"><img style="width: 10%;height: 10%;" src="../Assests/default profile.png" alt=""><div style="margin-left: 1vw; margin-top: 2vh;"><span>${element.username}</span><p style="margin-top: -1vh; font-size: 0.8em;">${hour ?? days}</p></div></div><img id="elipsis" style="margin-top: -7vh;" src="../Assests/ellipsis-solid.svg" alt="" onclick="selectEditDeleteDisplayHandler ()"></div>
      </div>
      <div id="editDelete" class="editDelete"style="background-color:rgb(249, 243, 243);width: 6.5vw;display:none ;justify-content:flex-start;align-items:center;flex-direction: column; position: absolute; right: 21vw;top: 21vh;"><button id="edit" style="background-color:transparent; color: black; padding: 1vh 2.2vw;margin: 0 !important;border-style:none !important;border-radius:0 !important;border-style: none;float: none !important;"onclick="editHandler()">Edit</button><button  id="delete" style="background-color:transparent ; color: black;padding: 1vh 1.5vw;margin: 0 !important;border-style:none !important;border-radius:0 !important;float: none !important;"onclick="deleteHandler()"></button>Delete</button></div>
      <div class=""style="font-size: 1.1em;margin: 1vh 1vw;padding:1vh 1vw;text-align:justify">
        <p>${element.postText}</p>
      </div>
    </div>
  </div>`
    

    postArea.innerHTML += textHTML;
  });
};



const myPostDisplayHandler = () => {
  postContentArea.innerHTML = "";
  let logginEmail = JSON.parse(localStorage.getItem("LoggedInuser")).email;

  // console.log(logginEmail);
  let post = JSON.parse(localStorage.getItem("post")) || [];

  // let filter= post.reverse().filter((ele) => {ele.details[0].email == logginEmail})

  let filter = post.filter((filteredpost) => {
    return filteredpost.email == logginEmail;
  });
  console.log(filter);
  filter.forEach((element) => {
    console.log("me aa rha");
    let storedTimestamp = element.time;
    let currentTime = new Date();
    let timeDifference = currentTime.getTime() - storedTimestamp;

    let hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    let daysAgo = Math.floor(hoursAgo / 24);
    let hour;
    let days;
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



postDisplayHandler();


function selectEditDeleteDisplayHandler(){
  select.classList.add("active");
  elipsis.setAttribute("onclick","selectEditDeletecloseHandler()");
}
function selectEditDeletecloseHandler(){
  select.classList.remove("active")
  elipsis.setAttribute("onclick","selectEditDeleteDisplayHandler()")
}











function deleteHandler() {
  console.log("chal rha ho delet");
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