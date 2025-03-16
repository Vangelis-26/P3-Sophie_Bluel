// Récupération de tous les travaux via l'API
import { getDataGallery } from "./fetch.js";
import { buildGallery } from "./gallery.js";

async function main() {
  const gallery = await getDataGallery();
  buildGallery(gallery);
}

main();
