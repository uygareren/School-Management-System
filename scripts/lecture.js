 // Fetch data when the page loads
 fetch("../data/lecture.json")
 .then(response => response.json())
 .then(data => {
   // Store data in local storage
   localStorage.setItem("lectures", JSON.stringify(data));

   // Populate the table with existing data
   const tbody = document.querySelector("tbody");
   data.forEach(lecture => {
     const row = createTableRow(lecture);
     tbody.appendChild(row);
   });

 })
 .catch(error => console.error("Hata:", error));

const saveButton = document.querySelector(".lecture_save_btn");

saveButton.addEventListener("click", () => {
 const lectureNameInput = document.querySelector("#lecture_name");
 const skalaInput = document.querySelector("#skala");

 // Get the existing lectures from localStorage or initialize an empty array
 const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];

 // Create a new lecture object

 if(skalaInput.value <=0 || skalaInput.value >=10){
     
   alert("NOT SKALASI 0'DAN KÜÇÜK VEYA 10'DAN BÜYÜK OLAMAZ!")
   return 0;

 }

 const newLecture = {
     id: generateUniqueId(),
     lecture_name: lectureNameInput.value,
     scale: skalaInput.value,
   };
 

 // Add the new lecture to the existing array
 existingLectures.push(newLecture);

 // Update the lectures in localStorage
 localStorage.setItem("lectures", JSON.stringify(existingLectures));

 console.log("existinhLectuers:", existingLectures)

 // Clear the table body
 const tbody = document.querySelector("tbody");
 tbody.innerHTML = '';

 // Append the updated lectures to the table
 existingLectures.forEach(lecture => {
   const row = createTableRow(lecture);
   tbody.appendChild(row);
 });

});


function createTableRow(lecture) {
 const row = document.createElement("tr");

 const idCell = document.createElement("td");
 idCell.textContent = lecture.id;
 row.appendChild(idCell);

 const nameCell = document.createElement("td");
 nameCell.textContent = lecture.lecture_name;
 row.appendChild(nameCell);

 const gradesCell = document.createElement("td");
 gradesCell.textContent = lecture.scale;
 gradesCell.style.textAlign = "center";
 row.appendChild(gradesCell);

 const updateCell = document.createElement("td");
 const updateButton = document.createElement("button");
 updateButton.textContent = "Güncelle";
 updateButton.style.paddingBlock = "10px";
 updateButton.style.paddingInline = "8px";
 updateButton.style.backgroundColor = "green";
 updateButton.style.border = "0px";
 updateButton.style.borderRadius = "10px";
 updateButton.style.color = "white";
 updateButton.style.cursor = "pointer"
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
 deleteButton.style.cursor = "pointer"
 deleteButton.dataset.lectureId = lecture.id;
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
 deleteCell.appendChild(deleteButton);
 row.appendChild(deleteCell);

 const pointCell = document.createElement("td");
 const pointButton = document.createElement("button");
 pointButton.style.paddingInline = "15px";
 pointButton.style.paddingBlock = "10px";
 pointButton.style.backgroundColor = "blue";
 pointButton.style.border = "0px";
 pointButton.style.borderRadius = "10px";
 pointButton.style.color = "white";
 pointButton.style.cursor = "pointer";
 pointButton.textContent = "Puanlara Git";
 pointButton.dataset.lectureId = lecture.id;
 pointButton.addEventListener("click", () => {
   const lectureId = pointButton.dataset.lectureId;
   window.location.href = `grades_by_lecture.html?lectureId=${lectureId}`;
 });
 pointCell.appendChild(pointButton);
 row.appendChild(pointCell);

 return row;
}


// Function to generate a unique ID
function generateUniqueId() {
 const existingLectures = JSON.parse(localStorage.getItem("lectures")) || [];
 return existingLectures.length + 1;
}