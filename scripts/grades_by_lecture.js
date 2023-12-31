
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

        // Sayfa yüklendiğinde çalışacak olan kod
        document.addEventListener("DOMContentLoaded", function () {
            // lectureId parametresini al
            var lectureId = getParameterByName('lectureId');
            // console.log("lectureID", lectureId)

            fetch("../data/lecture.json")
                .then(res => res.json())
                .then(lectures => {
                    var lecture = lectures.filter((lecture) => lecture.id == lectureId);
                    var lecture_name = lecture[0].lecture_name;

                    document.querySelector(".lecture-name").textContent = lecture_name;

                    fetch("../data/grades.json")
                        .then(res => res.json())
                        .then(grades => {
                            var grades = grades.filter((grade) => grade.lecture_id == lectureId);
                            console.log("grades", grades);

                            var tbody = document.querySelector("#gradesTable tbody");
                            

                            grades.forEach(grade => {
                                fetch("../data/student.json")
                                    .then(res => res.json())
                                    .then(students => {
                                        var studentObj = students.filter((student) => student.id == grade.student_id)[0];
                                        console.log("studentObj:", studentObj)

                                        // Create a new row
                                        var row = tbody.insertRow();

                                        // Populate cells with data
                                        var cell1 = row.insertCell(0);
                                        cell1.textContent = studentObj.student_name;

                                        var cell2 = row.insertCell(1);
                                        cell2.textContent = studentObj.student_surname;

                                        var cell3 = row.insertCell(2);
                                        cell3.textContent = grade.grade;

                                        var cell4 = row.insertCell(3);
                                        console.log("sclae:",lecture[0].scale);
                                        console.log("grade:",grade.grade);
                                        cell4.textContent = gradeByPoint(lecture[0].scale,grade.grade);
                                        
                                        
                                        // Create Update button
                                        var updateCell = row.insertCell(4); // Corrected index
                                        var updateButton = document.createElement("button");
                                        updateButton.textContent = "Güncelle";
                                        updateButton.classList.add("update-button");
                                        updateButton.style.paddingBlock = "10px";
                                        updateButton.style.paddingInline = "8px";
                                        updateButton.style.backgroundColor = "green";
                                        updateButton.style.border = "0px";
                                        updateButton.style.borderRadius = "10px";
                                        updateButton.style.color = "white";
                                        updateButton.dataset.studentId = grade.student_id; // Use grade.student_id
                                        updateButton.addEventListener("click", function () {
                                            // Handle update button click
                                            console.log("Update button clicked for studentId:", grade.student_id);
                                        });
                                        updateCell.appendChild(updateButton);

                                        // Create Delete button
                                        var deleteCell = row.insertCell(5); // Corrected index
                                        var deleteButton = document.createElement("button");
                                        deleteButton.textContent = "Sil";
                                        deleteButton.classList.add("delete-button");
                                        deleteButton.style.paddingBlock = "10px";
                                        deleteButton.style.paddingInline = "15px";
                                        deleteButton.style.backgroundColor = "red";
                                        deleteButton.style.border = "0px";
                                        deleteButton.style.borderRadius = "10px";
                                        deleteButton.style.color = "white";
                                        deleteButton.dataset.studentId = grade.student_id; // Use grade.student_id
                                        deleteButton.addEventListener("click", function () {
                                            // Handle delete button click
                                            console.log("Delete button clicked for studentId:", grade.student_id);
                                        });
                                        deleteCell.appendChild(deleteButton);
                                    })
                            });

                        })

                    
                })

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


           
        });