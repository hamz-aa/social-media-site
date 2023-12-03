const logo = document.querySelector(".logo-text");
const logos = document.querySelectorAll(".logo-text");
const sidebar = document.querySelector(".sidebar");
const logoutBtn = document.querySelector(".logout-btn");
const setting = document.querySelector(".setting");
const imageInput = document.querySelector("#input-image");
const shareBtn = document.querySelector(".share-btn");
const userText = document.querySelector(".user-text");
const mainContent = document.querySelector(".main-content");
const userInput = document.querySelector(".user-input");

const currentUser = JSON.parse(localStorage.getItem("current user"));

if (!currentUser) window.location.href = "../index.html";
else {
  logos.forEach((logo) => {
    logo.textContent = currentUser[0].name.slice(0, 2).toUpperCase();
  });
}

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
  localStorage.removeItem("current user");
  window.location.href = "../index.html";
});

imageInput.addEventListener("change", (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("image", reader.result);
  });

  if (image) reader.readAsDataURL(image);

  postUpload();
});

shareBtn.addEventListener("click", postUpload);

function postUpload() {
  if (!userText.value) return alert("insert some text first");

  const card = document.createElement("div");
  card.classList.add("same-content", "card");

  if (userText.value && localStorage.getItem("image")) {
    const image = document.createElement("img");
    // image.src = localStorage.getItem("image");

    // console.log(image);

    card.innerHTML = `<div class="top-content">
    <div class="profile-wrapper">
      <div class="logo">
        <p class="logo-text"></p>
      </div>
      <p class="profile-name">Hamza</p>
    </div>
    <i class="fa-solid fa-ellipsis"></i>
  </div>
  <div class="caption">
    <p>${userText.value}</p>
  </div>
  <div class="upload-image">
    <img src="${localStorage.getItem("image")}" alt="" />
  </div>`;

    userInput.parentNode.insertBefore(card, userInput.nextElementSibling);

    return;
  }

  card.innerHTML = `<div class="top-content">
    <div class="profile-wrapper">
      <div class="logo">
        <p class="logo-text"></p>
      </div>
      <p class="profile-name">Hamza</p>
    </div>
    <i class="fa-solid fa-ellipsis"></i>
  </div>
  <div class="caption">
    <p>${userText.value}</p>
  </div>`;

  userInput.parentNode.insertBefore(card, userInput.nextElementSibling);
}
