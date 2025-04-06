/////////////////////////////////////////////////////////////////////
///                                                               ///
///                            Modal                              ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

import { buildGallery } from "./gallery.js";

// ----- Création de la Modal Principale ---- //
const modal = document.querySelector(".modal");

// Pages Modal
const modalEditGallery = document.getElementById("editGallery");
const modalAddWork = document.getElementById("addPicture");

// Boutons Modal
const modal2 = document.getElementById("addPhotos");
const modalBack = document.querySelector(".js-modal-back");
const jsModalClose = document.querySelectorAll(".js-modal-close");

// Empêche la propagation des événements de clic
const stopPropagation = (e) => e.stopPropagation();

// Ouverture Modal
const openModal = function (e) {
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modalEditGallery.style.display = "flex";
  modalAddWork.style.display = "none";
};

// Fermeture Modal
const closeModal = function (e) {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "inert");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  resetAddPictureModal();
};

// ----- Ecouteurs d'évènements ----- //

// Ouverture
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-modal").forEach((openButton) => {
    openButton.addEventListener("click", openModal);
  });
  // Fermeture
  jsModalClose.forEach((closeButton) => {
    closeButton.addEventListener("click", closeModal);
  });
  // Clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
      focusInModal(e);
    }
  });
});

// Empêche la propagation des événements de clic
modalEditGallery.addEventListener("click", stopPropagation);
modalAddWork.addEventListener("click", stopPropagation);

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                          API Work                             ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

// Création de la galerie d'images dans la modal
export function modalGallery(data) {
  const galleryContent = document.querySelector(".modalGalleryContent");
  const fragment = document.createDocumentFragment();

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
///                         Delete Work                           ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

// Gestion de la suppression de projet depuis la modal
export async function modalDeleteWork(trashId) {
  try {
    const works = Array.from(
      document.querySelectorAll(".modalGalleryContent figure")
    );
    const worksGallery = Array.from(
      document.querySelectorAll(".gallery figure")
    );

    const workGallery = worksGallery.find((w) => w.id === trashId.toString());
    const work = works.find((w) => w.id === trashId.toString());

    workGallery.remove();
    work.remove();
    const token = sessionStorage.getItem("token");
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

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                        Modal Switch                           ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

// Permet de switcher entre les deux modals (ajout de photo et galerie)
modalBack.addEventListener("click", modalSwitch);
modal2.addEventListener("click", modalSwitch);

function modalSwitch(e) {
  e.preventDefault();
  if (modalEditGallery.style.display !== "none") {
    modalEditGallery.style.display = "none";
    modalAddWork.style.display = "flex";
  } else {
    modalAddWork.style.display = "none";
    modalEditGallery.style.display = "flex";
  }
}

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                   Modal Add Work Categories                   ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

/// Récupération des catégories via l'API
export const selectCategory = function (data) {
  const select = document.getElementById("category");
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    // Crée les éléments HTML pour chaque projet
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;

    // Ajoute les éléments au fragment
    fragment.appendChild(option);
  });
  select.appendChild(fragment);
};

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                 Apercu de l'image du projet                   ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

const tailleMaxFichier = 4 * 1024 * 1024;
const typesImagesAcceptes = "image/png, image/jpeg";

function previewImage() {
  const fileInput = document.querySelector("#file");
  const fileSection = document.querySelector(".file-section");

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    if (!file) {
      return;
    }

    if (file.size > tailleMaxFichier) {
      alert("Le fichier est trop volumineux (4 Mo max).");
      resetAddPictureModal();
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");
      previewImage.src = e.target.result;
      fileSection.innerHTML = "";
      fileSection.appendChild(previewImage);
    };

    reader.readAsDataURL(file);
  });
}

// Réinitialiser le modal d'ajout de photo
function resetAddPictureModal() {
  const fileSection = document.querySelector(".file-section");
  const titleInput = document.getElementById("title");
  const categorySelect = document.getElementById("category");

  fileSection.innerHTML = `
    <div><i id="picture" class="fa-regular fa-image"></i></div>
    <label id="addfile" for="file">+ Ajouter photo</label>
    <input type="file" id="file" name="file" accept="${typesImagesAcceptes}" />
    <p class="picture-loaded">jpg, png : 4mo max</p>
  `;

  // Réinitialiser le formulaire
  titleInput.value = "";
  categorySelect.selectedIndex = 0;

  // Réappliquer l'écouteur d'événements pour l'aperçu de l'image
  previewImage();
}

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                  Envoi Du Projet via l'API                    ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

function sendWork() {
  const form = document.getElementById("picture-form");
  const titleInput = document.getElementById("title");
  const categorySelect = document.getElementById("category");
  const fileInput = document.getElementById("file");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!fileInput.files[0]) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    if (titleInput.value.trim() === "") {
      alert("Veuillez entrer un titre.");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du projet.");
      }

      alert("Projet ajouté avec succès!");

      const newWork = await response.json();
      buildGallery([newWork]);
      modalGallery([newWork]);

      // Réinitialiser le modal après l'envoi
      resetAddPictureModal();
      closeModal();
    } catch (error) {
      console.error(error.message);
    }
  });
}

// Initialisations
previewImage();
sendWork();
