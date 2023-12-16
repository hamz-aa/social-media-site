const logo = document.querySelector(".logo");
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
const modal = document.querySelector("dialog");
const modalUsername = document.querySelector("#modal-username");
const modalEmail = document.querySelector("#modal-email");
const modalPassword = document.querySelector("#modal-password");
const modalImage = document.querySelector("#modal-image");
const applyBtn = document.querySelector(".apply-btn");
const leaveBtn = document.querySelector(".leave-link");

sidebar.style.opacity = "0";
userText.value = "";
let flag = false;

const currentUser = JSON.parse(localStorage.getItem("current user"));
const images = JSON.parse(localStorage.getItem("images")) || [];
const users = JSON.parse(localStorage.getItem("users"));
let id = JSON.parse(localStorage.getItem("id")) || 0;

if (!currentUser) window.location.href = "../index.html";
else {
  displayLogo();

  if (images.length > 0) {
    imageUpload();
  }
}

if (!(currentUser.name in images)) images[currentUser.name] = [];

modalUsername.value = currentUser.name;
modalEmail.value = currentUser.email;
modalPassword.value = currentUser.password;

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
    ++id;
    const data = {
      id: id,
      key: currentUser.name,
      img: reader.result,
      caption: userText.value,
    };

    images.push(data);
    localStorage.setItem("images", JSON.stringify(images));
    localStorage.setItem("id", JSON.stringify(id));
  });

  if (image) reader.readAsDataURL(image);
  flag = true;
});

shareBtn.addEventListener("click", function () {
  if (!userText.value) return alert("enter some text first");

  header.classList.add("wrapper-active");
  setTimeout(() => {
    const card = document.createElement("div");
    card.classList.add("same-content", "card");

    if (userText.value && localStorage.getItem("images") && flag) {
      let imgList = JSON.parse(localStorage.getItem("images"));

      card.innerHTML = imagePost(imgList[imgList.length - 1]);

      flag = false;
    } else {
      id++;
      const data = {
        id: id,
        key: currentUser.name,
        caption: userText.value,
      };
      card.innerHTML = captionPost(data);

      images.push(data);
      localStorage.setItem("images", JSON.stringify(images));
      localStorage.setItem("id", JSON.stringify(id));
    }

    userInput.parentNode.insertBefore(card, userInput.nextElementSibling);
    userText.value = "";
    displayLogo();
    window.location.reload();
  }, 1500);
});

home.addEventListener("click", () => {
  header.classList.add("wrapper-active");
  setTimeout(() => {
    header.classList.add("wrapper-un-active");
    header.classList.remove("wrapper-active");
    setTimeout(() => {
      header.classList.remove("wrapper-un-active");
    }, 1500);
    home.classList.add("active-anchor");
    profile.classList.remove("active-anchor");
    window.location.reload();
  }, 1500);
});

profile.addEventListener("click", () => showProfile());

