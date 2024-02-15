const emailinput = document.getElementById("email");
const passwordinput = document.getElementById("password");
const submitBtn = document.getElementById("login-submit");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const upperCaseError = document.getElementById("uppercase-error");
const lowerCaseError = document.getElementById("lowercase-error");
const symbolError = document.getElementById("symbol-error");
const numberError = document.getElementById("number-error");
const incorrectError = document.getElementById("incorrect-error");

const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
  window.location.replace("/");
} else {
  const list = localStorage.getItem("userList");
  const userList = list != "" && list != null ? JSON.parse(list) : [];

  const validateEmail = (email) => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return true;

    emailError.innerText = "Wrong email";
    return false;
  };

  const validatePassword = (password) => {
    if (
      String(password).match(
        /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      return true;
    }

    incorrectError.innerText = "Please use proper password";
    return false;
  };

  const passwordInputCriteria = (e) => {
    let status = 0;
    passwordError.style.display = "block";
    passwordError.style.color = "#f47547";

    if (/(?=.*[A-Z])/.test(passwordinput.value)) {
      upperCaseError.style.color = "#8ac926";
      status++;
    } else {
      status--;
      upperCaseError.style.color = "#f47547";
    }

    if (/(?=.*[a-z])/.test(passwordinput.value)) {
      lowerCaseError.style.color = "#8ac926";
      status++;
    } else {
      status--;
      lowerCaseError.style.color = "#f47547";
    }

    if (/(?=.*[0-9])/.test(passwordinput.value)) {
      numberError.style.color = "#8ac926";
      status++;
    } else {
      status--;
      numberError.style.color = "#f47547";
    }

    if (/(?=.*[@,-])/.test(passwordinput.value)) {
      symbolError.style.color = "#8ac926";
      status++;
    } else {
      status--;
      symbolError.style.color = "#f47547";
    }

    if (status === 4) {
      passwordError.style.color = "#8ac926";
      passwordError.style.display = "none";
    }
  };

  let otp = 0;

  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      otp = Math.floor(Math.random() * 999999) + 100000;
      const email = emailinput.value;
      const password = passwordinput.value;
      let formValidationStatus = 0;
      if (email.trim() != "" && validateEmail(email)) {
        formValidationStatus++;
      }
      if (password.trim() != "" && validatePassword(password)) {
        formValidationStatus++;
      }

      if (formValidationStatus == 2) {
        const user = userList.find((item) => item.email === email);

        if (user) {
          if (user.password === password) {
            localStorage.setItem("cartData", JSON.stringify(user.cart));
            localStorage.setItem("currentUser", JSON.stringify(user.uid));
            window.location.replace("/");
          } else {
            incorrectError.innerText = "Email/Password is incorrect";
          }
        } else {
          emailjs
            .send("service_m51wl4j", "cotnact_form", {
              email: email,
              subject: "Your Otp for Flippy Ecommerce Website",
              message: `Hi your Otp is ${otp}`,
            })
            .then(
              (response) => {
                const dt = new Date();
                localStorage.setItem(
                  "tempUser",
                  JSON.stringify({
                    uid: dt.getTime().toString(),
                    email: email,
                    password: password,
                    timestamp: dt.toDateString(),
                    cart: [],
                  })
                );

                localStorage.setItem("otp", otp);
                window.location = "/pages/verifyOtp/";
              },
              (error) => {}
            );
        }
      }
      //
    });

  passwordinput.addEventListener("input", passwordInputCriteria);
  passwordinput.addEventListener(
    "focusout",
    () => (passwordError.style.display = "none")
  );
}
