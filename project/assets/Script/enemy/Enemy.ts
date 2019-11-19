import Hero from "../Hero";

const {ccclass, property} = cc._decorator;

enum MoveDirect{
    LEFT, RIGHT
}
enum ContactPosition { TOP, BOTTOM, OTHER };

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
            var _pos =  this.getContactPosition(selfCollider,otherCollider);
            if(_pos == ContactPosition.TOP){
                this.node.destroy();
            }else {
                var hero:Hero = otherCollider.getComponent(Hero);
                if(hero.isAlive){
                    hero.heroDead();
                }
            }
        }
    }

    getContactPosition(selfCollider, otherCollider) {
        if (this.isInTop(selfCollider, otherCollider)) {
            return ContactPosition.TOP;
        } else {
            return ContactPosition.OTHER;
        }
    }

    isInTop(selfCollider, otherCollider) {

        // x位置判断
        if (selfCollider.node.x + selfCollider.node.width > otherCollider.node.x && selfCollider.node.x - selfCollider.node.width < otherCollider.node.x) {
            // y 位置判断
            if (selfCollider.node.y < otherCollider.node.y) {
                return true;
            } else {
                return false;
            }
        }

        return false;
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
        if(!this.hero.active) return;
        var _hero:Hero = this.hero.getComponent(Hero);
        if(_hero.isAlive == false ) return ;

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
