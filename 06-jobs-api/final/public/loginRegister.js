import { setDiv, inputEnabled, showLogin, showRegister } from './index.js';

export const handleLoginRegister = () => {
  const loginRegisterDiv = document.getElementById("logon-register");
  const login = document.getElementById("logon");
  const register = document.getElementById("register");

  loginRegisterDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === login) {
        showLogin();
      } else if (e.target === register) {
        showRegister();
      }
    }
  });
};

export const showLoginRegister = () => {
  setDiv(loginRegisterDiv);
};
