const username = document.querySelector("#signup-username");
const email = document.querySelector("#signup-email");
const password = document.querySelector("#signup-password");
const confirmPassword = document.querySelector("#confirm-signup-password");

const signupBtn = document.querySelector(".signup-btn");

if (sessionStorage.getItem("current user"))
  window.location.href = "../home/home.html";

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const users = JSON.parse(sessionStorage.getItem("users")) || [];

  if (
    !username.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  )
    return alert("Fill all fields");
  if (password.value.length < 8) {
    return alert("Password should be greater than 7 characters");
  }
  if (password.value !== confirmPassword.value) {
    return alert("Password does not match Confirm Password");
  }

  const user = {
    name: username.value,
    email: email.value,
    password: password.value,
  };

  users.push(user);

  sessionStorage.setItem("users", JSON.stringify(users));

  username.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";

  window.location.href = "../login/login.html";
});
