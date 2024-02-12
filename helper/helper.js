// read localstorage data
const dbData = localStorage.getItem("dbData");
const cartData = localStorage.getItem("cartData");

// parse local storage and save into variables
export const itemsData =
  dbData != "" && dbData != null ? JSON.parse(dbData) : [];
export const cart =
  cartData != "" && cartData != null ? JSON.parse(cartData) : [];

// update cart count
const cartCount = document.getElementById("cart-count");
cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);

//cart section
const totalPriceSection = document.getElementById("total-price");
const discount = 0.03;
const shipping = 150;
const invValue = document.createElement("h3");
const discvalue = document.createElement("h3");
const shipCharge = document.createElement("h3");
const totalAmt = document.createElement("h3");
const checkOutBtn = document.createElement("button");

// hide invoice section if cart has no items
export const hideInvoiceSection = () => {
  if (cart.length === 0) {
    totalPriceSection.innerHTML = "No Cart Items Added";
    totalPriceSection.style.textAlign = "center";
  }
};

// update price section in cart page on item update
export const updatePriceSection = (cart, discount, charges) => {
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

//show total priceSection only in cart Page
if (totalPriceSection) {
  invValue.innerHTML = "<span>Cart Value :</span> <span>0</span>";
  discvalue.innerHTML = "<span>Discount Applied :</span> <span>0</span>";
  shipCharge.innerHTML = "<span>Shipping Charges :</span> <span>0</span>";
  totalAmt.innerHTML = "<span>Total invoice Value :</span> <span>0</span>";
  checkOutBtn.innerText = "Checkout";

  totalPriceSection.append(
    invValue,
    discvalue,
    shipCharge,
    totalAmt,
    checkOutBtn
  );

  hideInvoiceSection();
  updatePriceSection(cart, discount, shipping);
}

// save update to localstorage and update cart count
const saveUpdate = () => {
  localStorage.setItem("cartData", JSON.stringify(cart));
  cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);
};

// add to cart functionality
const addtoCart = (item, cartCountDiv, button) => {
  var index = cart.findIndex((cartItem) => cartItem.name === item.name);
  if (index >= 0) {
    cart[index].count += 1;
  } else {
    cart.push({
      ...item,
      count: 1,
    });

    cartCountDiv.style.display = "flex";
    button.style.display = "none";
  }
};

// remove from cart functionality
const removefromCart = (item, cartCountDiv, button) => {
  var index = cart.findIndex((cartItem) => cartItem.name === item.name);
  if (index >= 0 && cart[index].count > 1) {
    cart[index].count -= 1;
  } else {
    cart.splice(index, 1);
    cartCountDiv.style.display = "none";
    button.style.display = "block";
  }
};

// delete from cart if clicked on remove
const deletefromCart = (item) => {
  cart.splice(
    cart.findIndex((cartItem) => cartItem === item),
    1
  );
};

// find in cart if required
const findinCart = (item) =>
  cart != [] ? cart.find((cartItem) => cartItem.name === item.name) : null;

// create and export items
export const createItem = (item, flexContainer) => {
  const itemCard = document.createElement("div");
  itemCard.classList.add("item");

  // add item fields
  const productImage = document.createElement("img");
  productImage.src = item.imgUrl;

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const title = document.createElement("h5");
  title.innerText =
    item.name.length > 50 ? item.name.slice(0, 50) + "..." : item.name;

  const price = document.createElement("h2");
  price.innerText = item.count ? item.count * item.price : item.price;

  // button
  const button = document.createElement("button");
  button.innerText = "Add to Cart";
  button.classList.add("btn-cart");

  // card count div
  const cartCountDiv = document.createElement("div");
  cartCountDiv.classList.add("cart-count");

  const btnAdd = document.createElement("div");
  btnAdd.classList.add("btnAdd");
  btnAdd.innerText = "+";

  const count = document.createElement("div");
  const cartItemIndex = cart.findIndex(
    (cartItem) => cartItem.name === item.name
  );
  count.innerText = cartItemIndex >= 0 ? cart[cartItemIndex].count : 1;
  count.style.fontSize = "25px";

  const btnSub = document.createElement("div");
  btnSub.innerText = "-";
  btnSub.classList.add("btnSub");

  const crossButton = document.createElement("a");
  crossButton.classList.add("cross-btn");
  crossButton.innerText = "Remove";

  cartCountDiv.append(btnSub, count, btnAdd, crossButton);
  const quantity = document.createElement("h3");
  quantity.append(cartCountDiv);

  // add content to card
  contentDiv.append(title, price, button, quantity);

  itemCard.append(productImage, contentDiv);

  if (findinCart(item) === null) {
    cartCountDiv.style.display = "none";
    button.style.display = "block";
  } else {
    cartCountDiv.style.display = "flex";
    button.style.display = "none";
  }

  flexContainer.appendChild(itemCard);

  onEventCallback(button, "add", item, button, cartCountDiv, count);
  onEventCallback(
    btnSub,
    "remove",
    item,
    button,
    cartCountDiv,
    count,
    price,
    flexContainer,
    itemCard
  );
  onEventCallback(
    crossButton,
    "delete",
    item,
    button,
    cartCountDiv,
    count,
    price,
    flexContainer,
    itemCard
  );
  onEventCallback(btnAdd, "add", item, button, cartCountDiv, count, price);
};

// mapping of function so that its easier to bind actions to common function
const mapmyFunction = {
  add: addtoCart,
  remove: removefromCart,
  delete: deletefromCart,
};

// single add event listener call function
const onEventCallback = (button, callbackName, item, ...argv) => {
  button.addEventListener("click", () => {
    mapmyFunction[callbackName](item, argv[1], argv[0]);
    const cartItemIndex = cart.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    const countItem = cartItemIndex >= 0 ? cart[cartItemIndex].count : 0;
    argv[2].innerText = countItem;

    if (item.count) {
      argv[3].innerText = item.price * item.count;
      updatePriceSection(cart, discount, shipping);

      if (cartItemIndex === -1) argv[4].removeChild(argv[5]);
      hideInvoiceSection();
    }

    saveUpdate();
  });
};
