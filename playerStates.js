
    //IDLE: 0,
   // WALKING: 1,
   // RUNNING: 2,
  //  JUMPING: 3,
  //  BACKWARD: 4,
  //  ATTACK: 5,
  //  DIE:6
export class State{
    constructor(player){
        this.player = player;
    }
    enter(){
        this.player.frameY = 0;
    }
    handleInput(input){
        if(input.includes("ArrowUp")){
            
          if(!this.player.onGround())this.player.frameY = 3;
            
        }
       else if( input.includes('ArrowLeft') ){
            this.player.frameY = 1;
        } else if(input.includes('ArrowRight')  ){
            this.player.frameY = 2;
            this.player.isMoving = true;
        }else if(this.player.onGround()){
            this.enter();
            this.player.isMoving = false;
        };
       
    }
}

