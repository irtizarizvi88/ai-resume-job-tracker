  const API_BASE = "http://127.0.0.1:5000/api/profile";

 function openModal(title, content) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalBody").innerHTML = content;
  document.getElementById("editModal").classList.add("active");
}

function closeModal() {
  document.getElementById("editModal").classList.remove("active");
}


function editPersonalInfo() {
  openModal("Edit Personal Information", `
    <label>Full Name</label>
    <input type="text" id="fullName" value="John Michael Doe">

    <label>Email</label>
    <input type="email" id="email" value="john.doe@email.com">

    <label>Phone</label>
    <input type="text" id="phone" value="+1 (555) 123-4567">

    <label>Date of Birth</label>
    <input type="text" id="dob" value="January 15, 1995">

    <label>Address</label>
    <input type="text" id="address" value="123 Main Street, San Francisco, CA 94102">

    <label>LinkedIn</label>
    <input type="text" id="linkedin" value="https://linkedin.com/in/johndoe">
  `);
}

 
function editAbout() {
  const currentAbout = document.getElementById("aboutText").innerText;

  openModal("Edit About Me", `
    <label>About Me</label>
    <textarea id="aboutInput" rows="6">${currentAbout}</textarea>
  `);
}

 
function editSkills() {
  openModal("Edit Skills", `
    <label>Add New Skill</label>
    <input type="text" id="newSkill" placeholder="Enter skill">
    <button onclick="addSkillFromModal()" class="save-btn" style="margin-top:10px">Add Skill</button>
  `);
}

function addSkillFromModal() {
  const skill = document.getElementById("newSkill").value.trim();
  if (!skill) return;

  const container = document.querySelector(".skill-tags");
  container.innerHTML += `<span class="skill-tag">${skill} <i class="fas fa-times" onclick="removeSkill(this)"></i></span>`;
}

function removeSkill(el) {
  el.parentElement.remove();
}

  
function addExperience() {
  openModal("Add Work Experience", `
    <label>Job Title</label>
    <input type="text" id="expTitle" placeholder="e.g. Senior Software Engineer">

    <label>Company</label>
    <input type="text" id="expCompany" placeholder="e.g. Google">

    <label>Duration</label>
    <input type="text" id="expDuration" placeholder="e.g. 2019 - Present">

    <button onclick="saveExperience()" class="save-btn">Add Experience</button>
  `);
}

function saveExperience() {
  const title = document.getElementById("expTitle").value.trim();
  const company = document.getElementById("expCompany").value.trim();
  const duration = document.getElementById("expDuration").value.trim();

  if (!title || !company || !duration) return;

  const list = document.getElementById("experienceList");
  list.innerHTML += `
    <li>
      <span>${title} – ${company}</span>
      <small>${duration}</small>
    </li>
  `;

  closeModal();
}
 
function addEducation() {
  openModal("Add Education", `
    <label>Degree</label>
    <input type="text" id="eduDegree" placeholder="e.g. Bachelor in Computer Science">

    <label>Institution</label>
    <input type="text" id="eduInstitute" placeholder="e.g. Stanford University">

    <label>Year</label>
    <input type="text" id="eduYear" placeholder="e.g. 2018">

    <button onclick="saveEducation()" class="save-btn">Add Education</button>
  `);
}

function saveEducation() {
  const degree = document.getElementById("eduDegree").value.trim();
  const inst = document.getElementById("eduInstitute").value.trim();
  const year = document.getElementById("eduYear").value.trim();

  if (!degree || !inst || !year) return;

  const list = document.getElementById("educationList");
  list.innerHTML += `
    <li>
      <span>${degree} – ${inst}</span>
      <small>${year}</small>
    </li>
  `;

  closeModal();
}

 
function addCertification() {
  openModal("Add Certification", `
    <label>Certification Name</label>
    <input type="text" id="certName" placeholder="e.g. AWS Solutions Architect">

    <label>Issuer</label>
    <input type="text" id="certIssuer" placeholder="e.g. Amazon Web Services">

    <label>Year</label>
    <input type="text" id="certYear" placeholder="e.g. 2024">

    <button onclick="saveCertification()" class="save-btn">Add Certification</button>
  `);
}

