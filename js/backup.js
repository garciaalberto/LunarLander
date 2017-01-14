var y = 5;
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuel = 100;
var activo = true;

window.onload = function() {
    document.getElementById("showm").onclick = function() {
        document.getElementsByClassName("c")[0].style.display = "block";
        stop();
    }

    document.getElementById("reanudar").onclick = function() { reanudar(); };
    document.getElementById("pausa").onclick = function() { pausar(); };
    document.getElementById("reinicia").onclick = function() { reiniciarJuego(); };
    document.getElementById("instrucciones").onclick = function() { mostrarInstrucciones(); };

    document.getElementById("hidem").onclick = function() {
        document.getElementsByClassName("c")[0].style.display = "none";
        start();
    }

    document.onclick = function() {
        if (a == g) {
            motorOn();
        } else {
            motorOff();
        }
    }
    document.onkeydown = motorOn;
    document.onkeyup = motorOff;

    start();
}

function start() {
    timer = setInterval(function() { moverNave(); }, dt * 1000);
}

function stop() {
    clearInterval(timer);
    if (y >= 70) {
        document.getElementById("imgNave").src = "img/explosion.png";
    }
}

function moverNave() {
    v += a * dt;
    document.getElementById("velocidad").innerHTML = Math.round(v);
    y += v * dt;
    document.getElementById("altura").innerHTML = Math.round(70 - y);

    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        activo = false;
        stop();
        motorOff();
        document.getElementById("imgNave").src = "img/nave_apagada.png";
        if (v > 5) {
            document.getElementById("imgNave").src = "img/explosion.png";
        }
    }
}

function motorOn() {
    if (activo == true) {
        a = -g;
        if (timerFuel == null) {
            timerFuel = setInterval(function() { actualizarAltura(); }, 100);
            document.getElementById("imgNave").src = "img/nave.png";
        }

        if (fuel <= 0) {
            motorOff();
            document.getElementById("fuel").innerHTML = 0;
            document.getElementById("imgNave").src = "img/nave.png";
        }
        if (y > 70) {
            motorOff();
            document.getElementById("fuel").innerHTML = 0;
            if (v > 5) {
                document.getElementById("imgNave").src = "img/explosion.png";
            }
        }
    }
}

function motorOff() {
    if (activo == true) {
        a = g;
        document.getElementById("imgNave").src = "img/nave_apagada.png";
        clearInterval(timerFuel);
        timerFuel = null;
    }
}

function actualizarAltura() {
    if (activo == true) {
        fuel -= 1;
        document.getElementById("fuel").innerHTML = fuel;
    }
}

function eventosOff() {
    document.getElementById("izquierda").style.pointerEvents = 'none';
    document.getElementById("derecha").style.pointerEvents = 'none';
}

function eventosOn() {
    document.getElementById("izquierda").style.pointerEvents = 'auto';
    document.getElementById("derecha").style.pointerEvents = 'auto';
}

function reanudar() {
    start();
    document.getElementById("reanudar").style.display = "none";
    document.getElementById("pausa").style.display = "inline-block";
}

function pausar() {
    motorOff();
    stop();
    document.getElementById("pausa").style.display = "none";
    document.getElementById("reanudar").style.display = "inline-block";
}

function reiniciarJuego() {
    stop();
    document.getElementById("reanudar").style.display = "none";
    document.getElementById("pausa").style.display = "inline-block";
    intentos++;
    y = 5;
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    gasolina = gasolinaTotal;
    document.getElementById("fuel").innerHTML = porcentajeGasolina();
    document.getElementById("fuel").style.color = "black";
    reanudar();
    clearInterval(timer);
    start();
    eventosOn();
}