  // Fetch data when the page loads
  fetch("../data/student.json")
  .then(response => response.json())
  .then(data => {
    // Store data in local storage
    localStorage.setItem("students", JSON.stringify(data));

    // Populate the table with existing data
    const tbody = document.querySelector("tbody");
    data.forEach(student => {
      const row = createTableRow(student);
      tbody.appendChild(row);
    });

    console.log("Initial data loaded:", data);
  })
  .catch(error => console.error("Error:", error));

const saveButton = document.querySelector(".lecture_save_btn");
let existingStudents = []; // Geniş kapsamda tanımlanan değişken

saveButton.addEventListener("click", () => {
  const studentNameInput = document.querySelector("#student_name");
  const studentSurnameInput = document.querySelector("#student_surname");
  const studentSchoolIdInput = document.querySelector("#student_school_id");

  // Check if the name or surname contains a number
  if (containsNumber(studentNameInput.value) || containsNumber(studentSurnameInput.value)) {
    alert("Öğrenci adı veya soyadı numara içeremez!");
    return;
  }

  // Get the existing students from localStorage or initialize an empty array
  existingStudents = JSON.parse(localStorage.getItem("students")) || [];

  // Create a new student object
  if(studentSchoolIdInput.value < 0){
    alert("School ID cannot be less than 0");
    return;
  }

  const newStudent = {
    id: generateUniqueId(),
    student_name: studentNameInput.value,
    student_surname: studentSurnameInput.value,
    school_id: studentSchoolIdInput.value,
  };

  // Add the new student to the existing array
  existingStudents.push(newStudent);

  // Update the students in localStorage
  localStorage.setItem("students", JSON.stringify(existingStudents));

  // Clear the table body
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = '';

  // Append the updated students to the table
  existingStudents.forEach(student => {
    const row = createTableRow(student);
    tbody.appendChild(row);
  });

  // Clear input values
  studentNameInput.value = '';
  studentSurnameInput.value = '';
  studentSchoolIdInput.value = '';

  console.log("After saving:", localStorage.getItem("students"));
});

// Helper function to check if a string contains a number
function containsNumber(inputString) {
  return /\d/.test(inputString);
}


function createTableRow(student) {
  const row = document.createElement("tr");

  const idCell = document.createElement("td");
  idCell.textContent = student.id;
  row.appendChild(idCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = student.student_name;
  row.appendChild(nameCell);

  const surnameCell = document.createElement("td");
  surnameCell.textContent = student.student_surname;
  row.appendChild(surnameCell);

  const schoolIdCell = document.createElement("td");
  schoolIdCell.textContent = student.school_id;
  row.appendChild(schoolIdCell);

  const updateCell = document.createElement("td");
  const updateButton = document.createElement("button");
  updateButton.textContent = "Güncelle";
  updateButton.style.paddingBlock = "10px";
  updateButton.style.paddingInline = "8px";
  updateButton.style.backgroundColor = "green";
  updateButton.style.border = "0px";
  updateButton.style.borderRadius = "10px";
  updateButton.style.color = "white";
  updateButton.style.cursor = "pointer";
  updateButton.addEventListener("click", () => {
    // Güncelleme işlemini burada gerçekleştir
  });
  updateCell.appendChild(updateButton);
  row.appendChild(updateCell);

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Sil";
  deleteButton.style.paddingBlock = "10px";
  deleteButton.style.paddingInline = "15px";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.border = "0px";
  deleteButton.style.borderRadius = "10px";
  deleteButton.style.color = "white";
  deleteButton.style.cursor = "pointer";
  deleteButton.dataset.studentId = student.id;
  deleteButton.addEventListener("click", () => {

    const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];
    const filteredLectures = existingLectures.filter(
      (lecture) => lecture.id !== deleteButton.dataset.lectureId
    );
    localStorage.setItem("lectures", JSON.stringify(filteredLectures));

    // Satırı tablodan kaldırın
    const row = deleteButton.closest("tr");
    row.remove();
  });
  deleteButton.dataset.studentId = student.id; // studentId bilgisini butona ekle
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  const gradesCell = document.createElement("td");
  const gradesButton = document.createElement("button");
  gradesButton.textContent = "Puanlara Git";
  gradesButton.style.paddingInline = "15px";
  gradesButton.style.paddingBlock = "10px";
  gradesButton.style.backgroundColor = "blue";
  gradesButton.style.border = "0px";
  gradesButton.style.borderRadius = "10px";
  gradesButton.style.color = "white";
  gradesButton.style.cursor = "pointer";
  gradesButton.addEventListener("click", () => {
    const studentId = gradesButton.dataset.studentId;
    window.location.href = `student_detail.html?studentId=${studentId}`;
  });
  gradesButton.dataset.studentId = student.id; // studentId bilgisini butona ekle
  gradesCell.appendChild(gradesButton);
  row.appendChild(gradesCell);

  return row;
}

const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", () => {
  const searchInput = document.querySelector(".search");
  const searchTerm = searchInput.value.toLowerCase();

  const tbody = document.querySelector("tbody");

  // Get all student data
  const students = JSON.parse(localStorage.getItem("students"));


  // Filter students by name
  const filteredStudents = students.filter(student => {
    return student.student_name.toLowerCase().includes(searchTerm);
  });

  // Clear the table body
  tbody.innerHTML = '';

  // Append the filtered students to the table
  filteredStudents.forEach(student => {
    const row = createTableRow(student);
    tbody.appendChild(row);
  });
});

function deleteStudent(studentId) {

  const newData = localStorage.getItem("students");
  console.log("existingStudents:", newData)
  console.log("studentId:", studentId)

  existingStudents = newData.filter((student) => student.id != studentId);

  console.log("after:", existingStudents);
  
}

// Function to generate a unique ID
function generateUniqueId() {
  const existingStudents = JSON.parse(localStorage.getItem("students")) || [];
  return existingStudents.length + 1;
}