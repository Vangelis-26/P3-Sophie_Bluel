// Récupération de tous les travaux via l'API
import { getData } from "./fetch.js";
import { buildGallery } from "./gallery.js";

async function main() {
  const data = await getData();
  buildGallery(data);
}

main();
