// Récupération de tous les travaux via l'API
import { getDataCategories, getDataGallery } from "./fetch.js";
import { buildCategories, buildGallery } from "./gallery.js";

async function main() {
  const gallery = await getDataGallery();
  buildGallery(gallery);
  console.log("gallery", gallery);

  const filters = await getDataCategories();
  buildCategories(filters);
  console.log("filters", filters);
}

main();
