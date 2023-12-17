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
let postinput = document.querySelector("#textArea");
let createPost = document.querySelector(".create-button");
let createPostContainer = document.querySelector(".container");
let image = document.getElementById("profile");
let container = document.querySelector(".container");
let privacy = container.querySelector(".post .privacy");
let arrowBack = container.querySelector(".audience .arrow-back");
let postArea = document.querySelector("#post-area");
let postButton=document.querySelector('#post-button')


let edit = document.querySelector("#edit")
let delet = document.querySelector("#delete")
let imageUrl;
let oldPost;
let oldPostIndex;

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
let imagePrompt = ()=>{
  imageUrl=prompt("Enter image URL");
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
    postText: postinput.value,
    time: timestamp,
    imageUrl:imageUrl,
  }
  
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
  setTimeout(()=> postinput = "",1000);
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
    let secondsAgo = Math.floor(timeDifference / 1000);
    let minutesAgo = Math.floor(secondsAgo / 60);
    let hoursAgo = Math.floor(minutesAgo / 60);
    let daysAgo = Math.floor(hoursAgo / 24);

    let timeAgo;

    // applying the conditional rendering to get the time of post
    if (daysAgo >= 1) {
      timeAgo = daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`;
    } else if (hoursAgo >= 1) {
      timeAgo = hoursAgo > 1 ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`;
    } else if (minutesAgo >= 1) {
      timeAgo = minutesAgo > 1 ? `${minutesAgo} minutes ago` : `${minutesAgo} minute ago`;
    } else {
      timeAgo = secondsAgo > 1 ? `${secondsAgo} seconds ago` : `${secondsAgo} second ago`;
    }
    let textHTML;
    if(element.imageUrl){
      textHTML = `<div id='${element.postId}' class="postContentArea" style="width: 100%; margin: auto; height: auto ;z-index: -1;">
          <div class="postCard" style="margin-top:2vh; z-index: -1;border: 3px solid rgba(124, 119, 119, 0.416);border-radius: 7px;">
          <div class="" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:flex-start;align-items:center;width: 100%;">
            <div style="width: 100%;display:flex ;justify-content:space-between;align-items:center;"><div style="width: 100%;display: flex;justify-content:flex-start;align-items:center;"><img style="width: 7%;height: 7%;" src="../Assests/default profile.png" alt=""><div style="margin-left: 1vw; margin-top: 1vh;"><span>${capitalizeEveryFirstWord(element.username)}</span><p style="margin-top: -1vh; font-size: 0.8em;">${timeAgo}</p></div></div>
            ${ email===element.email ? `<button id="edit" style="background-color:transparent; color: black; padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;border-style: none;float: none !important;"onclick="editPostHandler(${element.postId})"><img src="../Assests/pen-solid.svg" alt="">Edit</button><button  id="delete" style="background-color:transparent ; color: black;padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;float: none !important;"onclick="deletePostHandler(${element.postId})"><img src="../Assests/trash-can-regular.svg" alt="">Delete</button>`:" "}
            </div>
          </div>
          <div class=""style="font-size: 1.1em;margin: 1vh 1vw;padding:1vh 1vw;text-align:justify;">
            <p>${element.postText}</p><img style="width:100%;height:auto;margin:auto;" src="${element.imageUrl}".svg" alt="">
          </div>
        </div>
      </div>`}
    else{ textHTML = `<div id='${element.postId}' class="postContentArea" style="width: 100%; margin: auto; height: auto ;z-index: -1;">
          <div class="postCard" style="margin-top:2vh; z-index: -1;border: 3px solid rgba(124, 119, 119, 0.416);border-radius: 7px;">
          <div class="" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:flex-start;align-items:center;width: 100%;">
            <div style="width: 100%;display:flex ;justify-content:space-between;align-items:center;"><div style="width: 100%;display: flex;justify-content:flex-start;align-items:center;"><img style="width: 7%;height: 7%;" src="../Assests/default profile.png" alt=""><div style="margin-left: 1vw; margin-top: 1vh;"><span>${capitalizeEveryFirstWord(element.username)}</span><p style="margin-top: -1vh; font-size: 0.8em;">${timeAgo}</p></div></div>
            ${ email===element.email ? `<button id="edit" style="background-color:transparent; color: black; padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;border-style: none;float: none !important;"onclick="editPostHandler(${element.postId})"><img src="../Assests/pen-solid.svg" alt="">Edit</button><button  id="delete" style="background-color:transparent ; color: black;padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;float: none !important;"onclick="deletePostHandler(${element.postId})"><img src="../Assests/trash-can-regular.svg" alt="">Delete</button>`:" "}</div>
          </div>
          <div class=""style="font-size: 1.1em;margin: 1vh 1vw;padding:1vh 1vw;text-align:justify">
            <p>${element.postText}</p>
          </div>
        </div>
      </div>`}
    
    postArea.innerHTML += textHTML;
  });
  dropup()
};



