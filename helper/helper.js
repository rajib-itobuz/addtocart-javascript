// read localstorage data
export const flexContainer = document.getElementById("flex-container");
const dbData = localStorage.getItem("dbData");
const cartData = localStorage.getItem("cartData");

// parse local storage and save into variables
export const itemsData =
  dbData !== "" && dbData !== null ? JSON.parse(dbData) : [];
export const cart =
  cartData !== "" && cartData !== null ? JSON.parse(cartData) : [];

// update cart count
const cartCount = document.getElementById("cart-count");
cartCount.innerText = cart.length;

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
const hideInvoiceSection = () => {
  if (cart.length === 0) {
    totalPriceSection.innerHTML = "No Cart Items Added";
    totalPriceSection.style.textAlign = "center";
  }
};

// update price section in cart page on item update
const updatePriceSection = (cart, discount, charges) => {
  const cartAmount = cart.reduce((a, curr) => a + curr.count * curr.price, 0);
  const discountValue = cartAmount * discount;
  invValue.innerHTML = `<span>Cart Value :</span> <span>${cartAmount.toFixed(
    2
  )}</span>`;
  discvalue.innerHTML = `<span>Discount Applied ${discount * 100
    }% :</span> <span>${discountValue.toFixed(2)}</span>`;
  shipCharge.innerHTML = `<span>Shipping Charges :</span> <span>${charges}</span>`;
  totalAmt.innerHTML = `<span>Total invoice Value :</span> <span>${(
    cartAmount -
    discountValue +
    charges
  ).toFixed(2)}</span>`;
};

//show total priceSection only in cart Page
(() => {
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

    updatePriceSection(cart, discount, shipping);
    hideInvoiceSection();
  }
})();

// find in cart if required
const findinCart = (item) =>
  cart.length > 0 ? cart.find((cartItem) => cartItem.name === item.name) : null;

// save update to localstorage and update cart count
const saveUpdate = () => {
  localStorage.setItem("cartData", JSON.stringify(cart));
  cartCount.innerText = cart.length;
  const curruser = localStorage.getItem("currentUser");
  if (curruser) {
    const list = localStorage.getItem("userList");
    const userList = list !== "" && list !== null ? JSON.parse(list) : [];
    const index = userList.findIndex((user) => user.uid === curruser);
    userList[index].cart = cart;

    localStorage.setItem("userList", JSON.stringify(userList));
  }
};

