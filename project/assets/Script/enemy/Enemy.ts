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

    // 是否激活 ， 只有当player靠近的时候激活
    private active = false;

    private hero = null;

    private warningRange:number = 500;

    onLoad(){
        this.hero = cc.find("Canvas/hero");

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

    moveController(){
        if(Math.abs(this.node.x - this.hero.x) < this.warningRange){
            this.active = true;
        }else {
            this.active = false;
        }
    }

    update (dt) {
        this.moveController();
        if(!this.active) return ;
        this.move(dt);
    }
}
