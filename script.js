const flexContainer = document.getElementById("flex-container");
const navbarCart = document.getElementById("navbar-cart");
const cartCount = document.getElementById("cart-count");

const dbData = localStorage.getItem("dbData");
const cartData = localStorage.getItem("cart");

const data = dbData != "" && dbData != null ? JSON.parse(dbData) : [];
const cart = cartData != "" && cartData != null ? JSON.parse(cartData) : [];

cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);

// localStorage.setItem("myCat", "Tom");
const findinCart = (item) => {
  return cart != []
    ? cart.find((cartItem) => cartItem.name === item.name)
    : null;
};

const saveUpdate = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);
};

const addtoCart = (item) => {
  var index = cart.findIndex((cartItem) => cartItem.name === item.name);
  if (index >= 0) {
    cart[index].count += 1;
  } else {
    cart.push({
      ...item,
      count: 1,
    });
  }

  saveUpdate();
};

const removefromCart = (item) => {
  var index = cart.findIndex((cartItem) => cartItem.name === item.name);
  if (index >= 0 && cart[index].count > 1) {
    cart[index].count -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveUpdate();
};

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

  //on event
  button.addEventListener("click", () => {
    // button.innerText="Go to Cart"
    addtoCart(item);
    cartCountDiv.style.display = "flex";
    button.style.display = "none";

    count.innerText = item.index;
  });

  btnAdd.addEventListener("click", () => {
    addtoCart(item);

    count.innerText = item.index;
  });

  btnSub.addEventListener("click", () => {
    // console.log(cart.find((cartItem) => cartItem.name === item.name).count);
    cartItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    const countItem = cart[cartItemIndex].count;
    removefromCart(item);
    if (countItem == 1) {
      cartCountDiv.style.display = "none";
      button.style.display = "block";
    } else
      count.innerText =
        cartItemIndex >= 0
          ? cart.find((cartItem) => cartItem.name === item.name).count
          : 0;
    // count.innerText = cartItemIndex >= 0 ? cart.find((cartItem) => cartItem.name === item.name).count : 0;
  });

  // // add content to item
  cartCountDiv.append(btnAdd, count, btnSub);
  itemDiv.append(productImage, title, price, button, cartCountDiv);

  // // add to flex-container
  flexContainer.appendChild(itemDiv);
});

navbarCart.addEventListener("click", () => {
  window.location.href = "./cartPage/cart.html";
});
