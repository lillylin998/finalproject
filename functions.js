
function displayHP(player, h){
    h = player.hp;
    h = map(h, 0, 20, 0, 100);
   // print(health);
  textAlign(LEFT);
  textSize(15)
  noStroke();
    fill(255)
    rect(10,10,250,20);
    fill('#E5503C')
    rect(10,10,h,20);
    fill(255);
    text('HP', 10, 50);
    text(player.hp + '/50', 225,50);
}

function displayIntro(){
  image(bg,0,0,width,height);
  
  textAlign(CENTER);
  rectMode(CENTER);
  fill('#A64735');
  textSize(100);
  text('SELKIE', width/2, height/2 - 100);
  
  //tutorial button
  //fill(255);
  noFill();
  strokeWeight(2);
  stroke(255);
      if(mouseX >= width/2-100-50 && mouseX <= width/2 -50 && mouseY >= height/2 -15 && mouseY <= height/2+15){
    stroke('#FFDD4D');
  }
  rect(width/2 - 100, height/2, 100,30);
  fill(255);
  noStroke();
  textSize(20);
    if(mouseX >= width/2-100-50 && mouseX <= width/2 -50 && mouseY >= height/2 -15 && mouseY <= height/2+15){
    fill('#FFDD4D');
  }
  text('tutorial', width/2-100, height/2+5);
  
  //play button
  //fill(255);
  noFill();
  strokeWeight(2);
  stroke(255);
    if(mouseX >= width/2 +50 && mouseX <= width/2 +150 && mouseY >= height/2 -15 && mouseY <= height/2+15){
    stroke('#FFDD4D');
  }
  rect(width/2 + 100, height/2, 100,30);
  fill(255);
  noStroke();
  textSize(20);
    if(mouseX >= width/2 +50 && mouseX <= width/2 +150 && mouseY >= height/2 -15 && mouseY <= height/2+15){
    fill('#FFDD4D');
  }
  text('play', width/2+100, height/2 +5);
}


function resetGame(){
playerOne = null;
currSword = null;
chestopen = false;
currChest = null;
chestmenu = false;
//let count = 0;
weaponInventory = [];
itemInventory = [];
inventoryBoxes = [];
curr = 0;
inventoryMenu = false;
health = 50;
coinsCollected = 0;
enemiesKilled = 0;
level = 1;
enemies = [];
trees = [];
grass = [];
chests = [];
  
generateWorld();
}

function resetTutorial(){
tutorialPlayer = null;
tutorialSword = null;
tutorialItem = null;
tutorialChest = [];
tutorialEnemy = [];
tutorialWeapons = [];
tutorialItems = [];
tutorialMenu = false;
tutInventoryMenu = false;
timer = 0;
tutScene = 1;
showSword = false;
itemUsed = false;
tHealth = 25;
  
generateTutorial();
}

function checkWin(){
  if(enemiesKilled === 5 && coinsCollected === 15){
    return true;
  } else {
    return false;
  }
}


function enemiesOp(e,player,sword){
    for(let i=0; i<e.length; i++){
  e[i].show();
  e[i].move();  
  
  let h = checkCollision(e[i], player);
    //check if sword is hitting enemy
  let sh = checkSwordCollision(e[i],sword); 
  if(h && e[i].isDead === false){
    //decrease character HP
    player.hp -= 2;
    
    //bump character back
    if(e[i].x > player.x){
      player.x -= 50;
    } else if (player.x > e[i].x) {
      player.x += 50;
    }
  }
    
  if(sh && e[i].isDead === false){
    //decrease enemy HP by sword attack
    e[i].hp -= sword.atk;
    
    //bump enemy back
    if(e[i].x > player.x){
      e[i].x += 5;
    } else if (player.x > e[i].x) {
      e[i].x -= 5;
    }
  }
    
    e[i].checkDead();
    player.checkDead();
  
  if(player.isDead === true){
    gameState = 'gameOver';
    print('game over!');
  }

    if(e[i].isDead === true){
      e.splice(i,1);
      if(gameState === 'start'){
      enemiesKilled++;
      }
    }
  }
}

function inventory(weapons,items){
  fill('#E9D5AA')
  rect(0,height-225, width, 225);
  //fill(0);
  //text("inventory",0,windowHeight-200);
  
  //show items
  for(let i = 0; i<6; i++){  
    weapons[i].show();
  }
  
  for(let i = 0; i<itemInventory.length; i++){
    items[i].show();
  }
  
  //select a weapon/item using arrow keys and enter
  
}


function inventoryOp(menu){
   if(menu === false){
     print('hello')
      menu = true;
      return menu;
    } else{
      menu = false;
      return menu;
    }
}

function inventoryRight(weapons,items,menu){
  if(menu === true){
  if(curr < 5){
      curr++;
      
      if(curr > 0 && curr < 6){
        weapons[curr-1].selected = false;
        weapons[curr].selected = true;
      }
    }
    
    if(curr >= 6 && curr < 11){
      curr++;
      items[curr-7].selected = false;
      items[curr-6].selected = true;
    }
    
    return curr;
  }
}

