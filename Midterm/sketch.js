var CharChosen;
var CharList;
var UserChar;
var EnemyChar;

var tank;
var dps;
var subDPS;
var balanced;
var skillImgs;
var shieldImgs;

var user;
var cpu;

var FirstPlaythrough

function preload(){
  tankImg = loadImage('Tank_Character_Img.png');
  dpsImg = loadImage('Dps_Character_Img.png');
  subImg = loadImage('SubDPS_Character_Img.png');
  balImg = loadImage('Balanced_Character_Img.png');
  specNotReady = loadImage('Spec_Not_Ready.png');
  specReady = loadImage('Spec_Ready.png');
  ultNotReady = loadImage('Ult_Not_Ready.png');
  ultReady = loadImage('Ult_Ready.png');
  normGray = loadImage('Normal_Gray.png');
  normBW = loadImage('Normal_BW.png');
  hpBar = loadImage('HP_Bar.png');
  shield = loadImage('Barrier.png');
  shieldUp = loadImage('Shield_Up.png');
  btfLoop = loadSound('Break_The_Fence_Sound_Loop.mp3');
  riser = loadSound('Riser.mp3');
  awakening = loadSound('Purple Planet Music - Awakening.mp3');
  click = loadSound('Click.mp3');
}


function setup() {
  fill(220);
  createCanvas(1100, 690);
  noStroke();
  skillImgs = [specReady, specNotReady, ultReady, ultNotReady, normBW, normGray];
  shieldImgs = [shield, shieldUp];//nAtk, sAtk, specCD, ultAtk, ultCD
  reset();
  FirstPlaythrough = true;
}

function draw() {
  background(232, 238, 242);
  if(!CharChosen){
    strtScrn.displayStartScreen();
    displayCharAndStats();
  }else if (user.hp > 0 && cpu.hp > 0){
    if(!btfLoop.isPlaying()){
      btfLoop.loop()
    }
    user.displayChar(width, height);
    cpu.displayChar(width, height);
    runCPU();
  }else if (user.hp <= 0 || cpu.hp <= 0){
    fill(0);
    if(user.hp > cpu.hp){
      textAlign(CENTER);
      textSize(50);
      text("You Win!", width/2, height/2)
    }else if (user.hp < cpu.hp){
      textAlign(CENTER);
      textSize(50);
      text("You Lose L", width/2, height/2)
    } else if(user.hp === cpu.hp){
      textAlign(CENTER);
      textSize(50);
      text("It's a tie!", width/2, height/2)
    }
    textSize(30);
    text("Press [ENTER] to restart", width/2, height*5/6);
  }
}



function displayCharAndStats(){ //displays character sprites and stats during character selection screen
  let charToDisplayIndex = strtScrn.getCharDisplayed();
  if(charToDisplayIndex===0){
    image(tank.charImg, width/4, height*5/8);
    tank.displayCharStats(width/2, height*2/5);
  }else if(charToDisplayIndex===1){
    image(dps.charImg,width/4, height*5/8)
    dps.displayCharStats(width/2, height*2/5);
  }else if(charToDisplayIndex===2){
    image(subDPS.charImg,width/4, height*5/8)
    subDPS.displayCharStats(width/2, height*2/5);
  }else if(charToDisplayIndex===3){
    image(balanced.charImg, width/4, height*5/8)
    balanced.displayCharStats(width/2, height*2/5);
  }
  textSize(30);
  text("Press [ENTER] to select.", width/4*3, height-60);
}

function mousePressed(){
  if(!CharChosen){
    if(!awakening.isPlaying() && FirstPlaythrough){
      FirstPlaythrough = false;
      awakening.loop();
    }
    strtScrn.mPressed();
  }
}

function keyPressed(){
  if(!CharChosen){//for start screen
    if(keyCode===ENTER){
      awakening.stop()
      click.play()
      riser.play()
      let canContinue = strtScrn.checkCharChosen();
      if(canContinue){
        setTimeout(function(){CharChosen = true; setUserAndCPU()}, 1000);
      }
    }
  }else if (user.hp <= 0 || cpu.hp <= 0){//for end screen
    if(keyCode===ENTER){
      reset();
    }
  }
}

function reset(){
  tank = new Character("Cherry", 300, 4, 8, 3, 18, 7, true, tankImg, skillImgs, hpBar, shieldImgs); // high hp, low atk, high block def, high cooldowns
  dps = new Character("Maxine", 160, 10, 17, 7, 27, 17, true, dpsImg, skillImgs, hpBar, shieldImgs); //low hp, high atk, low block def, high cooldowns
  subDPS = new Character("Arolin", 235, 6, 15, 5, 24, 8, true, subImg, skillImgs, hpBar, shieldImgs); //reg hp, high atk, med block def, low cooldowns
  balanced = new Character ("George", 200, 8, 10, 4, 20, 12, true, balImg, skillImgs, hpBar, shieldImgs);//low hp, med atk, med block def, med cooldowns
  CharList = [tank, dps, subDPS, balanced];
  CharChosen = false;
  strtScrn = new StartScreen(CharList, width, height)
}

function keyTyped(){
  if(CharChosen){//if playing the game
    if(key === 'x'){ //x for normal atk
      if(user.checkCanNormalAtk()){ //if the user can atk (there is currently no "delay")
        user.normActive = true;
        setTimeout(function(){user.normActive = false}, 200)
        setTimeout(function(){user.canNormalAtk = true}, 500);
        cpu.takeDamage(user.normalAtk);
      }
    }
    if(key === 'z'){//z for special atk
      if(user.checkCanSpecialAtk()){
        setTimeout(function(){user.canSpecAtk = true}, user.specCD*1000);
        cpu.takeDamage(user.specialAtk);
      }
    }
    if(key === 'c'){//c for ult atk
      if(user.checkCanUltAtk()){
        setTimeout(function(){user.canUltAtk = true}, user.ultCD*1000);
        cpu.takeDamage(user.ultAtk);
      }
    }
  }
}

function runCPU(){
  if(frameCount%35===0){
    let randInt = random();
    if(cpu.checkCanSpecialAtk() && randInt<0.6){
      setTimeout(function(){cpu.canSpecAtk = true}, cpu.specCD*1000);
      user.takeDamage(cpu.specialAtk);
    } else if(cpu.checkCanUltAtk() && randInt<0.5){
      setTimeout(function(){cpu.canUltAtk = true}, cpu.ultCD*1000);
      user.takeDamage(cpu.ultAtk);
    } else if(cpu.checkCanNormalAtk()){
      cpu.normActive = true;
        setTimeout(function(){cpu.normActive = false}, 200)
        setTimeout(function(){cpu.canNormalAtk = true}, 500);
        user.takeDamage(cpu.normalAtk);
    }
  }
}

function setUserAndCPU(){
  user = CharList[strtScrn.getCharDisplayed()]
  let cpuChosen = false;
  while(!cpuChosen){
    let cpuNum = floor(random(0, CharList.length));
    if(cpuNum != strtScrn.getCharDisplayed()){
      cpu = CharList[cpuNum];
      cpu.isUser = false;
      cpuChosen = true;
    }
  }
}
  

// //refs:
// //https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/
// //https://www.toptal.com/developers/keycode 
// //https://samplefocus.com/samples/rise-sound-hit-sharp-fx 
// //https://freesound.org/people/RutgerMuller/sounds/51167/
// //I screen recorded a loop
