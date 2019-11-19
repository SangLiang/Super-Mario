import FlowerEnemy from "./FlowerEnemy";

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
export default class Pipline extends cc.Component {

    @property(cc.Node)
    flowerEnemy = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.group == 'hero'){
            var flowerEnemy:FlowerEnemy = this.flowerEnemy.getComponent(FlowerEnemy);
            flowerEnemy.move();
        }
    }


    start () {

    }

    // update (dt) {}
}
