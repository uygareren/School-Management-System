
        // Fonksiyon, URL'den belirli bir parametreyi alır
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var studentId;

        // Sayfa yüklendiğinde çalışacak olan kod
        document.addEventListener("DOMContentLoaded", function () {
            // studentId parametresini al
            studentId = getParameterByName('studentId');

            // Eğer studentId varsa, öğrenci bilgilerini al
            if (studentId) {
                // JSON dosyasını oku
                fetch('../data/student.json')
                    .then(response => response.json())
                    .then(students => {
                        // student_id ile eşleşen öğrenciyi bul
                        var matchingStudent = students.find(student => student.id == studentId);

                        // Eğer eşleşen öğrenci varsa, bilgileri göster
                        if (matchingStudent) {
                            var tableBody = document.getElementById('studentTableBody');

                            // İkinci JSON dosyasını oku (grades.json)
                            fetch("../data/grades.json")
                                .then(response => response.json())
                                .then(grades => {
                                    // student_id ile eşleşen notları bul
                                    var matchingGrades = grades.filter(grade => grade.student_id == studentId);

                                    console.log("matchingrade:", matchingGrades)

                                    // Fetch lecture.json
                                    fetch("../data/lecture.json")
                                        .then(response => response.json())
                                        .then(lectures => {
                                            // Iterate through matchingGrades and get lecture names
                                            matchingGrades.forEach(grade => {
                                                var lectureId = grade.lecture_id;
                                                var matchingLecture = lectures.find(lecture => lecture.id == lectureId);

                                                if (matchingLecture) {
                                                    // Create a new table row for the student
                                                    var newRow = tableBody.insertRow();

                                                    // Create and populate cells for school_id, student_name, and student_surname
                                                    var cell1 = newRow.insertCell();
                                                    cell1.textContent = matchingStudent.school_id;

                                                    var cell2 = newRow.insertCell();
                                                    cell2.textContent = matchingStudent.student_name;

                                                    var cell3 = newRow.insertCell();
                                                    cell3.textContent = matchingStudent.student_surname;

                                                    // Create a cell for Ders
                                                    var cell4 = newRow.insertCell();
                                                    cell4.textContent = matchingLecture.lecture_name;

                                                    // Create a cell for the Grade
                                                    var cell5 = newRow.insertCell();
                                                    cell5.textContent = grade.grade;
                                                    
                                                    // Create a cell for the Grade
                                                    var cell6 = newRow.insertCell();
                                                    console.log("scale:", matchingLecture.scale);
                                                    console.log("point:",grade.grade );

                                                    cell6.textContent = gradeByPoint(matchingLecture.scale, grade.grade);


                                                    // Create Update button
                                                    var updateCell = newRow.insertCell();
                                                    var updateButton = document.createElement("button");
                                                    updateButton.textContent = "Güncelle";
                                                    updateButton.classList.add("update-button");
                                                    updateButton.style.paddingBlock="10px",
                                                    updateButton.style.paddingInline="8px",
                                                    updateButton.style.backgroundColor="green",
                                                    updateButton.style.border="0px",
                                                    updateButton.style.borderRadius="10px",
                                                    updateButton.style.color="white",
                                                    updateButton.style.cursor = "pointer";
                                                    updateButton.dataset.studentId = studentId; 
                                                    updateButton.addEventListener("click", function() {
                                                        // Handle update button click
                                                        console.log("Update button clicked for studentId:", studentId);
                                                    });
                                                    updateCell.appendChild(updateButton);

                                                    // Create Delete button
                                                    var deleteCell = newRow.insertCell();
                                                    var deleteButton = document.createElement("button");
                                                    deleteButton.textContent = "Sil";
                                                    deleteButton.classList.add("delete-button");
                                                    deleteButton.style.paddingBlock="10px",
                                                    deleteButton.style.paddingInline="15px",
                                                    deleteButton.style.backgroundColor="red",
                                                    deleteButton.style.border="0px",
                                                    deleteButton.style.borderRadius="10px",
                                                    deleteButton.style.color="white",
                                                    updateButton.style.cursor = "pointer",
                                                    deleteButton.dataset.studentId = studentId; 
                                                    deleteButton.addEventListener("click", function() {
                                                        // Handle delete button click
                                                        console.log("Delete button clicked for studentId:", studentId);
                                                    });
                                                    deleteCell.appendChild(deleteButton);
                                                }
                                            });
                                        })
                                        .catch(error => console.error('Error fetching lecture data:', error));
                                })
                                .catch(error => console.error('Error fetching grades data:', error));
                        } else {
                            console.log('Student not found');
                        }
                    })
                    .catch(error => console.error('Error fetching student data:', error));
            }
        });

        function gradeByPoint(scale, grade) {
                    if (scale === 10) {
                        if (grade >= 90 && grade <= 100) {
                        return "AA";
                        } else if (grade >= 85 && grade < 90) {
                        return "BA";
                        } else if (grade >= 80 && grade < 85) {
                        return "BB";
                        } else if (grade >= 75 && grade < 80) {
                        return "CB";
                        } else if (grade >= 70 && grade < 75) {
                        return "CC";
                        } else if (grade >= 64 && grade < 70) {
                        return "DC";
                        } else if (grade >= 60 && grade < 65) {
                        return "DD";
                        } else {
                        return "FF";
                        }
                    } else if (scale === 9) {
                        if (grade >= 95 && grade <= 100) {
                        return "A+";
                        } else if (grade >= 90 && grade < 95) {
                        return "A";
                        } else if (grade >= 85 && grade < 90) {
                        return "B+";
                        } else if (grade >= 80 && grade < 85) {
                        return "B";
                        } else if (grade >= 75 && grade < 80) {
                        return "C+";
                        } else if (grade >= 70 && grade < 75) {
                        return "C";
                        } else if (grade >= 65 && grade < 70) {
                        return "D+";
                        } else if (grade >= 60 && grade < 65) {
                        return "D";
                        } else {
                        return "F";
                        }
                    } else if (scale === 8) {
                        if (grade >= 93 && grade <= 100) {
                        return "A+";
                        } else if (grade >= 90 && grade < 93) {
                        return "A";
                        } else if (grade >= 87 && grade < 90) {
                        return "B+";
                        } else if (grade >= 83 && grade < 87) {
                        return "B";
                        } else if (grade >= 80 && grade < 83) {
                        return "C+";
                        } else if (grade >= 77 && grade < 80) {
                        return "C";
                        } else if (grade >= 73 && grade < 77) {
                        return "D+";
                        } else if (grade >= 70 && grade < 73) {
                        return "D";
                        } else {
                        return "F";
                        }
                    } else if (scale === 7) {
                        if (grade >= 90 && grade <= 100) {
                        return "A";
                        } else if (grade >= 85 && grade < 90) {
                        return "B+";
                        } else if (grade >= 80 && grade < 85) {
                        return "B";
                        } else if (grade >= 75 && grade < 80) {
                        return "C+";
                        } else if (grade >= 70 && grade < 75) {
                        return "C";
                        } else if (grade >= 65 && grade < 70) {
                        return "D+";
                        } else if (grade >= 60 && grade < 65) {
                        return "D";
                        } else {
                        return "F";
                        }
                    } else {
                        throw new Error("Geçersiz ölçek değeri");
                    }
                }


        
        function handleNavigation(){
            window.location.href = `add_point.html?studentId=${studentId}`;
      }