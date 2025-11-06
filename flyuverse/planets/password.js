const correctUsername = "admin"; // change this to whatever you want
const correctPassword = "iluvflyuuters"; // change this to whatever you want

    function checkCredentials() {
      const usernameInput = document.getElementById("usernameInput").value;
      const passwordInput = document.getElementById("passwordInput").value;
      if(usernameInput === correctUsername && passwordInput == correctPassword) {
        window.location.href = "secure404.html";
      } else {
        alert("Access denied.");
      }
    }