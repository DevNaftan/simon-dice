const btnInfo = document.getElementById('btnInfo')
const nivel = document.getElementById('level')
const counter = document.getElementById('counter')
const amarillo = document.getElementById('amarillo')
const azul = document.getElementById('azul')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 50

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    this.counter()
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toggleBtnEmpeza()
    this.count = 3
    this.score = 0
    this.nivel = 1
    this.colores = {
      amarillo,
      azul,
      rojo,
      verde
    }
    this.controls = {
      nivel,
      counter
    }
    this.controls['nivel'].textContent = `0 / ${ULTIMO_NIVEL}`
    this.controls['counter'].textContent = ''
  }

  toggleBtnEmpeza() {
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(() => Math.floor(Math.random() * 4))
  }

  counter() {
    this.toggleCounter()
    var interval = window.setInterval(() => {
      this.controls['counter'].textContent = `${this.count}`
      this.count--
      if(this.count < 0) {
        window.clearInterval(interval);
        this.toggleCounter()
        this.siguienteNivel()
      }
    },1000)
  }

  toggleCounter() {
    if(counter.classList.contains('hide')){
      counter.classList.remove('hide')
    } else {
      counter.classList.add('hide')
    }
  }

  siguienteNivel() {
    this.controls['nivel'].textContent = `${this.nivel} / ${ULTIMO_NIVEL}`
    setTimeout(() => {
      this.subnivel = 0
      this.iluminarSecuencia()
    }, 1000)
  }

  transformarNumeroAColor(numero) {
    switch(numero) {
      case 0:
        return 'amarillo'
      case 1:
        return 'azul'
      case 2:
        return 'rojo'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch(color) {
      case 'amarillo':
        return 0
      case 'azul':
        return 1
      case 'rojo':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia() {
    for(var i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 750 * i)
    }
    setTimeout(() => this.agregarEventosClick(), (750 * (i-1)) + 100)
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 250)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.amarillo.addEventListener('click', this.elegirColor)
    this.colores.azul.addEventListener('click', this.elegirColor)
    this.colores.rojo.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.amarillo.classList.add('cursor')
    this.colores.azul.classList.add('cursor')
    this.colores.rojo.classList.add('cursor')
    this.colores.verde.classList.add('cursor')
  }

  eliminarEventosClick() {
    this.colores.amarillo.removeEventListener('click', this.elegirColor)
    this.colores.azul.removeEventListener('click', this.elegirColor)
    this.colores.rojo.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.amarillo.classList.remove('cursor')
    this.colores.azul.classList.remove('cursor')
    this.colores.rojo.classList.remove('cursor')
    this.colores.verde.classList.remove('cursor')
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      this.score++
      if(this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(() => {
            this.siguienteNivel()
          }, 750)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal('¡Ganaste!', `Felicidades, tienes una buena memoria.\n\nPuntaje total: ${this.score} puntos.`, 'success')
    .then(() => {
      this.inicializar()
    })
  }

  perdioElJuego() {
    swal('¡Perdiste!', `No te desanimes, inténtalo nuevamente\n\nPuntaje total: ${this.score} puntos.`, 'error')
    .then(() => {
      this.eliminarEventosClick()
      this.inicializar()
    })
  }
}

nivel.textContent = `0 / ${ULTIMO_NIVEL}`

function gameInfo() {
  swal({
    icon: "info",
    title: "¡Simón Dice!",
    text: "Memoriza la secuencia en cada ronda, repítela y llévate todos los puntos.\n\n ¡Buena suerte!",
  })
}

function empezarJuego() {
  window.juego = new Juego()
}