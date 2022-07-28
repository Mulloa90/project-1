// Building the map and centering it on San Diego - this uses Leaflet, an open-source JS library and tiles from OpenStreetMaps
var map = L.map('map').setView([32.7157, -117.1611], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
