const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});