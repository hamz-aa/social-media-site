const logo = document.querySelector(".logo-text");
const sidebar = document.querySelector(".sidebar");
const logoutBtn = document.querySelector(".logout-btn");
const setting = document.querySelector(".setting");
const imageInput = document.querySelector("#input-image");
const shareBtn = document.querySelector(".share-btn");
const userText = document.querySelector(".user-text");
const mainContent = document.querySelector(".main-content");
const userInput = document.querySelector(".user-input");
const home = document.querySelector(".home");
const profile = document.querySelector(".profile");
const header = document.querySelector("header");

sidebar.style.opacity = "0";
userText.value = "";
let flag = false;

const currentUser = JSON.parse(localStorage.getItem("current user"));
const images = JSON.parse(localStorage.getItem("images")) || {};
let order = parseInt(JSON.parse(localStorage.getItem("order"))) || 0;

if (!currentUser) window.location.href = "../index.html";
else {
  displayLogo();

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

  reader.addEventListener("load", () => {
    const data = {
      key: currentUser[0].name,
      img: reader.result,
      caption: userText.value,
      order: order,
    };

    localStorage.setItem("order", JSON.stringify(++order));

    images[currentUser[0].name].push(data);
    localStorage.setItem("images", JSON.stringify(images));
  });

  if (image) reader.readAsDataURL(image);
  flag = true;
});

shareBtn.addEventListener("click", function () {
  if (!userText.value) return alert("enter some text first");

  header.classList.add("wrapper");
  setTimeout(() => {
    const card = document.createElement("div");
    card.classList.add("same-content", "card");

    if (userText.value && localStorage.getItem("images") && flag) {
      let imgList = JSON.parse(localStorage.getItem("images"))[
        currentUser[0].name
      ];
      imgLatest = imgList[imgList.length - 1];

      card.innerHTML = imagePost(imgLatest);

      flag = false;
    } else {
      const data = {
        key: currentUser[0].name,
        caption: userText.value,
        order: order,
      };
      card.innerHTML = captionPost(data);

      localStorage.setItem("order", JSON.stringify(++order));
      images[currentUser[0].name].push(data);
      localStorage.setItem("images", JSON.stringify(images));
    }

    userInput.parentNode.insertBefore(card, userInput.nextElementSibling);
    userText.value = "";
    displayLogo();
    header.classList.remove("wrapper");
  }, 1500);
});

home.addEventListener("click", () => imageUpload());

profile.addEventListener("click", () => showProfile());

function imageUpload() {
  let storedImages = JSON.parse(localStorage.getItem("images"));

  let orderedImages = [];

  for (key of Object.keys(storedImages)) {
    let data = storedImages[key];

    data.forEach((val) => {
      orderedImages.splice(val.order, 0, val);
    });
  }

  orderedImages.forEach((val) => {
    const card = document.createElement("div");
    card.classList.add("same-content", "card");

    if (!val.img) {
      card.innerHTML += captionPost(val);
    } else {
      card.innerHTML += imagePost(val);
    }

    userInput.parentNode.insertBefore(card, userInput.nextElementSibling);
  });

  displayLogo();
}

function showProfile() {
  mainContent.innerHTML = `<div class="same-content user-input">
                          <div class="logo">
                          <p class="logo-text"></p>
                          </div>
                          <input
                            type="text"
                            class="user-text"
                            placeholder="what's on your mind!"
                          />
                          <div class="input-image-wrapper">
                            <label for="input-image">image</label>
                            <input type="file" name="" id="input-image" accept="image/*" />
                          </div>
                          <button class="share-btn">Share</button>
                          </div>`;

  let storedImages = JSON.parse(localStorage.getItem("images"));

  let orderedImages = [];

  let data = storedImages[currentUser[0].name];

  data.forEach((val) => {
    orderedImages.splice(val.order, 0, val);
  });

  orderedImages.reverse().forEach((val) => {
    const card = document.createElement("div");
    card.classList.add("same-content", "card");

    if (!val.img) {
      card.innerHTML += captionPost(val);
    } else {
      card.innerHTML += imagePost(val);
    }

    mainContent.appendChild(card);
  });
  displayLogo();
}

function displayLogo() {
  const logos = document.querySelectorAll(".logo-text");
  logos.forEach((logo) => {
    logo.textContent = currentUser[0].name.slice(0, 2).toUpperCase();
  });
}

function imagePost(val) {
  return `<div class="top-content">
  <div class="profile-wrapper">
  <div class="logo">
  <p class="logo-text"></p>
  </div>
  <p class="profile-name">${val.key}</p>
  </div>
  <i class="fa-solid fa-ellipsis"></i>
  </div>
  <div class="caption">
  <p>${val.caption}</p>
  </div>
  <div class="upload-image">
  <img src="${val.img}" alt="" />
  </div>`;
}

function captionPost(val) {
  return `<div class="top-content">
  <div class="profile-wrapper">
  <div class="logo">
  <p class="logo-text"></p>
  </div>
  <p class="profile-name">${val.name}</p>
  </div>
  <i class="fa-solid fa-ellipsis"></i>
  </div>
  <div class="caption">
  <p>${val.caption}</p>
  </div>`;
}
