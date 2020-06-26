var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var raf = 0;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var gameover = false;
var animationId = undefined;

// ------- Player ------- //

var player = {
  lives: 3,
  score: 0,
  x: 265,
  y: 525,
  moveLeft: function () {
    this.x -= 40;
  },
  moveRight: function () {
    this.x += 40;
  },
  
}

const imgPlayer = new Image();
const imgObstacle = new Image();
const imgPasta = new Image();
const imgPq = new Image();
const imgHydro = new Image();
const imgVaccin = new Image();
imgPlayer.src = "./images/masque.png";

function drawPlayer(player) {
  ctx.drawImage(imgPlayer, player.x, player.y, 120, 80);
}

//------ Obstacle ------- //

class Obstacle {
  constructor(x, y, w, h, speedY) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
    this.speedY = speedY;
  }
  moveDown() {
    this.y += this.speedY;
  }
  drawObstacle() {
    ctx.drawImage(imgObstacle, this.x, this.y, this.w, this.h);
  }
}

var allObstacles = [];

function createObstacle() {
    let maxX = 550
    let minX = 20
    let maxY = -500
    let minY = -30
    let maxSpeed = 9;
    let minSpeed = 3;
    let speedY = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed)
    let x = Math.floor(Math.random() * (maxX - minX + 1) + minX)
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY)
    var obstacle = new Obstacle(x, y, 40, 40, speedY);
    allObstacles.push(obstacle);
}

setInterval(function(){ 
    createObstacle(); 
}, 2000);

// ----- Pasta

class Pasta {
  constructor(x, y, w, h) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
    this.speedY = 7;
  }
  moveDown() {
    this.y += this.speedY; 
  }
  drawPasta() {
    ctx.drawImage(imgPasta, this.x, this.y, this.w, this.h);
  }
}

var allPasta = [];

function createPasta() {
    let maxX = 550
    let minX = 20
    let maxY = -500
    let minY = -30
    let x = Math.floor(Math.random() * (maxX - minX + 1) + minX)
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY)
    var pasta = new Pasta(x, y, 40, 40);
    allPasta.push(pasta);
}

setInterval(function(){ 
    createPasta(); 
}, 5000);

//------ PQ

class Pq {
  constructor(x, y, w, h) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
    this.speedY = 8;
  }
  moveDown() {
    this.y += this.speedY;
  }
  drawPq() {
    ctx.drawImage(imgPq, this.x, this.y, this.w, this.h);
  }
}

var allPq = [];

function createPq() {
    let maxX = 550
    let minX = 20
    let maxY = -500
    let minY = -30
    let x = Math.floor(Math.random() * (maxX - minX + 1) + minX)
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY)
    var pq = new Pq(x, y, 30, 30);
    allPq.push(pq);
}

setInterval(function(){ 
    createPq(); 
}, 8000);

// ----- Gel Hydro

class Hydro {
  constructor(x, y, w, h) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
    this.speedY = 10;
  }
  moveDown() {
    this.y += this.speedY;
  }
  drawHydro() {
    ctx.drawImage(imgHydro, this.x, this.y, this.w, this.h);
  }
}

var allHydro = [];

function createHydro() {
    let maxX = 550
    let minX = 20
    let maxY = -500
    let minY = -30
    let x = Math.floor(Math.random() * (maxX - minX + 1) + minX)
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY)
    var hydro = new Hydro(x, y, 20, 40);
    allHydro.push(hydro);
}

setInterval(function(){ 
    createHydro(); 
}, 30000);

// ----- Vaccin 

class Vaccin {
  constructor(x, y, w, h) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = h);
    this.speedY = 9;
  }
  moveDown() {
    this.y += this.speedY;
  }
  drawVaccin() {
    ctx.drawImage(imgVaccin, this.x, this.y, this.w, this.h);
  }
}

var allVaccin = [];

function createVaccin() {
    let maxX = 550
    let minX = 20
    let maxY = -500
    let minY = -30
    let x = Math.floor(Math.random() * (maxX - minX + 1) + minX)
    let y = Math.floor(Math.random() * (maxY - minY + 1) + minY)
    var vaccin = new Vaccin(x, y, 20, 40);
    allVaccin.push(vaccin);
}

setInterval(function(){ 
    createVaccin(); 
}, 20000);

// ------ UpdateCanva

function updateCanvas() {
  ctx.clearRect(0, 0, 600, 600);

  checkCollisions(allObstacles);
  checkLives();
  
  drawPlayer(player);
  
  checkCollisions2(allPasta);
  checkCollisions2(allPq);
  checkCollisions3(allHydro);
  checkCollisions4(allVaccin);
  

  allObstacles.forEach(function (obstacle) {
    updateObstacle(obstacle);
  });

  allPasta.forEach(function (pasta) {
    updatePasta(pasta);
  });

  allPq.forEach(function (pq) {
    updatePq(pq);
  });

  allHydro.forEach(function (hydro) {
    updateHydro(hydro);
  });

  allVaccin.forEach(function (vaccin) {
    updateVaccin(vaccin);
  });

  if (!gameover) animationId = requestAnimationFrame(updateCanvas);
}


