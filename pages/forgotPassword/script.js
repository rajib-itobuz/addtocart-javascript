const myForm = document.getElementById("myForm");
const passwordinput = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const upperCaseError = document.getElementById("uppercase-error");
const lowerCaseError = document.getElementById("lowercase-error");
const symbolError = document.getElementById("symbol-error");
const numberError = document.getElementById("number-error");
const inputForm = document.getElementById("myForm");
const errormsg = document.getElementById("incorrect-error");

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

const forgotPass = localStorage.getItem("forgotPass");
const forgotPassObj =
  forgotPass != "" && forgotPass != null ? JSON.parse(forgotPass) : undefined;

if (!forgotPassObj) {
  window.location.replace("/");
} else {
  const list = localStorage.getItem("userList");
  const userList = list != "" && list != null ? JSON.parse(list) : [];
  passwordinput.addEventListener("input", passwordInputCriteria);
  passwordinput.addEventListener(
    "focusout",
    () => (passwordError.style.display = "none")
  );

  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userIndex = userList.findIndex(
      (u) => u.email === forgotPassObj.email
    );
    console.log(userIndex);
    const currTime = new Date();
    if (userIndex < 0) {
      window.location.replace("/pages/loginPage");
    }
    if (currTime > forgotPassObj.validUpto) {
      errormsg.innerText = "Timed Out!! Try Again";
      setTimeout(() => window.location.replace("/pages/loginPage"), 800);
    } else {
      userList[userIndex].password = passwordinput.value;
      localStorage.removeItem("forgotPass");
      localStorage.setItem("userList", JSON.stringify(userList));
      setTimeout(() => window.location.replace("/pages/loginPage"), 800);
    }
  });
}