function inventoryLeft(weapons,items,menu){
  if(menu === true){
      if(curr > 0 && curr < 6){
    curr--;
    
      if(curr < 6){
        weapons[curr+1].selected = false;
        weapons[curr].selected = true;
      }
    }
    
    if(curr > 6 && curr < 12){
      curr--;
      items[curr-5].selected= false;
      items[curr-6].selected = true;
    }
    
    return curr;
  }
}

function inventoryDown(weapons,items,menu){
  if(menu === true){
        if(curr<6){
      weapons[curr].selected = false;
      curr+=6;
      items[curr-6].selected = true;
  }
    return curr;
  }
}

function inventoryUp(weapons,items,menu){
  if(menu === true){
        if(curr >5 && curr < 12){
      curr-= 6;
      items[curr].selected = false;
      weapons[curr].selected = true;
    }
    return curr;
  }
}


function chestOp(chestArr, menu, player){
    textAlign(LEFT);
    textSize(15);
    for(let i=0; i<chestArr.length; i++){
    chestArr[i].show();
    let h = checkCollision(chestArr[i],player);
    
    if(h){
      if(chestArr[i].opened === false){
      //display press c to open
      menu = true;
      fill(255)
      rect(chestArr[i].x+2,chestArr[i].y-10,100,15);
      fill(0)
      text('press c to open',chestArr[i].x+5,chestArr[i].y);
      currChest = chestArr[i];
      } else {
        if(chestArr[i].sword != 0){
          fill(0);
        text('+' + chestArr[i].sword.name, chestArr[i].sword.x, chestArr[i].sword.y - 40);
        }
        if(chestArr[i].item != 0){
          fill(0);
        text('+' + chestArr[i].item.name, chestArr[i].item.x, chestArr[i].item.y - 20);
        }
        menu = false;
      }
      
      }
    }
}



function displayTutorial(){
  image(gamebg,0,0,width,height);
  textAlign(CENTER);
  textSize(20);
  tutorialPlayer.show();
  tutorialPlayer.move(tutInventoryMenu);
  
  
  if(tutScene === 1){
  fill(0);
  noStroke();
  text('use arrow keys to move', width/2, height/5);
  //image of arrow keys
  
  if(millis() - timer > 3000){
    //show arrow to proceed to next screen
    fill('#E5503C');
    stroke(255);
    triangle(width - 50, height/2 - 10, width-50, height/2 + 10, width - 25, height/2);
     }
    
    if(tutorialPlayer.x - tutorialPlayer.size >= width){
      tutorialPlayer.x = 0;
      tutScene = 2;
    }
  }
  
  if(tutScene === 2){
    
  fill(0);
  noStroke();
  textSize(20)
  text('press c to open chests', width/2, height/5);
  tutorialChest[0].show();
  
  chestOp(tutorialChest,tutorialMenu,tutorialPlayer);
  //if the chest is open, display text to show inventory
    
  textAlign(CENTER);
  if(tutorialChest[0].opened === true){
    fill(0);
    text('press z to show inventory', width/2, height/5+20);
    
  }  
  //if inventory is open, display text to say what each weapon/health item does
  
  if(tutInventoryMenu === true){
    inventory(tutorialWeapons,tutorialItems);
    noStroke();
    fill(0);
    textAlign(LEFT);
    text('use arrow keys to select items', 10, height-275);
    text('try selecting your first weapon by pressing enter', 10, height-250)
  }
    
  if(showSword === true){
      tutorialSword.show(tutorialPlayer);
      tutorialSword.swing(tutInventoryMenu);
      //show health bar
    if(tutInventoryMenu){
      noStroke();
      text('now try selecting the item. items replenish health', 10, height - 225);
      displayHP(tutorialPlayer, tHealth);
    }
    }
    
    if(itemUsed === true){
      //play a sound or something
      displayHP(tutorialPlayer, tHealth);

      textAlign(CENTER);
      noStroke();
      fill(0);
      text('press z again to close inventory', width/2, height/5+40)
    }
    
    //triangle appears to continue
    if(tutInventoryMenu === false && itemUsed === true){
    displayHP(tutorialPlayer, tHealth);
    fill('#E5503C');
    stroke(255);
    triangle(width - 50, height/2 - 10, width-50, height/2 + 10, width - 25, height/2);
    }
  
    if(tutorialPlayer.x - tutorialPlayer.size >= width){
      tutorialPlayer.x = 0;
      tutScene = 3;
    }
  }
  
  if(tutScene === 3){
      tutorialSword.show(tutorialPlayer);
      tutorialSword.swing(tutInventoryMenu);
      displayHP(tutorialPlayer, tHealth);

    noStroke();
    fill(0);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(20);
    text('press spacebar to swing sword and damage enemies', width/2, height/5);
    enemiesOp(tutorialEnemy,tutorialPlayer,tutorialSword);
    if(!tutorialEnemy[0]){
      fill(0);
      noStroke();
      text('yay! a few more things:', width/2,height/5+20);
      text('to clear the level, make sure', width/2,height/5+40);
      fill(255)
      text(' there are no enemies left standing,', width/2, height/5+60);
      fill(0)
      text('and that you\'ve', width/2, height/5+80);
      fill(255)
      text(' collected all the coins in the chests.', width/2, height/5+100);
      //press a button to start game
      noFill();
      stroke(255);
      strokeWeight(2);
      if(mouseX >= width/2-50 && mouseX <= width/2 + 50 && mouseY >= height/2+150-25 && mouseY <= height/2 + 150+25){
       stroke('#FEDC4E');       
      }

      rect(width/2,height/2+150,100,50);
      
      noStroke();
      fill(255);
            if(mouseX >= width/2-50 && mouseX <= width/2 + 50 && mouseY >= height/2+150-25 && mouseY <= height/2 + 150+25){
       fill('#FEDC4E');       
      }
      text('start game', width/2, height/2+155);
    }
  }
  
}

