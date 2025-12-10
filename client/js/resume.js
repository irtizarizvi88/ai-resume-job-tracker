// PDF.js worker setup
document.addEventListener("DOMContentLoaded", () => {
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5000/api/resume",
  headers: {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : "",
  },
});


const analyzeBtn = document.getElementById("analyzeBtn");
const resumeTextArea = document.getElementById("resumeText");
const aiResultDiv = document.getElementById("aiResult");
const loadingState = document.getElementById("loadingState");
const correctedTextOutput = document.getElementById("correctedTextOutput");
const scoreNumber = document.getElementById("scoreNumber");
const atsScore = document.getElementById("atsScore");
const strengthsList = document.getElementById("strengthsList");
const improvementsList = document.getElementById("improvementsList");

const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");
const fileNameSpan = document.getElementById("fileName");
const removeFileBtn = document.getElementById("removeFile");

const downloadBtn = document.getElementById("downloadBtn");


fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileInfo.style.display = "flex";
  fileNameSpan.innerText = file.name;

  if (file.type === "application/pdf") {
    console.log("File type:", file.type);
    const pdfData = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(pdfData).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      text += pageText + "\n\n";
    }

    resumeTextArea.value = text;
    document.getElementById("charCount").innerText = text.length;
  } else {
    alert("Only PDF files are supported for upload.");
  }
});

removeFileBtn.addEventListener("click", () => {
  fileInput.value = "";
  resumeTextArea.value = "";
  fileInfo.style.display = "none";
  document.getElementById("charCount").innerText = 0;
});

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab") + "-tab";
    document.getElementById(tabId).classList.add("active");
  });
});

let aiCorrectedData = {}; 


const renderResult = (result) => {

  aiCorrectedData = {
    name: result.aiResult.name || "N/A",
    email: result.aiResult.email || "N/A",
    phone: result.aiResult.phone || "N/A",
    experience: result.aiResult.experience || "N/A",
    education: result.aiResult.education || "N/A",
    skills: result.aiResult.skills || "N/A",
  };

  aiResultDiv.style.display = "block";
  scoreNumber.innerText = result.aiResult.score || 0;
  atsScore.innerText = result.aiResult.atsScore + "%";
  correctedTextOutput.innerText = result.aiResult.correctedText || "No corrected text returned.";

  document.getElementById("corrected-section").classList.add("active");

  improvementsList.innerHTML = "";

  result.aiResult.suggestions?.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "improvement-item";
    div.innerHTML = `<strong>${index + 1}.</strong> ${item}`;
    improvementsList.appendChild(div);
  });
};




downloadBtn.addEventListener("click", async () => {
  const templateName = document.getElementById("template").value + ".html";

const data = {
  name: aiCorrectedData.name?.trim() || "",
  email: aiCorrectedData.email?.trim() || "",
  phone: aiCorrectedData.phone?.trim() || "",
  experience: aiCorrectedData.experience?.trim() || aiCorrectedData.correctedText?.trim() || "",
  education: aiCorrectedData.education?.trim() || "",
  skills: aiCorrectedData.skills?.trim() || "",
};

console.log("PDF DATA:", data);


console.log("PDF DATA:", data);

console.log("PDF DATA:", data);


  try {
  const response = await api.post(
  "/download-pdf",
  { templateName, data },
  { responseType: "blob" }
);


    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("PDF download failed:", error);
  }
});


analyzeBtn.addEventListener("click", async () => {
    console.log("Analyze button clicked"); 

  const text = resumeTextArea.value.trim();

  if (!text) {
    alert("Please paste or upload your resume first!");
    return;
  }

  loadingState.style.display = "block";
  aiResultDiv.style.display = "none";

  try {
    const { data } = await api.post("/analyze", { resumeText: text });
    loadingState.style.display = "none";
    renderResult(data);
  } catch (err) {
    loadingState.style.display = "none";
    console.log(err);
    alert(err.response?.data?.message || "AI failed");
  }
});
});


document.addEventListener("DOMContentLoaded", () => {
  const userSpan = document.querySelector(".user-name");
  const roleSpan = document.querySelector(".user-role");
  const userAvatar = document.getElementById("userAvatar");

  const userData = JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "Visitor" };

  const names = userData.name.split(" ");
  const firstName = names[0];
  const lastName = names[1] || "";

  if (userSpan) userSpan.textContent = userData.name;
  if (roleSpan) roleSpan.textContent = userData.role;
  if (userAvatar) userAvatar.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=7f265b&color=fff`;
});