// add to cart functionality
const addtoCart = (item, cartCountDiv, button) => {
  const index = cart.findIndex((cartItem) => cartItem.uid === item.uid);
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
  const index = cart.findIndex((cartItem) => cartItem.name === item.name);
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

// create and export items
export const createItem = (item, ind, flexContainer) => {
  const itemCard = document.createElement("div");
  itemCard.classList.add("item");
  itemCard.setAttribute("id", `itemCard-${ind}`);
  itemCard.setAttribute("class", `itemDiv flex flex-column justify-between`);

  // add item fields
  const productImage = document.createElement("img");
  productImage.src = item.imgUrl;
  productImage.alt = `product-${item.uid}`;
  productImage.setAttribute("alt", "productImage");

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const title = document.createElement("h5");
  title.innerText = item.name;

  const price = document.createElement("h2");
  price.setAttribute("class", "flex align-center");
  price.setAttribute("id", `price-${ind}`);

  const ratings = document.createElement("span");
  ratings.innerHTML = `${item.rating.rate}⭐ ( ${item.rating.count} )`;

  price.append(item.count ? item.count * item.price : item.price, ratings);

  // button
  const button = document.createElement("button");
  button.innerText = "Add to Cart";
  button.setAttribute("id", `btn-cart-${ind}`);
  button.setAttribute("class", `btn-cart pointer`);
  button.onclick = () => callEvent(event, item.count ? true : false);
  button.dataset.id = ind;
  button.dataset.uid = item.uid;

  // card count div
  const cartCountDiv = document.createElement("div");
  cartCountDiv.classList.add("countItems");
  cartCountDiv.setAttribute("id", `cart-count-${ind}`);

  const btnAdd = document.createElement("div");
  btnAdd.setAttribute("class", `btnAdd pointer`);
  btnAdd.setAttribute("id", `btnAdd-${ind}`);
  btnAdd.onclick = () => callEvent(event, item.count ? true : false);
  btnAdd.dataset.id = ind;
  btnAdd.dataset.uid = item.uid;
  btnAdd.innerText = "+";

  const count = document.createElement("div");
  const cartItemIndex = cart.findIndex(
    (cartItem) => cartItem.name === item.name
  );
  count.innerText = cartItemIndex >= 0 ? cart[cartItemIndex].count : 1;
  count.style.fontSize = "25px";
  count.setAttribute("id", `count-${ind}`);

  const btnSub = document.createElement("div");
  btnSub.innerText = "-";
  btnSub.setAttribute("class", `btnSub pointer`);
  btnSub.onclick = () => callEvent(event, item.count ? true : false);
  btnSub.setAttribute("id", `btnSub-${ind}`);
  btnSub.dataset.id = ind;
  btnSub.dataset.uid = item.uid;

  const crossButton = document.createElement("a");
  crossButton.setAttribute("class", `cross-btn pointer`);
  crossButton.setAttribute("id", `crossbtn-${ind}`);
  crossButton.innerText = "Remove";
  crossButton.onclick = () => callEvent(event, item.count ? true : false);
  crossButton.dataset.id = ind;
  crossButton.dataset.uid = item.uid;

  cartCountDiv.append(btnSub, count, btnAdd, crossButton);
  const quantity = document.createElement("h3");
  quantity.append(cartCountDiv);

  // add content to card
  contentDiv.append(title, price, button, quantity);

  itemCard.append(productImage, contentDiv);
  if (findinCart(item) == null) {
    cartCountDiv.style.display = "none";
    button.style.display = "block";
  } else {
    cartCountDiv.style.display = "flex";
    button.style.display = "none";
  }

  flexContainer.appendChild(itemCard);
};

// mapping of function so that its easier to bind actions to common function
const mapmyFunction = {
  add: addtoCart,
  remove: removefromCart,
  delete: deletefromCart,
};

// single add event listener call function
const onEventCallback = (callbackName, item, ...argv) => {
  mapmyFunction[callbackName](item, argv[1], argv[0]);
  const cartItemIndex = cart.findIndex(
    (cartItem) => cartItem.name === item.name
  );
  const countItem = cartItemIndex >= 0 ? cart[cartItemIndex].count : 0;
  argv[2].innerText = countItem;

  // entirely works on cart
  if (item.count) {
    argv[3].innerText = item.price * item.count;
    updatePriceSection(cart, discount, shipping);

    if (cartItemIndex === -1) argv[4].removeChild(argv[5]);
    hideInvoiceSection();
  }

  saveUpdate();
};

// setting onclick event
const callEvent = (event, flag) => {
  const selectedElementIndex = event.target.dataset?.id;
  const itemUid = parseInt(event.target.dataset?.uid);

  const cardCountDiv = document.getElementById(
    `cart-count-${selectedElementIndex}`
  );
  const count = document.getElementById(`count-${selectedElementIndex}`);
  const button = document.getElementById(`btn-cart-${selectedElementIndex}`);
  const price = document.getElementById(`price-${selectedElementIndex}`);
  const itemCard = document.getElementById(`itemCard-${selectedElementIndex}`);

  const item = flag
    ? cart.find((e) => e.uid === itemUid)
    : itemsData.find((e) => e.uid === itemUid);

  if (event.target.id === `btn-cart-${selectedElementIndex}`)
    onEventCallback("add", item, button, cardCountDiv, count);
  else if (event.target.id === `btnAdd-${selectedElementIndex}`)
    onEventCallback("add", item, button, cardCountDiv, count, price);
  else if (event.target.id === `btnSub-${selectedElementIndex}`)
    onEventCallback(
      "remove",
      item,
      button,
      cardCountDiv,
      count,
      price,
      flexContainer,
      itemCard
    );
  else if (event.target.id === `crossbtn-${selectedElementIndex}`)
    onEventCallback(
      "delete",
      item,
      button,
      cardCountDiv,
      count,
      price,
      flexContainer,
      itemCard
    );
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cartData");
  window.location.replace("/pages/loginPage");
};
