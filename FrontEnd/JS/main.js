// Récupération de tous les travaux via l'API
import { getDataCategories, getDataGallery } from "./fetch.js";
import { buildCategories, buildGallery, categoriesFilters } from "./gallery.js";

async function main() {
  const workdata = await getDataGallery();
  buildGallery(workdata);
  console.log("gallery", workdata);

  const filters = await getDataCategories();
  buildCategories(filters);
  console.log("filters", filters);

  categoriesFilters(workdata);
  console.log("categories", workdata);
}

main();
