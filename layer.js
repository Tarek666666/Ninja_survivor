class Layer{
    
    constructor(game , width , height , speedModifier , image){
        this.game = game;
        this.gameSpeed = this.game.gameSpeed;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.x2 = 1920;
        this.y = 0;
    }
    update(gameSpeed){   
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 ;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x ;
        }
        this.x -= gameSpeed  * this.speedModifier;
        this.x2 -= gameSpeed * this.speedModifier;
    }
    draw(ctx){

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width , this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = 1920;
        this.height = 800;
        this.layer6img = document.querySelector('.background');
        this.layer5img = document.querySelector('.background2');
        this.layer4img = document.querySelector('.background3');
        this.layer1 = new Layer(this.game , this.width , this.height , 1.5 , this.layer6img);
        this.layer2 = new Layer(this.game , this.width , this.height , 1 , this.layer5img);
        this.layer3= new Layer(this.game , this.width , this.height , 1 , this.layer4img);
        this.backgroundLayers = [this.layer2    , this.layer3 , this.layer1 ];
    }
    update(gameSpeed){
        this.backgroundLayers.forEach(layer =>{
            layer.update(gameSpeed);
        })
    }
    draw(ctx){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(ctx);
        })
    }
}