function updateObstacle(obstacle) {
  obstacle.moveDown();
  obstacle.drawObstacle();
}

function updatePasta(pasta){
  pasta.moveDown();
  pasta.drawPasta();
}

function updatePq(pq){
  pq.moveDown();
  pq.drawPq();
}

function updateHydro(hydro){
  hydro.moveDown();
  hydro.drawHydro();
}

function updateVaccin(vaccin){
  vaccin.moveDown();
  vaccin.drawVaccin();
}



// ----- Collisions

function checkCollisions(allObstacles){
    for (let i=0; i<allObstacles.length; i++){
      if (allObstacles[i].y >= 600) {
        allObstacles.splice(allObstacles[i-1], 1)
        player.lives -= 1
      } else if (player.x < allObstacles[i].x + allObstacles[i].w &&
            player.x + 120 > allObstacles[i].x &&
            player.y < allObstacles[i].y + allObstacles[i].h &&
            80 + player.y > allObstacles[i].y) {
             allObstacles.splice(allObstacles[i-1], 1)
             player.score += 10
             var theScore = document.getElementById('thescore')
             theScore.innerHTML = `${player.score}`
         } 

    }
    if(player.lives === 0) {
      gameOver()
    }
   
} 

function checkCollisions2(array){
  for (let i=0; i<array.length; i++){
      if (player.x < array[i].x + array[i].w &&
          player.x + 120 > array[i].x &&
          player.y < array[i].y + array[i].h &&
          80 + player.y > array[i].y) {
           array.splice(array[i-1], 1)
           player.score = player.score - 20
           var theScore = document.getElementById('thescore')
           theScore.innerHTML = `${player.score}`
          }
       else if (array[i].y === 600) {
           array.splice(array[i-1], 1)
       }
      
      }
      if(player.score < 0){
        gameOver()
 
} 
}


function checkCollisions3(allHydro){
  for (let i=0; i<allHydro.length; i++){
      if (player.x < allHydro[i].x + allHydro[i].w &&
          player.x + 120 > allHydro[i].x &&
          player.y < allHydro[i].y + allHydro[i].h &&
          80 + player.y > allHydro[i].y) {
            allHydro.splice(allHydro[i-1], 1)
           player.score += 30
           var theScore = document.getElementById('thescore')
           theScore.innerHTML = `${player.score}`
       } else if (allHydro[i].y === 600) {
        allHydro.splice(allHydro[i-1], 1)
       }

  }
 
} 

function checkCollisions4(allVaccin){
  for (let i=0; i<allVaccin.length; i++){
      if (player.x < allVaccin[i].x + allVaccin[i].w &&
          player.x + 120 > allVaccin[i].x &&
          player.y < allVaccin[i].y + allVaccin[i].h &&
          80 + player.y > allVaccin[i].y) {
            allVaccin.splice(allVaccin[i-1], 1)
           player.lives = 3
       } else if (allVaccin[i].y === 600) {
        allVaccin.splice(allVaccin[i-1], 1)
       }

  }
 
} 

//---- Game Over

function checkLives(){
  console.log(player.lives)
  var theLives = document.getElementById('lives')
  if(player.lives === 3){
    theLives.innerHTML = `<i class="fas fa-heart"></i><i class="fas fa-heart"></i><i class="fas fa-heart"></i>`
  } 
  else if(player.lives === 2){
    theLives.innerHTML = `<i class="fas fa-heart"></i><i class="fas fa-heart"></i>`
  } 
  else if(player.lives === 1){
    theLives.innerHTML = `<i class="fas fa-heart"></i>`
  }
  else if(player.lives > 3){
    player.lives === 3
  }
  else {
    theLives.innerHTML = ``
  }
}

function gameOver() {
    canvas.remove()
    var parent = document.getElementById('game-over')
    parent.style.width = '600px';
    parent.style.height = '600px';
    parent.style.visibility = 'visible' 
    gameover = true;
    cancelAnimationFrame(animationId);
    animationId = undefined;
    var gameOver = document.createElement('div')
    gameOver.className = 'gameover'
    parent.prepend(gameOver)  
    var textOver = document.createElement('p')
    textOver.className = 'textover'
    gameOver.prepend(textOver)
    textOver.innerHTML = `<p><span class="done"><strong>GAME OVER</strong></span> <br>
    <br>
    <strong>EVERYONE IS DEAD</strong> !!<br>
    Just a little flu... They said.
    <a href="./index.html"><button class="btn">PLAY AGAIN</button></a>`
  }



// -------- Event Listener -------- //

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 39:
      player.moveRight();
      break;
  }
});


imgPlayer.onload = () => {
  imgObstacle.src = "./images/coronavirus-5107715_1280.webp";
  imgPasta.src = "./images/pasta.png";
  imgPq.src = "./images/pq.png"
  imgHydro.src = "./images/gel-hydro.png"
  imgVaccin.src = "./images/vaccin.png"
  imgObstacle.onload = () => {
    animationId = requestAnimationFrame(updateCanvas);
  };
};
