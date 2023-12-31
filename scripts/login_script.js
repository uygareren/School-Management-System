async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await (await fetch("../data/teacher.json")).json();

  // Dolaşma ve karşılaştırma
  for (const teacher of data) {
    if (teacher.email === email.trim() && teacher.password === password.trim()) {
      console.log("Giriş Başarılı!");

      // Redirect to homepage.html upon successful login
      window.location.href = "homepage.html";
        
      return; // Giriş başarılıysa döngüden çık
    }
  }

  // Eşleşme bulunmazsa
  console.log("Hata: Kullanıcı adı veya parola hatalı!");
}
