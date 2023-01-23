import {State} from './playerStates.js'




export class Player{
    constructor(game){
        this.game = game;
        this.width = 130;
        this.height = 117;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.img = document.querySelector('.player');
        this.speed = 0;
        this.maxSpeed = 7;
        this.weight = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.state = new State(this);
        this.counter = 0;
        this.stagger = 7;
        this.isMoving = false;
        this.gameOver = false;
        this.jumpSound = document.querySelector('#audio');
        this.dieSound = document.querySelector('#die');
        this.effectImg = document.querySelector('.boom');
    }
    update(input){
       
        this.checkCollision();
        //horizental movments
        this.state.handleInput(input);
        if(this.frameY == 3)this.stagger = 27;
        else this.stagger = 7;
        if(this.counter % this.stagger === 0){
            this.counter = 0;
            if(this.frameX < 4)this.frameX ++
            else this.frameX = 0;
        }
        
        this.counter ++;
        this.x += this.speed;
        if(input.includes('ArrowRight')) {
            this.speed = this.maxSpeed ;
           
        }
        else if(input.includes('ArrowLeft'))this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        if(this.x < 0) this.x = 0;
        //Vertical movments
        if(input.includes('ArrowUp') && this.onGround()) {
            this.vy = -30  ;
            this.jumpSound.load();
            this.jumpSound.play();
            this.weight = 1;
            console.log(this.onGround())    
        }
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else {
            this.vy = 0 
        };
    }
    draw(ctx){
        if(this.isMoving && this.onGround()){
            this.runEffect(ctx);
        }
        ctx.drawImage(this.img , this.frameX * this.width, this.frameY * this.height , this.width , this.height , this.x , this.y , this.width , this.height)
       
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    checkCollision(){
        this.game.enemies.forEach(enemy =>{
            if(this.isCollide(this,enemy)){
                this.gameOver = true;
                
                this.dieSound.play();
                this.game.music.pause()
            }
        })
    }
    isCollide(player, enemy) {
        return !(
            ((player.y + player.height - 20) < (enemy.y)) ||
            (player.y > (enemy.y + enemy.height - 20)) ||
            ((player.x + player.width - 50) < enemy.x) ||
            (player.x > (enemy.x + enemy.width - 70))
        );
    }
    runEffect(ctx){
       
        ctx.drawImage(this.effectImg , this.frameX * 60 , 0 , 60 , 55 , this.x - 10 , this.y + 80 , 60, 55)
       
    }
}