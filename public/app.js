document.addEventListener("DOMContentLoaded", function () {
    //----------------Fonds de cartes------------------
    // Création de la carte
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'});

    var Satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'ArcGIS'});
    
    var otp = L.tileLayer("https://tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        maxNativeZoom: 17,
        attribution: 'Kartendaten: © OpenStreetMap-Mitwirkende, SRTM Kartendarstellung: © OpenTopoMap (CC-BY-SA)'});
    
    const map = L.map('map', {layers: [Satellite]}).setView([49.01977957460211,1.1655593991722224], 14);
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Carte de fond OpenStreetMap
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'ArcGIS'}).addTo(map);
       
    var baseMaps = {
        "Satellite": Satellite,
        "OpenStreetMap": osm,
        "OpenTopoMap": otp,
    };

    // Création de la couche de superposition
    var lines = new L.TileLayer("http://gps-{s}.tile.openstreetmap.org/lines/{z}/{x}/{y}.png");

    //----------------Markers/Points sur la carte et données d'informations------------------
    // Création d'un groupe de marqueurs
    const markers = L.layerGroup();

    // Création/initialisation des tableaux de marqueurs par catégorie
    var artPlace = [];
    var eauPlace = [];
    var historiquePlace = [];
    var infoPlace = [];
    var jardinPlace = [];
    var jumellesPlace = [];
    var mairiePlace = [];
    var maisonPlace = [];
    var sentierPlace = [];
    var sportPlace = [];
    var theatrePlace = [];
    var toilettesPlace = [];
    var markersPersonnels = [];
    var CheminsPersonnels = [];

    // Ajout de quelques marqueurs avec des popups et liens
    // -markers de Lieux d'art-
    // -markers de Points d'eau-
    // -markers de Lieux historique-
    // -markers de Lieux d'information-
    // -markers de Jardin-
    // -markers de Point de vue-
    // -markers de Mairie-
    mairiePlace.push(L.marker([49.02701441558723, 1.1514063806067707], {dataName: 'Mairie d\'Évreux'}).bindPopup('<a href="https://evreux.fr/">Mairie d\'Évreux</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    mairiePlace.push(L.marker([49.02663557689257, 1.1717314547964557], {dataName: 'Mairie annexe de Nétreville'}).bindPopup('<a href="https://evreux.fr/la-mairie/services/mairies-annexes/">Mairie annexe de Nétreville</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    mairiePlace.push(L.marker([49.01666545837922, 1.1236935064862954], {dataName: 'Mairie annexe de Navarre'}).bindPopup('<a href="https://evreux.fr/la-mairie/services/mairies-annexes/">Mairie annexe de Navarre</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    mairiePlace.push(L.marker([49.009319333109275, 1.1592238130113732], {dataName: 'Mairie annexe de La Madeleine'}).bindPopup('<a href="https://evreux.fr/la-mairie/services/mairies-annexes/">Mairie annexe de La Madeleine</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    mairiePlace.push(L.marker([49.03297000482163, 1.1361738688974927], {dataName: 'Mairie annexe de Saint-Michel'}).bindPopup('<a href="https://evreux.fr/la-mairie/services/mairies-annexes/">Mairie annexe de Saint-Michel</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    
    // -markers de Urbex/Désaffecté-
    maisonPlace.push(L.marker([49.02443370332018, 1.1659685167606004], {dataName: 'Usine Nétreville Philips'}).bindPopup('<a href="#">Urbex usine Nétreville</a>').setIcon(new L.Icon({iconUrl: 'icon/maison.png', iconSize: [64, 64]})));
    maisonPlace.push(L.marker([49.016118235216226, 1.1209848510133373], {dataName: 'Usine de Navarre'}).bindPopup('<a href="#">Usine de Navarre</a>').setIcon(new L.Icon({iconUrl: 'icon/maison.png', iconSize: [64, 64]})));
    maisonPlace.push(L.marker([49.015833797486955, 1.1308112571000448], {dataName: 'Les 3 immeubles abandonnées'}).bindPopup('<a href="#">Les 3 immeubles abandonnées</a>').setIcon(new L.Icon({iconUrl: 'icon/maison.png', iconSize: [64, 64]})));
    maisonPlace.push(L.marker([49.03955410474035, 1.1249129025005469], {dataName: 'Cité Lafayette (américaine)'}).bindPopup('<a href="https://fr.wikipedia.org/wiki/Cit%C3%A9_Lafayette_(%C3%89vreux)">Cité Lafayette (américaine)</a>').setIcon(new L.Icon({iconUrl: 'icon/maison.png', iconSize: [64, 64]})));
        //ancienne hopital d'evreux
        //ancienne hopital americain d'evreux

    // -markers de Chemins-
    sentierPlace.push(L.geoJSON.ajax("geojson/parcours-sportifs-saint-michel.geojson", {dataName: '[chemin] Parcour sportif st Michel'}));
    sentierPlace.push(L.marker([49.0358057661843, 1.126108168140265], {dataName: 'Début du Parcour sportif st Michel'}).bindPopup('<a href="#">Début du Parcour sportif st Michel</a>').setIcon(new L.Icon({iconUrl: 'icon/sentier.png', iconSize: [64, 64]})));

    // -markers de Sports/J.O 2024-
    sportPlace.push(L.marker([49.017185832405126, 1.126595959278061], {dataName: 'Mouv\'roc - sport plein air'}).bindPopup('<a href="#">Mouv\'roc - sport plein air</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.02709014691586, 1.1703939008949693], {dataName: 'Parc Street workout - musculation en extérieur'}).bindPopup('<a href="#">Parc Street workout - musculation en extérieur</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.03005944260493, 1.1803060224204367], {dataName: 'Terrain de football'}).bindPopup('<a href="#">Terrain de football</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.01683085610241, 1.1167821390512076], {dataName: 'Terrain de football des Marronniers'}).bindPopup('<a href="#">Terrain de football des Marronniers</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.021798825294404, 1.1282900390082073], {dataName: 'Stade Roger Rochard'}).bindPopup('<a href="#">Stade Roger Rochard</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.0050878386349, 1.161876408159791], {dataName: 'Stade Mathieu Bodmer'}).bindPopup('<a href="#">Stade Mathieu Bodmer</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.033551510613414, 1.1456511710273956], {dataName: 'Stade du Val Iton'}).bindPopup('<a href="#">Stade du Val Iton</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.01995959354048, 1.1696158792582054], {dataName: 'Stade de Nétreville'}).bindPopup('<a href="#">Stade de Nétreville</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.01683085610241, 1.1167821390512076], {dataName: 'Stades du Parc de Navarre'}).bindPopup('<a href="#">Stades du Parc de Navarre</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.02448123455674, 1.130482020784121], {dataName: 'Stade Alphonse Pierre'}).bindPopup('<a href="#">Stade Alphonse Pierre</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.00987459521572, 1.1134130805162772], {dataName: 'Hippodrome de Navarre'}).bindPopup('<a href="#">Hippodrome de Navarre</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.0345019031241, 1.118325944950614], {dataName: 'Golf Municipal d\'Evreux'}).bindPopup('<a href="#">Golf Municipal d\'Evreux</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.00718786598653, 1.1617759009180084], {dataName: 'Gymnase Pablo Néruda'}).bindPopup('<a href="#">Gymnase Pablo Néruda</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.02575322581877, 1.1591385980856772], {dataName: 'Gymnase Jean Jaurès'}).bindPopup('<a href="#">Gymnase Jean Jaurès</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.03363273578285, 1.1353547346134938], {dataName: 'Gymnase Artois'}).bindPopup('<a href="#">Gymnase Artois</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.00593753338902, 1.1558903698353686], {dataName: 'Gymnase Maxime Marchand'}).bindPopup('<a href="#">Gymnase Maxime Marchand</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.027676913252726, 1.171598262129472], {dataName: 'Gymnase Jean Bart'}).bindPopup('<a href="#">Gymnase Jean Bart</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.00697176820528, 1.1493826925783304], {dataName: 'Gymnase Georges Politzer'}).bindPopup('<a href="#">Gymnase Georges Politzer</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.01849254614756, 1.1220506674759905], {dataName: 'Gymnase de navarre'}).bindPopup('<a href="#">Gymnase de navarre</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.00823695687955, 1.1408488399889234], {dataName: 'Gymnase du Canada'}).bindPopup('<a href="#">Gymnase du Canada</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.010982146887514, 1.1630501462122775], {dataName: 'Gymnase Irène et Frédéric Joliot-Curie'}).bindPopup('<a href="#">Gymnase Irène et Frédéric Joliot-Curie</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.01415215155127, 1.1509221040772952], {dataName: 'Gymnase Jean Moulin'}).bindPopup('<a href="#">Gymnase Jean Moulin</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.02212833928095, 1.1391048163649613], {dataName: 'Salle Omnisports Jean Fourre'}).bindPopup('<a href="#">Salle Omnisports Jean Fourre</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.0234270714207, 1.1295726589679964], {dataName: 'Skatepark navarre'}).bindPopup('<a href="#">Skatepark navarre</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.00605377660724, 1.1595469170367798], {dataName: 'Bowl de la Madeleine'}).bindPopup('<a href="#">Bowl de la Madeleine</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.0064433331647, 1.1613364717821628], {dataName: 'Piscine Plein Soleil'}).bindPopup('<a href="#">Piscine Plein Soleil</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    sportPlace.push(L.marker([49.0221629331427, 1.1273308731985334], {dataName: 'Piscine Jean Bouin'}).bindPopup('<a href="#">Piscine Jean Bouin</a>').setIcon(new L.Icon({iconUrl: 'icon/sport.png', iconSize: [64, 64]})));
    
    // -markers de Lieux culturels-
    // -markers de Toilettes publiques-
    // -markers de Markers personnels-

    // Création des groupes de couches à partir des tableaux de marqueurs (ajouter ici si ajout de markers !)
    var artPlaceLayer = L.layerGroup(artPlace);
    var eauPlaceLayer = L.layerGroup(eauPlace);
    var historiquePlaceLayer = L.layerGroup(historiquePlace);
    var infoPlaceLayer = L.layerGroup(infoPlace);
    var jardinPlaceLayer = L.layerGroup(jardinPlace);
    var jumellesPlaceLayer = L.layerGroup(jumellesPlace);
    var mairiePlaceLayer = L.layerGroup(mairiePlace);
    var maisonPlaceLayer = L.layerGroup(maisonPlace);
    var sentierPlaceLayer = L.layerGroup(sentierPlace);
    var sportPlaceLayer = L.layerGroup(sportPlace);
    var theatrePlaceLayer = L.layerGroup(theatrePlace);
    var toilettesPlaceLayer = L.layerGroup(toilettesPlace);
    var markersPersonnelsLayer = L.layerGroup(markersPersonnels);
    var CheminsPersonnelsLayer = L.layerGroup(CheminsPersonnels);

    // Ajout des groupes de couches à l'objet overlayMaps
    var overlayMaps = {
        "<span style='color: blue'>Chemins</span>": lines,
        "Lieux d'art" : artPlaceLayer,
        "Points d'eau" : eauPlaceLayer,
        "Lieux historique" : historiquePlaceLayer,
        "Lieux d'information" : infoPlaceLayer,
        "Jardin" : jardinPlaceLayer,
        "Point de vue" : jumellesPlaceLayer,
        "Mairie" : mairiePlaceLayer,
        "Urbex/Désaffecté" : maisonPlaceLayer,
        "Chemins/Parcours sportifs" : sentierPlaceLayer,
        "Sports/J.O 2024" : sportPlaceLayer,
        "Lieux culturels" : theatrePlaceLayer,
        "Toilettes publiques" : toilettesPlaceLayer,
        "Markers personnels" : markersPersonnelsLayer,
        "Chemins personnels (geojson)" : CheminsPersonnelsLayer,
    };
    // Affichage de tout les markers de base
    map.addLayer(artPlaceLayer);
    map.addLayer(eauPlaceLayer);
    map.addLayer(historiquePlaceLayer);
    map.addLayer(infoPlaceLayer);
    map.addLayer(jardinPlaceLayer);
    map.addLayer(jumellesPlaceLayer);
    map.addLayer(mairiePlaceLayer);
    map.addLayer(maisonPlaceLayer);
    map.addLayer(sentierPlaceLayer);
    map.addLayer(sportPlaceLayer);
    map.addLayer(theatrePlaceLayer);
    map.addLayer(toilettesPlaceLayer);
    map.addLayer(markersPersonnelsLayer);
    map.addLayer(CheminsPersonnelsLayer);

    // Ajout du groupe de marqueurs à la carte
    map.addLayer(markers);

    // Ajout du contrôle des couches à la carte
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

    //----------------Plugin boxmessage------------------
    // After you've set up your map and layers, add the modal window by running:
    //var contents = [
        //"<h1>Bonjour et bienvenue !</h1>",
        //"<p></p>",
        //"<h2>Explorez la carte interactive</h2>",
        //"<h3>vous y trouverez:</h3>",
        //"<p>-les lieux incontournables d'Evreux</p>",
        //"<p>-des informations complémentaires et détaillées</p>",
        //"<p>-des recoins/endroit insoupçonné et unique</p>",
        //"<p>-surtout les toilettes et points d'eau gratuits</p>",
        //].join('');
    
    //var dialog = L.control.dialog({ size: [ 350, 350 ], minSize: [ 100, 100 ], maxSize: [ 500, 500 ], anchor: [ 250, 250 ], position: "topleft", initOpen: true }).setContent(contents).addTo(map);

    //----------------Plugin fullscreen------------------
    // or, add to an existing map:
    map.addControl(new L.Control.Fullscreen({
        title: {
            'false': 'Basculer en plein écran',
            'true': 'Quitter le plein écran'
        }
    }));

    //----------------Systeme de dessin sur la carte------------------
    // Création d'une couche de dessin
    var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);

    // Création d'un contrôle de dessin
    const drawControl = new L.Control.Draw({
        position: 'topright',
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

     // Ajout des formes dessinées à la couche de dessin
    map.on(L.Draw.Event.CREATED, function (e) {
        drawnItems.addLayer(e.layer);
    });

    // Création d'un contrôle de localisation
    L.control.locate({
        position: 'topleft',
        strings: {
            title: 'Localiser ma position'
        }
    }).addTo(map);

    //----------------Rayon génération pour le deplacement information------------------
    // Example function to style the isoline polygons when they are returned from the API call
    function styleIsolines(feature) {
        // NOTE: You can do some conditional styling by reading the properties of the feature parameter passed to the function
        return {
            color: '#0073d4',
            opacity: 0.5,
            fillOpacity: 0.2
        };
    }

    // Example function to style the isoline polygons when the user hovers over them
    function highlightIsolines(e) {
        // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
        var layer = e.target;

        layer.setStyle({
            fillColor: '#ffea00',
            dashArray: '1,13',
            weight: 4,
            fillOpacity: '0.5',
            opacity: '1'
        });
    }

    // Example function to reset the style of the isoline polygons when the user stops hovering over them
    function resetIsolines(e) {
        // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
        var layer = e.target;

        reachabilityControl.isolinesGroup.resetStyle(layer);
    }

    // Example function to display information about an isoline in a popup when the user clicks on it
    function clickIsolines(e) {
        // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
        var layer = e.target;
        var props = layer.feature.properties;
        var popupContent = 'Mode de déplacement: ' + props['Travel mode'] + '<br />Portée: 0 - ' + props['Range'] + ' ' + props['Range units'] + '<br />Zone: ' + props['Area'] + ' ' + props['Area units'] + '<br />Population: ' + props['Population'];
        if (props.hasOwnProperty('Reach factor')) popupContent += '<br />Facteur de portée: ' + props['Reach factor'];
        layer.bindPopup(popupContent).openPopup();
    }

    // Example function to create a custom marker at the origin of the isoline groups
    function isolinesOrigin(latLng, travelMode, rangeType) {
        return L.circleMarker(latLng, { radius: 4, weight: 2, color: '#0073d4', fillColor: '#fff', fillOpacity: 1 });
    }

    // Add the reachability plugin
    var reachabilityControl = L.control.reachability({
        // add settings here
        apiKey: '5b3ce3597851110001cf6248ef1e60cbe9394a469697004d368c1915', // PLEASE REGISTER WITH OPENROUTESERVICE FOR YOUR OWN KEY!
        styleFn: styleIsolines,
        mouseOverFn: highlightIsolines,
        mouseOutFn: resetIsolines,
        clickFn: clickIsolines,
        markerFn: isolinesOrigin,
        expandButtonContent: '',
        expandButtonStyleClass: 'reachability-control-expand-button fa fa-bullseye',
        collapseButtonContent: '',
        collapseButtonStyleClass: 'reachability-control-collapse-button fa fa-caret-up',
        drawButtonContent: '',
        drawButtonStyleClass: 'fa fa-pencil',
        deleteButtonContent: '',
        deleteButtonStyleClass: 'fa fa-trash',
        distanceButtonContent: '',
        distanceButtonStyleClass: 'fa fa-road',
        timeButtonContent: '',
        timeButtonStyleClass: 'fa fa-clock-o',
        travelModeButton1Content: '',
        travelModeButton1StyleClass: 'fa fa-car',
        travelModeButton2Content: '',
        travelModeButton2StyleClass: 'fa fa-bicycle',
        travelModeButton3Content: '',
        travelModeButton3StyleClass: 'fa fa-male',
        travelModeButton4Content: '',
        travelModeButton4StyleClass: 'fa fa-wheelchair-alt'
    }).addTo(map);

    // Setup error handlers in case there is a problem when calling the API
    map.on('reachability:error', function () {
        alert('Unfortunately there has been an error calling the API.\nMore details are available in the console.');
    });

    map.on('reachability:no_data', function () {
        alert('Unfortunately no data was received from the API.\n');
    });

    //----------------Plugin sidebar------------------
    var sidebar = L.control.sidebar('sidebar', {position: 'left'}).addTo(map);

    //~~~Menu listes markers~~~
    // Define the markers by category
    // Define the markers by category with icons
    const markersByCategory = {
        "Lieux d'art": { layer: artPlaceLayer, icon: 'icon/art.png' },
        "Points d'eau": { layer: eauPlaceLayer, icon: 'icon/eau.png' },
        "Lieux historique": { layer: historiquePlaceLayer, icon: 'icon/historique.png' },
        "Lieux d'information": { layer: infoPlaceLayer, icon: 'icon/info.png' },
        "Jardin": { layer: jardinPlaceLayer, icon: 'icon/jardin.png' },
        "Point de vue": { layer: jumellesPlaceLayer, icon: 'icon/jumelles.png' },
        "Mairie": { layer: mairiePlaceLayer, icon: 'icon/mairie.png' },
        "Urbex/Désaffecté": { layer: maisonPlaceLayer, icon: 'icon/maison.png' },
        "Chemins/Parcours sportifs": { layer: sentierPlaceLayer, icon: 'icon/sentier.png' },
        "Sports/J.O 2024": { layer: sportPlaceLayer, icon: 'icon/sport.png' },
        "Lieux culturels": { layer: theatrePlaceLayer, icon: 'icon/theatre.png' },
        "Toilettes publiques": { layer: toilettesPlaceLayer, icon: 'icon/toilettes.png' },
        "Markers personnels": { layer: markersPersonnelsLayer, icon: 'none' },
        "Chemins personnels (geojson)": { layer: CheminsPersonnelsLayer, icon: 'none' },
    };
  
    // Create the markers menu
    createMarkerMenu(markersByCategory);
    
    function createMarkerMenu(markersByCategory) {
        const markerMenu = document.getElementById('markers');
        markerMenu.innerHTML = '';
        for (const category in markersByCategory) {
        if (markersByCategory.hasOwnProperty(category)) {
            const categoryDiv = document.createElement('details');
            categoryDiv.innerHTML = `<summary><img src="${markersByCategory[category].icon}" width="16" height="16" style="vertical-align: middle;"> ${category}</summary>`;
            categoryDiv.classList.add('category');
            markerMenu.appendChild(categoryDiv);
    
            const categoryLink = categoryDiv.querySelector('summary');
            categoryLink.href = '#';
            categoryLink.addEventListener('click', function () {
            map.addLayer(markersByCategory[category].layer);
            });
    
            const nbMarkers = markersByCategory[category].layer.getLayers().length;
            categoryLink.dataset.nbMarkers = nbMarkers;
            const span = document.createElement('span');
            span.classList.add('category-count');
            span.textContent = ` (${nbMarkers})`;
            categoryLink.appendChild(span);
    
            // Add the list of markers
            const markersList = document.createElement('ul');
            markersList.classList.add('markers-list');
            for (const marker of markersByCategory[category].layer.getLayers()) {
            const listItem = document.createElement('li');
            listItem.classList.add('marker-item');
            listItem.textContent = marker.options.dataName;
            listItem.addEventListener('click', function () {
                map.setView(marker.getLatLng(), 15);
            });
            markersList.appendChild(listItem);
            }
            categoryDiv.appendChild(markersList);
        }
        }
    }

    //~~~Menu ajouts markers~~~
    function areFormFieldsFilled() {
        var iconSelect = document.getElementById('iconSelect');
        var coordinatesInput = document.getElementById('coordinates');
        var dataNameInput = document.getElementById('dataName');
      
        if (iconSelect.value === '' || coordinatesInput.value === '' || dataNameInput.value === '') {
          alert('Veuillez remplir tous les champs obligatoires avant de rajouter un marqueur personnalisé.');
          return false;
        }
        return true;
      }
    
    // Add an event listener to the form
    document.getElementById('addMarkerForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        if (!areFormFieldsFilled()) {
        return;
        }
    
        // Get the form elements
        var iconSelect = document.getElementById('iconSelect');
        var coordinatesInput = document.getElementById('coordinates');
        var dataNameInput = document.getElementById('dataName');
        var popupTextInput = document.getElementById('popupText');
        var popupUrlInput = document.getElementById('popupUrl');
    
        // Get the selected values
        var icon = iconSelect.value;
        var coordinates = coordinatesInput.value.split(',');
        var dataName = dataNameInput.value;
        var popupText = popupTextInput.value;
        var popupUrl = popupUrlInput.value;
    
        // Create a new marker with the selected values
        var marker = L.marker(coordinates, {
        icon: new L.Icon({
            iconUrl: icon,
            iconSize: [64, 64]
        }),
        dataName: dataName
        });
    
        // Add a popup to the marker with the selected text and URL
        marker.bindPopup('<a href="' + popupUrl + '">' + popupText + '</a>');
    
        // Add the marker to the corresponding array based on its category
        markersPersonnels.push(marker);
    
        // Add the marker to the map
        markers.addLayer(marker);
        markersPersonnelsLayer.addLayer(marker);
    
        // Update the list of markers in the sidebar
        createMarkerMenu(markersByCategory);
    
        // Reset the form
        coordinatesInput.value = '';
        dataNameInput.value = '';
        popupTextInput.value = '';
        popupUrlInput.value = '';
    });
    
    // Sélectionnez l'élément HTML pour la prévisualisation de l'icône
    const iconPreview = document.getElementById("iconPreview");

    // Ajoutez un gestionnaire d'événement pour le changement de sélection de l'élément <select>
    document.getElementById("iconSelect").addEventListener("change", () => {
    // Récupérez l'URL de l'icône sélectionnée
    const iconUrl = document.getElementById("iconSelect").value;
    
    // Mettez à jour l'arrière-plan de l'élément de prévisualisation avec l'URL de l'icône
    iconPreview.style.backgroundImage = `url(${iconUrl})`;
    });

    // Déclenchez le gestionnaire d'événement pour afficher l'icône par défaut
    document.getElementById("iconSelect").dispatchEvent(new Event("change"));

    //~~~Menu ajouts chemin~~~
    function importGeoJsonFile(file) {
        clearGeoJson(); // Clear the preview
      
        const reader = new FileReader();
        reader.onload = function (event) {
          const geoJsonData = JSON.parse(event.target.result);
          const geoJsonLayer = L.geoJSON(geoJsonData, {
            onEachFeature: function (feature, layer) {
              const layerName = document.getElementById("geoJsonFileNameInput").value;
              layer.options.dataName = layerName; // Add the name to the layer options
              CheminsPersonnels.push(layer);
              CheminsPersonnelsLayer.addLayer(layer);
            }
          });
          map.addLayer(geoJsonLayer);
          createMarkerMenu(markersByCategory); // Update the sidebar
        };
        reader.readAsText(file);
      }
    
    document.getElementById("importGeoJsonButton").addEventListener("click", () => {
    const inputElement = document.getElementById("geoJsonFileInput");
    if (inputElement.files.length > 0) {
        const file = inputElement.files[0];
        importGeoJsonFile(file);
        inputElement.value = ""; // Réinitialisez l'entrée de fichier
    }
    });

    // Afficher la prévisualisation du fichier GeoJSON
    function displayGeoJsonPreview(geoJson) {
        const previewContainer = document.getElementById('geoJsonPreview');
        previewContainer.innerHTML = '';
        const features = geoJson.features;
        if (features && features.length > 0) {
            features.forEach(feature => {
                const type = feature.geometry.type;
                if (type === 'Point') {
                    const coordinates = feature.geometry.coordinates;
                    addMarkerToMapPreview(coordinates[1], coordinates[0], feature.properties.name);
                } else if (type === 'LineString' || type === 'Polygon') {
                    addGeoJsonToMapPreview(feature);
                }
            });
        } else {
            const noFeaturesPreview = document.createElement('p');
            noFeaturesPreview.textContent = 'Aucune fonctionnalité trouvée dans le fichier GeoJSON.';
            previewContainer.appendChild(noFeaturesPreview);
        }
    }

    // Effacer le fichier GeoJSON actuellement chargé
    function clearGeoJson() {
        document.getElementById('geoJsonFileInput').value = '';
        document.getElementById('geoJsonPreview').innerHTML = '';
        document.getElementById('mapPreview').innerHTML = '';
        if (mapPreview._leaflet) {
            mapPreview._leaflet.remove();
            mapPreview._leaflet = null;
        }
    }

    // Écouter l'événement de changement de fichier GeoJSON
    document.getElementById('geoJsonFileInput').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const geoJson = JSON.parse(reader.result);
                displayGeoJsonPreview(geoJson);
            };
            reader.readAsText(file);
        } else {
            clearGeoJson();
        }
    });

    // Écouter le bouton d'effacement du fichier GeoJSON
    document.getElementById('clearGeoJsonButton').addEventListener('click', clearGeoJson);
        
    // Ajouter un marqueur à la carte de prévisualisation
    function addMarkerToMapPreview(lat, lng, title) {
        const mapPreview = document.getElementById('mapPreview')
        if (!mapPreview._leaflet) {
          mapPreview._leaflet = L.map(mapPreview).setView([lat, lng], 13)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapPreview._leaflet)
        }
        L.marker([lat, lng]).addTo(mapPreview._leaflet).bindPopup(title)
      }
    
    // Ajouter une couche GeoJSON à la carte de prévisualisation
    function addGeoJsonToMapPreview(feature) {
        const mapPreview = document.getElementById('mapPreview')
        if (!mapPreview._leaflet) {
          mapPreview._leaflet = L.map(mapPreview).setView([feature.geometry.coordinates[1][1], feature.geometry.coordinates[1][0]], 13)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapPreview._leaflet)
        }
        L.geoJSON(feature).addTo(mapPreview._leaflet)
      }
    
    // Écouter l'événement de changement de fichier GeoJSON
    document.getElementById('geoJsonFileInput').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const geoJson = JSON.parse(reader.result);
            displayGeoJsonPreview(geoJson);
        };
        reader.readAsText(file);
        } else {
        clearGeoJson();
        }
    });
    
    // Écouter le bouton d'effacement du fichier GeoJSON
    document.getElementById('clearGeoJsonButton').addEventListener('click', clearGeoJson);
});
