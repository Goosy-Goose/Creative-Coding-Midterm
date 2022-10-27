class Character{
  constructor(name, maxHP, normalAtk, specialAtk, specCD, ultAtk, ultCD, isUser, charImg, skillImgs, hpImg, shieldImgs){
    this.name = name;
    this.maxHP = maxHP;
    this.normalAtk = normalAtk;
    this.specialAtk = specialAtk;
    this.specCD = specCD;
    this.ultAtk = ultAtk;
    this.ultCD = ultCD;
    this.isUser = isUser;
    this.charImg = charImg;
    this.skillImgs = skillImgs;
    this.hpImg = hpImg;
    this.shieldImgs = shieldImgs;
    this.hp = maxHP;
    this.canNormalAtk = true;
    this.normActive = false;
    this.canSpecAtk = true;
    this.canUltAtk = true;
  }
  
  checkCanNormalAtk(){
    if(this.canNormalAtk && !this.isBlocking){
      this.canNormalAtk = false;
      return true;
    }else{
      return false;
    }
  }

  checkCanSpecialAtk(){
    if(this.canSpecAtk && !this.isBlocking){
      this.canSpecAtk = false;
      return true;
    }else{
      return false;
    }
  }

  checkCanUltAtk(){
    if(this.canUltAtk && !this.isBlocking){
      this.canUltAtk = false;
      return true;
    }else{
      return false;
    }
  }

  takeDamage(damageTaken){
    if(this.isBlocking){
      this.hp = this.hp - (damageTaken * (1-this.blockDef/100));
    }else{
      this.hp -= damageTaken;
    }
  }

  displayChar(fullCanvWidth, canvHeight){
    let canvWidth = fullCanvWidth/2;
    imageMode(CENTER);
    if(this.isUser){//images to display for user
      this.displayHealth(canvWidth, 0); //box of health
      image(this.hpImg, canvWidth/2, canvHeight/12); //health bar
      image(this.charImg, canvWidth/2, canvHeight/2) // character sprite
      if(this.canSpecAtk){ //special atk indicators
        image(this.skillImgs[0], canvWidth/3, canvHeight-60)
      }else if(!this.canSpecAtk){
        image(this.skillImgs[1], canvWidth/3, canvHeight-60)
      }
      if(this.canUltAtk){ //ult atk indicators
        image(this.skillImgs[2], canvWidth/3*2, canvHeight-60)
      }else if(!this.canUltAtk){
        image(this.skillImgs[3], canvWidth/3*2, canvHeight-60)
      }
      this.displayNormAtk(canvWidth-this.skillImgs[5].width - 10, canvHeight/6*5);
      if(this.isBlocking){
        image(this.shieldImgs[0], canvWidth-this.shieldImgs[0].width-10, canvHeight/2);
      }
      if(this.canBlock){
        image(this.shieldImgs[1], canvWidth-this.shieldImgs[1].width - 10, canvHeight/6*5+this.shieldImgs[1].width + 5)
      }
    }else{//images to display for cpu
      this.displayHealth(canvWidth, canvWidth);//box of health
      image(this.hpImg, canvWidth/2 + canvWidth, canvHeight/12); //health bar
      image(this.charImg, canvWidth + canvWidth/2, canvHeight/2); // character sprite
      if(this.canSpecAtk){//special atk indicators
        image(this.skillImgs[0], canvWidth/3 + canvWidth, canvHeight-60)
      }else if(!this.canSpecAtk){
        image(this.skillImgs[1], canvWidth/3 + canvWidth, canvHeight-60)
      }
      if(this.canUltAtk){ //ult atk indicators
        image(this.skillImgs[2], canvWidth/3*2 + canvWidth, canvHeight-60)
      }else if(!this.canUltAtk){
        image(this.skillImgs[3], canvWidth/3*2 + canvWidth, canvHeight-60)
      }
      this.displayNormAtk(canvWidth+this.skillImgs[5].width+10, canvHeight/6*5);
    }
  }

  displayHealth(halfWidth, leftEdge){
    fill(232, 238, 242);
    rect(0 + leftEdge, 0, halfWidth, 400);
    let leftSideVal = halfWidth*27/110 + leftEdge;
    let hpIndicator = map(this.hp, 0, this.maxHP, 0, 280)
    fill(196,46,60);
    rect(leftSideVal, 65, hpIndicator, 20);
  }

  displayNormAtk(x, y){
    if(this.normActive){
      image(this.skillImgs[4], x, y);
    }else{
      image(this.skillImgs[5], x, y);
    }
    
  }

  displayCharStats(x, y){
    push()
    textAlign(LEFT);
    text("HP: " + this.hp + 
         "\nNormal Atk: " + this.normalAtk + 
         "\nSpecial Atk: " + this.specialAtk + "  (Cooldown: " + this.specCD + ")" + 
         "\nUlt Atk: " + this.ultAtk + "  (Cooldown: " + this.ultCD + ")", x, y);
    pop();
  }


  
}