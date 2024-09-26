document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
  
    if (loginLink) {
      loginLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "login.html";
      });
    }
  
    if (signupLink) {
      signupLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "signup.html";
      });
    }
  });