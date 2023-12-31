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

    fetch("../data/student.json")
      .then(res => res.json())
      .then(students => {
        var student = students.filter((student) => student.id == studentId);
        console.log("student:", student[0].student_name);

        var name = document.querySelector("#student_name");
        var surname = document.querySelector("#student_surname");
        var lectureDropdown = document.querySelector("#lecture_dropdown");
        var studentPoint = document.querySelector("#student_point");

        // Set the values from the student data
        name.value = student[0].student_name;
        surname.value = student[0].student_surname;

        // Fetch lecture.json
        fetch("../data/lecture.json")
          .then(response => response.json())
          .then(lectures => {
            // Populate the dropdown menu with lectures
            lectures.forEach(lecture => {
              var option = document.createElement("option");
              option.value = lecture.id;
              option.text = lecture.lecture_name;
              lectureDropdown.add(option);
            });
          })
          .catch(error => console.error('Error fetching lecture data:', error));
      })
      .catch(error => console.error('Error fetching student data:', error));

    // Add event listener to restrict input to the range [0, 100]
    studentPoint.addEventListener("input", function () {
      var value = parseInt(this.value, 10);
      if (isNaN(value) || value < 0) {
        this.value = 0;
      } else if (value > 100) {
        this.value = 100;
      }
    });
  });