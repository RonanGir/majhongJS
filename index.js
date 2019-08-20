const showBtn = document.getElementById('show');
const container = document.querySelector('.container');
const max       = 16;
let memo        = -1;
let i           = -1;



// FONCTIONS

/*
 * La fonction addCards construit d'abords les tuiles en leurs attribuant un identifiant unique
 * et un data-identifiant commun aux paires de tuile et les stocks dans un tableau.
 * L'ordre du tableau est rendu aléatoire.
 * Puis les images sont ensuites affichées dans des divs
*/
function addCards() {
	const images = [];
	for (i=0; i<2; i++) {
		for (j=0; j<max; j++) {
			let img = `<img src='img/${j}.jpg' id='${j+(16*i)}' class="" data-ide=${j}>`;
			images.push(img);
		}
	}
	shuffle(images);
	for (let img of images) {
		container.insertAdjacentHTML("beforeend", `<div class='card'>${img}</div>`);
	}
  hideCards();
}

/*
 * La fonction shuffle mélange les tuiles de Majhong
 * la fonction anonyme en argument de la méthode sort(), permet de trier aléatoirement les éléments
 * du tableau reçu en paramètre de shuffle(tableau).
*/
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

/*
 * La fonction hideCards cache les cartes de Majhong une fois la partie lancer
*/
function hideCards() {
  let card = document.querySelectorAll('.card img');
  for (k=0; k<32; k++) {
    card[k].classList.add('opacityZero');
  }
}

/*
 * La fonction hideCards cache les cartes de Majhong une fois la partie lancer
*/
function stopPlay() {
  let cards = document.querySelectorAll('div.card');
  for (k=0; k<32; k++) {
    cards[k].remove();
  }
  addCards();
  availableLauncher();
}

function disableLauncher() {
  hideCards();
  showBtn.setAttribute('disabled', true);
}

function availableLauncher() {
  showBtn.removeAttribute('disabled');
}

function showTuiles() {
  let images = document.querySelectorAll('.card img');
  for (let img of images ) {
    img.classList.remove('opacityZero');
  }
}

function getImages() {
  return document.querySelectorAll('.card img');
}


// BOUTONS DE JEUX
/*
 * Ajouter un èvenement sur du html généré par du JS.
 * Le dernier éléments (après le '=') est une fonction créée au préalable.
*/
// document.getElementById('launch').onclick = addCards;
document.getElementById('show').onclick   = showTuiles;
document.getElementById('play').onclick   = disableLauncher;
document.getElementById('stop').onclick   = stopPlay;

// JEUX
// Sélection de toutes les tuiles une fois le DOM chargée
  addCards()
  let tuiles = document.querySelectorAll('.card img');
  for (k=0; k<32; k++) {

  	tuiles[k].addEventListener("click", (event) => {
  		// event.currentTarget permet d'accéder à l'élément souhaité dans une fonction callback
  		let num     = event.currentTarget.dataset.ide;
  		let index   = event.currentTarget.id;
  		if (memo == -1) {

  			memo = num;
  			i    = index;
        let firstElement = document.getElementById(`${index}`);
        event.currentTarget.classList.remove("opacityZero");

  		} else {

  			if (memo == num &&  i != index) {

  				let cards = document.querySelectorAll(`img[data-ide="${num}"`);
  				cards[0].classList.remove("opacityZero");
  				cards[1].classList.remove("opacityZero");
          cards[0].classList.add('dontTouch');
          cards[1].classList.add('dontTouch');

  			} else {
            let cards = document.querySelectorAll('img:not(.dontTouch)');
            for (let card of cards) {
              card.classList.add("opacityZero");
            }
  			}

  			memo = -1;
  			i    = -1;

  		}
  	});
  }


