const dbData = localStorage.getItem("dbData");
const cartData = localStorage.getItem("cart");
export const data = dbData != "" && dbData != null ? JSON.parse(dbData) : [];
export const cart =
  cartData != "" && cartData != null ? JSON.parse(cartData) : [];
export const cartCount = document.getElementById("cart-count");

cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);

const saveUpdate = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
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
