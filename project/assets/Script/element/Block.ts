import Hero from "../Hero";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    // onLoad () {}

    start () {

    }
    // onCollisionEnter(other, self) {
    //     var that = this;
    //     // this.canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move, this);
    //     // this.underAttack();
    //     // if(this.HP <=0){
    //     //     cc.director.loadScene("gameOver");
    //     // }
    // }

    onBeginContact(contact,selfCollider,otherCollider:cc.Node){
       
        console.log(otherCollider);
        var _hero = otherCollider.getComponent(Hero);
        cc.log(_hero)
        _hero.stopJumpAction();
      
    }

    // update (dt) {}
}
