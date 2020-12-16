class Tree{
  constructor(x,y){
    this.x = x; 
    this.y = y;
    this.size = 20;
    this.img = shroom;
  }
  
  show(){
    image(this.img,this.x-5,this.y-5,this.size+10,this.size+10);
    // fill(0,255,0);
    // stroke(0);
    // strokeWeight(1);
    // rect(this.x,this.y,20,20);
  }
}

class Chest{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.opened = false;
    this.size = 15;
    this.sword = floor(random(0,4));
    this.item = floor(random(0,4));
    this.coins = 3;
    this.closedImg = chestClosed;
    this.openedImg = chestOpen;
  }
  
  show(){
    // fill(255,0,0);
    // stroke(0);
    // strokeWeight(1);
    // rect(this.x,this.y,20,10);
    if(this.opened === false){
      
    image(this.closedImg, this.x-5, this.y-10, 30,30)

    }
    if(this.opened === true){
    
    image(this.openedImg, this.x-5, this.y-10,30,30);
    }
  }
  
  open(weapons, items){
    this.opened = true;
    
    if(this.sword != 0){
          print('+' + this.sword.name);
    
          for(let i=0; i<weapons.length; i++){
            if(weapons[i].item === null){
                  weapons[i].set(this.sword.img,this.sword.name,this.sword);
                   //print(weapons[i])
              break;
            } else {
               continue;
            }
          }
        }
    
    if(this.item != 0){
      print('+' + this.item.name);
          
      for(let i=0; i<items.length; i++){
        if(items[i].item === null){
          
  items[i].set(this.item.img, this.item.name, this.item);
          //print(items[i])
          break;
        } else {
          continue;
        }
      }
    }

    
  }
  
  contents(){
    //if there is a sword in this chest
    if(this.sword > 0){
      let typeSword = floor(random(0,3));
      if (typeSword === 0){
        //insert steel sword
        this.sword = new Sword(this.x,this.y,10,'steel sword',10,steelSword);
      } else if (typeSword === 1){
        //insert silver sword
        this.sword = new Sword(this.x,this.y,10,'silver sword',15,silverSword);
      } else{
        //insert rapier
        this.sword = new Sword(this.x,this.y,10,'rapier',12,rapier);
      }
    }
    
    //if there is an item in this chest
    if(this.item > 0){
     let typeItem = floor(random(0,3));
     if (typeItem === 0){
        //insert apple
        this.item = new Item(this.x,this.y,5,'apple',5,apple);
      } else if (typeItem === 1){
        //insert berry
        this.item = new Item(this.x,this.y,5,'berry',5,berry);
      } else{
        //insert elixir
        this.item = new Item(this.x,this.y,5,'health elixir',10,elixir);
      }
      print(this.item)
    }
  }
  
}

class Sword{
  constructor(x,y,size,name,atk,img){
    this.x = x;
    this.y = y;
    this.xsize = size;
    this.ysize = size*4;
    this.name = name;
    this.atk = atk;
    this.use = false;
    this.img = img;
  }
  
  show(player){
    this.x = player.x+10;
    this.y = player.y+10;
    stroke(0);
    strokeWeight(1);
        if(this.name === 'tree branch'){
          this.img = treeBranch;
        }
        if(this.name === 'steel sword'){
          this.img = steelSword;
        }
        if(this.name === 'silver sword'){
          this.img = silverSword;
        }
        if(this.name === 'rapier'){
          this.img = rapier;
        }
    if(this.use === false && player.faceRight===true){

    //rect(this.x, this.y-this.ysize, this.xsize, this.ysize);

    image(this.img,this.x, this.y-this.ysize-5, this.xsize+5, this.ysize+8);
    }
    if(this.use === false && player.faceLeft===true){
    // rect(this.x-this.xsize*3, this.y-this.ysize, this.xsize, this.ysize);
    
    image(this.img, this.x-this.xsize*3,this.y-this.ysize-5,this.xsize+5, this.ysize+8);
    }
    if(this.use === true && player.faceRight === true){
    //rect(this.x, this.y, this.ysize, this.xsize);
      
    push();
    translate(this.x+this.ysize,this.y);
    rotate(PI/2);
    image(this.img, 0, 0, this.xsize+5, this.ysize+8);
    pop();
      
    this.use = false;
    }
    if(this.use === true && player.faceLeft === true){
    //rect(this.x-this.xsize*3 -this.ysize,this.y-this.xsize,this.ysize,this.xsize);
      
    push();
    translate(this.x-this.xsize*3-this.ysize,this.y);
    rotate(-PI/2);
    image(this.img, 0, 0, this.xsize+5, this.ysize+8);
    pop();
    this.use = false;
    }
  }
  
  swing(m1){
    if(keyIsDown(32) && m1 === false){
    this.use = true;
    }
  }
  
}

class Item{
  constructor(x,y,size,name,health,img){
    this.x = x;
    this.y = y;
    this.size = size;
    this.name = name;
    this.health = health;
    this.img = img;
    this.used = false;
  }
  
  // set(){
  //   if(this.name === 'apple'){
  //   this.img = apple;
  //   } else if (this.name === 'berry'){
  //   this.img = berry;
  //   } else if (this.name === 'health elixir'){
  //   //this.img = elixir
  //   }
  // }
  
//   show(inventory){
//     this.x = inventory.x;
//     this.y = inventory.y;
//     rect(this.x,this.y,this.size,this.size)
    
//     if(name === 'apple'){
//     this.img = apple;
//     } else if (name === 'berry'){
//     this.img = berry;
//     } else if (name === 'health elixir'){
//     //this.img = elixir
//     }
    
//     image(this.img, this.x, this.y, this.size, this.size);
//   }
  
  use(player){
    player.hp += this.health;
    this.used = true;
  }
}

class Inventory{
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = null;
    this.itemName = null;
    this.item = null;
    this.selected = false;
  }
  
  show(){
    noFill();
    if(this.selected === true){
      strokeWeight(4);
      stroke(255,0,0);
      fill('#C19D76');
    } else if(this.selected === false){
      strokeWeight(2);
      stroke('#725130');
      fill('#C19D76');
      //noStroke();
    }
    rect(this.x, this.y, this.size, this.size);

    if(this.itemName){
    fill(0);
    noStroke();
    textAlign(LEFT);
    text(this.itemName, this.x, this.y - 2);
    }
    
   if(this.item){
      this.img = this.item.img;
     if(this.img === berry || this.img === apple || this.img === elixir){
      image(this.img, this.x, this.y, this.size, this.size);
      text('+' + this.item.health + ' health', this.x, this.y + this.size + 15);
     } else {
      push();
      translate(this.x+this.size-10,this.y);
      rotate(PI/4);
      image(this.img, 0,0, this.item.xsize*2.5, this.item.ysize*2.5);
       
      pop();
      text('+' + this.item.atk + ' atk', this.x, this.y + this.size + 15);
     }
   }
    //if(this.img)
    //image(this.img,this.x,this.y,this.size,this.size);
  }
  
  set(img, name, obj){
    this.img = img; //image object
    this.itemName = name; //a string
    this.item = obj; // the weapon/item
  }
  
  //for items only not weapons
  use(player){
    player.hp += 5;
    if(player.hp >50){
      player.hp = 50;
    }
    print(player.hp)
  }
  
  reset(){
    this.img = null;
    this.itemName = null;
    this.item = null;
   // this.selected = false;
  }
  
  
}
