import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingJob = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-job");
  company = document.getElementById("company");
  position = document.getElementById("position");
  status = document.getElementById("status");
  addingJob = document.getElementById("adding-job");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingJob) {
        const token = localStorage.getItem('token'); 
        if (!token) {
          console.error('No token found, redirecting to login');
          showLoginRegister(); 
          return;
        }

        const companyValue = company.value;
        const positionValue = position.value;
        const statusValue = status.value;

        const jobId = addEditDiv.dataset.jobId;  

        const method = jobId ? "PATCH" : "POST";
        const url = jobId ? `/api/v1/jobs/${jobId}` : "/api/v1/jobs";

        try {
          const response = await fetch("/api/v1/jobs", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              company: companyValue,
              position: positionValue,
              status: statusValue
            })
          });

          const data = await response.json();
          if (response.ok) {
            message.textContent = "Job added successfully!";
            showJobs();  
          } else {
            throw new Error(data.message || "Failed to add job");
          }
        } catch (error) {
          console.error("Error adding job:", error.message);
          message.textContent = error.message;
        }

      } else if (e.target === editCancel) {
        showJobs();  
      }
    }
  });
};

export const showAddEdit = (job = null) => {
  message.textContent = "";

  if (job) {
    company.value = job.company;
    position.value = job.position;
    status.value = job.status;
    addEditDiv.dataset.jobId = 1;  
    addingJob.textContent = "Update Job";
  } else {
    company.value = "";
    position.value = "";
    status.value = "pending";
    delete addEditDiv.dataset.jobId;  
    addingJob.textContent = "Add Job";
  }

  setDiv(addEditDiv);  
};
