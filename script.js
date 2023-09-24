/* VARIABLES */
let player, walls;
let butterflyImg, caterpillarImg, chrysalisImg;
let displayText = false;
let player2;
let backgroundImg, textBack;
let moved = false;
let welcomeText;
let textBack2;
let moveText = false;

function preload() {
  butterflyImg = loadImage("assets/butterfly.png");
  caterpillarImg = loadImage("assets/caterpillar.png");
  chrysalisImg = loadImage("assets/chrysalis.png");
  backgroundImg = loadImage("assets/back.jpg");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  background(backgroundImg);
  caterpillarImg.resize(80, 0);
  chrysalisImg.resize(70, 0);
  butterflyImg.resize(90, 0);

  //Create player sprite
  player = new Sprite(caterpillarImg, 330, 50, 40, 40);
  obstacle = new Sprite(chrysalisImg, 160, 150, 50, 40, "s");
  player2 = new Sprite(butterflyImg, 590, 590, 20, 20);
  player.rotationLock = true;
  player2.rotationLock = true;

  //Create the maze
  walls = new Group();
  walls.color = "#6C4E1D";
  walls.collider = "s";

  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height / 2, 5, height - 15);
  new walls.Sprite(150, 60, 5, 100);
  new walls.Sprite(width / 2 + 35, 390, 325, 5);
  new walls.Sprite(50, 300, 75, 5);
  new walls.Sprite(340, 146, 110, 5);
  new walls.Sprite(340, 250, 110, 5);
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);

  //Create extra sprites
  textBack = new Sprite(900, 900);
  welcomeText = new Sprite(280, 80);
  textBack2 = new Sprite(700, 700);

}

/* DRAW LOOP REPEATS */
function draw() {
  showMaze();
}

function showMaze() {
  background(backgroundImg);

  if (moved == false) {
    welcomeText.pos = { x: 285, y: 75 };
    welcomeText.w = 200;
    welcomeText.h = 100;
    welcomeText.collider = "n";
    welcomeText.color = "#D1F2EB";
    fill("black");
    textSize(15);
    welcomeText.text = "Welcome to Flight of Hope! \nTransform from a caterpillar \ninto a butterfly and \nmake it to the end of the maze! \nClick an arrow key to \nget started.";
  }
  else {
    welcomeText.pos = { x: 900, y: 800 };
  }

  if (displayText == false) {
    if (kb.pressing("left")) {
      player.vel.x = -3;
      moved = true;
    }
    else if (kb.pressing("right")) {
      player.vel.x = 3;
      moved = true;
    }
    else if (kb.pressing("up")) {
      player.vel.y = -3;
      moved = true;
    }
    else if (kb.pressing("down")) {
      player.vel.y = 3;
      moved = true;
    }
    else {
      player.vel.x = 0;
      player.vel.y = 0;
    }
  }

  // Draw start and end text
  fill("white");
  textSize(20);
  text('Start', 330, 20);
  text('End', 22, 395);

  //Player cannot go above maze
  if (player.y < 20) {
    player.y = 20;
  }
  if (player2.y < 20) {
    player2.y = 20;
  }

  // Player continues past obstacle
  if (player.collides(obstacle)) {

    obstacle.pos = { x: 600, y: 600 };
    displayText = true;
    player2.pos = { x: 160, y: 150 };
    player.pos = { x: 660, y: 1750 }

  }

  if (displayText == true) {
    textBack.pos = { x: width / 2, y: height / 2 };
    textBack.w = width;
    textBack.h = height;
    textBack.collider = "n";
    textBack.color = "#75F43A";
    textBack.text = "You are now in a chrysalis. \n \nClick the space bar \nto transform into a butterfly!";
    textBack.textSize = 24;

    if (kb.pressing("spacebar")) {
      moveText = true;
    }

    if (moveText == true) {
      textBack.pos = { x: 1000, y: 1000 };
    }

    if (kb.pressing("left")) {
      player2.vel.x = -3;
    }
    else if (kb.pressing("right")) {
      player2.vel.x = 3;
    }
    else if (kb.pressing("up")) {
      player2.vel.y = -3;
    }
    else if (kb.pressing("down")) {
      player2.vel.y = 3;
    }
    else {
      player2.vel.x = 0;
      player2.vel.y = 0;
    }


    //Player cannot go above maze
    if (player2.y < 20) {
      player2.y = 20;
    }

    // Player wins
    if (player2.y > 380) {
      textBack2.pos = { x: 180, y: 160 };
      textBack2.w = 140;
      textBack2.h = 40;
      textBack2.collider = "n";
      textBack2.color = "orange";
      fill("black");
      textBack2.text = "You win!";
      textBack2.textSize = 30;
      player2.vel.x = 0;
      player2.vel.y = 0;
    }



  }
}

