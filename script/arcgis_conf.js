
require([
  //Clases necesarias
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/BasemapToggle"
], function(Map, MapView, FeatureLayer, BasemapToggle) { //Llamado de las clases necesarias para su uso
  
  //Creación de instancia de mapa, para mapa base
  var map = new Map({
    basemap: "dark-gray"
  });
  //Creación de la vista, inyección de propiedades, contenedor, mapa, centro y zoom
  var view = new MapView({
    container: "viewDiv",  
    map: map,
    center: [-74.043588, 4.649895],
    zoom: 12            
  });
  //Creación de basemapToogle para cambio de mapa base, en caso de ser necesario
  var basemapToggle = new BasemapToggle({
    view: view,
    secondMap: "satellite"
  });
  //Se añade a la vista el "Widget" y se posiciona en la parte baja derecha
  view.ui.add(basemapToggle,"top-right");

  //Declaración de pop ups, para asignación a las capas (FeatureLayers)
  var templateAeropuerto = {
    //Definición del titulo del pop up, usando variable de escapa con {}
    title: "<i class='fas fa-plane-departure mr-2'></i> {Aeropuerto}",
    content: `
          <ul class='list-group  list-group-flush'>
          <li class='list-group-item'>Id: {SKAR}</li>
          <li class='list-group-item'>Tipo: {Internacio}</li>
          <li class='list-group-item'>Departamento: { Quindío }</li>
              </ul>
          `,
  };   

  var templateUniversidades = {
    title: "<i class='fas fa-plane-departure mr-2'></i> {Nombre}",
    content: `
          <ul class='list-group  list-group-flush'>
            <li class='list-group-item'>Dirección: {Dirección}</li>
            <li class='list-group-item'>Coordenada X: {POINT_X}</li>
            <li class='list-group-item'>Coordenada Y: {POINT_Y}</li>               
          </ul>
          `,
  };  

  var templateCentrosComerciales = {
    title: "<i class='fas fa-plane-departure mr-2'></i> {Nombre_Cad}",
    content: `
          <ul class='list-group  list-group-flush'>
            <li class='list-group-item'>Dirección: {Direccion}</li>              
            <li class='list-group-item'>Coordenada X: {POINT_X}</li>
            <li class='list-group-item'>Coordenada Y: {POINT_Y}</li>  
            <li class='list-group-item'>Ciudad: {Ciudad}</li>                             
          </ul>
          `,
  };         

    // Trailheads feature layer (points)
  var ndvi = new FeatureLayer({
    url: "https://services.arcgis.com/deQSb0Gn7gDPf3uV/arcgis/rest/services/NDVI_Categorizado/FeatureServer"
  });      
  
  // Trails feature layer (lines)
  var centros_comerciales = new FeatureLayer({
    url: "https://services.arcgis.com/deQSb0Gn7gDPf3uV/arcgis/rest/services/MapaSinerGIS/FeatureServer/4",
    popupTemplate: templateCentrosComerciales,
  });      

  // Parks and open spaces (polygons)
  var aeropuertos = new FeatureLayer({
      url: "https://services.arcgis.com/deQSb0Gn7gDPf3uV/arcgis/rest/services/MapaSinerGIS/FeatureServer/1",
      outFields: ["*"],
      popupTemplate: templateAeropuerto,
      visible: true,
  });

  var universidades = new FeatureLayer({
    url:"https://services.arcgis.com/deQSb0Gn7gDPf3uV/arcgis/rest/services/MapaSinerGIS/FeatureServer/5",
    popupTemplate: templateUniversidades,
    visible:true
  })

  map.add(ndvi);
  map.add(universidades);
  map.add(centros_comerciales);
  map.add(aeropuertos);

});
