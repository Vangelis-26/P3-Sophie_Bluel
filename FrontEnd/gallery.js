//////////////////
///  Gallery   ///
//////////////////

/**
 * @typedef {object} Category
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {object} Works
 * @property {number} id
 * @property {string} title
 * @property {number} categoryId
 * @property {number} userId
 * @property {Category} category
 */

/**
 * Création de la structure HTML de la Gallery
 * @param {Works[]} data
 */

const gallery = document.querySelector(".gallery");

export function buildGallery(data) {
  for (const item of data) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.title);
    figcaption.textContent = item.title;

    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  }
}

///////////////////
///   Filtres   ///
///////////////////

/**
 * @typedef {object} Category
 * @property {number} id
 * @property {string} name
 */

const filters = document.querySelector(".categories");

// Création des filtres
export function buildCategories(data) {
  const btnAll = document.createElement("button");
  btnAll.textContent = "Tout";
  btnAll.id = "0";
  filters.appendChild(btnAll);

  for (const item of data) {
    const button = document.createElement("button");

    button.textContent = item.name;
    button.id = item.id;

    filters.appendChild(button);
  }
}

// Ecoute et application des filtres

export function categoriesFilters(data) {
  filters.addEventListener("click", (e) => {
    const btnId = e.target.id;

    const filteredElements =
      btnId === "0"
        ? data
        : data.filter((item) => item.categoryId.toString() === btnId);

    gallery.innerHTML = "";
    buildGallery(filteredElements);
  });
}
