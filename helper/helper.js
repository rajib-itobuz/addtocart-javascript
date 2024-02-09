const dbData = localStorage.getItem("dbData");
const cartData = localStorage.getItem("cartData");
export const data = dbData != "" && dbData != null ? JSON.parse(dbData) : [];
export const cart =
  cartData != "" && cartData != null ? JSON.parse(cartData) : [];
export const cartCount = document.getElementById("cart-count");

cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);

export const saveUpdate = () => {
  localStorage.setItem("cartData", JSON.stringify(cart));
  cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);
};

export const addtoCart = (item) => {
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

export const removefromCart = (item) => {
  var index = cart.findIndex((cartItem) => cartItem.name === item.name);
  if (index >= 0 && cart[index].count > 1) {
    cart[index].count -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveUpdate();
};

export const createItemDiv = (item) => {
  // product image edit
  const productImage = document.createElement("img");
  productImage.src = item.imgUrl;

  // title image edit
  const title = document.createElement("h5");
  title.innerText =
    item.name.length > 50 ? item.name.slice(0, 50) + "..." : item.name;

  const price = document.createElement("h2");
  price.innerText = item.price;
  return {};
};