const myPostDisplayHandler = () => {

  // Clearing data from post content area
  postArea.innerHTML = "";
  
  
  // Getting data from localstorage
  let post = JSON.parse(localStorage.getItem("post")) || [];
  
  
  // filtering the post and display them in content area
  let filter = post.filter((filteredpost) => {
    return filteredpost.email == email;
  });
  
  filter.reverse().forEach((element) => {
    
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
    let textHTML;
    if(element.imageUrl){
      textHTML = `<div id='${element.postId}' class="postContentArea" style="width: 100%; margin: auto; height: auto ;z-index: -1;">
          <div class="postCard" style="margin-top:2vh; z-index: -1;border: 3px solid rgba(124, 119, 119, 0.416);border-radius: 7px;">
          <div class="" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:flex-start;align-items:center;width: 100%;">
            <div style="width: 100%;display:flex ;justify-content:space-between;align-items:center;"><div style="width: 100%;display: flex;justify-content:flex-start;align-items:center;"><img style="width: 7%;height: 7%;" src="../Assests/default profile.png" alt=""><div style="margin-left: 1vw; margin-top: 1vh;"><span>${capitalizeEveryFirstWord(element.username)}</span><p style="margin-top: -1vh; font-size: 0.8em;">${hour ?? days}</p></div></div>
            ${ email===element.email ? `<button id="edit" style="background-color:transparent; color: black; padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;border-style: none;float: none !important;"onclick="editPostHandler(${element.postId})"><img src="../Assests/pen-solid.svg" alt="">Edit</button><button  id="delete" style="background-color:transparent ; color: black;padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;float: none !important;"onclick="deletePostHandler(${element.postId})"><img src="../Assests/trash-can-regular.svg" alt="">Delete</button>`:" "}
            </div>
          </div>
          <div class=""style="font-size: 1.1em;margin: 1vh 1vw;padding:1vh 1vw;text-align:justify;">
            <p>${element.postText}</p><img style="width:100%;height:auto;margin:auto;" src="${element.imageUrl}".svg" alt="">
          </div>
        </div>
      </div>`}
    else{ textHTML = `<div id='${element.postId}' class="postContentArea" style="width: 100%; margin: auto; height: auto ;z-index: -1;">
          <div class="postCard" style="margin-top:2vh; z-index: -1;border: 3px solid rgba(124, 119, 119, 0.416);border-radius: 7px;">
          <div class="" id="username" style="padding: 1vh 1vw; font-size: 1.2em;font-weight: 600;display:flex ;justify-content:flex-start;align-items:center;width: 100%;">
            <div style="width: 100%;display:flex ;justify-content:space-between;align-items:center;"><div style="width: 100%;display: flex;justify-content:flex-start;align-items:center;"><img style="width: 7%;height: 7%;" src="../Assests/default profile.png" alt=""><div style="margin-left: 1vw; margin-top: 1vh;"><span>${capitalizeEveryFirstWord(element.username)}</span><p style="margin-top: -1vh; font-size: 0.8em;">${hour ?? days}</p></div></div>
            ${ email===element.email ? `<button id="edit" style="background-color:transparent; color: black; padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;border-style: none;float: none !important;"onclick="editPostHandler(${element.postId})"><img src="../Assests/pen-solid.svg" alt="">Edit</button><button  id="delete" style="background-color:transparent ; color: black;padding: 0vh 1vw;margin: 0 !important;border-style:none !important;border-radius:8px !important;float: none !important;"onclick="deletePostHandler(${element.postId})"><img src="../Assests/trash-can-regular.svg" alt="">Delete</button>`:" "}</div>
          </div>
          <div class=""style="font-size: 1.1em;margin: 1vh 1vw;padding:1vh 1vw;text-align:justify">
            <p>${element.postText}</p>
          </div>
        </div>
      </div>`}
    
    postArea.innerHTML += textHTML;
  });
  dropup()
};


postDisplayHandler();

// Drop down handler of edit and delete
function selectEditDeleteDisplayHandler(){
  let select = document.querySelector("#editDelete").classList.add("active");
  let elipsis = document.querySelector("#elipsis").setAttribute("onclick","selectEditDeletecloseHandler()");
}

// Drop up handler of edit and delete
function selectEditDeletecloseHandler(){
  let select = document.querySelector("#editDelete").classList.remove("active");
  let elipsis = document.querySelector("#elipsis").setAttribute("onclick","selectEditDeleteDisplayHandler()")
}

// Delete post Handler
function deletePostHandler(postId) {
  
    // get Data from local storage
    const forDelete = JSON.parse(localStorage.getItem('post'))

    // filter the data of post which emails do not matched
    const filteredData = forDelete.filter((post) => post.postId != postId)

    // Setting the data in local storage
    localStorage.setItem('post', JSON.stringify(filteredData))

    // Running the display Handler
    postDisplayHandler()
}
function editPostHandler(postId) {
  console.log("chal rha ho edit");
  const postsLocalStorage = JSON.parse(localStorage.getItem('post'))

  const findPost = postsLocalStorage.find((post) => post.postId === postId)
  const findPostIndex = postsLocalStorage.findIndex((post) => post.postId === postId)

  console.log(findPost, "====>>> findPost")

  oldPost = findPost;
  oldPostIndex = findPostIndex;

  postinput.value = findPost.postText

  postButton.innerHTML = "Update"
  document.getElementById("header-createpost").innerHTML = "Update Post"
  
  postButton.setAttribute("onclick","updatePostHandler()")
  createdown()
}

function updatePostHandler(){
  console.log("update post handler working")

  let newUpdatePostData ={
    postId:oldPost?.id,
    postText: postinput.value || oldPost.postText,
    imageUrl:imageUrl || oldPost.imageUrl,
    username: username,
    email: email,
    time: Date.now()
  }  
  
  const postsLocalStorage = JSON.parse(localStorage.getItem('post'))

  postsLocalStorage.splice(oldPostIndex, 1, newUpdatePostData)

  localStorage.setItem('post', JSON.stringify(postsLocalStorage))

  postDisplayHandler()
  postButton.innerHTML = "Post"

  postButton.setAttribute("onclick","post()")
  createup()

  document.getElementById("header-createpost").innerHTML = "Create Post"
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