import {
  cart,
  createItem,
  updatePriceSection,
  hideInvoiceSection
} from "../helper/helper.js";

const flexContainer = document.getElementById("flex-container");


cart.forEach((item) =>createItem(item,flexContainer));

updatePriceSection(cart, 0.03, 150);
hideInvoiceSection();
