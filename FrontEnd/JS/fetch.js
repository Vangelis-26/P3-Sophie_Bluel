/**
 * Récupération des données depuis l'API
 * @return {Promise}
 */
export async function fetchData(url) {
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`Erreur HTTP ! Statut : ${r.status}`);
  }
  return r.json();
}
