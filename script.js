const cartas = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let carta1, carta2;


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

  resetBoard();
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

cartas.forEach((card) => card.addEventListener("click", virarCartas));
