/////////////////////////////////////////////////////////////////////
///                                                               ///
///                         Connexion                             ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

//Gestion de la connexion de l'utilisateur
const login = document.getElementById("login-form");

login.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  try {
    const r = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

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

    passwordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector('input[type="submit"]').click();
      }
    });
  } catch (error) {
    console.error(error.message);
  }
});
