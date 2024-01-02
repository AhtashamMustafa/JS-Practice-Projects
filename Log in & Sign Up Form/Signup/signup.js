import { auth, createUserWithEmailAndPassword, onAuthStateChanged, setDoc ,db,doc, getDoc } from "../Utils/config.js";

let email = document.querySelector("#email");
let input = document.querySelectorAll("input")
let password = document.querySelector("#password");
let submitButton = document.querySelector(".signupbtn");
let form = document.querySelector(".form");
let loader = document.querySelector(".loader");


onAuthStateChanged(auth, async(user) => {
  if (user) {
    const uid = user.uid; //uid
    console.log(uid, "==>> uid");

    successToast("user is logged in");

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      successToast("user data is available");
      window.location.href = "../Home/home.html";
    } else {
      // docSnap.data() will be undefined in this case
      warningToast("No such document!");
    }

    // ...
  } else {
    // User is signed out
    // ...
  }
});

let docRef;
function signup() {
  if (
    input[0].value == "" ||
    input[1].value == "" ||
    input[2].value == "" ||
    input[3].value == ""
  ) {
    warningToast("Please fill all the fields!")
    return;

  } else if (input[2,3].value.length < 8 ) {
    warningToast("Password must be characters long");
    return;
  } else if (input[2].value != input[3].value) {
    return warningToast("Password is not matched with confirmed Password");
  }else{
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
  
    const user = userCredential.user;
    successToast("Signup Successful") 

    try {
        docRef = await setDoc(doc(db, "users", user.uid), {
        userName: input[0].value,
        email: email.value,
        uid: user.uid,
      });
      successToast("user has been saved")
      successToast("User have registered Successfully, now you are re-directing to Home page");

      form.style.display='none'

      setInterval(() => {
      loader.style.display='block'
      }, 500);

      setTimeout(() => {
      window.location.href = "../Home/home.html";
      }, 3000)
      return;
      } catch (e) {
      alert("error aagaya")
      console.error("Error adding document: ", e);
    }
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    warningToast(errorMessage)
  })};
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

submitButton.addEventListener("click", signup);

