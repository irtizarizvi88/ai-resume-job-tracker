const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: "http://localhost:5000/api/dashboard",
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

const totalResumesElem = document.getElementById("totalResumes");
const jobsAppliedElem = document.getElementById("jobsApplied");
const interviewCallsElem = document.querySelector(".card-green .card-number");
const profileCompletenessElem = document.querySelector(".card-orange .card-number");
const analyticsChartEl = document.getElementById("analyticsChart");
let analyticsChart = null;

function destroyChart(chart) {
  if (chart) chart.destroy();
  return null;
}

async function fetchDashboardData() {
  try {
    const { data } = await api.get("/");

    if (totalResumesElem) totalResumesElem.innerText = data.totalResumes || 0;
    if (jobsAppliedElem) jobsAppliedElem.innerText = data.jobsApplied || 0;
    if (interviewCallsElem) interviewCallsElem.innerText = data.interviewCalls || 0;
    if (profileCompletenessElem) profileCompletenessElem.innerText = data.profileCompleteness || "0%";

    const labels = data.analytics?.labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const chartData = data.analytics?.applications || [0, 0, 0, 0, 0, 0, 0];

    analyticsChart = destroyChart(analyticsChart);

    if (analyticsChartEl) {
      analyticsChart = new Chart(analyticsChartEl, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Applications",
              data: chartData,
              borderColor: "#7f265b",
              backgroundColor: "rgba(127, 38, 91, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
            x: { grid: { display: false } },
          },
        },
      });
    }
  } catch (err) {
    console.error("Dashboard fetch error:", err);
  }
}

async function fetchDashboardStats() {
  try {
    const res = await api.get("/stats");
    const data = res.data;

    if (totalResumesElem) totalResumesElem.innerText = data.totalResumes;
    if (jobsAppliedElem) jobsAppliedElem.innerText = data.jobsApplied;
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDashboardData();
  fetchDashboardStats();
  setInterval(fetchDashboardStats, 30000);

  const userSpan = document.querySelector(".user-name");
  const roleSpan = document.querySelector(".user-role");
  const userAvatar = document.getElementById("userAvatar");

  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    userSpan.textContent = userData.name;
    roleSpan.textContent = userData.role || "Standard User";

     const [firstName, lastName] = userData.name.split(" ");
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=7f265b&color=fff`;
    if (userAvatar) userAvatar.src = avatarUrl;
  } else {
    userSpan.textContent = "Guest";
    roleSpan.textContent = "Visitor";
    if (userAvatar) userAvatar.src = "https://ui-avatars.com/api/?name=Guest&background=7f265b&color=fff";
  }
});

const fetchStats = async () => {
  const res = await fetch("http://localhost:3000/api/dashboard");
  const data = await res.json();

  document.getElementById("totalResumes").textContent = data.totalResumes;
  document.getElementById("resumeGrowth").textContent = `${data.resumeGrowth}% from last month`;
};
