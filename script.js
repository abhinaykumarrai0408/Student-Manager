
const API_URL = "https://crudcrud.com/api/e0f97d3c1b324d04846c2f48c77a345e/students";
let students = [];
let editingId = null;

const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const countDisplay = document.getElementById("count");

// Load students from API
async function fetchStudents() {
  const res = await fetch(API_URL);
  const data = await res.json();
  students = data;
  renderStudents();
  countDisplay.innerText = `All Students: ${students.length}`;
}

// Render to UI
function renderStudents() {
  list.innerHTML = "";
  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${student.name}</strong> | ${student.mobile} | ${student.address}
      <button onclick="editStudent('${student._id}', ${index})">Edit</button>
      <button onclick="deleteStudent('${student._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Handle form submission
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  if (!name || !mobile || !address) return;

  const student = { name, mobile, address };

  if (editingId) {
    // PATCH (update)
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT", // crudcrud uses PUT for full update
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    editingId = null;
    form.querySelector("button").innerText = "Add";
  } else {
    // POST (create)
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
  }

  form.reset();
  fetchStudents(); // Refresh
});

// Edit student
function editStudent(id, index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("mobile").value = student.mobile;
  document.getElementById("address").value = student.address;
  editingId = id;
  form.querySelector("button").innerText = "Update";
}

// Delete student
async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  fetchStudents();
}

// On page load
window.onload = fetchStudents;
