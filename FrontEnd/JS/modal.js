/////////////////////////////////////////////////////////////////////
///                                                               ///
///                            Modal                              ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

let modal = document.querySelector(".modal");
const focusableSelector = "button, a, input, textarea";
let focusables = [];

// Ouverture Modal
const openModal = function (e) {
  e.preventDefault();
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// Fermeture Modal
const closeModal = function (e) {
  e.preventDefault();
  window.setTimeout(() => {
    modal.style.display = "none";
  }, 500);
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

const stopPropagation = function (e) {
  e.stopPropagation();
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
    trash.classList.add("fa-solid", "fa-trash-can");
    img.setAttribute("src", item.imageUrl);

    // Ajoute les éléments au fragment
    figure.appendChild(img);
    figure.appendChild(trash);
    fragment.appendChild(figure);
  });
  // Ajoute les éléments au DOM
  galleryContent.appendChild(fragment);
}