function imageUpload() {
  let storedImages = JSON.parse(localStorage.getItem("images"));

  storedImages.forEach((val) => {
    const card = document.createElement("div");
    card.classList.add("same-content", "card", `${val.key}`);

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
  header.classList.add("wrapper-active");
  setTimeout(() => {
    mainContent.innerHTML = `<div class="same-content user-input">
                          <div class="logo user-logo">
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

    storedImages.reverse().forEach((val) => {
      if (val.key === currentUser.name) {
        const card = document.createElement("div");
        card.classList.add("same-content", "card", `${val.key}`);

        if (!val.img) {
          card.innerHTML += captionPost(val);
        } else {
          card.innerHTML += imagePost(val);
        }

        mainContent.appendChild(card);
      }
    });
    displayLogo();
    currentUserProfileImages();
    header.classList.add("wrapper-un-active");
    header.classList.remove("wrapper-active");
    setTimeout(() => {
      header.classList.remove("wrapper-un-active");
    }, 1500);
    profile.classList.add("active-anchor");
    home.classList.remove("active-anchor");
  }, 1500);
}

function displayLogo() {
  const logos = document.querySelectorAll(".logo-text");
  logos.forEach((logo) => {
    logo.textContent = currentUser.name.slice(0, 2).toUpperCase();
  });
}

function imagePost(val) {
  if (val.key === currentUser.name) {
    return `<div class="top-content">
    <div class="profile-wrapper">
    <div class="logo">
    <p class="logo-text"></p>
    </div>
    <p class="profile-name">${val.key}</p>
    </div>
    <div class="post-btn-wrapper">
    <i class="fa-solid fa-ellipsis" onclick="postButtonHandler(event)"></i>
    <div class="post-btn" id="${val.id}">
      <button>Edit</button>
      <button onclick="deleteButtonHandler(event)">Delete</button>
    </div>
    </div>
    </div>
    <div class="caption">
    <p>${val.caption}</p>
    </div>
    <div class="upload-image">
    <img src="${val.img}" alt="" />
    </div>`;
  } else {
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
}

function captionPost(val) {
  if (val.key === currentUser.name) {
    return `<div class="top-content">
    <div class="profile-wrapper">
    <div class="logo">
    <p class="logo-text"></p>
    </div>
    <p class="profile-name">${val.key}</p>
    </div>
    <div class="post-btn-wrapper">
    <i class="fa-solid fa-ellipsis" onclick="postButtonHandler(event)"></i>
    <div class="post-btn" id="${val.id}">
      <button>Edit</button>
      <button onclick="deleteButtonHandler(event)">Delete</button>
    </div>
    </div>
    </div>
    <div class="caption">
    <p>${val.caption}</p>
    </div>`;
  } else {
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
    </div>`;
  }
}

function currentUserProfileImages() {
  users.forEach((user) => {
    if (user.img && user.name === currentUser.name) {
      let modalLogo = document.querySelectorAll(".logo-text");
      modalLogo.forEach((val) => {
        val.remove();
      });
      let parentLogo = document.querySelectorAll(`.${currentUser.name} .logo`);
      parentLogo.forEach((val) => {
        const newImage = document.createElement("img");
        newImage.src = user.img;
        val.appendChild(newImage);

        if (val.classList.contains("main-logo"))
          val.classList.add("main-img-logo");
        else val.classList.add("img-logo");
      });

      const userLogo = document.querySelector(".main-content .user-logo");
      const newImage = document.createElement("img");
      newImage.src = user.img;
      userLogo.appendChild(newImage);

      if (userLogo.classList.contains("main-logo"))
        userLogo.classList.add("main-img-logo");
      else userLogo.classList.add("img-logo");
    }
  });
}

function profileImageUpload() {
  users.forEach((user) => {
    if (user.img) {
      let modalLogo = document.querySelectorAll(".logo-text");
      modalLogo.forEach((val) => {
        val.remove();
      });
      let parentLogo = document.querySelectorAll(`.${user.name} .logo`);
      parentLogo.forEach((val) => {
        const newImage = document.createElement("img");
        newImage.src = user.img;
        val.appendChild(newImage);

        if (val.classList.contains("main-logo"))
          val.classList.add("main-img-logo");
        else val.classList.add("img-logo");
      });
    }
  });
}

function userLogoUpload() {
  users.forEach((user) => {
    if (user.img) {
      if (user.name === currentUser.name) {
        const userLogo = document.querySelectorAll(".user-logo");
        userLogo.forEach((val) => {
          const newImage = document.createElement("img");
          newImage.src = user.img;
          val.appendChild(newImage);

          if (val.classList.contains("main-logo"))
            val.classList.add("main-img-logo");
          else val.classList.add("img-logo");
        });
      }
    }
  });
}

setting.addEventListener("click", () => {
  header.classList.add("wrapper-active");
  setTimeout(() => {
    modal.showModal();
    document.body.style.overflow = "hidden";
    header.classList.add("wrapper-un-active");
    header.classList.remove("wrapper-active");
    setTimeout(() => {
      header.classList.remove("wrapper-un-active");
    }, 1500);
  }, 1500);
});

modalImage.addEventListener("change", (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const img = reader.result;

    if (!("img" in currentUser)) {
      let modalLogo = document.querySelector(".modal-wrapper .logo-text");
      modalLogo.remove();
      let parentLogo = document.querySelector(".modal-wrapper .logo");
      const newImage = document.createElement("img");
      newImage.src = img;
      parentLogo.appendChild(newImage);
    } else {
      const imgInModal = document.querySelector(".modal-wrapper img");
      imgInModal.src = img;
    }
    currentUser.img = img;
  });

  if (image) reader.readAsDataURL(image);
});

applyBtn.addEventListener("click", () => {
  const user = {
    name: modalUsername.value,
    email: modalEmail.value,
    password: modalPassword.value,
  };
  if (currentUser.img) {
    user.img = currentUser.img;
  }

  if (modalUsername.value !== currentUser.name) {
    let exists = users.find((user) => user.name === modalUsername.value);
    if (exists) return alert("username already exists");
    else {
      if (images) {
        for (let obj of images[currentUser.name]) {
          obj.key = modalUsername.value;
        }
        images[modalUsername.value] = images[currentUser.name];
        delete images[currentUser.name];
        localStorage.setItem("images", JSON.stringify(images));
      }
    }
  }
  if (modalEmail.value !== currentUser.email) {
    let exists = users.find((user) => user.email === modalEmail.value);
    if (exists) return alert("user email already exists");
  }

  for (let i in users) {
    if (users[i].name === currentUser.name) {
      users[i] = user;
      localStorage.setItem("users", JSON.stringify(users));
      break;
    }
  }

  localStorage.setItem("current user", JSON.stringify(user));

  profileImageUpload();

  header.classList.add("wrapper-active");
  setTimeout(() => {
    modal.close();
    sidebar.classList.replace("active-sidebar", "un-active-sidebar");
    header.classList.remove("wrapper-active");
    window.location.reload();
  }, 1500);
});

leaveBtn.addEventListener("click", () => {
  header.classList.add("wrapper-active");
  setTimeout(() => {
    modal.close();
    sidebar.classList.replace("active-sidebar", "un-active-sidebar");
    header.classList.remove("wrapper-active");
    window.location.reload();
  }, 1500);
});

function postButtonHandler(e) {
  e.target.nextElementSibling.classList.toggle("active");
}

function deleteButtonHandler(event) {
  for (let image in images) {
    if (event.currentTarget.parentNode.id == images[image].id) {
      header.classList.add("wrapper-active");
      setTimeout(() => {
        images.splice(image, 1);
        localStorage.setItem("images", JSON.stringify(images));
        sidebar.classList.replace("active-sidebar", "un-active-sidebar");
        header.classList.remove("wrapper-active");
        window.location.reload();
      }, 1500);
    }
  }
}

profileImageUpload();
userLogoUpload();
