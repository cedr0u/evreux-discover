const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//systeme de creation de carte
app.get('/public/autres_cartes/index', (req, res) => {
  res.sendFile(path.join('public', 'autres_cartes', 'index.html'));
});

app.post('/public/autres_cartes/index', (req, res) => {
    const { nomCarte, description, coordonneesGeographiques, niveauZoom } = req.body;

    const dossierCarte = path.join('public', 'autres_cartes', nomCarte);

    if (!fs.existsSync(dossierCarte)) {
        fs.mkdirSync(dossierCarte);
    }

    const fichierModel = path.join('..', 'evreux-discover', 'public', 'autres_cartes', 'modeles', 'carte.html');
    const contenuModel = fs.readFileSync(fichierModel, 'utf8');

    const coordonneesGeographiquesArray = coordonneesGeographiques.split(',');

    const fichierCarte = path.join(dossierCarte, 'index.html');
    const contenuCarte = contenuModel
        .replace('{description}', description)
        .replace('{coordonnees-geographiques}', coordonneesGeographiquesArray.join(','))
        .replace('{niveau-zoom}', niveauZoom);

    fs.writeFileSync(fichierCarte, contenuCarte);

    res.send('Carte créée avec succès !');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});