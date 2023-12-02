const signupBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".login-btn");

signupBtn.addEventListener("click", () => {
  window.location.href = "./signup/signup.html";
});

loginBtn.addEventListener("click", () => {
  window.location.href = "./login/login.html";
});
