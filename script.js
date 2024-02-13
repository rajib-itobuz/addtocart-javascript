import {
  itemsData,
  createItem,
  callEventListener,
  logout,
} from "./helper/helper.js";

const flexContainer = document.getElementById("flex-container");
const logoutBtn = document.getElementById("navbar-logout");
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.replace("/pages/loginPage");
} else {
  const list = localStorage.getItem("userList");
  const userList = list != "" && list != null ? JSON.parse(list) : [];

  const greetings = document.getElementById("greetings");
  const user = userList.find(
    (u) => u.uid === JSON.parse(currentUser).toString()
  );
  greetings.innerHTML = `<h2>Hello <b>${user.email.substring(
    0,
    user.email.indexOf("@")
  )}</b>,</h2>`;

  itemsData.forEach((item, ind) => createItem(item, ind, flexContainer));

  callEventListener(flexContainer, false);
  logoutBtn.addEventListener("click", logout);
}
