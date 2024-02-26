import {
  flexContainer,
  itemsData,
  createItem,
  logout,
} from "./helper/helper.js";


const logoutBtn = document.getElementById("navbar-logout");
const leftBtn = document.getElementById("left-button");
const rightBtn = document.getElementById("right-button");
const searchButton = document.getElementById("search");
const sortbyBtn = document.getElementById("sortby");

const carouselContainer = document.getElementById("img-carousel");
const sliderStats = document.getElementById("sliderStats");
const carouselImages = localStorage.getItem("carouselImageData");


(() => {
  if (carouselImages) {
    const imageArr = JSON.parse(carouselImages);
    imageArr.forEach((element) => {
      const imageDiv = document.createElement("img");
      imageDiv.src = element;
      imageDiv.setAttribute("class", "absolute");

      carouselContainer.append(imageDiv);

      const sliderItem = document.createElement("span");
      sliderItem.setAttribute("class", "slider");

      sliderStats.append(sliderItem);
    });
  }
})();

const carouselSlides = document.querySelectorAll("#img-carousel img");
const sliderItems = document.querySelectorAll(".slider");


const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.replace("/pages/loginPage");
} else {
  let currSlide = 0;

  const renderSlide = (currSlide = 0) => {
    sliderItems[currSlide].style.backgroundColor = "#023e8a";
    sliderItems[currSlide].style.width = "20px";

    carouselSlides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currSlide) * 100}%)`;
    });
  };

  const renderitems = (searchTag = "", searchCriteria = 0) => {
    flexContainer.innerHTML = "";

    itemsData
      .filter((item) => {
        if (searchTag) {
          return item.name.toLowerCase().includes(searchTag);
        }
        return true;
      })
      .sort((a, b) => {
        if (searchCriteria === 1) return a.price - b.price;
        else if (searchCriteria === 2) return b.price - a.price;
        else if (searchCriteria === 3) return b.rating.rate - a.rating.rate
        else return true;
      })
      .forEach((item, ind) => {
        createItem(item, itemsData.findIndex(e => e.name === item.name), flexContainer);
      });
  };

  (() => {
    const list = localStorage.getItem("userList");
    const userList = list !== "" && list !== null ? JSON.parse(list) : [];

    const greetings = document.getElementById("greetings");
    const user = userList.find(
      (u) => u.uid === JSON.parse(currentUser).toString()
    );

    greetings.innerHTML = `<h2>Hello <b>${user.email.substring(
      0,
      user.email.indexOf("@")
    )}</b>,</h2>`;

    renderSlide();
    renderitems();

    setInterval(() => rightBtn.click(), 4000);
  })();

  rightBtn.addEventListener("click", () => {
    sliderItems[currSlide].style.backgroundColor = "#edede9";
    sliderItems[currSlide].style.width = "10px";

    currSlide = (currSlide + 1) % carouselSlides.length;
    renderSlide(currSlide);
  });

  leftBtn.addEventListener("click", () => {
    sliderItems[currSlide].style.backgroundColor = "#edede9";
    sliderItems[currSlide].style.width = "10px";
    currSlide--;
    if (currSlide < 0) {
      currSlide = carouselSlides.length - 1;
    }
    renderSlide(currSlide);
  });



  searchButton.addEventListener("input", () => {
    sortbyBtn.value = 0;
    renderitems(searchButton.value, 0);
  });

  sortbyBtn.addEventListener("change", (e) => {
    renderitems(searchButton.value, parseInt(e.target.value));
  });

  logoutBtn.addEventListener("click", logout);
}
