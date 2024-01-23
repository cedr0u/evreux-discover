document.addEventListener("DOMContentLoaded", function () {
    // Création de la carte
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'});
    
    var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});
    
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
        "<span style='color: red'>OpenStreetMap.HOT</span>": osmHOT,
    };

    // Création de la couche de superposition
    var lines = new L.TileLayer("http://gps-{s}.tile.openstreetmap.org/lines/{z}/{x}/{y}.png");

    var overlayMaps = {
        "Chemins": lines
    };

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Création d'un groupe de marqueurs
    const markers = L.markerClusterGroup();

    // Ajout de quelques marqueurs avec des popups (a refaire)
    markers.addLayer(L.marker([49.024707, 1.168751]).bindPopup('<a href="https://www.gravigny.fr/">Mairie de Gravigny</a>').setIcon(new L.Icon({iconUrl: 'icon/mairie.png', iconSize: [64, 64]})));
    markers.addLayer(L.marker([49.023962, 1.169712]).bindPopup('<a href="https://www.gravigny.fr/">Église Saint-Martin</a>').setIcon(new L.Icon({iconUrl: 'icon/art.png', iconSize: [64, 64]})));
    markers.addLayer(L.marker([49.025049, 1.170836]).bindPopup('<a href="https://www.gravigny.fr/">École primaire Jean Moulin</a>').setIcon(new L.Icon({iconUrl: 'icon/info.png', iconSize: [64, 64]})));
    markers.addLayer(L.marker([49.026247, 1.170053]).bindPopup('<a href="https://www.gravigny.fr/">Stade municipal</a>').setIcon(new L.Icon({iconUrl: 'icon/toilettes.png', iconSize: [64, 64]})));

    // Ajout du groupe de marqueurs à la carte
    map.addLayer(markers);

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
        var popupContent = 'Mode of travel: ' + props['Travel mode'] + '<br />Range: 0 - ' + props['Range'] + ' ' + props['Range units'] + '<br />Area: ' + props['Area'] + ' ' + props['Area units'] + '<br />Population: ' + props['Population'];
        if (props.hasOwnProperty('Reach factor')) popupContent += '<br />Reach factor: ' + props['Reach factor'];
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
});
