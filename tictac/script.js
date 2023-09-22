const X_klass = 'x';
const CIRCLE_klass = 'circle';
const VINST_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [3, 4, 5],
  [1, 4, 7],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6]
]

let bytTur;
const spelplan = document.getElementById('spelplan');
const rutor = document.querySelectorAll('[ruta-cell]');
const vinstMeddelandeText = document.querySelector('[ruta-text]')
const vinstMeddelande = document.getElementById('vinstMeddelande')
const restartButton = document.getElementById('restart')

// Starta spelet funktion
// värde för att byta tur

startaSpelet()

// anropa startaSpelet med restartknappen
restartButton.addEventListener('click', startaSpelet)

function startaSpelet() {
  bytTur = false

  rutor.forEach(ruta => {
    ruta.classList.remove(X_klass)
    ruta.classList.remove(CIRCLE_klass)
    ruta.removeEventListener('click', handleClick)
    ruta.addEventListener('click', handleClick, {once: true})
  })
  setHover()
  vinstMeddelande.classList.remove('visa')


}

// kalla på setHover




function handleClick(e) {
  // console.log('Nu har vi klickat!!!');
  const ruta = e.target
  const nuvarandeKlass = bytTur ? CIRCLE_klass : X_klass;
  //Placera ut X och O
  placeMarks(ruta, nuvarandeKlass);
  // Kolla vem som har vunnit
  if (kollaVinst(nuvarandeKlass)) {
    console.log('Vinnare')
    avslutaSpelet(false)
    // Här vill vi avsluta spelet - avslutaSpel funktion
  } else if (oavgjortSpel()) {
    avslutaSpelet(true)
  } else {
    // Kolla om det är oavgjort (spelet slut)
    // Här vill vi också anropa avslutaSpel-funktion

    // Byta tur
    bytaTur()
    //Skapa hover effekten
    setHover()

  }
}

function bytaTur() {
  bytTur = !bytTur
}

function placeMarks(ruta, nuvarandeKlass) {
  ruta.classList.add(nuvarandeKlass)
}

function setHover() {
  spelplan.classList.remove(X_klass)
  spelplan.classList.remove(CIRCLE_klass)
  if (bytTur) {
    spelplan.classList.add(CIRCLE_klass)
  } else {
    spelplan.classList.add(X_klass)
  }
}

function kollaVinst(nuvarandeKlass) {
  return VINST_COMBO.some(combo => {
    return combo.every(index => {
      return rutor[index].classList.contains(nuvarandeKlass)
    })
  })
}

function oavgjortSpel() {
  // destructuring
  return [...rutor].every(ruta => {
    return ruta.classList.contains(X_klass) || ruta.classList.contains(CIRCLE_klass)
  })
}

function avslutaSpelet(oavgjort) {
  if (oavgjort) {
    // console.log('Oavgjort')
    vinstMeddelandeText.innerText = 'OAVGJORT!!!!'
  } else {
    // console.log('Någon har vunnit')
    vinstMeddelandeText.innerText = `${bytTur ? "O" : "X" } VINNER!!!!`
  }
  vinstMeddelande.classList.add('visa')
}
