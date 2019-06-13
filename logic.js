//create map background
var baseMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
});

//Create layer object
var layers = {
  mapLayer: new L.LayerGroup(),
  circleLayer: new L.LayerGroup(),
  popUpLayer: new L.LayerGroup()
};


// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3,
  layers: [
    layers.mapLayer,
    layers.circleLayer,
    layers.popUpLayer,
  ]
});


//add map base layer to map
baseMap.addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
  "Circle Layer": layers.circleLayer,
  "Pop Up Layer": layers.popUpLayer,
};

// Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function () {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

d3.json(url, function (data) {

  var features = data.features;

  console.log(features[0].properties.mag)
  console.log(features[0].properties.title)
  console.log(features[0].geometry.coordinates[0]) //longitude
  console.log(features[0].geometry.coordinates[1]) //latitude


  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < features.length; i++) {
    // Each quake object contains lat, lng, mag, title

    var mag = features[i].properties.mag;
    var place = features[i].properties.place;
    var title = features[i].properties.title;
    var lng = features[i].geometry.coordinates[0];
    var lat = features[i].geometry.coordinates[1];

    var latlng = L.latLng(lat, lng);
    
    // Define a markerSize function that will give each quake a different radius based on its mag
    function markerSize(mag) {
      return mag * 10000;
    }
    function markerColor(mag) {
      return (mag*20);
    }
      var color = `#${markerColor(mag)}88ff`;
    console.log(color);
   
    L.circle(latlng, {
      fillOpacity: 0.55,
      color: color,
      fillColor: color,
      // Setting our circle's radius equal to the output of our markerSize function
      radius: markerSize(mag)
    }).bindPopup("<h1>" + title + "</h1> <hr> <h3>Magnitude: " + mag + "</h3> <hr> <h3>Place: " + place + "</h3> <hr> <h3>Place: " + lat + "</h3> <hr> <h3>Longitude: " + lng + "</h3>").addTo(myMap);

  };

});

//     // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
//     var stationStatusCode;

//     // Loop through the stations (they're the same size and have partially matching data)
//     for (var i = 0; i < stationInfo.length; i++) {

//       // Create a new station object with properties of both station objects
//       var station = Object.assign({}, stationInfo[i], stationStatus[i]);
//       // If a station is listed but not installed, it's coming soon
//       if (!station.is_installed) {
//         stationStatusCode = "COMING_SOON";
//       }
//       // If a station has no bikes available, it's empty
//       else if (!station.num_bikes_available) {
//         stationStatusCode = "EMPTY";
//       }
//       // If a station is installed but isn't renting, it's out of order
//       else if (station.is_installed && !station.is_renting) {
//         stationStatusCode = "OUT_OF_ORDER";
//       }
//       // If a station has less than 5 bikes, it's status is low
//       else if (station.num_bikes_available < 5) {
//         stationStatusCode = "LOW";
//       }
//       // Otherwise the station is normal
//       else {
//         stationStatusCode = "NORMAL";
//       }

//       // Update the station count
//       stationCount[stationStatusCode]++;
//       // Create a new marker with the appropriate icon and coordinates
//       var newMarker = L.marker([station.lat, station.lon], {
//         icon: icons[stationStatusCode]
//       });

//       // Add the new marker to the appropriate layer
//       newMarker.addTo(layers[stationStatusCode]);

//       // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//       newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//     }

//     // Call the updateLegend function, which will... update the legend!
//     updateLegend(updatedAt, stationCount);
//   });
// });

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
