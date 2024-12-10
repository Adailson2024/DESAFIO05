const cartas = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let carta1, carta2;
let numerodeJogadas=0;
function escolhaNumeroCartas() {
  let numeroCartas = parseInt(prompt("Digite um número par de cartas entre 4 e 14:"));

  while (isNaN(numeroCartas) || numeroCartas % 2 !== 0 || numeroCartas < 4 || numeroCartas > 14) {
    numeroCartas = parseInt(prompt("Número inválido. Digite um número par de cartas entre 4 e 14:"));
    
  }
  console.log("Número de cartas válido:", numeroCartas);
  
  alert("Você escolheu " + numeroCartas + " cartas.");
}


escolhaNumeroCartas();

function virarCartas() {
  if (lockBoard) return;
  if (this === carta1) return;

  this.classList.add("virar");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    carta1 = this;

    return;
  }

  carta2 = this;
  comparadorCartas();
}

function comparadorCartas() {
  let correspondencia = carta1.dataset.framework === carta2.dataset.framework;

  correspondencia ? desabilitarCartas() : desvirarCartas();
}

function desabilitarCartas() {
  carta1.removeEventListener("click", virarCartas);
  carta2.removeEventListener("click", virarCartas);

  redefiniçãoCartas();
}

function desvirarCartas() {
  lockBoard = true;

  setTimeout(() => {
    carta1.classList.remove("virar");
    carta2.classList.remove("virar");

    redefiniçãoCartas();
  }, 1000);
}

function redefiniçãoCartas() {
  [hasFlippedCard, lockBoard] = [false, false];
  [carta1, carta2] = [null, null];
}

(function embaralhar() {
  cartas.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 14);
    card.style.order = randomPos;
  });
})();

function verificarFimDoJogo() {
  
  if (comparadorCartas) {
      alert("Parabéns! Você completou o jogo em " + totalJogadas + " jogadas.");
  }
}


function contarJogada() {
  numerodeJogadas++;
}

cartas.forEach((card) => card.addEventListener("click", virarCartas));
