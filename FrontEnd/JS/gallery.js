/////////////////////////////////////////////////////////////////////
///                                                               ///
///                         Gallery                               ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

// Crée et ajoute les éléments HTML de la galerie à partir des données de projets fournies.
const gallery = document.querySelector(".gallery");

export function buildGallery(data) {
  data.forEach((item) => {
    // Crée les éléments HTML pour chaque projet
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // Configure les attributs et le contenu des éléments
    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.title);
    figcaption.textContent = item.title;
    figure.id = item.id;

    // Ajoute les éléments à la galerie
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  });
}

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                         Filtres                               ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

const filters = document.querySelector(".categories");

//Crée et ajoute les boutons de filtres à partir des données de catégories fournies.
export function buildCategories(data) {
  // Crée le bouton "Tout" et l'ajoute
  const btnAll = document.createElement("button");
  btnAll.textContent = "Tout";
  btnAll.id = "0";
  filters.appendChild(btnAll);

  data.forEach((item) => {
    const button = document.createElement("button");

    button.textContent = item.name;
    button.id = item.id;

    filters.appendChild(button);
  });
}
// Gestion des filtres de catégories
export function categoriesFilters(data) {
  filters.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (!btnId) {
      return;
    }

    const filterButtons = filters.querySelectorAll("button");

    filterButtons.forEach((button) => {
      button.classList.remove("active");
    });

    e.target.classList.add("active");

    // Filtre les éléments en fonction de l'ID du bouton cliqué
    const filteredElements =
      btnId === "0"
        ? data
        : data.filter((item) => item.categoryId.toString() === btnId);

    // Vide la galerie et affiche les éléments filtrés
    gallery.innerHTML = "";
    buildGallery(filteredElements);
  });
}

// Ecouteur d'événements sur la présence du token dans le sessionStorage
document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return;
  }

  // Masquer les filtres
  document.querySelector(".categories").style.display = "none";

  // Afficher le mode édition en haut
  const topMenuHtml = `<div id="topMenu"><a href="#" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a></div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", topMenuHtml);

  // Afficher le bouton modifier
  const editBtnHtml = `<div><a href="#" id="editBtn" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>modifier</a></div>`;
  document
    .querySelector("#portfolio h2")
    .insertAdjacentHTML("beforeend", editBtnHtml);
});
