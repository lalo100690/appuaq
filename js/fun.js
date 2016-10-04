//MAPAS DE MAPBOX
window.addEventListener('load', init, true);
window.addEventListener('online', conex, true);
window.addEventListener('offline', noConex, true);

var onlongtouch; 
var timer;
var touchduration = 3500;
var lleno = "no"
var alertaEnviada = false;


function init(){
    navigator.geolocation.getCurrentPosition(showPosition);
    
}

function noConex(){
  document.querySelector('#msj').classList.add('show');
  document.querySelector('#sos').disabled="disabled"
}

function conex(){
  document.querySelector('#msj').classList.remove('show');
}

//GENERAMOS EL OBJETO 'LNGLAT' DE MAPBOX GL CON LAS COORDENADAS Y 
//LLAMAMOS AL AFUNCION GENERAR MAPA
function showPosition(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude; 
    coordenadas = new mapboxgl.LngLat(longitud, latitud);
    generarMapa();
}

function toque() {
  document.getElementById('time').classList.add('full');
  document.getElementById('sos').classList.add('amarillo');
  timer = setTimeout(onlongtouch, touchduration);
}

//LA FUNCION TOQUE FIN SE COMPRUEBA SI SE EJECUTO UNA
//ALERTA ROJA =======================================================================
//DESPUES DE TOCAR EL BOTON CUANDO SE REVISA LA FUNCION TIMER. SI EXISTE, SE PREGUNTA
//SI ES QUE LA VARIABLE LLENO ES DIFERENTE A SI (ESTO QUIERE DECIR QUE ES NO)
//SE LE QUITA AL BOTON LA CLASE AMARILLO Y LA CLASE FULL


function toquefin() {
  if (!alertaEnviada) {
    if(timer){ 
        if(lleno == "no") {
          document.getElementById('time').classList.remove('full');
          document.getElementById('sos').classList.remove('amarillo');
          //DEBIDO A QUE FUE UN TOQUE CORTO SE ENVIA UNA ALERTA ROJA
          //SE LE COLOCA LA CLASE NIVEL-ALTO AL MARCADOR PARA ILUMINAR AL REDEDOR
          //SE LE AGREGA LA CLASE DISABLED AL BOTON Y EL TEXTO AL #DEBUG
          //SE COLOCA LA LEYENDA EN EL BOTON Y SE POSICIONA CORRECTAMENTE
          document.querySelector('.mapboxgl-marker').classList.add('nivel-alto');
          document.querySelector('#SOS').classList.add('disabled');
          document.querySelector('#debug').innerHTML="Finalizar";
          document.querySelector('.mapboxgl-marker').innerHTML="<img src='img/lalo.png'><h1 class='alerta-roja'>Alerta roja enviada</h1><div class='triangulo'></div>";
          altura = document.querySelector('.mapboxgl-marker').offsetHeight;
          altura = altura + 20;
          document.querySelector('.mapboxgl-marker').style.marginTop="-"+altura+"px";
          alertaEnviada = true;
          console.log('Se envió el alerta')

        }else{
          document.getElementById('time').style.display="none";
        }

        clearTimeout(timer);
    }
  }else{
    console.log('ya se habia enviado')
  }
}

//ALERTA AMARILLA ====================================================================
//SI ESTA FUNCION SE EJECUTA, QUIERE DECIR QUE EL BOTON SE PRESIONO DURANTE 3 SEGUNDOS
//SE CAMBIA LA VARIABLE LLENO A "SI" Y SE AGREGAN LA CLASE FULL Y AMARILLO

onlongtouch = function() {
  lleno = "si"
  document.getElementById('time').classList.add('full');  
  document.getElementById('sos').classList.add('amarillo');
  // document.querySelector('.mapboxgl-marker').classList.add('nivel-medio');
  // document.querySelector('.triangulo').classList.add('t-nivel-medio');
  // document.querySelector('.mapboxgl-marker').innerHTML="<img src='img/lalo.png'><h1 class='alerta-amarilla'>Alerta amarilla enviada</h1><div class='triangulo'></div>";
  // altura = document.querySelector('.mapboxgl-marker').offsetHeight;
  // altura = altura + 20;
  // document.querySelector('.mapboxgl-marker').style.marginTop="-"+altura+"px";
  document.querySelector('.med').classList.add('show-med');
  document.querySelector('#debug').classList.add('p-med');
};


function silenciar(valor){
  if (valor == 0) {
    document.querySelector('#sonido').src="img/mudo.svg";
  }else{
    document.querySelector('#sonido').src="img/sonido.svg";
  }
}

function showMenu(){
  document.querySelector('.menu').classList.toggle('show-menu')
  document.querySelector('#mapa').classList.toggle('mapa-opacity')
}