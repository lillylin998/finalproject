function preload(){
  bg = loadImage('images/background.png');
  gamebg = loadImage('images/gameBackground.png');
  fairyRight = loadImage('images/fairyRight.png');
  fairyLeft = loadImage('images/fairyLeft.png');
  chestClosed = loadImage('images/chestClosed.png');
  chestOpen = loadImage('images/chestOpen.png');
  monsterLeft = loadImage('images/monsterLeft.png');
  monsterRight = loadImage('images/monsterRight.png');
  shroom = loadImage('images/shroom.png');
  coin = loadImage('images/coin.png');
  steelSword = loadImage('images/steelSword.png');
  silverSword = loadImage('images/silverSword.png');
  rapier = loadImage('images/rapier.png');
  treeBranch = loadImage('images/treeBranch.png');
  berry = loadImage('images/berry.png');
  apple = loadImage('images/apple.png');
  elixir = loadImage('images/elixir.png');
  
  font = loadFont('assets/Mermaid1001.ttf');
  
}


function setup() {
  createCanvas(800, 800);
 
  textFont(font);
  
  generateTutorial();
  generateWorld();
  
}

function draw() {
  background(220);
  
  if(gameState === 'intro'){
    //display introduction screen
    displayIntro();
  }
  
  if(gameState === 'tutorial'){
    //display tutorial
    rectMode(CORNER);
    displayTutorial();
  }
  
  if(gameState === 'start'){
  //curr = 0;
  rectMode(CORNER);
  textAlign(LEFT);
  image(gamebg,0,0,width,height);
  playerOne.show();
  playerOne.move(inventoryMenu);
  currSword.show(playerOne);
  currSword.swing(inventoryMenu);
  
  
  for(let i=0; i<trees.length; i++){
    trees[i].show();
    let h = checkCollision(trees[i],playerOne);
    if(h){
      //stop moving;
      //stop moving on the left
      if(playerOne.x < trees[i].x + trees[i].size && playerOne.y + playerOne.size/2 > trees[i].y){
        playerOne.x = trees[i].x- playerOne.size/2;
      }
      
      //stop moving on the right
      if(playerOne.x > trees[i].x && playerOne.y+ playerOne.size/2 > trees[i].y){
        playerOne.x = trees[i].x + trees[i].size + playerOne.size/2;
      }
    }
    
  }
    
    chestOp(chests,chestmenu,playerOne);
    
    enemiesOp(enemies,playerOne,currSword);

    
    if(inventoryMenu === true){
    //open inventory menu
    inventory(weaponInventory,itemInventory);
  }
    
    //display hp bar  
    displayHP(playerOne, health);

    
    //display how many coins are left
    // fill(255);
    // square(275,10, 20);
    textSize(15)
    fill(255);
    image(coin,275,10,20,20);
    text(coinsCollected + '/15', 300,25);
    
    //display how many enemies are left
    // fill(255);
    // square(350,10, 20);
    image(monsterLeft,350,10,20,20);
    fill(255);
    text(enemiesKilled + '/5', 375,25);
    
    let win = checkWin();
    if(win){
      gameState ='won';
      //resetGame();
    }

  }
  
  if(gameState === 'won'){
    //play a sound
    image(bg,0,0,width,height);
    // fill(255)
    // rect(0,0,width,height);
    textSize(60)
    rectMode(CENTER)
    textAlign(CENTER)
    fill('#A64735')
    text('You Win!', width/2,height/4);
    noFill();
    stroke(0)
    strokeWeight(2);
     if(mouseX >= width/2-50 && mouseX < width/2+50 && mouseY >= height/2-15 && mouseY <= height/2 +15){
      stroke('#FEDC4E')
      strokeWeight(2)
    }
    rect(width/2, height/2, 100, 30);
    fill(0);
    noStroke();
    textSize(15)
         if(mouseX >= width/2-50 && mouseX < width/2+50 && mouseY >= height/2-15 && mouseY <= height/2 +15){
      fill('#FEDC4E')
    }
    text('Play Again', width/2, height/2+5);
  }

  
  if(gameState === 'gameOver'){
    //draw game over screen
    background('#244222');
    image(shroom, width/2-60,height/2-60,120,120)
    textAlign(CENTER);
    rectMode(CENTER);
    fill('#A64735');
    textSize(60)
    text('Game Over!', width/2, height/3);
    
    noFill()
    stroke(255)
    strokeWeight(2)
    if(mouseX>=width/2-75 && mouseX <= width/2+75 && mouseY >= height*2/3-75 && mouseY <= height*2/3+75){
      stroke('#FEDC4E');
    }
    rect(width/2 ,height*2/3,150,50);
    
    fill(255);
    noStroke();
    textSize(20)
        if(mouseX>=width/2-75 && mouseX <= width/2+75 && mouseY >= height*2/3-75 && mouseY <= height*2/3+75){
      fill('#FEDC4E');
    }
    text('Play Again', width/2, height*2/3 +5);
  }
}


