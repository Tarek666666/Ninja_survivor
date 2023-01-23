import {Player} from './player.js'
import {InputHandler} from './inputHandeler.js'
import { Background } from './layer.js';
import {Raven} from './Enemy.js'
import {Ghost} from './Enemy.js'
import {Zombie} from './Enemy.js'

window.addEventListener('DOMContentLoaded' , ()=>{
    let canvas = document.getElementById('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    let ctx = canvas.getContext('2d');

class Game{
    constructor(width , height){
        this.width = width;
        this.height = height;
        this.groundMargin = 70;
        this.gameSpeed = 0;
        this.backround = new Background(this)
        this.input = new InputHandler();
        this.player = new Player(this);
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 400;
        this.score = 0;
        this.scoreSound = document.querySelector('#score');
        this.music = document.querySelector('#music');
        
        
    }
    update(){
        //music
        if(this.player.isMoving)this.music.play();
        
        this.music.addEventListener('ended', function() {
            this.play();
        }); 
        
        this.displayStatusText(ctx);
        if(this.player.isMoving == true) this.gameSpeed = 5;
        else this.gameSpeed = 0;
        this.player.update(this.input.keys); 
        this.backround.update(this.gameSpeed);
        if(this.enemyTimer >= this.enemyInterval){
           
            this.addEnemy();
            this.enemyTimer = 0;
        }else this.enemyTimer ++;
        this.enemies.forEach(enemy =>{
           enemy.update();
           if(enemy.readyForDeletion == true){
            this.enemies.splice(this.enemies.indexOf(enemy) , 1);
            this.score ++;
            this.scoreSound.load();
            this.scoreSound.play();
           }
        })
    }
    draw(ctx){
    this.backround.draw(ctx);   
    this.player.draw(ctx); 
    this.enemies.forEach(enemy =>{
        enemy.draw(ctx);
     })
    }

    addEnemy(){
        const enemyTypes = [new Zombie(this) , new Raven(this) ,  new Ghost(this)];
       if(this.score >= 10){
        this.enemies.push(new Zombie(this));
       }
       this.enemies.push(enemyTypes[Math.floor(Math.random() * 3)]);
    }

    displayStatusText(ctx){
        ctx.fillStyle = 'red';
        ctx.font = '40px Serif';
        ctx.fillText("Score: " + this.score , 23, 53);
        ctx.fillStyle = 'white';
        ctx.font = '40px Serif';
        ctx.fillText("Score: " + this.score , 20, 50);
        if(this.player.gameOver){
            ctx.fillStyle = "white";
            ctx.fillRect(132, 295 , 950 , 100);
            ctx.fillStyle = 'black';
            ctx.font = '40px Serif';
            ctx.fillText("Your Player died, Press Enter if you want to try again !! "  , 150, 350);
            ctx.fillStyle = 'red';
            ctx.font = '40px Serif';
            ctx.fillText("Your Player died, Press Enter if you want to try again !!"  , 152, 352);
           
           
            window.addEventListener('keydown' , e =>{
                if(e.key == 'Enter'){
                   window.location.reload();
                }
            })
        }
    }
}

let game = new Game(canvas.width , canvas.height);
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    game.update();
    game.draw(ctx);
    if(!game.player.gameOver)requestAnimationFrame(animate)
    else game.displayStatusText(ctx)
}
animate();

})