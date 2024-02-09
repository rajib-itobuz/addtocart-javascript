const cartData = localStorage.getItem("cart");
const cart = cartData != "" && cartData != null ? JSON.parse(cartData) : [];
const flexContainer = document.getElementById("flex-container");
const cartCount = document.getElementById("cart-count");
const invValue = document.createElement("h3")
const discvalue = document.createElement("h3")
const shipCharge = document.createElement("h3")

const totalPriceSection = document.getElementById("total-price");

const updatePriceSection = (cart, discount, charges) => {

}

// document.body.innerText = cart;

cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item")

    const productImage = document.createElement("img");
    productImage.src = item.imgUrl;


    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content")


    const title = document.createElement("h5");
    title.innerText =
        item.name.length > 80 ? item.name.slice(0, 80) + "..." : item.name;
    const price = document.createElement("h2");
    price.innerText = item.price;
    const quantity = document.createElement("h3");
    quantity.innerText = item.count;


    // add content to card
    contentDiv.append(title, price, quantity)
    itemDiv.append(productImage, contentDiv);

    //add to flex-container
    flexContainer.appendChild(itemDiv);



});


cartCount.innerText = cart.reduce((acc, curr) => acc + curr.count, 0);

invValue.innerHTML = "Total invoice Value : <span>$0<span>"
discvalue.innerHTML = "Discount Applied : <span>$0<span>"
shipCharge.innerHTML = "Total invoice Value : <span>$0<span>"

totalPriceSection.append(invValue, discvalue, shipCharge);
