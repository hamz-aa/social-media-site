const username = document.querySelector("#login-username");
const password = document.querySelector("#login-password");
const wrapper = document.querySelector(".wrapper");
const loginBtn = document.querySelector(".login-btn");
const signupLink = document.querySelector(".signup-link");
let email;

if (localStorage.getItem("current user"))
  window.location.href = "../home/home.html";

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = [];

  if (!users) return alert("user not found!");
  if (!username.value || !password.value) return alert("Fill all fields");
  if (password.value.length < 8) {
    return alert("wrong password");
  }

  let flag = users.find((user) => {
    email = user.email;
    return username.value === user.name && password.value === user.password;
  });

  if (!flag) {
    alert("wrong username or password");
    return;
  }

  const user = {
    name: username.value,
    password: password.value,
    email: email,
  };

  currentUser.push(user);

  localStorage.setItem("current user", JSON.stringify(currentUser));

  username.value = "";
  password.value = "";

  wrapper.classList.add("wrapper-active");
  setTimeout(() => {
    window.location.href = "../home/home.html";
  }, 1500);
});

signupLink.addEventListener("click", () => {
  wrapper.classList.add("wrapper-active");
  setTimeout(() => {
    window.location.href = "../signup/signup.html";
  }, 1500);
});
