/**
 * Récupération de tous les travaux depuis l'API
 * @return {Promise}
 */
export async function getDataGallery() {
  const r = await fetch("http://localhost:5678/api/works");
  if (!r.ok) {
    throw new Error(`Erreur HTTP ! Statut : ${r.status}`);
  }
  return r.json();
}

/**
 * Récupération des catégories
 * @returns {Promise}
 */
export async function getDataCategories() {
  const r = await fetch("http://localhost:5678/api/categories");
  if (!r.ok) {
    throw new Error(`Erreur HTTP ! Statut : ${r.status}`);
  }
  return r.json();
}