function saveCertification() {
  const name = document.getElementById("certName").value.trim();
  const issuer = document.getElementById("certIssuer").value.trim();
  const year = document.getElementById("certYear").value.trim();

  if (!name || !issuer || !year) return;

  const list = document.getElementById("certificationList");
  list.innerHTML += `
    <li>
      <span>${name} – ${issuer}</span>
      <small>${year}</small>
    </li>
  `;

  closeModal();
}
 
function addLanguage() {
  openModal("Add Language", `
    <label>Language</label>
    <input type="text" id="langName" placeholder="e.g. English">

    <label>Fluency</label>
    <input type="text" id="langFluency" placeholder="e.g. Expert / Intermediate / Basic">

    <button onclick="saveLanguage()" class="save-btn">Add Language</button>
  `);
}

function saveLanguage() {
  const name = document.getElementById("langName").value.trim();
  const fluency = document.getElementById("langFluency").value.trim();

  if (!name || !fluency) return;

  const list = document.getElementById("languageList");
  list.innerHTML += `
    <li>
      <span>${name}</span>
      <small>${fluency}</small>
    </li>
  `;

  closeModal();
}

  
async function saveModalData() {
  const title = document.getElementById("modalTitle").innerText;
  let data;
  let section;

  switch (title) {
    case "Edit Personal Information":
      section = "personal-info";
      data = gatherPersonalInfo();
      break;
    case "Edit About Me":
      section = "about";
      data = { about: document.getElementById("aboutInput").value };
      break;
    case "Add Work Experience":
      section = "experience";
      data = gatherExperience();
      break;
    case "Add Education":
      section = "education";
      data = gatherEducation();
      break;
    case "Add Certification":
      section = "certifications";
      data = gatherCertification();
      break;
    default:
      alert("Unknown modal section!");
      return;
  }

  const res = await saveToBackend(section, data);  
  if (res) closeModal();
}


async function saveToBackend(section, data) {
  try {
    const res = await fetch(`${API_BASE}/${section}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await res.json();
    console.log("Backend Updated:", responseData);
    alert("Saved successfully!");
  } catch (err) {
    console.error("Save Error:", err);
    alert("Backend save failed. Check console.");
  }
}


function gatherPersonalInfo() {
  return {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    linkedin: document.getElementById("linkedin").value
  };
}

function gatherExperience() {
  return {
    title: document.getElementById("expTitle").value,
    company: document.getElementById("expCompany").value,
    duration: document.getElementById("expDuration").value
  };
}

function gatherEducation() {
  return {
    degree: document.getElementById("eduDegree").value,
    institution: document.getElementById("eduInstitute").value,
    year: document.getElementById("eduYear").value
  };
}

function gatherCertification() {
  return {
    name: document.getElementById("certName").value,
    issuer: document.getElementById("certIssuer").value,
    year: document.getElementById("certYear").value
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const userSpan = document.querySelector(".user-name");
  const roleSpan = document.querySelector(".user-role");
  const userAvatar = document.getElementById("profileAvatar");  

  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    userSpan.textContent = userData.name;
    roleSpan.textContent = userData.role || "Standard User";

    if (userAvatar) {
      const encodedName = encodeURIComponent(userData.name);
      userAvatar.src = `https://ui-avatars.com/api/?name=${encodedName}&background=7f265b&color=fff&size=150`;
    }
  } else {
    userSpan.textContent = "Guest";
    roleSpan.textContent = "Visitor";
    if (userAvatar) {
      userAvatar.src = "https://ui-avatars.com/api/?name=Guest&background=7f265b&color=fff&size=150";
    }
  }
});
