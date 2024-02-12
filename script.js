import { itemsData, createItem } from "./helper/helper.js";

const flexContainer = document.getElementById("flex-container");

itemsData.forEach((item) => createItem(item, flexContainer));
