class Player {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 1.5;
    this.vy = 1.5;
    this.size = 40;
    this.isDead = false;
    this.hp = 20;
    this.faceLeft = false;
    this.faceRight = true;
    this.imgRight = fairyRight;
    this.imgLeft = fairyLeft;
  }
  
  show(){
    fill(255);
    stroke(0);
    strokeWeight(1);
    if(this.faceRight === true){
    //insert image
    //   fill(255);
    // ellipse(this.x, this.y, this.size);
    image(this.imgRight, this.x-this.size/2-10, this.y-this.size/2-10, this.size+15, this.size+15);
    
    }
    if(this.faceLeft === true){
    //insert left image
    // fill(255);
    // ellipse(this.x, this.y, this.size);
      image(this.imgLeft, this.x-this.size/2-10, this.y-this.size/2-10, this.size+15, this.size+15);
    }
  }
  
  move(menu){
    if(!menu){
    if(keyIsDown(RIGHT_ARROW)){
      this.x += this.vx;
      this.faceRight = true;
      this.faceLeft = false;
    }
    if(keyIsDown(LEFT_ARROW)){
      this.x += -this.vx;
      this.faceLeft = true;
      this.faceRight = false;
    }
    if(keyIsDown(UP_ARROW)){
      this.y += -this.vy;
    }
    if(keyIsDown(DOWN_ARROW)){
      this.y += this.vy;
    }
    }
  }
  
  checkDead(){
    if(this.hp <=0){
      this.isDead = true;
    }
  }
  
}

class Enemy{
  constructor(x,y){
    this.ox = x; //original position
    this.x = x;
    this.y = y;
    this.vx = random(0.2,1);
    this.deltaX = 0;
    this.size = 40;
    this.isDead = false;
    this.hp = 35;
    this.leftImg = monsterLeft;
    this.rightImg = monsterRight;
  }
  
  show(){
    rectMode(CORNER);
    if(this.isDead === false){
    // fill(0);
    // stroke(0);
    // strokeWeight(1);
    // rect(this.x,this.y, this.size, this.size);
      
    if(this.vx > 0){
      image(this.rightImg, this.x, this.y, this.size, this.size)
    } else if (this.vx <0 ){
      image(this.leftImg, this.x, this.y, this.size, this.size)
    }
    
    //draw enemy health bar
    fill(255,0,0);
    noStroke();
    let health = map(this.hp,0,35,0,this.size);
    rect(this.x,this.y-10,health,2);
    } 
  }
  
  move(){
    this.x+= this.vx;
    if(this.x > this.ox + 20 || this.x < this.ox - 20){
      this.vx = -this.vx;
    }
    
    
  }
  
  checkDead(){
    if(this.hp <=0){
      this.isDead = true;
    }
  }
}