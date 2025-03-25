/////////////////////////////////////////////////////////////////////
///                                                               ///
///                            Modal                              ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const jsModalClose = document.querySelector(".js-modal-close");
const jsModalStop = document.querySelector(".js-modal-stop");
const focusables = Array.from(
  modal.querySelectorAll("button, a, input, textarea")
);

const stopPropagation = function (e) {
  e.stopPropagation();
};

// Ouverture Modal
const openModal = function (e) {
  e.preventDefault();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  jsModalClose.addEventListener("click", closeModal);
  jsModalStop.addEventListener("click", stopPropagation);
};

// Fermeture Modal
const closeModal = function (e) {
  e.preventDefault();
  window.setTimeout(() => {
    modal.style.display = "none";
  }, 500);
  modal.setAttribute("aria-hidden", "inert");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  jsModalClose.removeEventListener("click", closeModal);
  jsModalStop.removeEventListener("click", stopPropagation);
};

// Focus dans la Modal
const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
  console.log(index);
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-modal").forEach((link) => {
    link.addEventListener("click", openModal);
  });
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                          Modal Work                           ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

export function modalGallery(data) {
  const galleryContent = document.querySelector(".modalGalleryContent");
  const fragment = document.createDocumentFragment();
  // Itère sur chaque élément du tableau de données
  data.forEach((item) => {
    // Crée les éléments HTML pour chaque projet
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const trash = document.createElement("button");

    // Configure les attributs et le contenu des éléments
    trash.id = item.id;
    figure.id = item.id;
    trash.classList.add("fa-solid", "fa-trash-can", "trash");
    img.setAttribute("src", item.imageUrl);
    trash.addEventListener("click", (e) => {
      modalDeleteWork(item.id);
    });

    // Ajoute les éléments au fragment
    figure.appendChild(img);
    figure.appendChild(trash);
    fragment.appendChild(figure);
  });
  // Ajoute les éléments au DOM
  galleryContent.appendChild(fragment);
}

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                      Modal Delete Work                        ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

export async function modalDeleteWork(trashId) {
  try {
    const works = Array.from(
      document.querySelectorAll(".modalGalleryContent figure")
    );
    const work = works.find((w) => w.id === trashId.toString());
    work.remove();
    const token = sessionStorage.getItem("token");
    // Envoi de la requête DELETE à l'API pour la connexion
    const r = await fetch(`http://localhost:5678/api/works/${trashId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