function generateTutorial(){
  tutorialPlayer = new Player(width/2, height/2);
  tutorialPlayer.hp = 25;
  tutorialSword = new Sword(tutorialPlayer.x, tutorialPlayer.y, 10, 'tree branch', 1,treeBranch);
  tutorialItem = new Item(width/2,height/2,5,'berry',5,berry);
  tutorialChest.push(new Chest(width/2, height/2));
  tutorialChest[0].sword = tutorialSword;
  tutorialChest[0].item = tutorialItem;
  tutorialEnemy.push(new Enemy(width/2, height/2));
  
  let boxWidth = width/6;
  for(let i = 0; i<6; i++){
    tutorialWeapons.push(new Inventory(((boxWidth*(i))+boxWidth/6),height - 205,boxWidth*4/6));
  }
  
  for(let i = 0; i<6; i++){
    tutorialItems.push(new Inventory(((boxWidth*(i))+boxWidth/6),height - 105,boxWidth*4/6));
  }
  
  tutorialWeapons[0].selected = true;
}


function generateWorld(){
  
  //generate player
  playerOne = new Player(width/10, height/2);

  //generate enemies
  for(let i=0; i<level*5; i++){
  enemies.push(new Enemy(random(width/10 + 20,width-50),random(20,height-50)));
  }
  
  //generate trees
  for(let i=0; i< level*15; i++){
    trees.push(new Tree(random(width), random(height)));
  }
  
  //generate chests
  for(let i=0; i<level*5; i++){
    chests.push(new Chest(random(width/10 + 20, width-20), random(20,height-20)));
    chests[i].contents();
  }

  
  //generate inventory slots
  let boxWidth = width/6;
  for(let i = 0; i<6; i++){
    weaponInventory.push(new Inventory(((boxWidth*(i))+boxWidth/6),height - 205,boxWidth*4/6));
  }
  
  for(let i = 0; i<6; i++){
    itemInventory.push(new Inventory(((boxWidth*(i))+boxWidth/6),height - 100,boxWidth*4/6));
  }
  
  //set sword to default
  weaponInventory[0].set(null,'tree branch', new Sword(playerOne.x, playerOne.y, 10, 'tree branch', 1,treeBranch));
  currSword = weaponInventory[0].item;
  weaponInventory[0].selected = true;
  
}

function checkCollision(a,b){
  let hit = collideRectCircle(a.x, a.y, a.size, a.size, b.x, b.y,b.size)
  
  if(hit){
    return hit;
  }
}

function checkSwordCollision(a,b){
  let hit;
  if(b.use === false && playerOne.faceRight === true){
  //rect(this.x, this.y-this.ysize, this.xsize, this.ysize);
  hit = collideRectRect(a.x,a.y,a.size,a.size,b.x,b.y-b.ysize,b.xsize,b.ysize);
  }
  
  if(b.use === false && playerOne.faceLeft === true){
  //rect(this.x-this.xsize*3, this.y-this.ysize, this.xsize, this.ysize);
  hit = collideRectRect(a.x,a.y,a.size,a.size,b.x-b.xsize*3,b.y-b.ysize,b.xsize,b.ysize);
  }
  
  if(b.use === true && playerOne.faceRight === true){
  //rect(this.x, this.y, this.ysize, this.xsize);
  hit = collideRectRect(a.x,a.y,a.size,a.size,b.x,b.y,b.ysize,b.xsize);
  }
  
  if(b.use === true && playerOne.faceLeft === true){
  //rect(this.x-this.xsize*3 -this.ysize,this.y-this.xsize,this.ysize,this.xsize);
  hit = collideRectRect(a.x,a.y,a.size,a.size,b.x-b.xsize*3-b.ysize,b.y-b.xsize,b.ysize,b.xsize);
  }
  
  if(hit){
    return hit;
  }
}