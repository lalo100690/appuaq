//EVENTLISTENERS
window.addEventListener('load', init, true);
window.addEventListener('online', conex, true);
window.addEventListener('offline', noConex, true);

//CHECAR CONEXION
function noConex(){
  document.querySelector('#msj').classList.add('show');
  // document.querySelector('#sos').disabled="disabled";
  // document.querySelector('#debug').innerHTML ="SOS<br><sub>(solo sonido)</sub>"
}

function conex(){
  document.querySelector('#msj').classList.remove('show');
}

var onlongtouch; 
var timer;
var tiempoPresionado = 1000;
var tresSegundos = false;
var alertaEnviada = false;
var sonido = true;
var i=0;
var presionAmarillo = false;

function init(){
	if (!localStorage.getItem('usuario')) {
		window.location.assign('index.html')
	}
	if (!navigator.onLine) {
		noConex();
	}
	document.getElementById('sos').setAttribute("ontouchstart", "toque()");
	document.getElementById('sos').setAttribute("ontouchend", "toquefin()");
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	latitud = position.coords.latitude;
    longitud = position.coords.longitude; 
    coordenadas = new mapboxgl.LngLat(longitud, latitud);
    generarMapa();
}

function toque() {
	document.querySelector('#sos').classList.add('amarillo');
	
	if (!tresSegundos) {
  		document.querySelector('#time').classList.add('animacion-llenado');
  	}

  	toqueLargo();
}

function toquefin() {
	if (!tresSegundos) {
		document.querySelector('#time').classList.remove('animacion-llenado');
		document.querySelector('#sos').classList.remove('amarillo');
		clearTimeout(tiempoTimeout);
		i = 0;
	}
	
	if (i<1) {
		console.log('tocado rojo')
		document.querySelector('#time').classList.remove('animacion-llenado');
	    document.querySelector('#sos').classList.remove('amarillo');
	    //ENVIAR ALERTA ROJA
		document.querySelector('.mapboxgl-marker').classList.add('nivel-alto');
		document.querySelector('#SOS').classList.add('disabled');
		document.querySelector('#debug').innerHTML="Finalizar";
		document.querySelector('.mapboxgl-marker').innerHTML="<img src='img/lalo.png'><div class='triangulo'></div>";
		altura = document.querySelector('.mapboxgl-marker').offsetHeight;
		altura = altura + 20;
		document.querySelector('.mapboxgl-marker').style.marginTop="-"+altura+"px";
		alertaEnviada = true;

		if (sonido) {
			document.getElementById('sound').play();
		}
	}
}

function toqueLargo() {
	console.log(i)
	if (i==3) {
		console.log('TERMINADO!!');
		tresSegundos = true;
		document.querySelector('#sos').classList.add('amarillo');
		document.querySelector('.med').classList.add('show-med');
		document.querySelector('#debug').classList.add('p-med');
		document.querySelector('#time').classList.remove('animacion-llenado');
		document.querySelector('#debug').setAttribute("ontouchstart", "toqueAmarillo()");
	}else{
		i++
		tiempoTimeout = setTimeout(function(){toqueLargo()},1000);
	}
};

function toqueAmarillo(){
	presionAmarillo = true;
	document.querySelector('.mapboxgl-marker').classList.add('nivel-medio');
	document.querySelector('.triangulo').classList.add('t-nivel-medio');
	document.querySelector('.mapboxgl-marker').innerHTML="<img src='img/lalo.png'><div class='triangulo'></div>";
	altura = document.querySelector('.mapboxgl-marker').offsetHeight;
	altura = altura + 20;
	document.querySelector('.mapboxgl-marker').style.marginTop="-"+altura+"px";
	if (sonido) {
		document.getElementById('sound').play();
	}
}

function alertaSOS(){
	alert('sos')
}


function silenciar(valor){
  if (valor == 0) {
    document.querySelector('#sonido').src="img/mudo.svg";
    sonido = false;
    console.log('MUDO')
  }else{
    document.querySelector('#sonido').src="img/sonido.svg";
    sonido = true;
    console.log('SONIDO')
  }
}

function showMenu(){
  document.querySelector('.menu').classList.toggle('show-menu')
  document.querySelector('#mapa').classList.toggle('mapa-opacity')
}

function logout(){
	localStorage.removeItem('usuario');
	localStorage.removeItem('pass');
	window.location.assign('index.html')
}