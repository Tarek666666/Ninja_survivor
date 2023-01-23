export class Enemy {
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.xv = Math.floor(Math.random() * 8 + 4);
        this.readyForDeletion = false;
    }
    update() {
        this.x -= this.xv;
        this.y += Math.sin(this.angel) * 3;
        this.angel += 0.04;
        if(this.x < 0) this.readyForDeletion = true;
       
        this.counter ++;
        
    }
    draw(ctx) {
        if (this.counter % this.enemyStagger == 0) {
            this.frameX < 5 ? this.frameX++ : (this.frameX = 0);
        }
        ctx.drawImage(
            this.img,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width ,
            this.height 
        );
       
        
    }
}

export class Raven extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.width = 271 / 2.5;
        this.height = 194 / 2.5;
        this.x = this.game.width;
        this.y = Math.floor(Math.random() * 100) * 5;
        this.enemyStagger = 7;
        this.img = document.querySelector('.raven');
        this.angel = 0;
        this.counter = 0;
    }
}
export class Ghost extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.height = 70;
        this.width = 60;
        this.x = this.game.width;
        this.y = Math.floor(Math.random() * 100) * 5;
        this.enemyStagger = 5;
        this.img = document.querySelector('.ghost');
        this.angel = 0;
        this.counter = 0;
    }
}

export class Zombie extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.height = 120;
        this.width = 97;
        this.x = this.game.width;
        this.y = this.game.height - (this.height) - this.game.groundMargin ;
        this.enemyStagger = 12;
        this.img = document.querySelector('.zombie');
        this.frameX = 0;
        this.xv = Math.floor(Math.random() * 7 + 2)
    }
    update(){
        if(this.x % this.enemyStagger == 0){
            this.frameX == 7 ? this.frameX = 0 : this.frameX ++
        }
        if(this.x <= 0)this.readyForDeletion = true;
        this.x -= this.xv;
        
    }
    draw(ctx){
        ctx.drawImage(this.img,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width ,
            this.height )
    }
   
}