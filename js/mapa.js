//ESTA FUNCION DIBUJA EL MAPA Y SUS OPCIONES
function generarMapa(){
  mapboxgl.accessToken = 'pk.eyJ1IjoiZm9jOTk2IiwiYSI6ImNpcmNycnlvbDAxZ2VnOG5reThybmM4cWYifQ.8VEfTTV9TYgsJ5iQnNq24A';
  //GENERAMOS EL MAPA CON EL TIPO MAP DE MAPBOX GL CON SUS OPCIONES
  map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/foc996/cisb0j2vn000c2xodyhoghgvs',
      center: coordenadas,
      zoom: 17,
      minZoom: 15,
      maxZoom: 20
      // maxBounds: [[-100.405561, 20.596468], [-100.414411, 20.585193]]
  });

  //EVITAMOS QUE EL MAPA ROTE
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  // map.addControl(new mapboxgl.Geolocate({position: 'top-right'}));

  //AGREGAMOS UN MARCADOR AL MAPA CON EL METODO MARKER DE MAPBOX GL, NECESITA LAS COORDENADAS
  //Y SE AGREGA AL MAPA
  var marker = new mapboxgl.Marker().setLngLat(coordenadas).addTo(map);

  //DIBUJAMOS EL MARCADOR
  dibujarMarca()
  
}

function dibujarMarca(){
  marcador = document.querySelector('.mapboxgl-marker');
  marcador.innerHTML="<img src='img/lalo.png'>";
  // marcador.innerHTML+="<h1>Eduardo Aguirre Caracheo</h1>";
  marcador.innerHTML+="<div class='triangulo'></div>";
  altura = marcador.offsetHeight;
  altura = altura + 20;
  marcador.style.marginTop="-"+altura+"px"
}