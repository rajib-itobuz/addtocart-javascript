import {
  cart,
  saveUpdate,
  addtoCart,
  removefromCart,
} from "../helper/helper.js";

const flexContainer = document.getElementById("flex-container");

const cartCount = document.getElementById("cart-count");
const invValue = document.createElement("h3");
const discvalue = document.createElement("h3");
const shipCharge = document.createElement("h3");
const totalAmt = document.createElement("h3");
const checkOutBtn = document.createElement("button");

cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);

const discount = 0.03;
const shipping = 150;

invValue.innerHTML = "<span>Cart Value :</span> <span>$0</span>";
discvalue.innerHTML = "<span>Discount Applied :</span> <span>$0</span>";
shipCharge.innerHTML = "<span>Shipping Charges :</span> <span>$0</span>";
totalAmt.innerHTML = "<span>Total invoice Value :</span> <span>$0</span>";
checkOutBtn.innerText = "Checkout";

// functions
const hideInvoiceSection = () => {
  if (cart.length === 0) {
    console.log(0);
    totalPriceSection.innerHTML = "No Cart Items Added";
    totalPriceSection.style.textAlign = "center";
  }
};

const totalPriceSection = document.getElementById("total-price");

const updatePriceSection = (cart, discount, charges) => {
  const cartAmount = cart.reduce((a, curr) => a + curr.count * curr.price, 0);
  const discountValue = cartAmount * discount;
  invValue.innerHTML = `<span>Cart Value :</span> <span>${cartAmount.toFixed(
    2
  )}</span>`;
  discvalue.innerHTML = `<span>Discount Applied ${
    discount * 100
  }% :</span> <span>${discountValue.toFixed(2)}</span>`;
  shipCharge.innerHTML = `<span>Shipping Charges :</span> <span>${charges}</span>`;
  totalAmt.innerHTML = `<span>Total invoice Value :</span> <span>${(
    cartAmount -
    discountValue +
    charges
  ).toFixed(2)}</span>`;
};

totalPriceSection.append(
  invValue,
  discvalue,
  shipCharge,
  totalAmt,
  checkOutBtn
);

cart.forEach((item) => {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  const productImage = document.createElement("img");
  productImage.src = item.imgUrl;

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const title = document.createElement("h5");
  title.innerText =
    item.name.length > 50 ? item.name.slice(0, 50) + "..." : item.name;

  const price = document.createElement("h2");
  price.innerText = item.price * item.count;

  const cartCountDiv = document.createElement("div");
  cartCountDiv.classList.add("cart-count");

  //+ - featrue
  const btnAdd = document.createElement("div");
  btnAdd.classList.add("btnAdd");
  btnAdd.innerText = "+";

  const count = document.createElement("div");

  count.innerText = item.count > 0 ? item.count : 0;
  count.style.fontSize = "25px";

  const btnSub = document.createElement("div");
  btnSub.innerText = "-";
  btnSub.classList.add("btnSub");

  //quantity
  cartCountDiv.append(btnSub, count, btnAdd);
  const quantity = document.createElement("h3");
  quantity.append(cartCountDiv);

  const crossButton = document.createElement("a");
  crossButton.classList.add("cross-btn");
  crossButton.innerText = "Remove";

  // add content to card
  contentDiv.append(title, price, quantity, crossButton);
  itemDiv.append(productImage, contentDiv);

  //add to flex-container
  flexContainer.appendChild(itemDiv);
  let cartItemIndex = 0;
  crossButton.addEventListener("click", () => {
    cartItemIndex = cart.findIndex((cartItem) => cartItem === item);
    cart.splice(cartItemIndex, 1);
    console.log(cart);
    flexContainer.removeChild(itemDiv);
    updatePriceSection(cart, discount, shipping);
    saveUpdate();
    hideInvoiceSection();
  });

  btnAdd.addEventListener("click", () => {
    addtoCart(item);
    price.innerText = item.price * item.count;
    count.innerText = item.count;
    updatePriceSection(cart, discount, shipping);
  });

  btnSub.addEventListener("click", () => {
    cartItemIndex = cart.findIndex((cartItem) => cartItem === item);
    const countItem = cart[cartItemIndex].count;
    removefromCart(item);

    price.innerText = item.price * item.count;

    if (countItem == 1) {
      flexContainer.removeChild(itemDiv);
    } else count.innerText = item.count;
    updatePriceSection(cart, discount, shipping);
    hideInvoiceSection();
  });
});

updatePriceSection(cart, discount, shipping);
hideInvoiceSection();
