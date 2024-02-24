import {
  cart,
  flexContainer,
  createItem,
} from "../../helper/helper.js";

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.replace("/pages/loginPage");
} else {
  cart.forEach((item, ind) => createItem(item, ind, flexContainer));
}
