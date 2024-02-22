import {
  cart,
  createItem,
  updatePriceSection,
  hideInvoiceSection,
  callEventListener,
} from "../../helper/helper.js";

const flexContainer = document.getElementById("flex-container");

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.replace("/pages/loginPage");
} else {
  cart.forEach((item, ind) => createItem(item, ind, flexContainer));
  callEventListener(flexContainer, true);
  updatePriceSection(cart, 0.03, 150);
  hideInvoiceSection();
}
