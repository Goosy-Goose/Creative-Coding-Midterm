class StartScreen{
  constructor(charList, canvWidth, canvHeight){
    this.charList = charList;
    this.buttonWidth = canvWidth/charList.length;
    this.buttonHeight = canvHeight/6;
    this.charDisplayed;
  }

  getCharDisplayed(){
    return this.charDisplayed;
  }

  displayStartScreen(){
    for (let i=0; i<this.charList.length; i++){
      this.displayButton(i, this.getButtonColor(i));
    }
  }

  displayButton(charIndex, color){
    fill(color);
    rect(charIndex*this.buttonWidth, this.buttonHeight -this.buttonHeight, this.buttonWidth+this.buttonWidth, this.buttonHeight);
    imageMode(CENTER);
    textAlign(CENTER);
    fill(0);
    textSize(this.buttonWidth*0.1);
    text(this.charList[charIndex].name, charIndex*this.buttonWidth+this.buttonWidth/2, this.buttonHeight/2);
    //depending on charIndex, access the selectionSprite for charList[charIndex] and display
  }

  getButtonColor(charIndex){
    if(this.charDisplayed === charIndex){
      return color(119, 182, 234); //selection indicated color
    }
    if(this.checkInButton(charIndex)){
      return color(199, 211, 221);
    }
    return color(232, 238, 242); //same as background color
  }

  checkInButton(charIndex){
    let inButtonX = mouseX>=charIndex*this.buttonWidth && mouseX<charIndex*this.buttonWidth+this.buttonWidth;
    let inButtonY = mouseY>=0 && mouseY<=this.buttonHeight;
    if(inButtonX && inButtonY){
      return true;
    }
    return false;
  }

  checkCharChosen(){
    if(this.charDisplayed===undefined){
      return false;
    }else {
      return true;
    }
  }

  mPressed(){
    for(let i=0; i<this.charList.length; i++){
      if(this.checkInButton(i)){
        this.charDisplayed = i;
      }
    }
  }
}