// Récupération de tous les travaux via l'API
import { fetchData } from "./fetch.js";
import { buildCategories, buildGallery, categoriesFilters } from "./gallery.js";

async function main() {
  const workdata = await fetchData("http://localhost:5678/api/works");
  buildGallery(workdata);
  console.log("gallery", workdata);

  const filters = await fetchData("http://localhost:5678/api/categories");
  buildCategories(filters);
  console.log("filters", filters);

  categoriesFilters(workdata);
  console.log("categories", workdata);
}

main();
