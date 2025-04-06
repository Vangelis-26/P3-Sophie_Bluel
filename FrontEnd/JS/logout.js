// Gestion du lien Login/Logout

document.addEventListener("DOMContentLoaded", () => {
  const loginLogoutLink = document.getElementById("loginLogoutLink");
  const token = sessionStorage.getItem("token");
  if (token) {
    // Utilisateur connecté
    loginLogoutLink.textContent = "logout";
    loginLogoutLink.href = "#";
    loginLogoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("token");
      window.location.reload(); // Recharge la page
    });
  } else {
    // Utilisateur déconnecté
    loginLogoutLink.textContent = "login";
    loginLogoutLink.href = "login.html";
  }
});
