/**
 * Récupération de tous les travaux depuis l'API
 * @return {Promise}
 */
export async function getData() {
  const r = await fetch("http://localhost:5678/api/works");
  if (!r.ok) {
    throw new Error(`Erreur HTTP ! Statut : ${r.status}`);
  }
  return r.json();
}
