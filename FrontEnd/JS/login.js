/////////////////////////////////////////////////////////////////////
///                                                               ///
///                         Connexion                             ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

/**
 * Gestion de la soumission du formulaire de connexion.
 * @param {Event} e - L'événement de soumission du formulaire.
 */

document.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupération des éléments d'entrée email et password
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  try {
    // Envoi de la requête POST à l'API pour la connexion
    const r = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indique que le corps de la requête est au format JSON
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });
    console.log();

    if (!r.ok) {
      const check = document.getElementById("errorlogin");
      if (!check) {
        // Message d'erreur en cas de login incorrect
        const errorlogin = document.getElementById("password");
        const p = document.createElement("p");
        p.id = "errorlogin";
        p.textContent = "Email ou mot de passe incorrects";
        errorlogin.insertAdjacentElement("afterend", p);
      }

      throw new Error("Email ou mot de passe incorrects");
    }

    const data = await r.json();

    sessionStorage.setItem("token", data.token);
    window.location.replace("index.html");
  } catch (error) {
    console.error(error.message);
  }
});

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    loginButton.click();
  }
});
