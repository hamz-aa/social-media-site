const signupBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".login-btn");
const wrapper = document.querySelector(".wrapper");

signupBtn.addEventListener("click", () => {
  wrapper.classList.add("wrapper-active");
  setTimeout(() => {
    window.location.href = "./signup/signup.html";
  }, 1500);
});

loginBtn.addEventListener("click", () => {
  wrapper.classList.add("wrapper-active");
  setTimeout(() => {
    window.location.href = "./login/login.html";
  }, 1500);
});
