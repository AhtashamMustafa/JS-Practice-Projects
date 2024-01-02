import { auth, signInWithEmailAndPassword, onAuthStateChanged, setDoc ,db,doc, getDoc} from "../Utils/config.js";

let input = document.querySelectorAll("input");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector(".form");
let loader = document.querySelector(".loader");
let loginBtn = document.querySelector("#loginbtn");

onAuthStateChanged(auth, async(user) => {
  if (user) {
    const uid = user.uid; //uid
    console.log(uid, "==>> uid");

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      window.location.href = "../Home/home.html";
    } else {
      // docSnap.data() will be undefined in this case
      warningToast("No such document!");
    }

    // ...
  } else {
  }
});


function loginHandler() {

  if (email.value == "" || password.value == "") {
    warningToast("Please fill all the fields");
    return;
  }

  if (password.value.length < 8) return warningToast('password length should be atleast 8 characters')


  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    successToast("Login Successful.")

    form.style.display='none'

    setInterval(() => {
      loader.style.display='block';
    }, 10);

    setTimeout(() => {
      window.location.href = '../Home/home.html'}, 5000)
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  })};


// Toast functions
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

loginBtn.addEventListener("click",loginHandler)
