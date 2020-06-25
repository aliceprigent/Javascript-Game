
// ------ Player

var player = {
    lives: 3,
    x: 265,
    y: 525,
    moveLeft() { 
        this.x -= 25 },
    moveRight() { 
        this.x += 25 },
}

document.addEventListener('keydown', e => {
    if(e.keyCode === 37){
        player.moveLeft()
        console.log('left')
    } else if(e.keyCode === 39) {
        player.moveRight()
        console.log('right')
    }
  })

  // ------ Obstacles

class Obstacle {
    constructor(x,y,w,h) {
        this.x = x, 
        this.y = y,
        this.w = w,
        this.h = h,
    function moveDown(){
        this.y += 25;
    }
}
}

function createObstacle() {
    var obstacle = new Obstacle(200, 260, 40, 40)
    }
     
    setInterval(function(){ 
        createObstacle(); 
        console.log('yes')
    }, 1000);

