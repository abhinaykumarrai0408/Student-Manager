/** @format */

let students = JSON.parse(localStorage.getItem("students")) || [];
let editingIndex = null;

const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const countDisplay = document.getElementById("count");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !mobile || !address) return;

  const student = { name, mobile, address };

  if (editingIndex !== null) {
    // PUT (Update)
    students[editingIndex] = student;
    editingIndex = null;
    form.querySelector("button").innerText = "Add";
  } else {
    // POST (Create)
    students.push(student);
  }

  form.reset();
  saveAndRender();
});

function renderStudents() {
  list.innerHTML = "";
  students.forEach((student, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${student.name}</strong> | ${student.mobile} | ${student.address}
      <button onclick="editStudent(${index})">Edit</button>
      <button onclick="deleteStudent(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("mobile").value = student.mobile;
  document.getElementById("address").value = student.address;
  editingIndex = index;
  form.querySelector("button").innerText = "Update";
}

function deleteStudent(index) {
  // DELETE
  students.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  // Simulating GET & POST/PUT/DELETE
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  countDisplay.innerText = `All Students: ${students.length}`;
}

window.onload = () => {
  renderStudents();
  countDisplay.innerText = `All Students: ${students.length}`;
};
