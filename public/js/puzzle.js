// currentPiece: La pieza de rompecabezas que se está arrastrando actualmente.
// droppedPiece: La pieza de rompecabezas en la que se ha soltado la pieza arrastrada.
// error: Una bandera booleana que indica si se ha producido un error durante el arrastre y la colocación de la pieza de rompecabezas.
let currentPiece, droppedPiece, error;
// turns: El número de turnos que ha tomado para completar el rompecabezas.
let turns = 0;
// TOTAL_PIECES: Una constante que indica el número total de piezas que hay en el rompecabezas.
const TOTAL_PIECES = 16;
// Se agrega un evento "load" al objeto "window" que se dispara cuando la página web ha cargado completamente.
window.addEventListener("load", function () {
  // boardContainer es una constante que hace referencia al contenedor del tablero del rompecabezas en el documento HTML.
  const boardContainer = document.getElementById("Board");
  // piecesContainer, es una constante que hace referencia al contenedor de las piezas del rompecabezas.
  const piecesContainer = document.getElementById("Pieces");

  // Esta función crea las piezas del rompecabezas.
  // Toma dos argumentos: "container" y "source".
  // "container" es el contenedor donde se agregarán las imágenes de las piezas del rompecabezas.
  // "source" es la ruta de la imagen que se utilizará para crear las piezas del rompecabezas.
  function createPuzzlePieces(container, source) {
    // La función utiliza un bucle "for" para crear las imágenes de las piezas del rompecabezas.
    for (let i = 0; i < TOTAL_PIECES; i++) {
      // Cada imagen se crea como un elemento "img" y se establece la fuente de la imagen mediante la sustitución del número de la imagen en la ruta de la imagen.
      let img = document.createElement("img");
      img.src = source.replace("[number]", i);
      // La imagen también se agrega a la clase "Puzzle__Img".
      img.classList.add("Puzzle__Img");
      container.append(img);

      // Se agregan eventos de arrastre y soltar a cada imagen creada en la función.
      img.addEventListener("dragstart", dragStart);
      img.addEventListener("dragover", dragOver);
      img.addEventListener("dragenter", dragEnter);
      img.addEventListener("dragleave", dragLeave);
      img.addEventListener("drop", dragDrop);
      img.addEventListener("dragend", dragEnd);
    }
  }

  // Creación de las imágenes de las piezas del rompecabezas:
  // Se llama a esta función dos veces: una vez para el contenedor del tablero y otra vez para el contenedor de las piezas del rompecabezas.
  createPuzzlePieces(boardContainer, "./public/images/blank-dark.jpg");
  createPuzzlePieces(piecesContainer, "./public/images/[number].jpg");

  // Se crea un array "pieces" de las imágenes de las piezas del rompecabezas y se ordena aleatoriamente mediante el método de "sort".
  let pieces = Array.from(piecesContainer.children);
  pieces.sort(() => Math.random() - 0.5);
  // Cada pieza de rompecabezas se agrega al contenedor de piezas del rompecabezas en el orden aleatorio.
  pieces.forEach((piece) => piecesContainer.appendChild(piece));

  // Funciones de arrastre y soltar.
  // La función "dragStart" se dispara cuando comienza el arrastre de una pieza de rompecabezas.
  function dragStart(e) {
    // Esta función establece la variable "currentPiece" en la pieza de rompecabezas que se está arrastrando actualmente.
    currentPiece = this;
    // establece la variable "error" en "false"
    error = false;
    // comprueba si la imagen de la pieza de rompecabezas incluye la palabra "blank" en su src.
    if (currentPiece.src.includes("blank")) {
      // Si es así, establece la variable error en true.
      error = true;
    }
  }

  // dragEnter: se ejecuta cuando se arrastra una pieza de rompecabezas hacia una zona de destino válida.
  function dragEnter(e) {
    // previenen los comportamientos predeterminados del navegador para esos eventos mediante el uso del método preventDefault().
    e.preventDefault();
  }

  // dragOver: se ejecuta cuando se está arrastrando una pieza de rompecabezas sobre una zona de destino válida.
  function dragOver(e) {
    // previenen los comportamientos predeterminados del navegador para esos eventos mediante el uso del método preventDefault().
    e.preventDefault();
  }

  // dragLeave: se ejecuta cuando se está arrastrando una pieza de rompecabezas fuera de una zona de destino válida.
  function dragLeave(e) {
    // previenen los comportamientos predeterminados del navegador para esos eventos mediante el uso del método preventDefault().
    e.preventDefault();
  }

  // La función dragDrop se activa cuando se suelta una pieza en una zona de destino válida.
  function dragDrop(e) {
    e.preventDefault();
    // La variable "droppedPiece" se establece en la pieza de rompecabezas que se suelta en la casilla del tablero. Esto ocurre en la función "dragDrop()" cuando el evento "drop" se dispara en la pieza de rompecabezas. "this" se refiere a la pieza de rompecabezas que ha sido soltada en la casilla del tablero.
    droppedPiece = this;

    // Si la pieza actual es la imagen en blanco o si la pieza arrastrada y la soltada son la misma, establece error en true y se sale de la función dragDrop mediante el uso de la declaración return.
    if (error != false || currentPiece == droppedPiece) {
      return (error = true);
    }

    // Se llama para intercambiar las imágenes de la pieza arrastrada y la soltada.
    swapImages(currentPiece, droppedPiece);

    // Aumenta la variable "turns" en 1 cada vez que se suelta una pieza de rompecabezas correctamente en el tablero.
    turns += 1;
    // Actualiza el número de movimientos en el marcador del juego.
    document.getElementById("Turns").innerText = turns;

    // Reproduce un sonido de éxito para notificar al usuario que se ha colocado una pieza del rompecabezas.
    playSuccessSound();
  }

  // La función swapImages intercambia las imágenes de dos elementos.
  const swapImages = (img1, img2) => {
    let currImg = img1.src;
    let otherImg = img2.src;
    img1.src = otherImg;
    img2.src = currImg;
  };

  // La función dragEnd se ejecuta cuando se suelta una pieza de rompecabezas que se ha estado arrastrando.
  function dragEnd() {
    // Si se ha producido un error durante el proceso de arrastre y soltar, la función playErrorSound se llama para reproducir un sonido de error. En caso contrario, la función no hace nada.
    if (error) {
      playErrorSound();
    }
  }

  // La función playSuccessSound reproduce un sonido de éxito cuando se completa una acción de arrastrar.
  function playSuccessSound() {
    const soundSuccess = new Audio("./public/sounds/success.wav");
    soundSuccess.play();
  }

  // La función playErrorSound reproduce un sonido de error cuando se completa una acción de arrastrar y se detecta un error.
  function playErrorSound() {
    const soundError = new Audio("./public/sounds/error.wav");
    soundError.play();
  }
});
