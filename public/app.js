document.addEventListener("DOMContentLoaded", function () {
    //----------------Fonds de cartes------------------
    // Création de la carte
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'});

    var Satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'ArcGIS'});
    
    const map = L.map('map', {layers: [Satellite]}).setView([49.01977957460211,1.1655593991722224], 14);
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Carte de fond OpenStreetMap
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'ArcGIS'}).addTo(map);
       
    var baseMaps = {
        "Satellite": Satellite,
        "OpenStreetMap": osm,
    };

    // Création de la couche de superposition
    var lines = new L.TileLayer("http://gps-{s}.tile.openstreetmap.org/lines/{z}/{x}/{y}.png");

    //----------------Markers/Points sur la carte et données d'informations------------------
    // Création d'un groupe de marqueurs
    const markers = L.markerClusterGroup();

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

    // Ajout de quelques marqueurs avec des popups et liens
    toilettesPlace.push(L.marker([49.024707, 1.168751], {dataName: 'Mairie de Gravigny'}).bindPopup('<a href="https://www.gravigny.fr/">Mairie de Gravigny</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    eauPlace.push(L.marker([49.023962, 1.169712], {dataName: 'Église Saint-Martin'}).bindPopup('<a href="https://www.gravigny.fr/">Église Saint-Martin</a>').setIcon(new L.Icon({iconUrl: 'icon/art.png', iconSize: [64, 64]})));
    historiquePlace.push(L.marker([49.025049, 1.170836], {dataName: 'École primaire Jean Moulin'}).bindPopup('<a href="https://www.gravigny.fr/">École primaire Jean Moulin</a>').setIcon(new L.Icon({iconUrl: 'icon/info.png', iconSize: [64, 64]})));
    infoPlace.push(L.marker([49.026247, 1.170053], {dataName: 'Stade municipal'}).bindPopup('<a href="https://www.gravigny.fr/">Stade municipal</a>').setIcon(new L.Icon({iconUrl: 'icon/toilettes.png', iconSize: [64, 64]})));

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
        "Chemins" : sentierPlaceLayer,
        "Sports/J.O 2024" : sportPlaceLayer,
        "Lieux culturels" : theatrePlaceLayer,
        "Toilettes publiques" : toilettesPlaceLayer,
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

    // Define the markers by category
    const markersByCategory = {
        "Lieux d'art": artPlaceLayer,
        "Points d'eau": eauPlaceLayer,
        "Lieux historique": historiquePlaceLayer,
        "Lieux d'information": infoPlaceLayer,
        "Jardin": jardinPlaceLayer,
        "Point de vue": jumellesPlaceLayer,
        "Mairie": mairiePlaceLayer,
        "Urbex/Désaffecté": maisonPlaceLayer,
        "Chemins": sentierPlaceLayer,
        "Sports/J.O 2024": sportPlaceLayer,
        "Lieux culturels": theatrePlaceLayer,
        "Toilettes publiques": toilettesPlaceLayer,
    };
    
    // Create the markers menu
    createMarkerMenu(markersByCategory);

    function createMarkerMenu(markersByCategory) {
        const markerMenu = document.getElementById('markers');
        markerMenu.innerHTML = '';
        for (const category in markersByCategory) {
            if (markersByCategory.hasOwnProperty(category)) {
                const categoryLink = document.createElement('a');
                categoryLink.href = '#';
                categoryLink.textContent = category;
                categoryLink.addEventListener('click', function () {
                    map.addLayer(markersByCategory[category]);
                    map.setView(markersByCategory[category].getLayers()[0].getLatLng(), 15);
                });
                markerMenu.appendChild(categoryLink);
                markerMenu.appendChild(document.createElement('br')); // Ajout d'un saut de ligne après chaque catégorie
                
                const nbMarkers = markersByCategory[category].getLayers().length;
                categoryLink.dataset.nbMarkers = nbMarkers;
                const span = document.createElement('span');
                span.textContent = ` (${nbMarkers})`;
                categoryLink.appendChild(span);
    
                // Ajout de la liste des marqueurs
                const markersList = document.createElement('ul');
                for (const marker of markersByCategory[category].getLayers()){
                    const listItem = document.createElement('li')
                    listItem.textContent = marker.options.dataName;
                    listItem.addEventListener('click', function () {
                        map.setView(marker.getLatLng(), 15);
                    });
                    markersList.appendChild(listItem);
                }
                markerMenu.appendChild(markersList);
            }
        }
    }
});
