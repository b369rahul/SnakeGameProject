//document.querySelector('.btn').addEventListener('onclick',playgame());

let gsound= new Audio('..music/music.mp3');

//Show Music Control
function soundplay(){
    var aka = document.querySelector('.mutebtn').innerHTML;
    if(aka=='<img src="volume-1.svg">'){
        document.querySelector('.mutebtn').innerHTML='<img src="volume-x.svg">';
        gsound.pause();
    }
    if(aka=='<img src="volume-x.svg">'){
        document.querySelector('.mutebtn').innerHTML='<img src="volume-1.svg">';
        gsound.play();
    }
}

function playgame(){
let change_dir_sound = new Audio ('..music/move.mp3');
let fsound= new Audio('..music/food.mp3');
let goversound= new Audio('..music/gameover.mp3');
let vel = {x:1, y:0};
let score=0;
let food={x:5,y:9};
let snakearr= [{x:6,y:4}];
let ltime=0;
let speed=4;

var hiscoreVal=0


function phis(){
    for(let i=1;i<snakearr.length;++i){
        if (snakearr[0].x==snakearr[i].x && snakearr[0].y==snakearr[i].y)
        { 
            return true;}
    }
    if(snakearr[0].x<2 || snakearr[0].x>19 || snakearr[0].y<0 || snakearr[0].y>18)
    {   
        return true;}
    return false;
}

// Changing direction
window.addEventListener('keydown',function(event){
change_dir_sound.play();
    switch(event.key){
        case "ArrowUp":{
           // console.log("ArrowUp");
            vel.x=0;
            vel.y=-1;
            break;
            }

        case "ArrowDown":{
           // console.log("ArrowDown");
            vel.x=0;
            vel.y=1;
            break;
            }

        case "ArrowLeft":{
           // console.log("ArrowLeft");
            vel.x=-1;
            vel.y=0;
            break;
            }
        case "ArrowRight":{
           // console.log("ArrowRight");
            vel.x=1;
            vel.y=0;
            break;
            }
    }
});

  //

function game(){

    let hscore= localStorage.getItem("hiscore")
    if(hscore===null){
        localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
        document.querySelector('.hi_score').innerHTML="Your High Score is: "+hiscoreVal;
    }
    else{
        hiscoreVal=JSON.parse(hscore);
        document.querySelector('.hi_score').innerHTML="Your High Score is: "+ hiscoreVal;
    }

    let board=document.querySelector(".board");
    board.innerHTML="";
    document.querySelector(".score").innerHTML ="Your Score is: "+score;
    // let showscore= document.createElement('div');
    //       showscore.innerHTML="Score: "+score;
    //       board.classList.add(showscore);
    // What to do on game over
     if(phis()){
         goversound.play();
         alert("Game Over press any key to start again!");
         speed=4;
         score=0;
         snakearr=[{x:Math.floor(2+Math.random()*10),y:Math.floor(2+Math.random()*10)}];
         document.querySelector(".hi_score").classList.remove("hiScorePar")
         return;
     }

     //If eaten food
     //if(food.x==snakearr[0].x && food.y==snakearr[0].y)
     if(snakearr[0].y === food.y && snakearr[0].x===food.x+1){
         score+=5;
         if(score>hiscoreVal){
             hiscoreVal=score;
             hscore=localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
             document.querySelector(".hi_score").classList.add("hiScorePar");
         }
         if(score<50)speed+=(score/10);
         fsound.play();
        food.x=Math.floor(Math.random()*15) + 2;
        food.y=Math.floor(Math.random()*15) + 2;
        snakearr.unshift({x : snakearr[0].x + vel.x , y: snakearr[0].y + vel.y});
    }
    
    //Display Snake and food
    let showfood=document.createElement('div');
    showfood.classList.add('food');
    showfood.style.gridRowStart=food.y;
    showfood.style.gridColumnStart=food.x;
    board.appendChild(showfood);
    // show snake
    snakearr.forEach((v,e)=>{
        // console.log(v);
         let snakeelement =document.createElement('div');
         // snakeelement.style.gridRowStart=v.y;
         // snakeelement.style.gridColoumnStart=v.x;
         snakeelement.style.gridRowStart=v.y;
         snakeelement.style.gridColumnEnd=v.x;
         if(e==0){
             snakeelement.classList.add('head');
         }
         else{
             snakeelement.classList.add('snake');
         }
         board.appendChild(snakeelement);
     });

     //moving snake
    // for(let i=1;i<snakearr.length-1;++i){
    //     snakearr[i]={...snakearr[i-1]};         // {... argument}  causes pass by value otherwise it would be pass by reference
    // }
    // snakearr[0].x+=vel.x;
    // snakearr[0].y+=vel.y;

    for (let i = snakearr.length - 2; i>=0; i--) { 
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += vel.x;
    snakearr[0].y += vel.y;
}


// Animation rendering
function main(ctime){
   // console.log(ctime);
    if((ctime - ltime)/1000 > 1/speed){
        game(); ltime=ctime; 
    }
    window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main)           // it automatacily makes current time stamp as the argument of the function passed

};
