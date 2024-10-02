import { showLogin, handleLogin } from "./login.js"; 
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { showJobs, handleJobs } from "./jobs.js";
import { showRegister, handleRegister } from "./register.js";
import { handleAddEdit } from "./addEdit.js";

let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

export { showLogin, showLoginRegister, showJobs, showRegister };

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  message = document.getElementById("message");
  handleLoginRegister();
  handleLogin();
  handleJobs();
  handleRegister();
  handleAddEdit();
  if (token) {
    showJobs();
  } else {
    showLoginRegister();
  }
});
