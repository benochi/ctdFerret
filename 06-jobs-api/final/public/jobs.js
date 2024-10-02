import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let jobsDiv = null;
let jobsTable = null;
let jobsTableHeader = null;

export const handleJobs = () => {
  jobsDiv = document.getElementById("jobs");
  const logoff = document.getElementById("logoff");
  const addJob = document.getElementById("add-job");
  jobsTable = document.getElementById("jobs-table");
  jobsTableHeader = document.getElementById("jobs-table-header");

  // Event listener for handling clicks (add job, log off, etc.)
  jobsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addJob) {
        showAddEdit(null);  // Show the Add/Edit job form
      } else if (e.target === logoff) {
        setToken(null);  // Clear the token and log off the user
        showLoginRegister();  // Redirect to login/register page
      }
    }
  });
};

export const showJobs = async () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  if (!token) {
    console.error('No token found, redirecting to login');
    showLoginRegister();  // Redirect to login if no token is found
    return;
  }

  enableInput(false);  // Disable input during the fetch
  try {
    const response = await fetch("/api/v1/jobs", {
      headers: {
        "Authorization": `Bearer ${token}`,  // Include the JWT token in the Authorization header
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();  // Parse the response
    if (response.ok) {
      populateJobsTable(data.jobs);  // Populate the jobs table if the response is OK
    } else {
      throw new Error(data.message || "Failed to fetch jobs");
    }
  } catch (error) {
    message.textContent = error.message;  // Display any error message
  }
  enableInput(true);  // Re-enable input after the fetch
  setDiv(jobsDiv);  // Show the jobs div
};

// Helper function to populate the jobs table
function populateJobsTable(jobs) {
  const rows = jobs.map(job => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${job.company}</td>
      <td>${job.position}</td>
      <td>${job.status}</td>
      <td><button class="editButton" data-id="${job._id}">Edit</button></td>
      <td><button class="deleteButton" data-id="${job._id}">Delete</button></td>
    `;
    row.querySelector(".editButton").addEventListener("click", () => {
      showAddEdit(job);  
    });

    return row;
  });
  
  jobsTable.innerHTML = "";  
  jobsTable.appendChild(jobsTableHeader);  
  rows.forEach(row => jobsTable.appendChild(row));  
}
