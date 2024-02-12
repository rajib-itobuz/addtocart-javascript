import { itemData, createItem } from "./helper/helper.js";

const flexContainer = document.getElementById("flex-container");
const navbarCart = document.getElementById("navbar-cart");

itemData.forEach((item) => createItem(item, flexContainer));

navbarCart.addEventListener("click", () => {
  window.location.href = "./cartPage/cart.html";
});
