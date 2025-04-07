// Récupération de tous les travaux via l'API
import { buildCategories, buildGallery, categoriesFilters } from "./gallery.js";
import { modalGallery, selectCategory } from "./modal.js";

// Récupération des données depuis l'API
async function fetchData(url) {
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`Erreur HTTP ! Statut : ${r.status}`);
  }
  return r.json();
}

async function main() {
  const workdata = await fetchData("http://localhost:5678/api/works");
  buildGallery(workdata);
  modalGallery(workdata);

  const filters = await fetchData("http://localhost:5678/api/categories");
  buildCategories(filters);
  selectCategory(filters);

  categoriesFilters(workdata);
}

main();
