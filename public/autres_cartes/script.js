import fs from "node:fs"

// Récupère les éléments du formulaire
const nomCarteInput = document.getElementById('nom-carte');
const descriptionTextarea = document.getElementById('description');
const coordonneesGeographiquesInput = document.getElementById('coordonees-geographiques');
const niveauZoomInput = document.getElementById('niveau-zoom');

// Écoute le soumission du formulaire
document.getElementById('carte-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Crée le dossier si il n'existe pas déjà
  const nomCarte = nomCarteInput.value;
  const dossier = `./cartes/${nomCarte}`;
  if (!fs.existsSync(dossier)) {
    fs.mkdirSync(dossier);
  }

  // Définit les variables accessibles depuis le dossier
  const descriptions = descriptionTextarea.value;
  const coordonneesGeographiques = coordonneesGeographiquesInput.value;
  const niveauZoom = niveauZoomInput.value;

  // Écrit les variables dans des fichiers du dossier
  fs.writeFileSync(`${dossier}/descriptions.txt`, descriptions);
  fs.writeFileSync(`${dossier}/coordonneesGeographiques.txt`, coordonneesGeographiques);
  fs.writeFileSync(`${dossier}/niveauZoom.txt`, niveauZoom);
});