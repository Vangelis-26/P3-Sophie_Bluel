/////////////////////////////////////////////////////////////////////
///                                                               ///
///                            Modal                              ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");

// Pages Modal
const modalEditGallery = document.getElementById("editGallery");
const modalAddWork = document.getElementById("addPicture");

// Boutons Modal
const modal2 = document.getElementById("addPhotos");
const modalBack = document.querySelector(".js-modal-back");
const jsModalClose = document.querySelectorAll(".js-modal-close");
const focusables = Array.from(
  modal.querySelectorAll("button, a, input, textarea")
);

// Empêche la propagation des événements de clic
const stopPropagation = (e) => e.stopPropagation();

// Ouverture Modal
const openModal = function (e) {
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
};

// Fermeture Modal
const closeModal = function (e) {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "inert");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
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

// Ecouteurs d'évènements

// Ouverture
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-modal").forEach((openButton) => {
    openButton.addEventListener("click", openModal);
  });
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

// Empêche la propagation des événements de clic
modalEditGallery.addEventListener("click", stopPropagation);
modalAddWork.addEventListener("click", stopPropagation);

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                          API Work                             ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                        Modal Switch                           ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

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

function previewImage() {
  const fileInput = document.querySelector(" #file");
  const fileSection = document.querySelector(".file-section");

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = function (e) {
      const previewImage = document.createElement("img");
      previewImage.src = e.target.result;
      previewImage.style.maxWidth = "100%";
      previewImage.style.maxHeight = "167px";
      previewImage.style.objectFit = "contain";
      fileSection.innerHTML = "";
      fileSection.appendChild(previewImage);
    };

    reader.readAsDataURL(file);
  });
}
previewImage();