function mousePressed(){
  if(gameState === 'intro'){
    //press play to play
    if(mouseX >= width/2-100-50 && mouseX <= width/2 -50 && mouseY >= height/2 -15 && mouseY <= height/2+15){
    gameState = 'tutorial';
  }

     if(mouseX >= width/2 +50 && mouseX <= width/2 +150 && mouseY >= height/2 -15 && mouseY <= height/2+15){
    gameState = 'start';
  }
    

  }
  
  if(gameState === 'tutorial'){
    //press to go back to intro menu
    if(tutScene === 3 && !tutorialEnemy[0]){
      if(mouseX >= width/2-50 && mouseX <= width/2 + 50 && mouseY >= height/2+150-25 && mouseY <= height/2 + 150+25){
        gameState = 'start';
      }
    }
  }
  
  if(gameState === 'won'){
    //rect(width/2, height/2, 100, 30);
    if(mouseX >= width/2-50 && mouseX < width/2+50 && mouseY >= height/2-15 && mouseY <= height/2 +15){
      gameState = 'intro';
      resetGame();
      resetTutorial();
    }
  }
  
  if(gameState === 'gameOver'){
    //press to return to intro screen
        if(mouseX>=width/2-75 && mouseX <= width/2+75 && mouseY >= height*2/3-75 && mouseY <= height*2/3+75){
      gameState = 'intro';
      resetGame();
      resetTutorial();
    }
    // if(mouseX>=width/2-75 && mouseX < width/2+75 && mouseY >= height*2/3-25 && mouseY <= height*2/3+25){
    //   gameState = 'intro';
    //   resetGame();
    //   resetTutorial();
    // }
   //rect(width/2-75,height*2/3-25,150,50);
  }
}

function keyPressed(){
  if(key === 'z'){
    if(gameState === 'start'){
      inventoryMenu = inventoryOp(inventoryMenu);
      print('game')
    } else if (gameState === 'tutorial'){
      print('tut')
      tutInventoryMenu = inventoryOp(tutInventoryMenu);
    }

  }
  
  
  if(keyCode === RIGHT_ARROW ){
    if(gameState === 'start'){
inventoryRight(weaponInventory,itemInventory,inventoryMenu);
    }
    
    if(gameState === 'tutorial'){
inventoryRight(tutorialWeapons,tutorialItems,tutInventoryMenu);
    }

    
  }
  
  if(keyCode === LEFT_ARROW ){
        if(gameState === 'start'){
inventoryLeft(weaponInventory,itemInventory,inventoryMenu);
    }
    
    if(gameState === 'tutorial'){
inventoryLeft(tutorialWeapons,tutorialItems,tutInventoryMenu);
    }

    
  }
  
  if(keyCode === DOWN_ARROW){
    if(gameState === 'start'){
inventoryDown(weaponInventory,itemInventory,inventoryMenu);
    }
    
    if(gameState === 'tutorial'){
inventoryDown(tutorialWeapons,tutorialItems,tutInventoryMenu);
    }

  }
  
  if(keyCode === UP_ARROW){
        if(gameState === 'start'){
inventoryUp(weaponInventory,itemInventory,inventoryMenu);
    }
    
    if(gameState === 'tutorial'){
inventoryUp(tutorialWeapons,tutorialItems,tutInventoryMenu);
    }
    

  }
  
  //press enter to equip
  if(keyCode === 13 && inventoryMenu === true && gameState === 'start'){

    //equip selected weapon/use selected item if it exists at currently selected slot
    if(curr < 6 && weaponInventory[curr].item){
      currSword = weaponInventory[curr].item;
    }
    if(curr >= 6 && itemInventory[curr-6].item){
      itemInventory[curr-6].use(playerOne);
      itemInventory[curr-6].reset();
    }
    //inventoryMenu = false;
  }
  
  if(keyCode === 13 && tutInventoryMenu === true && gameState === 'tutorial'){
    if(curr < 6 && tutorialWeapons[curr].item){
      showSword = true;
    }
    if(curr >= 6 && tutorialItems[curr-6].item){
      tutorialItems[curr-6].use(tutorialPlayer);
      tutorialItems[curr-6].reset();
      itemUsed = true;
    }
    
  }
  
  if(key === 'c' && gameState === 'start'){
    if(currChest){
    currChest.open(weaponInventory, itemInventory);
    coinsCollected += currChest.coins;
    currChest = null;
    print(weaponInventory, itemInventory)
    }
  }
  
  if(key === 'c' && gameState === 'tutorial'){
    currChest.open(tutorialWeapons,tutorialItems);
  }
}

