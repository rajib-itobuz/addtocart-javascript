import { sendEmailJs } from "../../helper/emailJsHelper.js";
const myForm = document.getElementById("my-form");
const otpField = document.getElementById("otp");
const otpError = document.getElementById("otp-error");
const timer = document.getElementById("timer");

const tempUser = localStorage.getItem("tempUser");
const otp = localStorage.getItem("otp");

let timeout = 30;
let otpTimer;
const timerFunction = () => {
  otpTimer = setInterval(() => {
    timeout--;
    timer.innerText = `You have : 00:${timeout} to verify`;
  }, 1000);
};

if (!tempUser || !otp) {
  window.location.replace("/");
} else {
  timerFunction();
  setTimeout(() => {
    clearTimeout(otpTimer);
    localStorage.removeItem("otp");
    timer.innerText = `Didn't Receive Otp? Resend.`;
  }, 30000);

  myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const otp = otpField.value;

    const storedOtp = localStorage.getItem("otp");
    if (storedOtp === otp) {
      const tempUser = localStorage.getItem("tempUser");
      const list = localStorage.getItem("userList");

      const userList = list !== "" && list !== null ? JSON.parse(list) : [];
      let user =
        tempUser !== null || tempUser !== "" ? JSON.parse(tempUser) : {};

      if (Object.keys(user).length > 0) {
        userList.push(user);
        localStorage.setItem("cartData", JSON.stringify(user.cart));
        localStorage.setItem("userList", JSON.stringify(userList));
        localStorage.setItem("currentUser", user.uid.toString());

        localStorage.removeItem("otp");
        localStorage.removeItem("tempUser");
        window.location = "/";
      }
    } else {
      otpError.textContent = "Otp incorrect";
    }
  });

  timer.addEventListener("click", () => {
    if (!timeout) {
      const fetchUserData = localStorage.getItem("tempUser");

      const user =
        fetchUserData !== null && fetchUserData !== ""
          ? JSON.parse(fetchUserData)
          : null;
      if (user) {
        const otp = Math.floor(Math.random() * 999999) + 100000;
        sendEmailJs(
          user.email,
          "Your Otp for Flippy Ecommerce Website",
          `Hi your Otp is ${otp}`,
          "",
          () => {
            localStorage.setItem("otp", otp);
            timeout = 30;
            timerFunction();
          }
        );
      }
    }
  });
}
