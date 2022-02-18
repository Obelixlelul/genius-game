// >>>>> GET COLORS
const green = document.querySelector('#top-left');
const red = document.querySelector('#top-right');
const blue = document.querySelector('#botom-right');
const yellow = document.querySelector('#bottom-left');

// >>>>> GET BUTTONS
const outerCircle = document.querySelector(".outer-circle");
const ledPanel = document.querySelector('#turn');
const powerButton = document.querySelector('#on');
const strictButton = document.querySelector('#strict');
const startButton = document.querySelector('#start');

const ROUNDS = 10; //CHANGE THIS TO DETERMINE HOW MANY ROUNDS

let computerOrder = [];
let playerOrder = [];
let strict = false;
let on = false;
let turn = 0; //0-computer, 1-human
let round = 1; //Whats round is
let win = 0;
let flash = 0; //determine how many colors will be flash
let clicks = 0;
let winnerFlag;

disablePointerEvents();

// >>>>> STRICTBUTTON
strictButton.addEventListener('click', (event)=>{
    if (strictButton.checked == true){
        strict = true;
    }else {
        strict = false;
    }
});

// >>>>> POWER BUTTON
powerButton.addEventListener('click', (event)=>{
    if (powerButton.checked == true){
        ledPanel.innerHTML = "-";
        on = true;
    }else{
        ledPanel.innerHTML = "";
        on = false;
        reset();
    }
});

startButton.addEventListener('click', (event)=>{
    computerOrder = [];
    round = 1;
    
    //generate [ROUND] randomic numbers to determine computer color sequence
    for (let i = 0; i < ROUNDS; i++){
        computerOrder.push(getRandomic());
    }

    if (on == true){
        ledPanel.innerHTML = round;
        play();
    }
          
});

function play() {  
    
    if (on == false){
        ledPanel.innerHTML = "";
        reset();
        return;
    }

    //if won, finish game
    if (winnerFlag){
        console.log("enter here");
        return;
    }
    
    // >>> Computer Turn
    if(turn == 0 && !win){
             
        let counter = 0;
        
        let i = setInterval(()=>{
            
            if (computerOrder[counter] == 0) zero();
            if (computerOrder[counter] == 1) one();
            if (computerOrder[counter] == 2) two();
            if (computerOrder[counter] == 3) three();


            if (counter == flash && turn == 0){
                clearInterval(i);
                turn = 1;
                ++flash;
                playerOrder = [];
                ablePointerEvents() //abble
            }

            counter++;

        }, 800);
    }

    // >>> Human Turn
    if (turn == 1 && clicks == flash && !win){      

        disablePointerEvents();
        turn = 0;
        clicks = 0;
        ledPanel.innerHTML = ++round;

        setTimeout(() => {
            play();
          }, 400);  
    }

    // >>> Loose game in strict
    if (win && strict){
        ledPanel.innerHTML = "lose"
        disablePointerEvents();
    }

    // >>> If no strict, repeat last time
    if (win && !strict){
        turn = 0; //computer again
        win = 0; //turn win false
        clicks = 0;

        setTimeout(() => {
            --flash;
            play();
          }, 800);     
    }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TURN ON THE LIGHT
function zero() {
    let audio = document.getElementById("clip1");
    audio.play();
    green.style.backgroundColor = "lightgreen";
    setTimeout(() => {
        clearColor();
      }, 300);
}
function one() {
    let audio = document.getElementById("clip2");
    audio.play();
    red.style.backgroundColor = "tomato";
    setTimeout(() => {
        clearColor();
      }, 300);
}
function two() {
    let audio = document.getElementById("clip3");
    audio.play();
    yellow.style.backgroundColor = "yellow";
    setTimeout(() => {
        clearColor();
      }, 300);
}
function three() {
    let audio = document.getElementById("clip4");
    audio.play();
    blue.style.backgroundColor = "lightskyblue";
    setTimeout(() => {
        clearColor();
      }, 300);
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LISTENER COLOR BUTTONS

green.addEventListener('click', (event) => {
    zero();
    playerOrder.push(0);
    ++clicks;
    check();
    play();
});

red.addEventListener('click', (event) => {
    one();
    playerOrder.push(1);
    ++clicks;
    check();
    play();
});

yellow.addEventListener('click', (event) => {
    two();
    playerOrder.push(2);
    ++clicks;
    check();
    play();
});

blue.addEventListener('click', (event) => {
    three();
    playerOrder.push(3);
    ++clicks;
    check();
    play();
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> AUXILIAR FUNCTIONS

function getRandomic(){
    return Math.floor(Math.random() * 4);
}

function clearColor() {
    green.style.backgroundColor = "darkgreen";
    red.style.backgroundColor = "darkred";
    yellow.style.backgroundColor = "goldenrod";
    blue.style.backgroundColor = "darkblue";
}

function flashColor() {
    green.style.backgroundColor = "lightgreen";
    red.style.backgroundColor = "tomato";
    yellow.style.backgroundColor = "yellow";
    blue.style.backgroundColor = "lightskyblue";
}

function ablePointerEvents() {
    green.style.pointerEvents = "auto";
    red.style.pointerEvents = "auto";
    yellow.style.pointerEvents = "auto";
    blue.style.pointerEvents = "auto";
}
function disablePointerEvents() {
    green.style.pointerEvents = "none";
    red.style.pointerEvents = "none";
    yellow.style.pointerEvents = "none";
    blue.style.pointerEvents = "none";
}

function reset(){
    computerOrder = [];
    playerOrder = [];
    strict = false;
    on = false;
    turn = 0; //0-computer, 1-human
    round = 1; //Whats round is
     flash = 0; //determine how many colors will be flash
    clicks = 0;
    winnerFlag;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CHECK IF CLICKED WRONG BUTTON

function check(){

    let indexToVerify = playerOrder.length - 1;

    if (playerOrder[indexToVerify] != computerOrder[indexToVerify]){
        win = 1;
        outerCircle.classList.add("outer-circle-shake");
        setTimeout(() => {
            outerCircle.classList.remove("outer-circle-shake");
        }, 400);   
    }   
    
    const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);


    if (equals(playerOrder, computerOrder)){
        ledPanel.innerHTML = "WIN!";
        winnerFlag = 1; 
        disablePointerEvents();
    }
}