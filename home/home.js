const logo = document.querySelector(".logo-text");
const logos = document.querySelectorAll(".logo-text");
const sidebar = document.querySelector(".sidebar");
const logoutBtn = document.querySelector(".logout-btn");
const setting = document.querySelector(".setting");

const currentUser = JSON.parse(sessionStorage.getItem("current user"));

if (!currentUser) window.location.href = "../index.html";

logos.forEach((logo) => {
  logo.textContent = currentUser[0].name.slice(0, 2).toUpperCase();
});

// let userName =
//   currentUser[0].name.slice(0, 1).toUpperCase() +
//   currentUser[0].name.slice(1, currentUser[0].name.length);
// span.textContent = ` ${userName}`;

logo.addEventListener("click", () => {
  if (sidebar.classList.contains("active-sidebar")) {
    sidebar.classList.replace("active-sidebar", "un-active-sidebar");
  } else {
    sidebar.classList.replace("un-active-sidebar", "active-sidebar");
  }
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("current user");
  window.location.href = "../index.html";
});
