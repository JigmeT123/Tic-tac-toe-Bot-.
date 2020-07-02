let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let human = 'X';
let bot = 'O';
let w, h;
let currentPlayer = human;
function nextTurn(){
  let avaliable = [];

  for(let i =0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(gameBoard[i][j] == ''){
        avaliable.push({i,j});
      }
      
    }
  }
  let move = random(avaliable);
  let i = move.i;
  let j = move.j;
  gameBoard[i][j] = bot;
  currentPlayer = human;
}
function setup(){
  createCanvas(400, 400);
   w = width/3;
   h = height/3;

}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2])) {
      winner = gameBoard[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])) {
      winner = gameBoard[0][i];
    }
  }

  // Diagonal
  if (equals3(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
    winner = gameBoard[0][0];
  }
  if (equals3(gameBoard[2][0], gameBoard[1][1], gameBoard[0][2])) {
    winner = gameBoard[2][0];
  }

  let freeSpot = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] == '') {
        freeSpot++;
      }
    }
  }

  if (winner == null && freeSpot == 0) {
    return 'tie';
  } else {
    return winner;
  }
}



function mousePressed(){
  if(currentPlayer == human){
    let i = floor(mouseX/w);
    let j = floor(mouseY/h);
    if(gameBoard[i][j] == ''){
      gameBoard[i][j] = human;
      currentPlayer = bot;
      nextTurn();
    }
  }
}


function draw(){
  background(51);
  stroke(250);
  strokeWeight(4);
  //vertical line
  line( w, 0, w , height);
  line(w*2, 0 , w*2, height);
  //horizontal line
  line(0, h, width, h);
  line(0, h*2, width, h*2);
  
  for(let j =0; j < 3; j++){
    for(let i = 0; i < 3; i++){
      let x = w * i + w/2;
      let y = h * j + h/2;
      let marker = gameBoard[i][j];
      let xr = w/4;
      if(marker == human){
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }else if(marker == bot){
        noFill();
        ellipse(x, y, w/2);
      }
    }
  }

  let winner = checkWinner();
  if(winner != null){
    noLoop();
    console.log("stooped")
    resultP = createP('').style('font-size', '32pt').style('margin', '10pt');
    if(winner == 'tie'){
      resultP.html('TIE!');
    }else{
      resultP.html(`${winner} wins!`);
    }
  }
}