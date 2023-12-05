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

sidebar.style.opacity = "0";
userText.value = "";

const currentUser = JSON.parse(localStorage.getItem("current user"));
const images = JSON.parse(localStorage.getItem("images")) || {};

if (!currentUser) window.location.href = "../index.html";
else {
  logos.forEach((logo) => {
    logo.textContent = currentUser[0].name.slice(0, 2).toUpperCase();
  });

  if (Object.keys(images).length > 0) {
    imageUpload();
  }
}

if (!(currentUser[0].name in images)) images[currentUser[0].name] = [];

logo.addEventListener("click", () => {
  sidebar.style.opacity = "1";
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
  if (!userText.value) return alert("enter some text first");

  const image = e.target.files[0];
  const reader = new FileReader();
  const data = {};

  reader.addEventListener("load", () => {
    data.img = reader.result;
    data.caption = userText.value;

    images[currentUser[0].name].push(data);
    localStorage.setItem("images", JSON.stringify(images));
  });

  if (image) reader.readAsDataURL(image);
});

shareBtn.addEventListener("click", postUpload);

function postUpload() {
  if (!userText.value) return alert("enter some text first");

  const card = document.createElement("div");
  card.classList.add("same-content", "card");

  if (userText.value && localStorage.getItem("images")) {
    let imgList = JSON.parse(localStorage.getItem("images"))[
      currentUser[0].name
    ];
    imgLatest = imgList[imgList.length - 1].img;

    card.innerHTML = `<div class="top-content">
    <div class="profile-wrapper">
      <div class="logo">
        <p class="logo-text"></p>
      </div>
      <p class="profile-name">${currentUser[0].name}</p>
    </div>
    <i class="fa-solid fa-ellipsis"></i>
  </div>
  <div class="caption">
    <p>${userText.value}</p>
  </div>
  <div class="upload-image">
    <img src="${imgLatest}" alt="" />
  </div>`;

    userInput.parentNode.insertBefore(card, userInput.nextElementSibling);
    userText.value = "";

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

  const data = { caption: userText.value };
  images[currentUser[0].name].push(data);

  userInput.parentNode.insertBefore(card, userInput.nextElementSibling);

  userText.value = "";
}

function imageUpload() {
  let storedImages = JSON.parse(localStorage.getItem("images"));
  for (key of Object.keys(storedImages)) {
    let data = storedImages[key];
    data.forEach((val) => {
      const card = document.createElement("div");
      card.classList.add("same-content", "card");
      card.innerHTML += `<div class="top-content">
    <div class="profile-wrapper">
      <div class="logo">
        <p class="logo-text"></p>
      </div>
      <p class="profile-name">${key}</p>
    </div>
    <i class="fa-solid fa-ellipsis"></i>
  </div>
  <div class="caption">
    <p>${val.caption}</p>
  </div>
  <div class="upload-image">
    <img src="${val.img}" alt="" />
  </div>`;

      userInput.parentNode.insertBefore(card, userInput.nextElementSibling);
    });
  }
}
