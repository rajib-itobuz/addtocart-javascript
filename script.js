import {
  itemsData,
  createItem,
  callEventListener,
  logout,
} from "./helper/helper.js";

const flexContainer = document.getElementById("flex-container");
const logoutBtn = document.getElementById("navbar-logout");
const carouselSlides = document.querySelectorAll("#img-carousel img");
const leftBtn = document.getElementById("leftButton");
const sliderItems = document.querySelectorAll(".slider");
const rightBtn = document.getElementById("rightButton");
const searchButton = document.getElementById("search");

const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.replace("/pages/loginPage");
} else {
  let currSlide = 0;

  const renderSlide = (currSlide = 0) => {
    sliderItems[currSlide].style.backgroundColor = "#047bd5";
    sliderItems[currSlide].style.width = "20px";

    carouselSlides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currSlide) * 100}%)`;
    });
  };

  const renderitems = (searchTag = "") => {
    flexContainer.innerHTML = "";
    itemsData
      .filter((item) => {
        if (searchTag) {
          return item.name.toLowerCase().includes(searchTag);
        }
        return true;
      })
      .forEach((item, ind) => {
        console.log(item);
        createItem(item, ind, flexContainer);
      });
  };

  (() => {
    const list = localStorage.getItem("userList");
    const userList = list != "" && list != null ? JSON.parse(list) : [];

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

    setInterval(() => rightBtn.click(), 3000);
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

  callEventListener(flexContainer, false);

  searchButton.addEventListener("input", () => {
    renderitems(searchButton.value);
  });

  logoutBtn.addEventListener("click", logout);
}
