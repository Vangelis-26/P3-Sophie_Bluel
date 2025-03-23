/////////////////////////////////////////////////////////////////////
///                                                               ///
///                         Gallery                               ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

/**
 * @typedef {object} Category
 * @property {number} id - L'identifiant unique de la catégorie.
 * @property {string} name - Le nom de la catégorie.
 */

/**
 * @typedef {object} Project
 * @property {number} id - L'identifiant unique du projet.
 * @property {string} title - Le titre du projet.
 * @property {number} categoryId - L'identifiant de la catégorie à laquelle le projet appartient.
 * @property {number} userId - L'identifiant de l'utilisateur qui a ajouté le projet.
 * @property {Category} category - L'objet catégorie associé au projet.
 * @property {string} imageUrl - L'URL de l'image du projet.
 */

/**
 * Crée et ajoute les éléments HTML de la galerie à partir des données de projets fournies.
 * @param {Project[]} data - Le tableau d'objets Projets à afficher dans la galerie.
 */
const gallery = document.querySelector(".gallery");

export function buildGallery(data) {
  // Itère sur chaque élément du tableau de données
  for (const item of data) {
    // Crée les éléments HTML pour chaque projet
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // Configure les attributs et le contenu des éléments
    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.title);
    figcaption.textContent = item.title;

    // Ajoute les éléments à la galerie
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  }
}

/////////////////////////////////////////////////////////////////////
///                                                               ///
///                         Filtres                               ///
///                                                               ///
/////////////////////////////////////////////////////////////////////

/**
 * @typedef {object} Category
 * @property {number} id - L'identifiant unique de la catégorie.
 * @property {string} name - Le nom de la catégorie.
 */

const filters = document.querySelector(".categories");

/**
 * Crée et ajoute les boutons de filtres à partir des données de catégories fournies.
 * @param {Category[]} data - Le tableau d'objets Category à utiliser pour créer les filtres.
 */
export function buildCategories(data) {
  // Crée le bouton "Tout" et l'ajoute
  const btnAll = document.createElement("button");
  btnAll.textContent = "Tout";
  btnAll.id = "0";
  filters.appendChild(btnAll);

  // Itère sur chaque catégorie pour créer un bouton de filtre
  for (const item of data) {
    const button = document.createElement("button");

    button.textContent = item.name;
    button.id = item.id;

    filters.appendChild(button);
  }
}

/**
 * Ajoute un écouteur d'événements pour filtrer et afficher les projets en fonction du bouton cliqué.
 * @param {Project[]} data - Le tableau d'objets Project à filtrer.
 */
export function categoriesFilters(data) {
  // Ajoute un écouteur d'événements pour gérer les clics sur les boutons de filtres
  filters.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (!btnId) {
      return;
    }

    // Filtre les éléments en fonction de l'ID du bouton cliqué
    const filteredElements =
      btnId === "0"
        ? data // Si "Tout" est cliqué, affiche toutes les données
        : data.filter((item) => item.categoryId.toString() === btnId); // Sinon, filtre par categoryId

    // Vide la galerie et affiche les éléments filtrés
    gallery.innerHTML = "";
    buildGallery(filteredElements);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return;
  }

  // Masquer les filtres
  document.querySelector(".categories").style.display = "none";

  // Afficher le mode édition en haut
  const topMenuHtml = `<div id="topMenu"><a href="#modal1" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a></div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", topMenuHtml);

  // Afficher le bouton modifier
  const editBtnHtml = `<div><a href="#modal2" id="editBtn" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>modifier</a></div>`;
  document
    .querySelector("#portfolio h2")
    .insertAdjacentHTML("beforeend", editBtnHtml);
});
