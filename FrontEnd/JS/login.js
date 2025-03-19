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
        Accept: "application/json", // Indique que le client accepte une réponse JSON
        "Content-Type": "application/json", // Indique que le corps de la requête est au format JSON
      },
      body: JSON.stringify({
        // Conversion des données en JSON pour l'envoi
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    if (!r.ok) {
      throw new Error("Email ou mot de passe incorrects");
    }

    const data = await r.json();

    // Stockage du token d'authentification dans sessionStorage
    sessionStorage.setItem("token", data.token);

    // Redirection vers la page index.html après une connexion réussie
    window.location.replace("index.html");
  } catch (error) {
    alert(error.message);
  }
});
