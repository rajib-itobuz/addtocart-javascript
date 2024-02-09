import { cart, data, addtoCart, removefromCart } from "./helper/helper.js";

const flexContainer = document.getElementById("flex-container");
const navbarCart = document.getElementById("navbar-cart");

// localStorage.setItem("myCat", "Tom");
const findinCart = (item) =>
  cart != [] ? cart.find((cartItem) => cartItem.name === item.name) : null;

data.forEach((item, ind) => {
  // create item
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  // // add item fields
  const productImage = document.createElement("img");
  productImage.src = item.imgUrl;

  const title = document.createElement("h5");
  title.innerText =
    item.name.length > 50 ? item.name.slice(0, 50) + "..." : item.name;

  const price = document.createElement("h2");
  price.innerText = item.price;

  // button
  const button = document.createElement("button");
  button.innerText = "Add to Cart";
  button.classList.add("btn-cart");

  // // card count div
  const cartCountDiv = document.createElement("div");
  cartCountDiv.classList.add("cart-count");

  const btnAdd = document.createElement("div");
  btnAdd.classList.add("btnAdd");
  btnAdd.innerText = "+";

  const count = document.createElement("div");
  let cartItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
  count.innerText = cartItemIndex >= 0 ? cart[cartItemIndex].count : 0;
  count.style.fontSize = "25px";

  const btnSub = document.createElement("div");
  btnSub.innerText = "-";
  btnSub.classList.add("btnSub");

  //on normal rendering
  if (findinCart(item) == null) {
    cartCountDiv.style.display = "none";
    button.style.display = "block";
  } else {
    cartCountDiv.style.display = "flex";
    button.style.display = "none";
  }

  // // add content to item
  cartCountDiv.append(btnSub, count, btnAdd);
  itemDiv.append(productImage, title, price, button, cartCountDiv);

  // // add to flex-container
  flexContainer.appendChild(itemDiv);

  //on event
  button.addEventListener("click", () => {
    addtoCart(item);
    cartCountDiv.style.display = "flex";
    button.style.display = "none";
    cartItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    count.innerText =
      cartItemIndex >= 0
        ? cart.find((cartItem) => cartItem.name === item.name).count
        : 0;
  });

  btnAdd.addEventListener("click", () => {
    addtoCart(item);
    cartItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    count.innerText = cartItemIndex >= 0 ? cart[cartItemIndex].count : 0;
  });

  btnSub.addEventListener("click", () => {
    cartItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    const countItem = cart[cartItemIndex].count;
    removefromCart(item);
    if (countItem == 1) {
      cartCountDiv.style.display = "none";
      button.style.display = "block";
    } else count.innerText = cartItemIndex >= 0 ? cart[cartItemIndex].count : 0;
  });
});

navbarCart.addEventListener("click", () => {
  window.location.href = "./cartPage/cart.html";
});
