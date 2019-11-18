import Hero from "../Hero";

const {ccclass, property} = cc._decorator;

enum MoveDirect{
    LEFT, RIGHT
}

@ccclass
export default class Enemy extends cc.Component {

    @property
    moveDirect = MoveDirect.LEFT;

    private xSpeed = 80;
   
    onLoad(){
        if(this.moveDirect == MoveDirect.RIGHT){
            this.turnSide();
        }
    }

    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.group == 'hero'){
            otherCollider.node.destroy();
        }
    }

    private move(dt){
        if (this.moveDirect == MoveDirect.LEFT){
            this.node.x -= this.xSpeed * dt;
        }else if(this.moveDirect == MoveDirect.RIGHT){
            this.node.x += this.xSpeed * dt;

        }
    }

    private turnSide(){
        this.node.scaleX  *= -1;
    }

    update (dt) {
        this.move(dt);
    }
}
