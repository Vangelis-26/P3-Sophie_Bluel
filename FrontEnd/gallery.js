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
export function buildGallery(data) {
  const gallery = document.querySelector(".gallery");

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
