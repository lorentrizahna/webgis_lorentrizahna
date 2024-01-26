function _displayMapCreate (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
  document.getElementById('home').className = "nav-link flat";
  document.getElementById('leaflet_crud_create').className = "nav-link flat active";
  document.getElementById('leaflet_crud_read').className = "nav-link flat";
 document.getElementById('navbarDropdownUpdate').className = "nav-link dropdown-toggle";
  document.getElementById('leaflet_crud_delete').className = "nav-link flat";



  /* Digitize Function */
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  var drawControl = new L.Control.Draw({
    draw: {
      position: 'topleft',
      polyline: true,
      polygon: true,
      rectangle: false,
      circle: false,
      marker: true,
      circlemarker: false
    },
    edit: false
  });

  map.addControl(drawControl);

  map.on('draw:created', function (e) {
    var type = e.layerType,
      layer = e.layer;

    var drawnJSONObject = layer.toGeoJSON();
    var objectGeometry = Terraformer.WKT.convert(drawnJSONObject.geometry);

    if (type === 'polyline') {
      _buildDigitiseModalBox('modalform','LINESTRING',objectGeometry);
    } else if (type === 'polygon') {
      _buildDigitiseModalBox('modalform','POLYGON',objectGeometry);
    } else if (type === 'marker') {
      _buildDigitiseModalBox('modalform','POINT',objectGeometry);
    } else {
      console.log('__undefined__');
    }
    //map.addLayer(layer);
    drawnItems.addLayer(layer);
  });

  $("#modalform").on('shown.bs.modal', function(){
    _activateFeatureSave();
  });

}
